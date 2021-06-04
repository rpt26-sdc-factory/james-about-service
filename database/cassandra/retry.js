const { String } = require("core-js");

const retryUntilSuccess = async (delay, asyncFunction, errsToIgnore = [], ...args) => {
  if(errsToIgnore.length === 0) {
    throw 'Retry function REQUIRES ignore strings.';
  }
  return new Promise(async (resolve) => {
    while (true) {
      try {
        var x = await asyncFunction(...args);
        resolve(x);
        return null;
      } catch (e) {
        var ignore = errsToIgnore.reduce((found, str) => {
          return JSON.stringify(e).toLowerCase().indexOf(str.toLowerCase()) !== -1 || found;
        }, false);
        if ( ignore ){
          await new Promise((resolve) => {
            setTimeout(resolve, delay);
          });
        } else {
          throw e;
        }
      }
    }
  })
};

module.exports = retryUntilSuccess;