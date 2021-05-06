// Combined into a single file here to make testing more consistent
// Allows testing the seed functions without the database
const path = require('path');
require(path.join(__dirname, "..", 'environments', 'envLoader.js'));

const mongoose = require('mongoose');
const { seedDatabase } = require('./seedFunctions');
const { descriptionSchema, dbConnectionPromise } = require('./db.js');

const Description = mongoose.model('Description', descriptionSchema);
const seedExec = () => {
  seedDatabase(Description).then(() => {
    process.exit(0);
  });
};

dbConnectionPromise.then(() => {
  if ( process.env.NODE_ENV === 'test') {
    new Promise((resolve, reject) => {
      Description.deleteMany({}, (err, res) => {
        err ? reject(err) : resolve(res);
      }).then(() => {
        seedExec();
      }).catch((err) => {
        console.error(err);
      })
    })
  } else {
    seedExec();
  }
});