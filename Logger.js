const fs = require('fs');
const path = require('path');
const { performance } = require('perf_hooks');

class Logger {
  constructor(pathToWrite = './', fileName, delFile = 'false') {
    if (pathToWrite.charAt(pathToWrite.length - 1) !== '/') {
      pathToWrite += '/';
    }
    let constructionDate = new Date();

    //File Setup
    this.file = fileName ? fileName : `${constructionDate.getFullYear()}-${constructionDate.getMonth()}-${constructionDate.getDate()}-${constructionDate.getHours()}-${constructionDate.getMinutes()}-${constructionDate.getSeconds()}.log`;
    this.path = pathToWrite;
    this.fp = this.path + this.file;

    if (delFile) {
      try {
        fs.unlinkSync(this.fp);
      } catch (error) { 'ignore errors' }
    }
    //data
    this.times = {};
    this.write = true;
  }
  toggleWrite() {
    this.write = !this.write;
    console.log(this.write);
  }
  doWrite(str) {
    if (this.write) {
      try {
        fs.appendFileSync(this.fp, str);
      } catch (err) {
        Logger.endLoadingBar();
        Logger._lockout = true;
        console.error(err);
        this.toggleWrite();
      }
    }
  }
  log(...args) {
    console.log(...args);

    var str = args.join(' ') + '\n';
    this.doWrite(str);
  }

  warn(...args) {
    Logger.endLoadingBar();
    console.warn(...args);
    var str = '[WARNING] - ' + args.join(' ') + '\n';
    this.doWrite(str);
  }
  time(key) {
    this.times[key] = performance.now();
  }
  timeEnd(key) {
    let t = performance.now() - this.times[key];
    delete this.times[key];
    this.log(key + ': ' + Logger.msTimeToStr(t));
    return t;
  }

}
Logger.printloadingBar = (percent, o = {}) => {
  if (percent >= 1) {
    return;
  }
  var defaultOptions = {
    width: 25,
    precision: 0,
    fillChar: '▮',
    curChar: '◧',
    emptyChar: '▯',
    leftBorder: '[',
    rightBorder: ']'
  }
  for (var k in defaultOptions) {
    o[k] === undefined ? o[k] = defaultOptions[k] : null;
  }

  width = o.width;

  if (!Logger._lockout) {
    Logger._lbWidth = width;
    if (percent === undefined) {
      throw ('percent must be defined');
    }

    var filled = new Array(Math.floor(width * percent)).fill(o.fillChar);
    var whole = filled.concat([o.curChar], new Array((width - 1) - (filled.length - 1)).fill(o.emptyChar));
    var strPercent = percent.toString().charAt(2) === '0' ?
      ' 0' + ((percent * 100).toFixed(o.precision)) + '%' :
      ' ' + ((percent * 100).toFixed(o.precision)) + '%';

    for (let i = 0; i < strPercent.length; i++) {
      whole[Math.floor(width / 2) - Math.floor(strPercent.length / 2) + i] = strPercent.charAt(i);
    }
    process.stdout.write('\r' + o.leftBorder + whole.join('') + o.rightBorder + '    ');
    return;
  }
}
Logger.endLoadingBar = () => {
  if (Logger._lbWidth) {
    process.stdout.write('\r' + new Array(Logger._lbWidth + 10).fill('  ').join('') + '\r');
    Logger._lbWidth = 0;
  }
  return;
}
Logger.msTimeToStr = (time = 0) => {
  let p = 4;
  let suffix = 'ms';
  if (time > 1000) {
    time /= 1000;
    suffix = 's';
  } else {
    return (time.toFixed(p) * 1) + suffix;
  }
  if (time > 60) {
    time /= 60;
    suffix = ' Minutes.';
  } else {
    return (time.toFixed(p) * 1) + suffix;
  }
  if (time > 60) {
    time /= 60;
    suffix = ' Hours.'
  } else {
    return (time.toFixed(p) * 1) + suffix;
  }
  if (time > 96) {
    time /= 24;
    suffix = ' Days.'
  } else {
    return (time.toFixed(p) * 1) + suffix;
  }
  if (time > 30) {
    time /= 30;
    suffix = ' Months.'
  } else {
    return (time.toFixed(p) * 1) + suffix;
  }
  if (time > 12) {
    time /= 12;
    suffix = ' Years.';
  }
  return (time.toFixed(p) * 1) + suffix;
}
Logger._lbWidth = 0;
Logger._lockout = false;
module.exports = Logger;