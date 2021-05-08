const faker = require('faker');

const genLangs = () => {
  const languages = [
    'Arabic',
    'French',
    'Portuguese (European)',
    'Chinese (Simplified)',
    'Italian',
    'Vietnamese',
    'German',
    'Russian',
    'English',
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
  languages.forEach((lang) => {
    lang !== 'English' ?
      (Math.random() < .15 ? usedLangs.push( Math.floor(Math.random() * languages.length)) : null) :
      usedLangs.push(lang);
  });
  return usedLangs;
}
const genRecentViews = () => {
  return Math.floor(Math.random() * 100000000) + 60000;
};
const genDescription = () => {
  return faker.lorem.paragraphs(4);
};
const genOutcomes = () => {
  return [
    {
      icon: 'careerDirectionSVG',
      pct: Math.random(),
      outcome: 'started a new career after completing these courses',
    },
    {
      icon: 'careerBenefitSVG',
      pct: Math.random(),
      outcome: 'got a tangible career benefit from this course',
    },
    {
      icon: 'careerPromotionSVG',
      pct: Math.random(),
      outcome: 'got a pay increase or promotion',
    },
  ];
};
const genMetadata = () => {
  return [
    {
      icon: 'sharableCertificateSVG',
      title: 'Shareable Certificate',
      subtitle: 'Earn a Certificate upon completion',
    },
    {
      icon: 'onlineSVG',
      title: '100% online',
      subtitle: 'Start instantly and learn at your own schedule',
    },
    {
      icon: 'deadlinesSVG',
      title: 'Flexible Deadlines',
      subtitle: 'Reset deadlines in accordance to your schedule',
    },
    {
      icon: 'hoursSVG',
      title: `Approx. ${Math.floor(Math.random() * 180) + 20} hours to complete`,
      subtitle: '',
    },
    {
      icon: 'languagesSVG',
      title: 'English',
      subtitle: genLangs(),
    },
  ];
};
const genLearning = () => {
  return [
    faker.lorem.sentences(2),
    faker.lorem.sentences(2),
    faker.lorem.sentences(2),
    faker.lorem.sentences(2),
  ]
};
const genSkills = () => {
  var skills = [];
  const sCount = Math.floor(Math.random() * 10);

  for (let i = 0; i < sCount; i++) {
    var skill = faker.lorem.words(Math.floor(Math.random() * 2) + 2);
    skills.push(skill);
  }
  return skills;
};

class Course {
  constructor(options = {}) {
    options.recent_views ? this.recent_views = options.recent_views : this.recent_views = genRecentViews();
    options.description ? this.description = options.description : this.description = genDescription();
    options.learner_career_outcomes ? this.learner_career_outcomes = options.learner_career_outcomes : this.learner_career_outcomes = genOutcomes();
    options.metadata ? this.metadata = options.metadata : this.metadata = genMetadata();
    options.what_you_will_learn ? this.what_you_will_learn = options.what_you_will_learn : this.what_you_will_learn = genLearning();
    options.skills_you_will_gain ? this.skills_you_will_gain = options.skills_you_will_gain : this.skills_you_will_gain = genSkills();
  }
}

module.exports = Course;