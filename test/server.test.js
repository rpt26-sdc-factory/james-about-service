const request = require('supertest');
const app = require('../server/index');

describe('Server Configuration', () => {
  let server;
  beforeAll(async () => {
    server = await request(app);
  });

  describe('/api/about/:id route', () => {
    test('Should respond with a record from the database', (done) => {
      server
        .get('/api/about/9')
        .expect('Content-Type', /json/)
        .expect((res) => {
          expect(res.body.what_you_will_learn).toBeTruthy();
        })
        .expect(200, done);
    });
    test('Should respond with a 404 when the ID passed is not a number', (done) => {
      server
        .get('/api/about/not-a-number')
        .expect(404, done);
    });
    test('Should respond appropriately when a non-existent record is requested', (done) => {
      server
        .get('/api/about/15')
        .expect(404, done);
    });
    test('Should fail gracefully by serving index.html when an invalid route is requested', (done) => {
      server
        .get('/this/route/does/not/exist')
        .expect(200, done);
    });
    test('Should respond with 200 when requesting route /', (done) => {
      server
        .get('/')
        .expect(200)
        .end(done);
    });
    test(`Should respond with 201 when creating a record that doesn't already exist.`, (done) => {
      var testObj = {
        courseObj: {
          course_id: new Date().getTime(),
          recent_views: 1000,
          description: "This is an example course description, and I stand By it's quality. Really good",
          learner_career_outcomes: [
            {
              icon: "fa-map-signs",
              pct: 0.33,
              outcome: "started a new career after completing these courses"
            },
            {
              icon: "fa-briefcase",
              pct: 0.32,
              outcome: "got a tangible career benefit from this course"
            },
            {
              icon: "fa-money",
              pct: 0.12,
              outcome: "got a pay increase or promotion"
            }
          ],
          metadata: [
          {
            icon: "certificate",
            title: "Shareable Certificate",
            subtitle: "Earn a Certificate upon completion"
          },
          {
            icon: "globe",
            title: "100% online",
            subtitle: "Start instantly and learn at your own schedule"
          },
          {
            icon: "calendar",
            title: "Flexible deadlines",
            subtitle: "Reset deadlines in accordance to your schedule"
          },
          {
            icon: "clock",
            title: "Approx. 60 hours to complete",
            subtitle: ""
          },
          {
            icon: "speechbubble",
            title: "English",
            subtitle: "Subtitles: Arabic, French, Portuguese (European), Chinese (Simplified), Italian, Vietnamese, German, Russian, English, Hebrew, Spanish, Hindi, Japanese"
          }
          ],
          what_you_will_learn: [
          "Identify a subset of data needed from a column or set of columns and write a SQL query to limit to those results.",
          "U​se SQL commands to filter, sort, and summarize data.",
          "Create an analysis table from multiple queries using the UNION operator.",
          "Manipulate strings, dates, & numeric data using functions to integrate data from different sources into fields with the correct format for analysis."
          ],
          skills_you_will_gain: [
          "Logistic Regression",
          "Artificial Neural Network",
          "Machine Learning (ML) Algorithms",
          "Machine Learning"
          ]
        }
      }

      server
        .post('/api/about')
        .send(testObj)
        .expect(201)
        .end(done);
    });
    test(`Should respond with 400 when attemping to post record without course_id`, (done) => {
      var testObj = {
        courseObj: {
          recent_views: 1000,
          description: "This is an example course description, and I stand By it's quality. Really good",
          learner_career_outcomes: [
            {
              icon: "fa-map-signs",
              pct: 0.33,
              outcome: "started a new career after completing these courses"
            },
            {
              icon: "fa-briefcase",
              pct: 0.32,
              outcome: "got a tangible career benefit from this course"
            },
            {
              icon: "fa-money",
              pct: 0.12,
              outcome: "got a pay increase or promotion"
            }
          ],
          metadata: [
          {
            icon: "certificate",
            title: "Shareable Certificate",
            subtitle: "Earn a Certificate upon completion"
          },
          {
            icon: "globe",
            title: "100% online",
            subtitle: "Start instantly and learn at your own schedule"
          },
          {
            icon: "calendar",
            title: "Flexible deadlines",
            subtitle: "Reset deadlines in accordance to your schedule"
          },
          {
            icon: "clock",
            title: "Approx. 60 hours to complete",
            subtitle: ""
          },
          {
            icon: "speechbubble",
            title: "English",
            subtitle: "Subtitles: Arabic, French, Portuguese (European), Chinese (Simplified), Italian, Vietnamese, German, Russian, English, Hebrew, Spanish, Hindi, Japanese"
          }
          ],
          what_you_will_learn: [
          "Identify a subset of data needed from a column or set of columns and write a SQL query to limit to those results.",
          "U​se SQL commands to filter, sort, and summarize data.",
          "Create an analysis table from multiple queries using the UNION operator.",
          "Manipulate strings, dates, & numeric data using functions to integrate data from different sources into fields with the correct format for analysis."
          ],
          skills_you_will_gain: [
          "Logistic Regression",
          "Artificial Neural Network",
          "Machine Learning (ML) Algorithms",
          "Machine Learning"
          ]
        }
      }

      server
        .post('/api/about')
        .send(testObj)
        .expect(400)
        .end(done);
    });
    test(`Should respond with 204 when attempting to update record that exists`, (done) => {
      server
        .put('/api/about/1')
        .send({
          courseObj: {
            course_id: 1,
            recent_views: 1001,
            description: "This is a replacement example course description, and I stand By it's quality. Really good"
          }
        })
        .expect(204)
        .end(done);
    });
    test(`Should respond with 404 when attempting to update record that does not exist`, (done) => {
      server
      .put('/api/about/' + new Date().getTime())
      .send({
        courseObj: {
          course_id: 1,
          recent_views: 1001,
          description: "This is a replacement example course description, and I stand By it's quality. Really good"
        }
      })
      .expect(404)
      .end(done);
    });
    test(`Should respond with 200 when attempting to delete record that exists`, (done) => {
      server
      .delete('/api/about/1')
      .expect(200)
      .end(done);
    });
    test(`Should respond with 404 when attempting to delete a record that does not exist.`, (done) => {
      server
      .delete('/api/about/' + new Date().getTime())
      .expect(404)
      .end(done);
    })
  });

//  afterAll(async () => {
//    await db.close();
//  });
});
