// Composant Quiz3 (components/Quiz3.js)
import React, { useState, useEffect } from 'react';
import { FaHeart } from 'react-icons/fa';
import { Howl } from 'howler';
import successSound from '../sounds/success.mp3';

function Quiz3({ setBtc }) {
  const questions = [
    {
      question: "Quelle méthode permet de vérifier si une variable est un tableau en JavaScript ?",
      options: ["isArray()", "Array.isArray()", "typeof array === 'array'"],
      answer: 1,
    },
    {
      question: "Quel mot-clé est utilisé pour créer une constante en JavaScript ?",
      options: ["const", "let", "var"],
      answer: 0,
    },
    {
      question: "Quelle méthode est utilisée pour fusionner deux tableaux ?",
      options: ["concat()", "merge()", "join()"],
      answer: 0,
    },
    {
      question: "Comment accède-t-on à un élément ayant l'id 'header' en JavaScript ?",
      options: ["document.getElementById('header')", "document.querySelector('#header')", "document.getElementByClass('header')"],
      answer: 0,
    },
    {
      question: "Quel est le résultat de '5' + 5 en JavaScript ?",
      options: ["10", "55", "Erreur"],
      answer: 1,
    },
    {
      question: "Comment déclare-t-on une fonction fléchée en JavaScript ?",
      options: ["function() => {}", "() => {}", "=> function()"],
      answer: 1,
    },
    {
      question: "Quelle méthode permet de supprimer le premier élément d'un tableau ?",
      options: ["shift()", "pop()", "remove()"],
      answer: 0,
    },
    {
      question: "Quel est le type de NaN en JavaScript ?",
      options: ["undefined", "number", "object"],
      answer: 1,
    },
    {
      question: "Quelle méthode est utilisée pour retourner une copie des éléments d'un tableau triés ?",
      options: ["sort()", "order()", "arrange()"],
      answer: 0,
    },
    {
      question: "Comment créer un objet en JavaScript ?",
      options: ["let obj = {}", "let obj = []", "let obj = Object.create()"],
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
      savedStatuses[3] = 'completed';
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

export default Quiz3;
