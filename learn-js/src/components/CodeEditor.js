import React, { useState } from "react";
import Editor from "react-simple-code-editor";
import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-tomorrow.css";

function CodeEditor() {
  const [code, setCode] = useState("// Écrivez votre code ici\nconsole.log('Hello World');");
  const [output, setOutput] = useState("");

  const highlightCode = (code) => {
    return Prism.highlight(code, Prism.languages.javascript, "javascript");
  };

  const handleRunCode = () => {
    const worker = new Worker(new URL("./codeWorker.js", import.meta.url));
    worker.postMessage({ code });

    worker.onmessage = function (e) {
      setOutput(e.data.output);
    };

    worker.onerror = function (error) {
      setOutput(`Error: ${error.message}`);
    };
  };

  return (
    <div className="text-center p-4 rounded-md" style={{ backgroundColor: "#1e293b", color: "#cbd5e1" }}>
      <Editor
        value={code}
        onValueChange={setCode}
        highlight={highlightCode}
        padding={10}
        style={{
          fontFamily: '"Courier New", Courier, monospace',
          fontSize: 14,
          backgroundColor: "#1e293b",
          color: "#cbd5e1",
          borderRadius: "4px",
          border: "1px solid #4b5563",
          minHeight: "200px",
        }}
      />
      <button
        onClick={handleRunCode}
        className="bg-green-500 hover:bg-green-700 text-white font-bold px-6 py-3 rounded mt-4"
      >
        Exécuter le code
      </button>
      <div
        className="bg-gray-900 p-4 mt-4 text-left w-full border rounded-md"
        style={{
          color: "#cbd5e1",
          borderColor: "#4b5563",
          fontFamily: '"Courier New", Courier, monospace',
        }}
      >
        <h3 className="text-xl font-bold mb-2">Console :</h3>
        <pre className="whitespace-pre-wrap">{output}</pre>
      </div>
    </div>
  );
}

export default CodeEditor;
