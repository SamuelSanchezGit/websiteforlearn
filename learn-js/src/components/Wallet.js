// Composant Wallet (components/Wallet.js)
import React from 'react';

function Wallet({ btc }) {
  const btcToEurRate = 30000; // Taux fictif pour la conversion BTC -> EUR
  const eur = parseFloat(btc) * btcToEurRate;

  return (
    <div className="p-4 text-center">
      <h2 className="text-3xl font-bold mb-4">Mon Portefeuille</h2>
      <p className="text-lg">Bitcoin : {btc.toFixed(4)} BTC</p>
      <p className="text-lg">Valeur en EUR : {eur.toFixed(2)} €</p>
    </div>
  );
}

export default Wallet;