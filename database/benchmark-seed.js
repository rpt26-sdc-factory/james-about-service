//Load environment
const path = require('path');
require(path.join(__dirname, "..", 'environments', 'envLoader.js'));

//Load Libraries
const { performance } = require('perf_hooks');

//Load classes
const Course = require('./classes/Course');
const DBManager = require('./GetDBManager');
const Logger = require('../Logger');

const logger = new Logger('./logs/benchmarks/seeding/');

//benchmarking functions
var courseGenerationBenchmark = () => {
  logger.log('Peforming Data Generation Benchmark...');

  return new Promise((resolve) => {
    logger.time('Generate 1');
    new Course({ smallGen: true });
    logger.timeEnd('Generate 1');

    logger.time('Generate 10000000');
    logger.time('Generate 1000000');
    logger.time('Generate 100000');
    logger.time('Generate 10000');
    logger.time('Generate 1000');
    logger.time('Generate 100');
    logger.time('Generate 10');

    for (var i = 1; i <= 10000000; i++) {
      new Course({ smallGen: true });
      switch (i) {
        case 10:
        case 100:
        case 1000:
        case 10000:
        case 100000:
        case 1000000:
        case 10000000:
          Logger.endLoadingBar();
          logger.timeEnd('Generate ' + i);
          Logger.printloadingBar(i/10000000, {curChar: '⟫'});
      }
      if (!(i % 5000)) {
        Logger.printloadingBar(i/10000000, {curChar: '⟫'});
      }
    }
    Logger.endLoadingBar();
    resolve('Complete Data Generation Benchmark');
  })
}

var courseInsertionBenchmark = () => {
  logger.log('Peforming Insertion Benchmark...');

  return new Promise(async (resolve) => {
    var databases = process.env.USE_DBS.split(',').map((dbstr) => {
      return DBManager(dbstr);
    });
    await Promise.all(databases.map((db) => {
      return db.connection;
    }));
    await Promise.all(databases.map((db) => {
      return db.deleteAllCourses();
    }));

    //For Each database...
    for (let i = 0; i < databases.length; i++) {
      //create a chunk array and course Id var
      let chunkSizes = [10, 50, 100, 500, 1000, 5000, 7500, 10000, 25000, 50000];
      let courseCounter = 0; //track the number of courses generated;
      let runs = parseInt(process.env.INSERTION_RERUNS) || 50; //This is the number of times to test each chunk size.
      //log the start
      logger.log();
      logger.log(`Preparing to benchmark ${databases[i].database} insertion...`);

      //Makes it easier to read results from previous seeds
      await new Promise((resolve) => {
        setTimeout(resolve, 1500);
      });


      //for Each Chunksize
      for (let j = 0; j < chunkSizes.length; j++) {

        let timings = [];
        logger.log(`\n${databases[i].database} insert ${chunkSizes[j]}: (${runs} times)`);
        for (let k = 0; k < runs; k++) {
          Logger.printloadingBar(k/runs, {width: 30, fillChar: '😏', curChar: '😐', emptyChar: '😔'});
          let courses = [];
          //generate courses.
          for (let l = 0; l < chunkSizes[j]; l++) {
            courses.push(new Course({ course_id: courseCounter, smallGen: true }));
            courseCounter++;
          }
          let startTime = performance.now();
          await databases[i].insertManyCourses(courses);
          timings.push(performance.now() - startTime);
        }
        Logger.endLoadingBar();

        let avg = timings.reduce((total, time) => {
          return total += time;
        }) / timings.length;
        logger.log(`Average Time Per Batch: ${Logger.msTimeToStr(avg)}`);
        logger.log(`Average Time Per Course: ${Logger.msTimeToStr(avg/chunkSizes[j])}`);
      }
    }
    resolve('Complete Course Insertion Benchmark');
  });

};

var benchmarks = {
  courseGenerationBenchmark, courseInsertionBenchmark
};


logger.log('Preparing to benchmark databases:');


//run the benchmarks
Promise.all(process.env.BENCHMARKS.split(',').map((bm) => {
  bm = bm.charAt(0).toLowerCase() + bm.slice(1) + 'Benchmark';
  return (benchmarks[bm])().then(logger.log.bind(logger));
})).then((testsRun) => {
  testsRun.map((test) => {
    logger.log(test);
  });
  process.exit(0);
});
