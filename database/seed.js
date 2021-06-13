const path = require('path');
require('../environments/envLoader.js');

const Course = require('./classes/Course.js');
const DBManager = require('./GetDBManager.js');
const Logger = require('../Logger');
const logger = new Logger('./logs/seeding/', 'latest.log', true);
const lbOptions = {width: 60, fillChar: '⋗', curChar: '⨠', emptyChar: '∞', precision: 1};

const dbs = process.env.NODE_ENV !== 'production' ?
  process.env.USE_DBS.split(',').map(dbString => { return DBManager(dbString); }) : [DBManager()];

if (!dbs.length) {
  throw ('No databases to seed. Cancelling seed.');
}

dbs.length > 1 ?
  logger.warn('Warning: DB Measurement times may not be completely accurate for more than one database.') : null;



Promise.all(dbs.map((db) => {
  return db.deleteAllCourses();
})).then(async () => {
  var start = Date.now();
  var cChunk = 0;
  var chunks = Math.ceil(parseInt(process.env.SEEDCOUNT) / parseInt(process.env.CHUNKSIZE));
  logger.time('Seed Timer');
  logger.time('Longest Seed Chunk took');

  var courses = [];
  var prom = new Promise((res) => {
    res()
  });

  logger.log('Seeding databases: ' + dbs.map(db => {
      return db.database;
    }).join(', ') +'...');

  for (var i = 1; i <= parseInt(process.env.SEEDCOUNT); i++) {
    let percent = i / parseInt(process.env.SEEDCOUNT);
    i <= process.env.CHUNKSIZE ?
    courses.push(new Course({ course_id: i, smallGen: false })) :
    courses.push(new Course({ course_id: i, smallGen: true }));

    if(! (i % Math.floor((parseInt(process.env.CHUNKSIZE) / 5)))) {
      Logger.printloadingBar(percent, lbOptions);
    }
    if (!(i % parseInt(process.env.CHUNKSIZE)) || i === parseInt(process.env.SEEDCOUNT)) {
      await prom;
      if (cChunk !== 0) {
        Logger.endLoadingBar();
        logger.log(`Complete insert for chunk ${cChunk} of ${chunks}. (${((cChunk / chunks) * 100).toFixed(2) * 1}%)`);
        Logger.printloadingBar(percent, lbOptions);


        if(!(cChunk % 5)) {
          var minutes = (Date.now() - start) / 1000 / 60;
          var estTime = (minutes / cChunk) * (chunks - cChunk);
          var totTime = ((minutes / cChunk) * chunks);

          Logger.endLoadingBar();
          logger.log('');
          minutes < 60 ?
            logger.log(`${cChunk} Chunk time:          ${minutes.toFixed(3) * 1} minutes.`):
            logger.log(`${cChunk} Chunk time:          ${(minutes/60).toFixed(3) * 1} hours.`);

          estTime < 60 ?
            logger.log(`Estimated remaining seed time: ${estTime.toFixed(3) * 1} minutes.`):
            logger.log(`Estimated remaining seed time: ${(estTime/60).toFixed(3) * 1} hours.`);

          totTime < 90 ?
            logger.log(`Estimated TOTAL seed time:     ${totTime.toFixed(3) * 1} minutes.`):
            logger.log(`Estimated TOTAL seed time:     ${(totTime/60).toFixed(3) * 1} hours.`);

          Logger.printloadingBar(percent, lbOptions);
        }

        Logger.endLoadingBar();
        logger.log('');
        logger.timeEnd('Longest Seed Chunk took');
        logger.time('Longest Seed Chunk took');
        logger.log('------------------------------------------\n');
        Logger.printloadingBar(percent, lbOptions);

      }

      cChunk++;

      dbs.forEach(db => {
        logger.time(db.database + ' Seed Chunk took');
      });

      process.env.CHUNKSIZE !== '1' ?
        prom = Promise.all(dbs.map((db) => {
          return db.insertManyCourses(courses).then(() => {
            Logger.endLoadingBar();
            logger.log('');
            logger.log(db.database + ' completed insert.');
            logger.timeEnd(db.database + ' Seed Chunk took');
            Logger.printloadingBar(percent, lbOptions);
          });
        })) : prom = Promise.all(dbs.map((db) => {
          return db.insertCourse(courses[0]).then(() => {
            Logger.endLoadingBar();
            logger.log('');
            logger.log(db.database + ' completed insert.');
            logger.timeEnd(db.database + ' Seed Chunk took');
            Logger.printloadingBar(percent, lbOptions);
          });

        }))
      courses = undefined;
      courses = [];
    }
  }
  Logger.endLoadingBar();
  return prom;
}).then(async () => {
  logger.log('\n\n------------------------------------------');
  logger.log('Seed complete!');
  logger.log('Inserted', process.env.SEEDCOUNT, 'records');
  logger.timeEnd('Seed Timer');
  await logger.log('------------------------------------------\n\n');
  await Promise.all(dbs.map(db => {
    return db.closeConnection();
  }))
  process.exit(0);
});
