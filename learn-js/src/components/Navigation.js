// Composant Navigation (components/Navigation.js)
import React from "react";
import { Link } from "react-router-dom";
import { FaBitcoin } from "react-icons/fa";

function Navigation({ btc }) {
  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between items-center mb-8">
      <div className="flex space-x-4">
        <Link to="/" className="font-bold hover:underline">
          Accueil
        </Link>
        <Link to="/quiz" className="font-bold hover:underline">
          Quiz
        </Link>
        <Link to="/code" className="font-bold hover:underline">
          Exercice Code
        </Link>
        <Link to="/wallet" className="font-bold hover:underline">
          Wallet
        </Link>
      </div>
      <div className="flex items-center">
        <FaBitcoin className="text-yellow-400 text-3xl mr-2" />
        <span className="font-bold">{btc.toFixed(4)} BTC</span>
      </div>
    </nav>
  );
}

export default Navigation;
