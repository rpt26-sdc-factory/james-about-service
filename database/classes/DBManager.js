module.exports = class DBManager {
  constructor(db) {
    this.database = db;
    this.connection;
    console.log(`Created ${db} Manager`);
  }
  deleteAllCourses() {
    console.log(`Deleting all courses in ${this.database} database!`);
  }
  closeConnection() {
    this.connection = new Promise((resolve, reject) => {
      reject(`${this.database} Connection Closed`);
    }).catch((e) => {console.log(e)});
  }
}