// Composant Quiz4 (components/Quiz4.js)
import React, { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import { Howl } from "howler";
import successSound from "../sounds/success.mp3";

function Quiz4({ setBtc }) {
  const questions = [
    {
      question: "Comment accéder à la longueur d'un tableau en JavaScript ?",
      options: ["array.size", "array.length", "array.count"],
      answer: 1,
    },
    {
      question: "Quelle méthode permet d'ajouter un élément à la fin d'un tableau ?",
      options: ["push()", "pop()", "append()"],
      answer: 0,
    },
    {
      question: "Quelle est la valeur par défaut d'une variable non initialisée en JavaScript ?",
      options: ["undefined", "null", "0"],
      answer: 0,
    },
    {
      question: "Comment déclarer une variable globale en JavaScript ?",
      options: ["let", "const", "var"],
      answer: 2,
    },
    {
      question: "Quel est l'opérateur de comparaison stricte en JavaScript ?",
      options: ["==", "===", "="],
      answer: 1,
    },
    {
      question: "Quelle méthode est utilisée pour transformer une chaîne en majuscules ?",
      options: ["toUpperCase()", "toCaps()", "upper()"],
      answer: 0,
    },
    {
      question: "Comment vérifie-t-on si une variable est de type nombre ?",
      options: ["typeof variable === 'number'", "isNumber(variable)", "variable.isNumber"],
      answer: 0,
    },
    {
      question: "Quelle méthode permet de supprimer le dernier élément d'un tableau ?",
      options: ["pop()", "remove()", "shift()"],
      answer: 0,
    },
    {
      question: "Quelle est la structure correcte d'une condition if en JavaScript ?",
      options: ["if condition then", "if (condition) {}", "if condition {}"],
      answer: 1,
    },
    {
      question: "Quelle est la valeur de typeof null en JavaScript ?",
      options: ["object", "null", "undefined"],
      answer: 0,
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
      savedStatuses[4] = "completed";
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

export default Quiz4;
