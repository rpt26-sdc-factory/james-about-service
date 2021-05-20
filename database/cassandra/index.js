const cassandra = require('cassandra-driver');
console.error('CASSANDRA PERFORMANCE IS TERRIBLE, BE WARNED');

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

  dropTable: `DROP Table courses`,

  //createKeyspace: `CREATE KEYSPACE ${keyspace} WITH REPLICATION = {'class': 'SimpleStrategy', 'replication_factor': 1}`,

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
  updateByID: '',
  deleteByID: ''
};

module.exports = {keyspace, client, queries};