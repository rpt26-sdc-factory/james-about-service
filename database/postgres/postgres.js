const { client } = require('../cassandra');
const DBManager = require('../classes/DBManager');
var emptypromise = new Promise(resolve => resolve());


module.exports = class PostgresManager extends DBManager {
  constructor() {
    super('postgres');
    var temp = require('.');
    this.pool = temp.pool;
    this.queries = temp.queries;
    temp = undefined;
    this.connection = this.pool.connect();
  }

  insertCourse(courseObj) {
    return this.connection.then(() => {
      return this.pool.query({
        name: this.queries.insert.name,
        text: this.queries.insert.text,
        values: this.queries.insert.converter(courseObj)
      });
    });

  }


  insertManyCourses(courseObjArr) {
    return Promise.all(courseObjArr.map((courseObj) => {
      return this.insertCourse(courseObj);
    }));
  }


  getCourse(id) {
    return this.pool.query({
      name: this.queries.getByID.name,
      text: this.queries.getByID.text,
      values: [id]
    }).then(results => {
      var obj = results.rows[0];
      obj.learner_career_outcomes = JSON.parse(obj.learner_career_outcomes);
      obj.metadata = JSON.parse(obj.metadata);
      obj.what_you_will_learn = JSON.parse(obj.what_you_will_learn);
      obj.skills_you_will_gain = JSON.parse(obj.skills_you_will_gain);
      return obj;
    });
  }


  updateCourse(id, updateObj) {
    return Promise.all(Object.keys(updateObj).map(key => {
      return this.pool.query({
        name: 'update' + key,
        text: this.queries.update[key],
        values: [updateObj, id]
      });
    }));
  }


  deleteCourse(id) {
    return this.pool.query({
      name: this.queries.delete.name,
      text: this.queries.delete.text,
      values: [id]
    });
  }


  deleteAllCourses() {
    super.deleteAllCourses();
    return this.pool.query({
      name: this.queries.deleteAll.name,
      text: this.queries.deleteAll.text,
    });
  }


  closeConnection() {
    super.closeConnection();
    return this.pool.query('SELECT NOW()', (err, res) => {
      console.log(err, res);
      this.pool.end();
    })
}
}
