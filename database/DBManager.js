const path = require('path');
const fs = require('fs');
const _ = require('underscore');
const wait = (time) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  })
}

//for when failure is not an option
const retryUntilSuccess = async (delay, asyncFunction, ...args) => {
  return new Promise(async (resolve) => {
    while (true) {
      try {
        var x = await asyncFunction(...args);
        resolve(x);
        return null;
      } catch (e) {
        console.log(e);
        await new Promise((resolve) => {
          setTimeout(resolve, delay);
        });
      }
    }
  })
};


class DBManager {
  constructor(db) {

    if(!db) {
      try {
        db = process.env.USE_DBS.split(',')[0];
      } catch (e) {
        throw('No DB for DBManager selected or found in environment variable!');
      }
    }

    console.log(`Created ${db} manager.`);

    this.database = db;
    this[db] = {};
    this.connection;

    switch (this.database) {
      case 'mongo':
        //Mongo interaction Code goes here
        this.connection = require('./mongo/index');
        this.mongo.CourseModel = require('./mongo/models/courseModel.js');
        break;

      case 'postgres':
        //Postgres interaction code goes here
        this.connection = new Promise((r) => { r() });
        break;

      case 'cassandra':
        //Cassandra interaction code goes here
        this.cassandra = require('./cassandra/index');
        this.connection = this.cassandra.client.connect()
          .then(this.cassandra.client.execute(this.cassandra.queries.createTable));
        break;

      case 'mysql':
        //mysql interaction code goes here
        this.connection = new Promise((r) => { r() });
        break;

      case 'json':
        //JSON interaction code goes here
        this.json.filepath = './database/json/' + process.env.ABOUT_DATABASE + '.db.json';
        this.connection = new Promise((resolve) => {
          this.json.write = (string) => {
            return new Promise((resolve, reject) => {
              fs.appendFile(path.resolve(this.json.filepath), string, (err) => {
                err ? reject(err) : resolve('wroteString');
              });
            });
          };
          resolve('json');
        })
        break;
    }
  }

  insertCourse(courseObj) {
    switch (this.database) {
      case 'mongo':
        //Mongo interaction Code goes here
        return this.connection.then(() => {
          return this.mongo.CourseModel.create(courseObj);
        }).catch((err) => {
          console.log('Error inserting course:', err);
        })

      case 'postgres':
        //Postgres interaction code goes here
        break;

      case 'cassandra':
        //Cassandra interaction code goes here
        return this.connection.then(() => {
          return retryUntilSuccess(50, this.cassandra.client.execute.bind(this.cassandra.client), courseObj, { prepare: true });
        });
        break;

      case 'mysql':
        //mysql interaction code goes here
        break;

      case 'json':
        //JSON interaction code goes here
        return this.json.write(this.json.filepath, courseObj);
    }
    return new Promise((r) => { r() });
  };

  insertManyCourses(courseObjArr) {
    switch (this.database) {
      case 'mongo':
        //Mongo interaction Code goes here
        return this.connection.then(() => {
          return this.mongo.CourseModel.insertMany(courseObjArr);
        }).catch((err) => {
          console.log('Error inserting course:', err);
        });

      case 'postgres':
        //Postgres interaction code goes here
        break;

      case 'cassandra':
        //Cassandra interaction code goes here
        var batches = [];
        var curBatch = [];
        while (courseObjArr.length) {
          curBatch.push({ query: this.cassandra.queries.insert, params: courseObjArr.pop() });
          if (curBatch.length === 5 || courseObjArr.length === 0) {
            batches.push([...curBatch]);
            curBatch = [];
          }
        }

        return this.connection.then(() => {
          return Promise.all(batches.map(batch => {
            return retryUntilSuccess(300, this.cassandra.client.batch.bind(this.cassandra.client), batch, { prepare: true });
          }));
        });
        break;

      case 'mysql':
        //mysql interaction code goes here
        break;

      case 'json':
        //JSON interaction code goes here
        return this.connection.then(() => {
          return (new Promise((resolve, reject) => {
            fs.access(this.json.filepath, (err) => {
              err ? reject(err) : resolve(this.json.filepath);
            })
          })
            .then(() => {
              return ',' + JSON.stringify(courseObjArr).slice(1, -1);
            })
            .catch(() => {
              return JSON.stringify(courseObjArr).slice(0, -1);
            })).then((data) => {
              return this.json.write(data);
            });
        });
    }
    return new Promise((r) => { r() });
  };

  getCourse(id) {
    switch (this.database) {
      case 'mongo':
        //Mongo interaction Code goes here
        return this.mongo.CourseModel.findOne({ course_id: id }).catch((err) => {
          console.err('MongoDB: Error getting course' + id + '.');
          console.err(err);
        });

      case 'postgres':
        //Postgres interaction code goes here
        break;

      case 'cassandra':
        //Cassandra interaction code goes here
        return this.connection.then(() => {
          return this.cassandra.client.execute(this.cassandra.queries.getByID, [id + ''], { prepare: true });
        });
        break;

      case 'mysql':
        //mysql interaction code goes here
        break;

      case 'json':
        return new Promise((resolve, reject) => {
          var err = 'Cannot get records from json.';
          console.err(err);
          reject(err);
        });
    }
    return new Promise((r) => { r() });
  };

  updateCourse(id, updateObj) {
    switch (this.database) {
      case 'mongo':
        //Mongo interaction Code goes here
        break;

      case 'postgres':
        //Postgres interaction code goes here
        break;

      case 'cassandra':
        //Cassandra interaction code goes here
        return Promise.all(Object.keys(updateObj).map(key => {
          return retryUntilSuccess(50, this.cassandra.client.execute.bind(this.cassandra.client), this.cassandra.queries.update[key], [updateObj[key], id], { prepare: true });
        })).then((results) => {
          return results[0].rows[0]['[applied]'];
        });
        break;

      case 'mysql':
        //mysql interaction code goes here
        break;

      case 'json':
        return new Promise((resolve, reject) => {
          var err = 'Cannot update records in json.';
          console.err(err);
          reject(err);
        });
    }
    return new Promise((r) => { r() });
  };

  deleteCourse(id) {
    switch (this.database) {
      case 'mongo':
        //Mongo interaction Code goes here
        break;

      case 'postgres':
        //Postgres interaction code goes here
        break;

      case 'cassandra':
        //Cassandra interaction code goes here
        return this.connection.then(() => {
          return this.cassandra.client.execute(this.cassandra.queries.deleteByID, [id + ''], { prepare: true }).then((results) => {
            console.log(results);
          });
        });
        break;

      case 'mysql':
        //mysql interaction code goes here
        break;

      case 'json':
        return new Promise((resolve, reject) => {
          var err = `Cannot delete individual records from json.
                    Delete all Records instead.`;
          console.warn(err);
          reject(err);
        });
    }
    return new Promise((r) => { r() });
  };

  deleteAllCourses() {
    console.log('Deleting all courses in ' + this.database + ' database!');
    switch (this.database) {
      case 'mongo':
        //Mongo interaction Code goes here
        return this.connection.then(() => {
          return this.mongo.CourseModel.deleteMany({});
        }).catch((err) => {
          console.log('MongoDB: Error deleting all courses:', err);
        })
        break;

      case 'postgres':
        //Postgres interaction code goes here
        break;

      case 'cassandra':
        //Cassandra interaction code goes here
        return this.connection.then(() => {
          return this.cassandra.client.execute(this.cassandra.queries.dropTable).catch(() => {
            console.log('CassandraDB: Error Dropping courses table...');
            console.log('table may not have existed.');
          })
        }).then(() => {
          return this.cassandra.client.execute(this.cassandra.queries.createTable);
        })
        break;

      case 'mysql':
        //mysql interaction code goes here
        break;

      case 'json':
        return new Promise((resolve, reject) => {
          fs.unlink(this.json.filepath, (err) => {
            err ? reject(err) : resolve('All json records deleted.');
            return;
          })
        }).catch((err) => {
          console.warn(`JSON: Error deleting all records. File likely didn't exist to begin with.`);
        });
    }
  };

  closeConnection() {
    switch (this.database) {
      case 'mongo':
      default:
        //Mongo interaction Code goes here
        break;

      case 'postgres':
        //Postgres interaction code goes here
        break;

      case 'cassandra':
        //Cassandra interaction code goes here
        return this.cassandra.client.shutdown();
        break;

      case 'mysql':
        //mysql interaction code goes here
        break;

      case 'json':
        //json interaction code goes here
        return this.json.write(']').then(() => {
          console.log('json write complete');
        });
        break;
    }
  }
}

module.exports = DBManager;