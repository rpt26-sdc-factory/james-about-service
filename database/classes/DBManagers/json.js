const DBManager = require('./DBManager');
const path = require('path');
const fs = require('fs');

module.exports = class JSONManager extends DBManager {
  constructor() {
    super('json');

    this.filepath = './database/json/' + process.env.ABOUT_DATABASE + '.db.json';
    this.connection = new Promise((resolve) => {
      this.write = (string) => {
        return new Promise((resolve, reject) => {
          fs.appendFile(path.resolve(this.filepath), string, (err) => {
            err ? reject(err) : resolve('wroteString');
          });
        });
      };
      resolve('json');
    });
  }

  insertCourse(courseObj) {
    return this.connection.then(() => {
      return (new Promise((resolve, reject) => {
        fs.access(this.filepath, (err) => {
          err ? reject(err) : resolve(this.filepath);
        })
      })
        .then(() => {
          return ',' + JSON.stringify(courseObj);
        })
        .catch(() => {
          return '[' + JSON.stringify(courseObj);
        })).then((data) => {
          return this.write(data);
        });
    });
  }


  insertManyCourses(courseObjArr) {
    return this.connection.then(() => {
      return (new Promise((resolve, reject) => {
        fs.access(this.filepath, (err) => {
          err ? reject(err) : resolve(this.filepath);
        });
      })
        .then(() => {
          return ',' + JSON.stringify(courseObjArr).slice(1, -1);
        })
        .catch(() => {
          return JSON.stringify(courseObjArr).slice(0, -1);
        })).then((data) => {
          return this.write(data);
        });
    });
  }


  getCourse(id) {
    return new Promise((resolve, reject) => {
      var err = 'Cannot get records from json.';
      console.err(err);
      reject(err);
    });
  }


  updateCourse(id, updateObj) {
    return new Promise((resolve, reject) => {
      var err = 'Cannot update records in json.';
      console.err(err);
      reject(err);
    });
  }


  deleteCourse(id) {
    return new Promise((resolve, reject) => {
      var err = `Cannot delete individual records from json.
                Delete all Records instead.`;
      console.warn(err);
      reject(err);
    });
  }


  deleteAllCourses() {
    super.deleteAllCourses();
    return new Promise((resolve, reject) => {
      fs.unlink(this.filepath, (err) => {
        err ? reject(err) : resolve('All json records deleted.');
        return;
      })
    }).catch((err) => {
      console.warn(`JSON: Error deleting all records. File likely didn't exist to begin with.`);
    });
  }


  closeConnection() {
    super.closeConnection();
    return this.write(']').then(() => {
      console.log('json write complete');
    });
  }
}
