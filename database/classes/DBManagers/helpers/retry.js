const retryUntilSuccess = async (delay, asyncFunction, ...args) => {
  return new Promise(async (resolve) => {
    while (true) {
      try {
        var x = await asyncFunction(...args);
        resolve(x);
        return null;
      } catch (e) {
        console.log(e);
        await new Promise((resolve) => {
          setTimeout(resolve, delay);
        });
      }
    }
  })
};

module.exports = retryUntilSuccess;