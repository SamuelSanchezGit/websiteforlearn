// Composant QuizGrid (components/QuizGrid.js)
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCheck, FaTimes, FaHourglassHalf } from 'react-icons/fa';

function QuizGrid() {
  const quizzes = [
    { id: 1, title: "Quiz 1 - Ultra Facile" },
    { id: 2, title: "Quiz 2 - Ultra Facile" },
    { id: 3, title: "Quiz 3 - Facile" },
    { id: 4, title: "Quiz 4 - Facile" },
    { id: 5, title: "Quiz 5 - Moyen" },
    { id: 6, title: "Quiz 6 - Moyen" },
    { id: 7, title: "Quiz 7 - Difficile" },
    { id: 8, title: "Quiz 8 - Difficile" },
    { id: 9, title: "Quiz 9 - Expert" },
    { id: 10, title: "Quiz 10 - Expert" },
  ];

  const [quizStatuses, setQuizStatuses] = useState(() => {
    const savedStatuses = localStorage.getItem("quizStatuses");
    return savedStatuses ? JSON.parse(savedStatuses) : {};
  });

  useEffect(() => {
    localStorage.setItem("quizStatuses", JSON.stringify(quizStatuses));
  }, [quizStatuses]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <FaCheck className="text-green-500" />;
      case 'not_started':
        return <FaTimes className="text-red-500" />;
      case 'in_progress':
        return <FaHourglassHalf className="text-yellow-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="p-4 text-center">
      <h2 className="text-3xl font-bold mb-6">Choisissez un Quiz</h2>
      <div className="grid grid-cols-2 gap-4">
        {quizzes.map((quiz) => (
          <Link
            to={`/quiz${quiz.id}`}
            key={quiz.id}
            className="border p-4 rounded shadow-lg hover:bg-gray-200"
            onClick={() => {
              if (quizStatuses[quiz.id] !== 'completed') {
                setQuizStatuses({ ...quizStatuses, [quiz.id]: 'in_progress' });
              }
            }}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold">{quiz.title}</h3>
              <div className="ml-4">
                {getStatusIcon(quizStatuses[quiz.id] || 'not_started')}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default QuizGrid;
