// Composant Quiz2 (components/Quiz2.js)
import React, { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import { Howl } from "howler";
import successSound from "../sounds/success.mp3";

function Quiz2({ setBtc }) {
  const questions = [
    {
      question:
        "Quelle est la syntaxe correcte pour créer une fonction en JavaScript ?",
      options: [
        "function maFonction() {}",
        "fonction maFonction() {}",
        "def maFonction()",
      ],
      answer: 0,
    },
    {
      question: "Comment déclare-t-on une variable qui ne change pas ?",
      options: ["let", "var", "const"],
      answer: 2,
    },
    {
      question: "Quel opérateur est utilisé pour l'addition en JavaScript ?",
      options: ["+", "-", "*"],
      answer: 0,
    },
    {
      question:
        "Comment écrit-on un commentaire sur une seule ligne en JavaScript ?",
      options: ["// Commentaire", "/* Commentaire */", "<!-- Commentaire -->"],
      answer: 0,
    },
    {
      question:
        "Quelle méthode est utilisée pour accéder à un élément par son id en JavaScript ?",
      options: [
        "document.getElementById()",
        "document.querySelector()",
        "document.getElementsByClassName()",
      ],
      answer: 0,
    },
    {
      question:
        "Quelle méthode permet de supprimer le dernier élément d'un tableau ?",
      options: ["pop()", "push()", "remove()"],
      answer: 0,
    },
    {
      question: "Quel est le résultat de l'expression '5' + 3 en JavaScript ?",
      options: ["53", "8", "Erreur"],
      answer: 0,
    },
    {
      question:
        "Quelle est la syntaxe correcte pour une boucle for en JavaScript ?",
      options: [
        "for (let i = 0; i < 5; i++)",
        "pour (i = 0; i < 5; i++)",
        "for chaque i dans [0, 5]",
      ],
      answer: 0,
    },
    {
      question: "Quel mot-clé est utilisé pour créer un objet en JavaScript ?",
      options: ["new", "create", "make"],
      answer: 0,
    },
    {
      question:
        "Comment vérifie-t-on l'égalité de deux valeurs en JavaScript (sans conversion) ?",
      options: ["==", "===", "=~"],
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
      const savedStatuses =
        JSON.parse(localStorage.getItem("quizStatuses")) || {};
      savedStatuses[2] = "completed";
      localStorage.setItem("quizStatuses", JSON.stringify(savedStatuses));
    }
  }, [currentQuestion, questions.length, score, setBtc]);

  return (
    <div className="p-4 text-center">
      {hearts <= 0 ? (
        <div>
          <h2 className="text-3xl font-bold mb-4">
            Oups, vous avez perdu tous vos cœurs !
          </h2>
          <p className="mb-4">
            Ne vous inquiétez pas, c'était une blague, vous pouvez recommencer
            autant que vous voulez !
          </p>
        </div>
      ) : currentQuestion < questions.length ? (
        <div>
          <h2 className="text-2xl font-bold mb-4">
            Question {currentQuestion + 1}
          </h2>
          <p className="mb-4 text-lg">
            <code className="bg-gray-100 p-1 rounded">
              {questions[currentQuestion].question}
            </code>
          </p>
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded mt-4 block w-full max-w-md mx-auto font-mono"
              onClick={() => handleAnswer(index)}
              style={{ fontFamily: "'Courier New', Courier, monospace" }}
            >
              {option}
            </button>
          ))}
        </div>
      ) : (
        <div>
          <h2 className="text-3xl font-bold mb-4">
            Bravo, vous avez terminé le quiz !
          </h2>
          <p className="text-lg">Score final : {score}</p>
          <p className="text-lg">
            Bitcoin gagné : {(score * 0.0001).toFixed(4)} BTC
          </p>
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

export default Quiz2;
