// Composant Principal (App.js)
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Quiz1 from './components/Quiz1';
import Quiz2 from './components/Quiz2';
import Quiz3 from './components/Quiz3';
import Quiz4 from './components/Quiz4';
import CodeEditor from './components/CodeEditor';
import Wallet from './components/Wallet';
import Navigation from './components/Navigation';
import QuizGrid from './components/QuizGrid';
import { FaMoon, FaSun } from 'react-icons/fa';

function App() {
  const [hearts, setHearts] = useState(() => {
    const savedHearts = localStorage.getItem("hearts");
    return savedHearts ? JSON.parse(savedHearts) : 3;
  });

  const [code, setCode] = useState("// Écrivez votre code ici\nconsole.log('Hello World');");
  const [btc, setBtc] = useState(() => {
    const savedBtc = localStorage.getItem("btc");
    return savedBtc ? parseFloat(savedBtc) : 0;
  });

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    return savedDarkMode ? JSON.parse(savedDarkMode) : false;
  });

  useEffect(() => {
    localStorage.setItem("hearts", JSON.stringify(hearts));
  }, [hearts]);

  useEffect(() => {
    localStorage.setItem("btc", btc);
  }, [btc]);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
    document.body.className = isDarkMode ? 'dark' : '';
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <Router>
      <div className={isDarkMode ? 'dark bg-gray-900 text-white min-h-screen' : 'bg-white text-black min-h-screen'}>
        <Navigation btc={btc} />
        <div className="flex justify-end items-center p-4">
          <div onClick={toggleDarkMode} className="cursor-pointer text-3xl mr-4">
            {isDarkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-blue-500" />}
          </div>
        </div>
        <div className="p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quiz1" element={<Quiz1 setBtc={setBtc} hideBtcDuringQuiz={true} />} />
            <Route path="/quiz2" element={<Quiz2 setBtc={setBtc} />} />
            <Route path="/quiz3" element={<Quiz3 setBtc={setBtc} />} />
            <Route path="/quiz4" element={<Quiz4 setBtc={setBtc} />} />
            <Route path="/code" element={<CodeEditor code={code} setCode={setCode} />} />
            <Route path="/wallet" element={<Wallet btc={btc} />} />
            <Route path="/quiz" element={<QuizGrid />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;