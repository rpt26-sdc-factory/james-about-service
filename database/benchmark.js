//Load environment
const path = require('path');
require(path.join(__dirname, "..", 'environments', 'envLoader.js'));

//Load classes
const Course = require('./classes/Course');
const DBManager = require('./DBManager');

//benchmarking functions
var courseGenerationBenchmark = () => {
  console.log('Peforming Data Generation Benchmark...');

  return new Promise((resolve) => {
    console.time('Generate 1');
    new Course({smallGen: true});
    console.timeEnd('Generate 1');

    console.time('Generate 10000000');
    console.time('Generate 1000000');
    console.time('Generate 100000');
    console.time('Generate 10000');
    console.time('Generate 1000');
    console.time('Generate 100');
    console.time('Generate 10');

    for(var i = 1; i <= 10000000; i++) {
      new Course({smallGen: true});
      switch(i) {
        case 10:
        case 100:
        case 1000:
        case 10000:
        case 100000:
        case 1000000:
        case 10000000:
          console.timeEnd('Generate '+i);
      }
    }

    resolve('Complete Data Generation Benchmark');
  })
}

var insertionBenchmark = () => {
  console.log('Peforming Insertion Benchmark...');
  return new Promise(async (resolve) => {
    //CONFIG+SETUP
    var f = true;
    const databases = process.env.USE_DBS.split('').map(db => {
      return new DBManager(db);
    });

    //ACTUAL INSERTION PROCESS
    var insert = (database) => {
      return new Promise(async (resolve, reject) => {
        f ? f = false : console.log('----------------------');
        const chunkSizes = [10, 50, 100, 500, 1000, 5000, 10000, 50000];

        await database.connection;
        console.log('Connected to Database', database.database+'.');
        await database.deleteAllCourses();
        console.log('Preparing to stress test...');

        var wait = new Promise((resolve) => {
          setTimeout(() => {
            resolve();
          }, 1000);
        });

        await wait;

        for (var j = 0; j < chunkSizes.length; j++) {
          var courses = [];
          for(var i = 1; i <= chunkSizes[j]; i++) {
            courses.push(new Course({smallGen: true, course_id: new Date().getTime()}));
            if (i === chunkSizes[j]) {
              console.time(`${database.database} ⟫ insert ${i}`);
              await database.insertManyCourses(courses).then((results) => {
                console.timeEnd(`${database.database} ⟫ insert ${i}`);
              }).catch((error) => {
                console.error(`${database.database} ⟫ insert ${i}: FAILURE.`);
              });
            }
          }
        }

        resolve();
      });
    }

    for(var db = 0; db < databases.length; db++) {
      await databases[db].connection;
    };
    console.log('\n\n');
    for(var db = 0; db < databases.length; db++) {
      await insert(databases[db]);
    }

    resolve('Complete Insertion Benchmark.');
  });
};

var benchmarks = [];

process.env.BENCHMARKS.split(',').indexOf('CourseGeneration') !== -1 ? benchmarks.push(courseGenerationBenchmark) : null;
process.env.BENCHMARKS.split(',').indexOf('CourseInsertion') !== -1 ? benchmarks.push(insertionBenchmark) : null;


//run the benchmarks
Promise.all(benchmarks.map((bm) => {
  return bm().then(console.log);
})).then(() => {
  process.exit(0);
});
