module.exports = (async () => {
  //Load Environment Variables
  const path = require('path');
  require('../../environments/envLoader.js');
  try {
    require('newrelic');
  } catch (e) { }


  //Load Express
  const express = require('express');
  const axios = require('axios').default;
  const server = express();
  const PORT = 3002;

  if (process.env.MASTER_INSTANCE === 'true') {
    //BEGIN MASTER INSTANCE BEHAVIOR
    //SETUP
    const Promise = require('bluebird');
    const crypto = require('crypto');
    const fs = require('fs');
    const Machine = Promise.promisifyAll(require('docker-machine'));
    const exec = Promise.promisify(require('child_process').exec);
    const gentoken = Promise.promisify(crypto.randomBytes);
    const INSTANCETOKEN = await gentoken(64).then(buf => buf.toString('base64url'));
    const smToken = await gentoken(16).then(buf => buf.toString('hex'));
    const thisIP = await axios.get('https://api.ipify.org?format=json').then(results => results.data.ip);
    const children_instances = [];
    const pollingInterval = 60;
    var awaitingAWS = false;
    var child_index = 0;
    //write environment
    fs.writeFileSync('./.env', `
      ## Setup (Only the first database is used in production.)
      ABOUT_DATABASE=${process.env.ABOUT_DATABASE}
      USE_DBS=${process.env.USE_DBS}

      ## Postgres Variables
      PG_HOST=${process.env.PG_HOST}
      PG_USER=${process.env.PG_USER}
      PG_PASSWORD=${process.env.PG_PASSWORD}
      PG_PORT=${process.env.PG_PORT}

      ## Child Instance data
      MASTER_URL=${thisIP}
      INSTANCETOKEN=${INSTANCETOKEN}
    `);

    class Child_Instance {
      constructor(ip = '') {
        this.ip = ip.slice(7);
        this.active = true;
        this.activeRequests = 0;
        this.name = `${smToken}-sdc-factory-about-child${child_index}`;
        child_index++;
      }

      handleReq(method = 'get', endpoint = '/', body) {
        let forwardRequest = (method) => {
          this.activeRequests++;
          return axios[method.toLowerCase()];
        };
        let endReq = (results) => {
          this.activeRequests--;
          return results;
        };
        return body ?
          forwardRequest(method)(`http://${this.ip}${endpoint}`, body).then(endReq) :
          forwardRequest(method)(`http://${this.ip}${endpoint}`).then(endReq);
      }
    };

    const SummonChild = (child_Id = child_index) => {
      if (awaitingAWS) { return null }
      console.log('Summoning Child...');
      awaitingAWS = true;
      var name = `${smToken}-sdc-factory-about-child${child_Id}`;
      //Creates the docker machine
      return Machine.createAsync(name, 'amazonec2', {
        'amazonec2-access-key': process.env.AWS_ACCESS_KEY_ID,
        'amazonec2-secret-key': process.env.AWS_SECRET_ACCESS_KEY,
        'amazonec2-security-group': 'sdc-factory-about-network'
      }).then(() => {
        return Machine.envAsync(name, {parse: true});
      }).then((env) => {
        return exec('docker build -f ./Child.Dockerfile -t sdc-about-child . && docker run -d -p 80:3002 --env-file ./.env sdc-about-child', { env });
      })

    };
    const KillChild = (name) => {
      if (awaitingAWS || children_instances.length <= 3) {
        return new Promise((res, rej) => { rej(); });
      }
      awaitingAWS = true;
      return exec(`docker-machine rm -y ${name}`);
    };
    const selectInstance = () => {
      return children_instances.reduce((cur, instance) => {
        console.log(cur.ip);
        return cur.activeRequests < instance.activeRequests ?
          cur : instance;
      });
    }

    //ROUTES
    //Instance Registration
    server.post(`/${INSTANCETOKEN}`, (req, res) => {
      console.log('Registering IP', req.ip, ' To Children');
      children_instances.push(new Child_Instance(req.ip));
      awaitingAWS = false;
      res.sendStatus(201);
    });

    server.all('*', (req, res, next) => {
      console.log(children_instances.length);
      if(children_instances.length === 0) {
        res.sendStatus(500);
      } else {
        next();
      }
    })

    //Create
    server.post('/api/about/', (req, res) => {
      selectInstance().handleReq('post', '/api/about', req.body).then(res.send);
    });

    //Read
    server.get('/api/about/:id', (req, res) => {
      selectInstance().handleReq('get', `/api/about/${req.params.id}`).then(res.send);
    });
    server.get('/api/about/:id/concise', (req, res) => {
      selectInstance().handleReq('get', `/api/about/${req.params.id}/concise`).then(res.send);
    });

    //Update
    server.put('/api/about/:id', (req, res) => {
      selectInstance().handleReq('put', `/api/about/${req.params.id}`, req.body).then(res.send);
    });

    //Delete
    server.delete('/api/about/:id', (req, res) => {
      selectInstance().handleReq('delete', `/api/about/${req.params.id}`).then(res.send);
    });

    server.get('/:id', (req, res) => {
      selectInstance().handleReq('get', `/${req.params.id}`).then(res.send);
    })
    //END ROUTES

    SummonChild().then(() => {
      return SummonChild();
    }).then(() => {
      return SummonChild();
    });

    //Manage Child Instances loop
    setInterval(async () => {
      console.log('Running Event Loop');
      if (children_instances.length < 3) {
        SummonChild();
        return;
      }
      if (children_instances.length >= 3) {
        var atCapacity = children_instances.every((instance) => {
          return instance.activeRequests > 200;
        });
        if (atCapacity && children_instances.length < 10) {
          SummonChild();
          return;
        }
        var underloaded = children_instances.every((instance) => {
          return instance.activeRequests < 30;
        });
        if (underloaded && children_instances.length >= 4) {
          var childIndexToKill = children_instances.length - 1;
          KillChild(children_instances[childIndexToKill].name)
            .then(() => {
              awaitingAWS = false;
              children_instances = children_instances.splice(childIndexToKill, 1);
            }).catch();
          return;
        }

      }
    }, pollingInterval * 1000);

  } else {
    //BEGIN CHILD INSTANCE BEHAVIOR
    //Load React
    const React = require('react');
    const { renderToString } = require('react-dom/server');
    const About = require('../shared/About.jsx').default;


    //Load Middleware
    const cors = require('cors');
    const bodyParser = require('body-parser');

    //Load Database
    const DBManager = require('../../database/GetDBManager');
    const db = new DBManager();

    //Register Middleware
    server.use(cors());
    server.use(bodyParser.urlencoded({ extended: true }));
    server.use(bodyParser.json());
    server.use(express.static('./public'));

    //Helper Functions
    var errorResponses = {
      noCourseObj: (res) => {
        res.status(400).send('Request body must have key "courseObj" with Value Object containing course data.');
      },
      noCourseId: (res) => {
        res.status(400).send('property course_id must be defined on an object with name "courseObj".');
      },
      noIdUpdates: (res) => {
        res.status(400).send('Cannot update course_id. You must delete the new id, delete this id, and then post a whole new object.');
      }
    }

    //GetFromDB
    var getFromDB = (id) => {
      if (id > 10000000) { return null; } //This would not be used in a real project. This is simply to cut off any floating records not intended to be seen.

      return db.getCourse(id)
        .then((data) => {
          if (!data) {
            return {
              data: null,
              code: 404
            }
          } else {
            var dataToReturn = {
              course_id: data.course_id,
              recent_views: data.recent_views,
              description: data.description,
              what_you_will_learn: data.what_you_will_learn,
              skills_you_will_gain: data.skills_you_will_gain
            };
            dataToReturn.metadata = [
              {
                icon: 'sharableCertificateSVG',
                title: 'Shareable Certificate',
                subtitle: 'Earn a Certificate upon completion',
              },
              {
                icon: 'onlineSVG',
                title: '100% online',
                subtitle: 'Start instantly and learn at your own schedule',
              },
              {
                icon: 'deadlinesSVG',
                title: 'Flexible Deadlines',
                subtitle: 'Reset deadlines in accordance to your schedule',
              },
              {
                icon: 'hoursSVG',
                title: `Approx. ${data.metadata.hours} hours to complete`,
                subtitle: '',
              },
              {
                icon: 'languagesSVG',
                title: 'English',
                subtitle: `Subtitles: ${'English, ' + data.metadata.subtitles}`,
              },
            ];
            dataToReturn.learner_career_outcomes = [
              {
                icon: 'careerDirectionSVG',
                pct: data.learner_career_outcomes.direction,
                outcome: 'started a new career after completing these courses',
              },
              {
                icon: 'careerBenefitSVG',
                pct: data.learner_career_outcomes.benefit,
                outcome: 'got a tangible career benefit from this course',
              },
              {
                icon: 'careerPromotionSVG',
                pct: data.learner_career_outcomes.promo,
                outcome: 'got a pay increase or promotion',
              },
            ];
            return {
              data: dataToReturn,
              code: 200
            };
          }
        })
        .catch((err) => {
          return {
            data: err,
            code: 500
          }
        });
    }

    { //Routes
      //Create
      server.post('/api/about', (req, res) => {
        if (req.body.courseObj === undefined) {
          errorResponses.noCourseObj(res);
          return;
        }
        if (req.body.courseObj.course_id !== undefined) {
          db.insertCourse(req.body.courseObj)
            .then(() => {
              res.sendStatus(201);
            })
            .catch((err) => {
              res.status(500).send(err);
            })
        } else {
          errorResponses.noCourseId(res);
        }
      });

      //Read
      server.get('/api/about/:id', (req, res) => {
        getFromDB(req.params.id).then(results => {
          res.status(results.code).send(results.data);
        });
      });

      server.get('/api/about/:id/concise', (req, res) => {
        db.getCourse(req.params.id)
          .then((data) => {
            if (!data) {
              res.sendStatus(404);
            } else {
              res.status(200).send(data);
            }
          })
          .catch(() => {
            res.sendStatus(404);
          });
      });

      //Update
      server.put('/api/about/:id', (req, res) => {
        if (req.body.courseObj === undefined) {
          errorResponses.noCourseObj(res);
          return;
        } else {
          if (req.body.courseObj.course_id) {
            errorResponses.noIdUpdates(res);
            return;
          }
          db.updateCourse(req.params.id, req.body.courseObj)
            .then((modCount) => {
              modCount ? res.sendStatus(204) : res.sendStatus(404);
            })
            .catch((err) => {
              res.send(err);
            })
        }
      });

      //Delete
      server.delete('/api/about/:id', (req, res) => {
        db.deleteCourse(req.params.id)
          .then(() => {
            res.sendStatus(200);
          })
          .catch((err) => {
            console.log(err);
          });
      });

      server.get('/:id', (req, res) => {
        if (isNaN(req.params.id)) {
          res.status(404).send();
          return;
        }
        getFromDB(req.params.id).then(results => {
          let appStr = renderToString(<About course={results.data} />);
          if (results.code === 200) {
            res.status(200).send(`<!DOCTYPE html>
            <html>
            <head>
            <title>Metadata Service Test Page</title>
            <link rel="stylesheet" href="index.css">
            </head>
            <body>
            <div id='about'>${appStr}</div>
            <script>window._initialAboutServiceData = ${JSON.stringify(results.data)};</script>
            <script src='/index.js'></script>
            </body>
            </html>`);
          } else {
            res.status(results.code).send(results.data);
          }
        });
      });

      server.get('/:id/innerHTML', (req, res) => {
        if (isNaN(req.params.id)) {
          res.status(404).send();
          return;
        }
        getFromDB(req.params.id).then(results => {
          let appstr = renderToString(<About course={results.data} />);
          res.send(`
          ${appstr}
          <script>
          window._initialAboutServiceData = ${JSON.stringify(results.data)};
          </script>
          `);
        });
      });

    }
  }


  // Allows the server to listen if it's in dev or prod, but not while testing
  if (process.env.NODE_ENV !== 'test') {
    server.listen(PORT, () => {
      if (process.env.MASTER_INSTANCE === 'true') {
        console.log(`Master Server Listening on port ${PORT}`);
      } else {
        console.log(`Child Server Listening on port ${PORT}`);
        axios.post(`http://${process.env.MASTER_URL}/${process.env.INSTANCETOKEN}`);
      }
    });
  }
  return server;
})();
