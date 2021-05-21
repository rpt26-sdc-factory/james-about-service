const DBManager = require('./DBManager');
var emptypromise = new Promise(resolve => resolve());

module.exports = class MongoManager extends DBManager {
  constructor() {
    super('mongo');
    this.connection = require('../../mongo/index');
    this.CourseModel = require('../../mongo/models/courseModel.js');
  }

  insertCourse(courseObj) {
    return this.connection.then(() => {
      return this.CourseModel.create(courseObj);
    }).catch((err) => {
      console.log('Error inserting course:', err);
    });
  }


  insertManyCourses(courseObjArr) {
    return this.connection.then(() => {
      return this.CourseModel.insertMany(courseObjArr);
    }).catch((err) => {
      console.log('Error inserting course:', err);
    });
  }


  getCourse(id) {
    return this.CourseModel.findOne({ course_id: id }).catch((err) => {
      console.err('MongoDB: Error getting course' + id + '.');
      console.err(err);
    });
  }


  updateCourse(id, updateObj) {
    //not implemented
    return emptypromise;

  }


  deleteCourse(id) {
    //not implemented
    return emptypromise;

  }


  deleteAllCourses() {
    super.deleteAllCourses();
    return this.connection.then(() => {
      return this.CourseModel.deleteMany({});
    }).catch((err) => {
      console.log('MongoDB: Error deleting all courses:', err);
    });
  }


  closeConnection() {
    super.closeConnection();
    //not implemented
    return emptypromise;

  }
}