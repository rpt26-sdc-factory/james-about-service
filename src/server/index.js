//Load Environment Variables
const path = require('path');
require('../../environments/envLoader.js');
try {
  require('newrelic');
} catch (e) { }


//Load Express
const express = require('express');
const server = express();
const PORT = 3002;

//Load React
const React = require('react');
const {renderToString} = require('react-dom/server');
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
    console.log(`getting /${req.params.id} index.html`);
    getFromDB(req.params.id).then(results => {
      let appStr = renderToString(<About course={results.data}/>);
      if (results.code === 200) {
        res.status(200).send(`<!DOCTYPE html>
        <html>
          <head>
            <title>Metadata Service Test Page</title>
            <link rel="stylesheet" href="index.css">
          </head>
          <body>
            <div id='about'>${appStr}</div>
            <script>window._initialAboutServiceData = ${JSON.stringify(results.data)}; console.log('test')</script>
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
      let appstr = renderToString(<About course={results.data}/>);
      res.send(`
        ${appstr}
        <script>
          window._initialAboutServiceData = ${JSON.stringify(results.data)};
        </script>
      `);
    });
  });

}

// Allows the server to listen if it's in dev or prod, but not while testing
if (process.env.NODE_ENV !== 'test') {
  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
}

module.exports = server;
