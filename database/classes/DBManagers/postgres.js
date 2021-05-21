const DBManager = require('./DBManager');
var emptypromise = new Promise(resolve => resolve());


module.exports = class PostgresManager extends DBManager {
  constructor() {
    super('postgres');
  }

  insertCourse(courseObj) {
    //not implemented
    return emptypromise;

  }


  insertManyCourses(courseObjArr) {
    //not implemented
    return emptypromise;

  }


  getCourse(id) {
    //not implemented
    return emptypromise;

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
    //not implemented
    return emptypromise;

  }


  closeConnection() {
    super.closeConnection();
    //not implemented
    return emptypromise;

  }
}
