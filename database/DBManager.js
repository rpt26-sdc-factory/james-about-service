const path = require('path');
const fs = require('fs');
const _ = require('underscore');
const wait = (time) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  })
}


class DBManager {
  constructor(db = 'mongo') {
    this.database = db;
    this.mongo = {};
    this.cassandra = {};
    this.postgres = {};
    this.mysql = {};
    this.json = {};
    this.connection;

    switch(this.database) {
      case 'mongo':
      default:
        //Mongo interaction Code goes here
        this.connection = require('./mongo/index');
        this.mongo.CourseModel = require('./mongo/models/courseModel.js');
        break;

      case 'postgres':
        //Postgres interaction code goes here
        this.connection = new Promise((r) => {r()});
        break;

      case 'cassandra':
        //Cassandra interaction code goes here
        this.cassandra = require('./cassandra/index');
        this.cassandra.sRequests = 0;
        this.connection = this.cassandra.client.connect()
          .then(this.cassandra.client.execute(this.cassandra.queries.createTable));
        break;

      case 'mysql':
        //mysql interaction code goes here
        this.connection = new Promise((r) => {r()});
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
    switch(this.database) {
      case 'mongo':
      default:
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
          return new Promise(async (resolve, reject) => {
            while(true) {
              try {
                await this.cassandra.client.execute(this.cassandra.queries.insert, courseObj, {prepare: true});
                resolve();
              } catch (error) {
                await wait(50);
              };
            }
          });
        });
        break;

      case 'mysql':
        //mysql interaction code goes here
        break;

      case 'json':
        //JSON interaction code goes here
        return this.json.write(this.json.filepath, courseObj);
    }
    return new Promise((r) => {r()});
  };

  insertManyCourses(courseObjArr) {
    switch(this.database) {
      case 'mongo':
      default:
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
          curBatch.push({query: this.cassandra.queries.insert, params: courseObjArr.pop()});
          if (curBatch.length === 5 || courseObjArr.length === 0) {
            batches.push([...curBatch]);
            curBatch = [];
          }
        }

        return this.connection.then(() => {
          return Promise.allSettled(batches.map(batch => {
            return new Promise(async (resolve, reject) => {
              while(true) {
                try {
                  await this.cassandra.client.batch(batch, {prepare: true});
                  resolve();
                  return null;
                } catch (error) {
                  await wait(300);
                };
              }
            });
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
            return ',' + JSON.stringify(courseObjArr).slice(1,-1);
          })
          .catch(() => {
            return JSON.stringify(courseObjArr).slice(0,-1);
          })).then((data) => {
            return this.json.write(data);
          });
        });
    }
    return new Promise((r) => {r()});
  };

  getCourse(id) {
    switch(this.database) {
      case 'mongo':
      default:
        //Mongo interaction Code goes here
        return this.mongo.CourseModel.findOne({ course_id: id }).catch((err) => {
          console.err('MongoDB: Error getting course' + id +'.');
          console.err(err);
        });

      case 'postgres':
        //Postgres interaction code goes here
        break;

      case 'cassandra':
        //Cassandra interaction code goes here
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
    return new Promise((r) => {r()});
  };

  updateCourse() {
    switch(this.database) {
      case 'mongo':
      default:
        //Mongo interaction Code goes here
        break;

      case 'postgres':
        //Postgres interaction code goes here
        break;

      case 'cassandra':
        //Cassandra interaction code goes here
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
    return new Promise((r) => {r()});
  };

  deleteCourse() {
    switch(this.database) {
      case 'mongo':
      default:
        //Mongo interaction Code goes here
        break;

      case 'postgres':
        //Postgres interaction code goes here
        break;

      case 'cassandra':
        //Cassandra interaction code goes here
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
    return new Promise((r) => {r()});
  };

  deleteAllCourses() {
    console.log('Deleting all courses in ' +  this.database +' database!');
    switch(this.database) {
      case 'mongo':
      default:
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
    switch(this.database) {
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