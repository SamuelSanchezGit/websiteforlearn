/* eslint-disable no-restricted-globals */

self.onmessage = function (e) {
    const { code } = e.data;
    let consoleOutput = "";
    const customConsole = {
      log: (...args) => {
        consoleOutput += args.join(" ") + "\n";
      },
    };
  
    try {
      new Function("console", code)(customConsole);
      self.postMessage({ output: consoleOutput });
    } catch (error) {
      self.postMessage({ output: String(error) });
    }
  };
  