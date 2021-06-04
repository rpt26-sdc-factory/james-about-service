const cassandra = require('cassandra-driver');

var keyspace = process.env.ABOUT_DATABASE.replace(/-/g, '__');

var client = new cassandra.Client({
  contactPoints: [process.env.CASSANDRA_CONTACTPOINT],
  localDataCenter: 'datacenter1',
  keyspace
});

var queries = {
  createTable: `CREATE TABLE IF NOT EXISTS courses (
    course_id bigint,
    recent_views int,
    description text,
    learner_career_outcomes map<text, float>,
    metadata map<text, text>,
    what_you_will_learn list<text>,
    skills_you_will_gain list<text>,
    PRIMARY KEY (course_id)
    )`,

  dropTable: `TRUNCATE Table courses`,

  insert: `INSERT INTO courses (
    course_id,
    recent_views,
    description,
    learner_career_outcomes,
    metadata,
    what_you_will_learn,
    skills_you_will_gain
    ) VALUES (?, ?, ?, ?, ?, ?, ?)`,

  getByID: `SELECT * FROM courses WHERE course_id = ?`,
  update: {
    recent_views: 'UPDATE courses SET recent_views = ? WHERE course_id = ? IF EXISTS',
    description: 'UPDATE courses SET description = ? WHERE course_id = ? IF EXISTS',
    learner_career_outcomes: 'UPDATE courses SET learner_career_outcomes = ? WHERE course_id = ? IF EXISTS',
    metadata: 'UPDATE courses SET metadata = ? WHERE course_id = ? IF EXISTS',
    what_you_will_learn: 'UPDATE courses SET what_you_will_learn = ? WHERE course_id = ? IF EXISTS',
    skills_you_will_gain: 'UPDATE courses SET skills_you_will_gain = ? WHERE course_id = ? IF EXISTS',
  },
  deleteByID: 'DELETE FROM courses WHERE course_id = ?'
};

module.exports = {keyspace, client, queries};


//createKeyspace: `CREATE KEYSPACE ${keyspace} WITH REPLICATION = {'class': 'SimpleStrategy', 'replication_factor': 1}`,