/* eslint-disable no-restricted-globals */

self.onmessage = function (event) {
    const { code } = event.data;
    let result;
  
    try {
      // Évaluer le code reçu
      result = eval(code); // Attention : Eval n'est pas sécurisé, assurez-vous de vérifier l'input
    } catch (error) {
      result = error.message;
    }
  
    // Envoyer le résultat de l'évaluation
    self.postMessage(result);
  };
  