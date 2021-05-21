const path = require('path');
require(path.join(__dirname, "..", 'environments', 'envLoader.js'));

const Course = require('./classes/Course.js');
const DBManager = require('./GetDBManager.js');

const dbs = process.env.NODE_ENV !== 'production' ?
  process.env.USE_DBS.split(',').map(dbString => { return DBManager(dbString); }) : [DBManager()];

if (!dbs.length) {
  throw ('No databases to seed. Cancelling seed.');
}

dbs.length > 1 ?
  console.warn('Warning: DB Measurement times may not be completely accurate for more than one database.') : null;


Promise.all(dbs.map((db) => {
  return db.deleteAllCourses();
})).then(async () => {
  var start = Date.now();
  var cChunk = 0;
  var chunks = Math.ceil(parseInt(process.env.SEEDCOUNT) / parseInt(process.env.CHUNKSIZE));
  console.time('Seed Timer');
  console.time('Longest Seed Chunk took');

  var courses = [];
  var prom = new Promise((res) => {
    res()
  });

  for (var i = 1; i <= parseInt(process.env.SEEDCOUNT); i++) {
    i <= process.env.CHUNKSIZE ?
      courses.push(new Course({ course_id: i, smallGen: false })) :
      courses.push(new Course({ course_id: i, smallGen: true }));

    if (!(i % parseInt(process.env.CHUNKSIZE)) || i === parseInt(process.env.SEEDCOUNT)) {
      await prom;
      if (cChunk !== 0) {
        console.log(`Complete insert for chunk ${cChunk} of ${chunks}. (${Math.round(((cChunk / chunks) * 100) * 100) / 100}%)`);
        !(cChunk % 10) ? console.log(`${cChunk} Chunk time: ${(Date.now() - start) / 1000 / 60} minutes.`) : null;
        dbs.forEach(db => {
          console.time(db.database + ' Seed Chunk took');
        })
        console.log('');
        console.timeEnd('Longest Seed Chunk took');
        console.time('Longest Seed Chunk took');
        console.log('------------------------------------------\n');
      }

      cChunk++;

      process.env.CHUNKSIZE !== '1' ?
        prom = Promise.all(dbs.map((db) => {
          return db.insertManyCourses(courses).then(() => {
            console.log('');
            console.log(db.database + ' completed insert.');
            console.timeEnd(db.database + ' Seed Chunk took');
          });
        })) : prom = Promise.all(dbs.map((db) => {
          return db.insertCourse(courses[0]).then(() => {
            console.log('');
            console.log(db.database + ' completed insert.');
            console.timeEnd(db.database + ' Seed Chunk took');
          });
        }))
      courses = undefined;
      courses = [];
    }
  }
  return prom;
}).then(async () => {
  console.log('\n\n------------------------------------------');
  console.log('Seed complete!');
  console.log('Inserted', process.env.SEEDCOUNT, 'records');
  console.timeEnd('Seed Timer');
  console.log('------------------------------------------\n\n');
  await Promise.all(dbs.map(db => {
    return db.closeConnection();
  }))
  process.exit(0);
});
