// Composant Quiz10 (components/Quiz10.js)
import React, { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import { Howl } from "howler";
import successSound from "../sounds/success.mp3";

function Quiz10({ setBtc }) {
  const questions = [
    {
      question: "Quelle est la sortie de (function() { return [] + {}; })() en JavaScript ?",
      options: ["[object Object]", "undefined", "Erreur"],
      answer: 0,
    },
    {
      question: "Quelle est la différence entre Object.create() et {} en JavaScript ?",
      options: [
        "Object.create() permet de définir le prototype",
        "Aucune différence",
        "{} crée un objet immuable",
      ],
      answer: 0,
    },
    {
      question: "Comment éviter la modification d'une propriété d'objet en JavaScript ?",
      options: [
        "Object.defineProperty(obj, 'prop', { writable: false })",
        "Object.seal()",
        "Object.freeze()",
      ],
      answer: 0,
    },
    {
      question: "Quelle est la sortie de [] == ![] en JavaScript ?",
      options: ["true", "false", "undefined"],
      answer: 0,
    },
    {
      question: "Comment accéder aux symboles d'un objet en JavaScript ?",
      options: [
        "Object.getOwnPropertySymbols(obj)",
        "Object.getSymbols(obj)",
        "obj.symbols",
      ],
      answer: 0,
    },
    {
      question: "Quelle est la sortie de (function() { return this; }).call(10) en JavaScript ?",
      options: ["Number {10}", "object", "undefined"],
      answer: 0,
    },
    {
      question: "Comment copier les valeurs d'un objet dans un autre sans conserver les références ?",
      options: [
        "JSON.parse(JSON.stringify(obj))",
        "Object.assign({}, obj)",
        "clone(obj)",
      ],
      answer: 0,
    },
    {
      question: "Quelle est la sortie de typeof NaN en JavaScript ?",
      options: ["number", "NaN", "undefined"],
      answer: 0,
    },
    {
      question: "Comment faire en sorte qu'une propriété d'un objet ne soit pas énumérable ?",
      options: [
        "Object.defineProperty(obj, 'prop', { enumerable: false })",
        "Object.hideProperty()",
        "Object.freeze()",
      ],
      answer: 0,
    },
    {
      question: "Quelle est la différence entre une fonction nommée et une fonction anonyme ?",
      options: [
        "Une fonction nommée a un nom, une fonction anonyme n'en a pas",
        "Aucune différence",
        "Une fonction anonyme est plus rapide",
      ],
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
      savedStatuses[10] = "completed";
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

export default Quiz10;
