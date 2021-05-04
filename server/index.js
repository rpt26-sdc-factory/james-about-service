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
const dbManager = require('../database/model');

//Register Middleware
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('./public'));

{ //Routes
  //Create
  app.post('/api/about', (req, res) => {
    if(req.body.courseObj.course_id !== undefined) {
      dbManager.insertCourse(req.body.courseObj)
        .then((data) => {
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
    dbManager.getCourse(req.params.id)
      .then((data) => {
        if (!data) {
          res.sendStatus(404);
        } else {
          res.send(data).status(200);
        }
      })
      .catch(() => {
        res.sendStatus(404);
      });
  });

  //Update
  app.put('/api/about/:id', (req, res) => {
    dbManager.updateCourse(req.params.id, req.body.courseObj)
      .then((modCount) => {
        modCount ? res.sendStatus(204) : res.sendStatus(404);
      })
      .catch((err) => {
        res.send(err);
      })
  });

  //Delete
  app.delete('/api/about/:id', (req, res) => {
    dbManager.deleteCourse(req.params.id)
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
if (process.env.ENVIRONMENT !== 'test') {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
}

module.exports = app;
