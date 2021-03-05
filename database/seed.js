const mongoose = require('mongoose');
const axios = require('axios');
const { descriptionSchema } = require('./db.js');

const Description = mongoose.model('Description', descriptionSchema);

const generateRandomPercentage = () => (Math.floor(Math.random() * 100) / 100);

const generateNumberWithinRange = (min, max) => (Math.floor(Math.random() * (max - min) + min));

const generateFillerText = async (options) => {
  let text;
  if (options.paras) {
    text = await axios.get(`https://baconipsum.com/api/?type=meat-and-filler&paras=${options.paras}&format=text`);
  } else if (options.sentences) {
    text = await axios.get(`https://baconipsum.com/api/?type=meat-and-filler&sentences=${options.sentences}&format=text`);
  }
  return text.data;
};

const generateLanguageList = () => {
  const chosenLanguages = [];
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
  const numberOfLangsToUse = generateNumberWithinRange(0, languages.length);
  for (let i = 0; i < numberOfLangsToUse; i++) {
    const randomLanguageIndex = generateNumberWithinRange(0, languages.length);
    chosenLanguages.push(languages.splice(randomLanguageIndex, 1)[0]);
  }
  return chosenLanguages;
};

const generateLearnerCareerOutcomes = () => {
  const outcomes = [
    {
      icon: 'fa-map-signs',
      pct: generateRandomPercentage(),
      outcome: 'started a new career after completing these courses',
    },
    {
      icon: 'fa-briefcase',
      pct: generateRandomPercentage(),
      outcome: 'got a tangible career benefit from this course',
    },
    {
      icon: 'fa-money',
      pct: generateRandomPercentage(),
      outcome: 'got a pay increase or promotion',
    },
  ];

  return outcomes;
};

const generateMetadata = () => {
  const randomHours = generateNumberWithinRange(20, 200);
  const subtitleLanguages = `Subtitles: ${generateLanguageList().join(', ')}`;
  const icons = [
    {
      icon: 'certificate',
      title: 'Shareable Certificate',
      subtitle: 'Earn a Certificate upon completion',
    },
    {
      icon: 'globe',
      title: '100% online',
      subtitle: 'Start instantly and learn at your own schedule',
    },
    {
      icon: 'calendar',
      title: 'Flexible Deadlines',
      subtitle: 'Reset deadlines in accordance to your schedule',
    },
    {
      icon: 'clock',
      title: `Approx. ${randomHours} hours to complete`,
      subtitle: '',
    },
    {
      icon: 'speechbubble',
      title: 'English',
      subtitle: subtitleLanguages,
    },
  ];
  return icons;
};

const generateWhatYouWillLearn = async () => {
  const whatYouWillLearn = [];
  for (let i = 0; i < 4; i++) {
    // eslint-disable-next-line no-await-in-loop
    const text = await generateFillerText({ sentences: 2 });
    whatYouWillLearn.push(text);
  }
  return whatYouWillLearn;
};

const generateSkillsYouWillGain = async () => {
  const skills = [];
  const numOfSkills = generateNumberWithinRange(0, 10);
  for (let i = 0; i < numOfSkills; i++) {
    // eslint-disable-next-line no-await-in-loop
    const skill = await generateFillerText({ sentences: 1 });
    skills.push(skill);
  }
  return skills;
};

const generateRecords = async () => {
  const records = [];
  for (let i = 1; i < 5; i++) {
    const item = {
      course_id: i, // 1 - 100
      recent_views: Math.floor(Math.random() * 1000000), // Random number between 0 and 1 million
      // eslint-disable-next-line no-await-in-loop
      description: await generateFillerText({ paras: 4 }), // Bacon ipsum - 4 paragraphs
      learner_career_outcomes: generateLearnerCareerOutcomes(),
      metadata: generateMetadata(),
      what_you_will_learn: generateWhatYouWillLearn(),
      skills_you_will_gain: generateSkillsYouWillGain(),
    };
    records.push(item);
  }
  return records;
};

const seedDatabase = async () => {
  const records = await generateRecords();
  Description.insertMany(records, (err, res) => {
    if (err) {
      console.error(err);
    } else {
      console.log(res);
    }
  });
};

// on setTimeout to allow database to fully connect
// generateWhatYouWillLearn();
// generateSkillsYouWillGain();
setTimeout(seedDatabase, 500);
