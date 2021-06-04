//Load environment
const path = require('path');
require(path.join(__dirname, "..", 'environments', 'envLoader.js'));

//Load classes
const Course = require('./classes/Course');
const DBManager = require('./GetDBManager');
const Logger = require('../Logger');
const logger = new Logger();

//load libraries
const { performance } = require('perf_hooks');

console.warn(`This script assumes that all databases queried are seeded with 10 Million records.
  If that's not the case, the script may crash, perform unexpectedly, provide bad data, and all
  around give you a headache and bad times. Sorry tho.`);

//Setup Database array
const dbs = process.env.NODE_ENV !== 'production' ?
  process.env.USE_DBS
    .split(',')
    .filter(str => { return str.toLowerCase() !== 'json' })
    .map(dbString => { return DBManager(dbString); })
  : [DBManager()];

var getBenchmark = () => {
  var queriesToRun = 100000;
  console.log('\n');
  console.log(`Preparing to perform read speed benchmark. (One inflight request at a time, ${queriesToRun} queries total.)`);

  return new Promise(async resolve => {
    console.log('Awaiting Database Connections...');
    await Promise.all(dbs.map(db => { return db.connection }));
    console.log('All databases connected.');

    for (let i = 0; i < dbs.length; i++) {
      console.log('Preparing to benchmark reading on database ' + dbs[i].database + '...');
      await new Promise(r => setTimeout(r, 1000));

      var times = [];

      for (let j = 0; j < queriesToRun; j++) {
        j % 50 ? null : Logger.printloadingBar(j / queriesToRun); // update the loading bar less frequently to save processing power
        var rec = Math.floor(Math.random() * 1000000) + 9000000; //generate random record in last 10% of database
        try {
          let start = performance.now();
          await dbs[i].getCourse(rec);
          times.push(performance.now() - start);
        } catch (e) {
          console.error('failed to read record', rec, 'from database', dbs[i]);
          times.push('failed to read record', rec);
        }
      }
      Logger.endLoadingBar();
      let avg = 0;
      let successCount = 0;
      times.forEach((time) => {
        if (typeof time === 'number') {
          avg += time;
          successCount++;
        }
      });
      avg = (avg / successCount);
      let successRate = (successCount / queriesToRun).toFixed(2) * 100;

      console.log(`Avg Time Per Course: ${Logger.msTimeToStr(avg)}`);
      console.log(`Query Success Rate: ${successRate}%`);
    }

    resolve();
  });
};

var rpsBenchmark = () => {
  return new Promise(async (resolve) => {

    console.log('Awaiting Database Connections...');
    await Promise.all(dbs.map(db => { return db.connection }));
    console.log('All databases connected.');

    var batSize = [1, 10, 25, 50, 75, 100, 200, 300, 500, 750, 1000, 1250, 1500, 1750, 2000, 2048, 2250, 2500, 2750, 3000,
      3500, 4000, 5000];
    var tries = 1000;

    //for each db
    for (let currentDatabase = 0; currentDatabase < dbs.length; currentDatabase++) {
      console.log(`Preparing to benchmark RPS on database ${dbs[currentDatabase].database}...`);
      console.log(`We will record the average time it takes ${dbs[currentDatabase].database} to respond to X Get requests sent 'at once' over ${tries} runs.`);

      //for each batch size
      for (let batchIndex = 0; batchIndex < batSize.length; batchIndex++) {

        var batchResults = []; //contains all the times and success rates for the current batch size.

        //test each batch size ${tries} times.
        for (let batchRunIndex = 0; batchRunIndex < tries; batchRunIndex++) {
          Logger.printloadingBar(batchRunIndex/tries);
          //generate ids
          var ids = [];
          for (let idGenIndex = 0; idGenIndex < batSize[batchIndex]; idGenIndex++) {
            ids.push(Math.floor(Math.random() * 1000000) + 9000000);
          }

          //setup timers
          let successCount = 0;
          let start = performance.now();

          //fire the requests
          var datas = await Promise.allSettled(ids.map(id => {
            return dbs[currentDatabase].getCourse(id).then((data) => {
              successCount++;
              return data;
            });
          }));

          //close the timer
          let time = performance.now() - start;
          let successRate = (successCount/batSize[batchIndex] * 100).toFixed(2) * 1;

          //record the results
          batchResults.push({time, successRate});
        }

        //once the batch has been run enough...
        Logger.endLoadingBar();
        let avgTime = batchResults.reduce((total, run) => { return total + run.time; }, 0) / batchResults.length;
        let avgSR = batchResults.reduce((sr, run) => { return sr + run.successRate; }, 0) / batchResults.length;

        console.log(`  ${batSize[batchIndex]} GET Requests AVG: ${Logger.msTimeToStr(avgTime)}, ${avgSR}% Success Rate.`);
        if (avgTime > 1000 || avgSR < 100) {
          console.log(avgTime);
          console.log(`Max RPS less than ${batSize[batchIndex]}`);
          break;
        }
      }
    }
    resolve();
    return;

  });
};

const benchmarks = [
  //getBenchmark,
  rpsBenchmark,
];

(async () => {
  for (var i = 0; i < benchmarks.length; i++) {
    await benchmarks[i]();
  }
  process.exit(0);
})();