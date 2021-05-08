const mongoose = require('mongoose');
const { descriptionSchema } = require('./db');

const Description = mongoose.model('Description', descriptionSchema);

module.exports = {
  getCourse: (id) => (
    new Promise((resolve, reject) => {
      Description.findOne({ course_id: id }, (err, doc) => {
        err ? reject(err) : resolve(doc);
      });
    })
  ),
  deleteCourse: (id) => (
    new Promise((resolve, reject) => {
      Description.findOneAndDelete({ course_id: id }, (err, doc) => {
        if (err) {
          reject(err);
        }
        doc ? resolve(doc) : reject(`404 Error: no course with id ${id} to delete.`);
      })
    })
  ),
  insertCourse: (courseObj) => (
    new Promise((resolve, reject) => {
      Description.findOne({course_id: courseObj.course_id}, (err, results) => {
        err ? reject(err) : null;
        if (results === null) {
          var x = new Description(courseObj);
          x.save((err) => {
            err ? reject(err) : resolve('Insert Success');
          });
        } else {
          reject(`Error: course_id ${courseObj.course_id} is in use.`);
        }
      })
    })
  ),
  updateCourse: (id, courseObj) => (
    new Promise((resolve, reject) => {
      Description.updateOne({course_id: id}, courseObj, (err, result) => {
        err ? reject(err) : resolve(result.n);
      })
    })
  )
};
