// Composant Quiz3 (components/Quiz3.js)
import React, { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import { Howl } from "howler";
import successSound from "../sounds/success.mp3";

function Quiz3({ setBtc }) {
  const questions = [
    {
      question: "Quel est l'opérateur de comparaison stricte en JavaScript ?",
      options: ["===", "==", "!="],
      answer: 0,
    },
    {
      question: "Comment pouvez-vous ajouter un commentaire en JavaScript ?",
      options: ["# commentaire", "// commentaire", "<!-- commentaire -->"],
      answer: 1,
    },
    {
      question: "Que retourne la méthode typeof en JavaScript ?",
      options: ["Le type d'une variable", "La valeur d'une variable", "L'objet parent"],
      answer: 0,
    },
    {
      question: "Comment vérifiez-vous si une variable est égale à une valeur et est du même type ?",
      options: ["==", "=", "==="],
      answer: 2,
    },
    {
      question: "Quel est l'opérateur logique pour ET en JavaScript ?",
      options: ["&&", "||", "!"],
      answer: 0,
    },
    {
      question: "Comment vérifiez-vous si une variable n'est pas égale à une valeur en JavaScript ?",
      options: ["!=", "!==", "<>"],
      answer: 1,
    },
    {
      question: "Que signifie NaN en JavaScript ?",
      options: ["Not a Number", "Null and Null", "No actual Number"],
      answer: 0,
    },
    {
      question: "Comment faites-vous une conversion de type explicite en nombre entier en JavaScript ?",
      options: ["parseInt()", "parseFloat()", "Number()"],
      answer: 0,
    },
    {
      question: "Quel mot-clé est utilisé pour arrêter une boucle en JavaScript ?",
      options: ["break", "stop", "exit"],
      answer: 0,
    },
    {
      question: "Quel est le résultat de typeof null en JavaScript ?",
      options: ["null", "object", "undefined"],
      answer: 1,
    },
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
      savedStatuses[3] = "completed";
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
          <p className="quiz-question mb-4 text-lg">
            <code className="bg-gray-800 text-white p-1 rounded">
              {questions[currentQuestion].question}
            </code>
          </p>
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              className="quiz-option bg-blue-600 hover:bg-blue-800 text-white font-bold px-6 py-3 rounded mt-4 block w-full max-w-md mx-auto"
              onClick={() => handleAnswer(index)}
              style={{ fontFamily: "'Courier New', Courier, monospace" }}
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

export default Quiz3;
