// Nom du fichier : CodeEditor.js
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
    let consoleOutput = "";

    const customConsole = {
      log: (...args) => {
        consoleOutput += args.join(" ") + "\n";
      },
    };

    // Vérifier si le code contient des accès dangereux
    if (code.includes("window") || code.includes("document") || code.includes("fetch")) {
      setOutput("Erreur : Accès non autorisé détecté dans le code.");
      return;
    }

    try {
      // Créer un Blob pour le Web Worker
      const workerBlob = new Blob(
        [
          `
          onmessage = function(e) {
            const code = e.data;
            let consoleOutput = "";
            const customConsole = {
              log: (...args) => {
                consoleOutput += args.join(" ") + "\\n";
              }
            };

            try {
              const codeToRun = new Function("console", code);
              codeToRun(customConsole);
              postMessage(consoleOutput);
            } catch (error) {
              postMessage("Erreur: " + error.message);
            }
          }
          `
        ],
        { type: "application/javascript" }
      );

      const workerUrl = URL.createObjectURL(workerBlob);
      const worker = new Worker(workerUrl);

      worker.onmessage = (e) => {
        setOutput(e.data);
        worker.terminate(); // Arrêter le worker après l'exécution pour éviter les fuites de mémoire
      };

      // Définir un timeout de 2 secondes pour limiter l'exécution
      const timeout = setTimeout(() => {
        worker.terminate();
        setOutput("Erreur : Le code a mis trop de temps à s'exécuter.");
      }, 2000);

      worker.postMessage(code);

      worker.onmessage = (e) => {
        clearTimeout(timeout); // Supprimer le timeout si le worker répond à temps
        setOutput(e.data);
        worker.terminate();
      };

    } catch (error) {
      setOutput("Erreur: " + error.message);
    }
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
