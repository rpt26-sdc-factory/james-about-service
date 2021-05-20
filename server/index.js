//Load Environment Variables
const path = require('path');
require(path.join(__dirname, "..", 'environments', 'envLoader.js'));

//Load Express
const express = require('express');
const app = express();
const PORT = 3002;

//Load Middleware
const cors = require('cors');
const bodyParser = require('body-parser');

//Load Database
const DBManager = require('../database/DBManager');
const db = new DBManager('mongo');

//Register Middleware
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('./public'));

{ //Routes
  //Create
  app.post('/api/about', (req, res) => {
    if(req.body.courseObj.course_id !== undefined) {
      db.insertCourse(req.body.courseObj)
        .then(() => {
          res.sendStatus(201);
        })
        .catch((err) => {
          res.status(500).send(err);
        })
    } else {
      res.status(400).send('property course_id must be defined on object with name "courseObj".');
    }
  });

  //Read
  app.get('/api/about/:id', (req, res) => {
    db.getCourse(req.params.id)
      .then((data) => {
        if (!data) {
          res.sendStatus(404);
        } else {
          var dataToReturn = {
            what_you_will_learn: data.what_you_will_learn,
            skills_you_will_gain: data.skills_you_will_gain,
            course_id: data.course_id,
            recent_views: data.recent_views,
            description: data.description
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
          console.log(dataToReturn)
          res.send(dataToReturn).status(200);
        }
      })
      .catch(() => {
        res.sendStatus(404);
      });
  });

  //Update
  app.put('/api/about/:id', (req, res) => {
    db.updateCourse(req.params.id, req.body.courseObj)
      .then((modCount) => {
        modCount ? res.sendStatus(204) : res.sendStatus(404);
      })
      .catch((err) => {
        res.send(err);
      })
  });

  //Delete
  app.delete('/api/about/:id', (req, res) => {
    db.deleteCourse(req.params.id)
      .then(() => {
        res.sendStatus(200);
      })
      .catch((err) => {
        err.slice(0, 3) === '404' ? res.sendStatus(404) : res.sendStatus(500);
      });
  })

  //HTML File request
  app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../public/index.html'));
  });
}

// Allows the server to listen if it's in dev or prod, but not while testing
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
}

module.exports = app;
