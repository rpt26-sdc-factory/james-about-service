const faker = require('faker');

const genLangs = (smallGen = false) => {
  const languages = [
    'Arabic',
    'French',
    'Portuguese (European)',
    'Chinese (Simplified)',
    'Italian',
    'Vietnamese',
    'German',
    'Russian',
    'Hebrew',
    'Spanish',
    'Hindi',
    'Japanese',
    'Turkish',
    'Gujarati',
    'Polish',
    'Persian',
    'Kannada',
    'Romanian',
  ];
  var usedLangs = [];
  if (smallGen) {
    usedLangs.push(languages[Math.floor(Math.random() * (languages.length - 1)) + 1]);
  } else {
    languages.forEach((lang) => {
        Math.random() < .05 ? usedLangs.push(languages[Math.floor(Math.random() * languages.length)]) : null;
    });
  }
  return usedLangs;
}
const genRecentViews = () => {
  return Math.floor(Math.random() * 100000000) + 60000;
};
const genDescription = (smallGen = false) => {
  return smallGen ? faker.lorem.paragraphs(1) : faker.lorem.paragraphs(4);
};
const genOutcomes = (smallGen = false) => {
  return {
    direction: Math.floor(Math.random()*100) / 100,
    benefit: Math.floor(Math.random()*100) / 100,
    promo: Math.floor(Math.random()*100) / 100
  }
};
const genMetadata = (smallGen = false) => {
  return {
    hours: (Math.floor(Math.random() * 180) + 20) + '',
    subtitles: genLangs(smallGen).join(', ')
  };

};
const genLearning = (smallGen = false) => {
  return smallGen ? [
    faker.lorem.sentences(1)
  ] : [
    faker.lorem.sentences(2),
    faker.lorem.sentences(2),
    faker.lorem.sentences(2),
    faker.lorem.sentences(2),
  ]
};
const genSkills = (smallGen = false) => {
  var skills = [];
  var sCount;
  smallGen ? sCount = 1: sCount = Math.floor(Math.random() * 10);

  for (let i = 0; i < sCount; i++) {
    var skill = faker.lorem.words(Math.floor(Math.random() * 2) + 2);
    skills.push(skill);
  }
  return skills;
};

class Course {
  constructor(options = {}) {
    options.course_id !== undefined               ? this.course_id = options.course_id : this.course_id = 0;
    options.recent_views !== undefined            ? this.recent_views = options.recent_views : this.recent_views = genRecentViews(options.smallGen);
    options.description !== undefined             ? this.description = options.description : this.description = genDescription(options.smallGen);
    options.learner_career_outcomes !== undefined ? this.learner_career_outcomes = options.learner_career_outcomes : this.learner_career_outcomes = genOutcomes(options.smallGen);
    options.metadata !== undefined                ? this.metadata = options.metadata : this.metadata = genMetadata(options.smallGen);
    options.what_you_will_learn !== undefined     ? this.what_you_will_learn = options.what_you_will_learn : this.what_you_will_learn = genLearning(options.smallGen);
    options.skills_you_will_gain  !== undefined   ? this.skills_you_will_gain = options.skills_you_will_gain : this.skills_you_will_gain = genSkills(options.smallGen);
  }
}

module.exports = Course;