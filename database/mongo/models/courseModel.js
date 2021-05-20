const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  course_id: {type: Number, index: true},
  recent_views: Number,
  description: String,
  learner_career_outcomes: {
    direction: Number,
    benefit: Number,
    promo: Number,
  },
  metadata: {
    hours: String,
    subtitles: String
  },
  what_you_will_learn: [{
    type: String,
  }],
  skills_you_will_gain: [{
    type: String,
  }],
});

const CourseModel = mongoose.model('Courses', courseSchema);
module.exports = CourseModel;