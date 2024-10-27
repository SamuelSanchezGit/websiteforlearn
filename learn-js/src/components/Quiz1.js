// Composant Quiz1 (components/Quiz1.js)
import React, { useState, useEffect } from 'react';
import { FaHeart } from 'react-icons/fa';
import { Howl } from 'howler';
import successSound from '../sounds/success.mp3';

function Quiz1({ setBtc }) {
  const questions = [
    {
      question: "Quelle est la bonne façon de déclarer une variable en JavaScript ?",
      options: ["let variable = 5;", "int variable = 5;", "var: 5"],
      answer: 0,
    },
    {
      question: "Comment affiche-t-on un message dans la console ?",
      options: ["print(message);", "console.log(message);", "alert(message)"],
      answer: 1,
    },
    {
      question: "Comment déclare-t-on une constante en JavaScript ?",
      options: ["let", "const", "var"],
      answer: 1,
    },
    {
      question: "Quel est le résultat de 2 + 2 en JavaScript ?",
      options: ["4", "'4'", "22"],
      answer: 0,
    },
    {
      question: "Quelle méthode est utilisée pour convertir une chaîne en nombre entier ?",
      options: ["parseInt()", "parseFloat()", "toString()"],
      answer: 0,
    },
    {
      question: "Comment déclare-t-on une fonction en JavaScript ?",
      options: ["function maFonction() {}", "def maFonction():", "fonction maFonction {}"],
      answer: 0,
    },
    {
      question: "Comment crée-t-on un tableau en JavaScript ?",
      options: ["let monTableau = [];", "let monTableau = ();", "let monTableau = {}"],
      answer: 0,
    },
    {
      question: "Quelle est la valeur par défaut d'une variable non initialisée ?",
      options: ["undefined", "null", "0"],
      answer: 0,
    },
    {
      question: "Quelle méthode est utilisée pour ajouter un élément à la fin d'un tableau ?",
      options: ["push()", "pop()", "append()"],
      answer: 0,
    },
    {
      question: "Quel mot-clé est utilisé pour répéter un bloc de code tant qu'une condition est vraie ?",
      options: ["while", "for", "if"],
      answer: 0,
    }
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [hearts, setHearts] = useState(3);

  useEffect(() => {
    localStorage.setItem("hearts", JSON.stringify(hearts));
  }, [hearts]);

  const handleAnswer = (index) => {
    if (index === questions[currentQuestion].answer) {
      setScore(score + 1);
    } else {
      setHearts(hearts - 1);
    }
    setCurrentQuestion(currentQuestion + 1);
  };

  const playSuccessSound = () => {
    const sound = new Howl({ src: [successSound], volume: 0.2 });
    sound.play();
  };

  useEffect(() => {
    if (currentQuestion >= questions.length) {
      // Ajouter des BTC à la fin du quiz si réussi
      setBtc((prevBtc) => parseFloat(prevBtc) + score * 0.0001);
      playSuccessSound();
      // Mettre à jour le statut du quiz dans localStorage
      const savedStatuses = JSON.parse(localStorage.getItem("quizStatuses")) || {};
      savedStatuses[1] = 'completed';
      localStorage.setItem("quizStatuses", JSON.stringify(savedStatuses));
    }
  }, [currentQuestion, questions.length, score, setBtc]);

  return (
    <div className="p-4 text-center">
      {hearts <= 0 ? (
        <div>
          <h2 className="text-3xl font-bold mb-4">Oups, vous avez perdu tous vos cœurs !</h2>
          <p className="mb-4">Ne vous inquiétez pas, c'était une blague, vous pouvez recommencer autant que vous voulez !</p>
        </div>
      ) : currentQuestion < questions.length ? (
        <div>
          <h2 className="text-2xl font-bold mb-4">Question {currentQuestion + 1}</h2>
          <p className="mb-4 text-lg">{questions[currentQuestion].question}</p>
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded mt-4 block w-full max-w-md mx-auto"
              onClick={() => handleAnswer(index)}
            >
              {option}
            </button>
          ))}
        </div>
      ) : (
        <div>
          <h2 className="text-3xl font-bold mb-4">Bravo, vous avez terminé le quiz !</h2>
          <p className="text-lg">Score final : {score}</p>
          <p className="text-lg">Bitcoin gagné : {(score * 0.0001).toFixed(4)} BTC</p>
        </div>
      )}
      <div className="flex justify-center items-center mt-4">
        {Array.from({ length: hearts }).map((_, index) => (
          <FaHeart key={index} className="text-red-500 text-2xl mx-1" />
        ))}
      </div>
    </div>
  );
}

export default Quiz1;