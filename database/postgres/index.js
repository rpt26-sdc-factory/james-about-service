const { Pool } = require('pg');

var pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.ABOUT_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', client, err);
});

var queries = {
  insert: {
    name: 'insertCourse',
    text: `INSERT INTO courses(
      course_id,
      recent_views,
      description,
      learner_career_outcomes,
      metadata,
      what_you_will_learn,
      skills_you_will_gain)
      VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
    converter: (c) => {
      return [
        c.course_id,
        c.recent_views,
        c.description,
        JSON.stringify(c.learner_career_outcomes),
        JSON.stringify(c.metadata),
        JSON.stringify(c.what_you_will_learn),
        JSON.stringify(c.skills_you_will_gain)
      ];
    }
  },
  getByID:  {
    name: 'getCourseByID',
    text: 'SELECT * FROM courses WHERE course_id = $1',
    converter: (results) => {
      console.log(results);
      console.log(JSON.parse(results));
    }
  },
  update: {
    recent_views: 'UPDATE courses SET recent_views = $1 WHERE course_id = $2',
    description: 'UPDATE courses SET description = $1 WHERE course_id = $2',
    learner_career_outcomes: 'UPDATE courses SET learner_career_outcomes = $1 WHERE course_id = $2',
    metadata: 'UPDATE courses SET metadata = $1 WHERE course_id = $2',
    what_you_will_learn: 'UPDATE courses SET what_you_will_learn = $1 WHERE course_id = $2',
    skills_you_will_gain: 'UPDATE courses SET skills_you_will_gain = $1 WHERE course_id = $2',
  },
  delete: {
    name: 'deleteByID',
    text: 'DELETE FROM courses WHERE course_id = $1'
  },
  deleteAll: {
    name: 'deleteAll',
    text: 'TRUNCATE courses'
  }
};



module.exports = { pool, queries };