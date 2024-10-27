// Composant CodeEditor (components/CodeEditor.js)
import React, { useState, useEffect } from 'react';

function CodeEditor({ code, setCode, isDarkMode }) {
  const [output, setOutput] = useState("");

  const handleChange = (event) => {
    setCode(event.target.value);
  };

  const handleRunCode = () => {
    let consoleOutput = "";
    const customConsole = {
      log: (...args) => {
        consoleOutput += args.join(" ") + "\n";
      },
    };

    try {
      const codeToRun = new Function('console', code);
      codeToRun(customConsole);
      setOutput(consoleOutput);
    } catch (error) {
      setOutput(String(error));
    }
  };

  return (
    <div className={`text-center ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} p-4 rounded-md`}>      
      <textarea
        value={code}
        onChange={handleChange}
        rows={10}
        className={`w-full p-4 border-2 rounded-md mb-4 text-lg font-mono ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-black border-gray-300'}`}
      />
      <button
        onClick={handleRunCode}
        className="bg-green-500 hover:bg-green-700 text-white font-bold px-6 py-3 rounded"
      >
        Exécuter le code
      </button>
      <div className={`bg-gray-100 p-4 mt-4 text-left w-full border rounded-md ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-black border-gray-300'}`}>
        <h3 className="text-xl font-bold mb-2">Console :</h3>
        <pre className="whitespace-pre-wrap">{output}</pre>
      </div>
    </div>
  );
}

export default CodeEditor;
