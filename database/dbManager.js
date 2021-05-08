

class DBManager {
  constructor(db) {
    this.database = db;
  }

  insertCourse() {
    switch(this.database) {
      case 'mongo':
      default:
        break;
      case 'postgres':
        break;
      case 'cassandra':
        break;
    }
  };
  getCourse() {
    switch(this.database) {
      case 'mongo':
      default:
        break;
      case 'postgres':
        break;
      case 'cassandra':
        break;
    }
  };
  updateCourse() {
    switch(this.database) {
      case 'mongo':
      default:
        break;
      case 'postgres':
        break;
      case 'cassandra':
        break;
    }
  };
  deleteCourse() {
    switch(this.database) {
      case 'mongo':
      default:
        break;
      case 'postgres':
        break;
      case 'cassandra':
        break;
    }
  };
}