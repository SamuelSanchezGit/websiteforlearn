// Composant Quiz5 (components/Quiz5.js)
import React, { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import { Howl } from "howler";
import successSound from "../sounds/success.mp3";

function Quiz5({ setBtc }) {
  const questions = [
    {
      question:
        "Quelle méthode est utilisée pour vérifier si une propriété existe dans un objet ?",
      options: ["exists()", "hasOwnProperty()", "inProperty()"],
      answer: 1,
    },
    {
      question:
        "Comment arrondir un nombre à l'entier le plus proche en JavaScript ?",
      options: ["Math.ceil()", "Math.floor()", "Math.round()"],
      answer: 2,
    },
    {
      question:
        "Quelle méthode permet de sélectionner tous les éléments ayant une classe spécifique ?",
      options: [
        "getElementsByClassName()",
        "querySelectorAll()",
        "getElementsByTagName()",
      ],
      answer: 1,
    },
    {
      question: "Quelle est la sortie de '5' - 3 en JavaScript ?",
      options: ["2", "53", "Erreur"],
      answer: 0,
    },
    {
      question: "Comment convertir une chaîne en nombre entier ?",
      options: ["parseInt()", "Number()", "toInt()"],
      answer: 0,
    },
    {
      question: "Quelle est la différence entre let et var ?",
      options: [
        "var est fonctionnelle, let est bloc",
        "let est fonctionnelle, var est bloc",
        "Aucune différence",
      ],
      answer: 0,
    },
    {
      question:
        "Quelle méthode permet de remplacer une sous-chaîne dans une chaîne en JavaScript ?",
      options: ["replace()", "subString()", "swap()"],
      answer: 0,
    },
    {
      question:
        "Quelle méthode est utilisée pour convertir un tableau en chaîne ?",
      options: ["join()", "concat()", "stringify()"],
      answer: 0,
    },
    {
      question: "Quelle est la valeur de NaN === NaN en JavaScript ?",
      options: ["true", "false", "undefined"],
      answer: 1,
    },
    {
      question: "Quelle est la portée d'une variable déclarée avec const ?",
      options: ["Bloc", "Globale", "Fonction"],
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
      const savedStatuses =
        JSON.parse(localStorage.getItem("quizStatuses")) || {};
      savedStatuses[5] = "completed";
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

export default Quiz5;
