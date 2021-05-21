const DBManager = require('../classes/DBManager');
const retryUntilSuccess = require('./retry');

module.exports = class CassandraManager extends DBManager {
  constructor() {
    super('cassandra');

    var temp = require('.');
    this.client = temp.client;
    this.queries = temp.queries;
    this.keyspace = temp.keyspace;
    temp = undefined;

    this.connection = this.client.connect()
      .catch((error) => {
        console.error('Could not connect to cassandra!\n', error);
      })
      .then(this.client.execute(this.queries.createTable));
  }


  insertCourse(courseObj) {
    return this.connection.then(() => {
      return retryUntilSuccess(50, this.client.execute.bind(this.client), this.queries.insert, courseObj, { prepare: true });
    });
  }


  insertManyCourses(courseObjArr) {
    var batches = [];
    var curBatch = [];
    for (var i = 0; i < courseObjArr.length; i++) {
      curBatch.push({ query: this.queries.insert, params: courseObjArr[i] });
      if (curBatch.length === 5 || i === courseObjArr.length - 1) {
        batches.push([...curBatch]);
        curBatch = [];
      }
    }

    return this.connection.then(() => {
      return Promise.all(batches.map(batch => {
        return retryUntilSuccess(300, this.client.batch.bind(this.client), batch, { prepare: true });
      }));
    });
  }


  getCourse(id) {
    return this.connection.then(() => {
      return this.client.execute(this.queries.getByID, [id + ''], { prepare: true });
    });
  }


  updateCourse(id, updateObj) {
    return Promise.all(Object.keys(updateObj).map(key => {
      return retryUntilSuccess(50, this.client.execute.bind(this.client), this.queries.update[key], [updateObj[key], id], { prepare: true });
    })).then((results) => {
      return results[0].rows[0]['[applied]'];
    });
  }


  deleteCourse(id) {
    return this.connection.then(() => {
      return this.client.execute(this.queries.deleteByID, [id + ''], { prepare: true }).then((results) => {
        console.log(results);
      });
    });
  }


  deleteAllCourses() {
    super.deleteAllCourses();
    return this.connection.then(() => {
      return this.client.execute(this.queries.dropTable).catch(() => {
        console.log('CassandraDB: Error Dropping courses table...');
        console.log('table may not have existed.');
      })
    }).then(() => {
      return this.client.execute(this.queries.createTable);
    });
  }


  closeConnection() {
    super.closeConnection();
    return this.client.shutdown();
  }
}
