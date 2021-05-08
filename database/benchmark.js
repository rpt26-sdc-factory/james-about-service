const Course = require('./classes/Course');

console.time('generate1');
console.time('generate100');
console.time('generate1000');
console.time('generate100000');
console.time('generate1000000');
console.time('generate10000000');

for(var i = 1; i < 10000001; i++) {
  let x = new Course();
  switch(i){
    case 1:
    case 100:
    case 1000:
    case 100000:
    case 1000000:
    case 10000000:
      console.timeEnd('generate'+i);
      console.log(x);
  }
}