const Course = require('./classes/Course');

console.time('Generate 1');
console.time('Generate 100');
console.time('Generate 1000');
console.time('Generate 100000');
console.time('Generate 1000000');
console.time('Generate 10000000');

for(var i = 1; i < 10000001; i++) {
  let x = new Course();
  switch(i){
    case 1:
    case 100:
    case 1000:
    case 100000:
    case 1000000:
    case 10000000:
      console.timeEnd('Generate '+i);
      //console.log(x);
  }
}