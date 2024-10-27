/* eslint-disable no-restricted-globals */
// eslint-disable-next-line no-restricted-globals
self.onmessage = function (event) {
    const { code } = event.data;
    let result;
  
    try {
        // Exécution sécurisée du code en utilisant `new Function`
        const codeToRun = new Function(code);
        result = codeToRun();
    } catch (error) {
        result = error.message;
    }
  
    // eslint-disable-next-line no-restricted-globals
    self.postMessage(result);
};
