const Course = require('./classes/Course');

console.time('Generate 1');
new Course();
console.timeEnd('Generate 1');

console.time('Generate 10000000');
console.time('Generate 1000000');
console.time('Generate 100000');
console.time('Generate 10000');
console.time('Generate 1000');
console.time('Generate 100');
console.time('Generate 10');

for(var i = 1; i < 10000001; i++) {
  let x = new Course();
  i.toString().length > (i-1).toString().length ? console.timeEnd('Generate '+i) : null;
}