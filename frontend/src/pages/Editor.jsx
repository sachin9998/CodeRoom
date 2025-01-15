import Editor2 from "@monaco-editor/react";
import { useState } from "react";
import Navbar from "../components/Navbar";

const Editor = () => {
  const [code, setCode] = useState(""); // State to hold the code

  return (
    <>
      <Navbar />
      <div
        className="flex items-center justify-between"
        style={{ height: "calc(100vh - 90px)" }}
      >
        {/* Left side for editor */}
        <div className="left w-[50%] h-full">
          <Editor2
            onChange={(newCode) => {
              console.log("New Code:", newCode); // Debug: Log changes
              setCode(newCode || ""); // Update state
            }}
            theme="vs-dark"
            height="100%"
            width="100%"
            language="python"
            value={code} // Bind editor to state
          />
        </div>

        {/* Right Side for Output */}
        <div className="right p-[15px] w-[50%] h-full bg-[#27272a]">
          <div className="flex pb-3 border-b-[1px] border-b-[#1e1e1f] items-center justify-between px-[30px]">
            <p className="p-0 m-0">Output</p>
            <button
              className="btnNormal !w-fit !px-[20px] bg-blue-500 transition-all hover:bg-blue-600"
              onClick={runProject} // Save when clicking the button
            >
              Run
            </button>
          </div>
          <pre
            className={`w-full h-[75vh] ${error ? "text-red-500" : ""}`}
            style={{ textWrap: "nowrap" }}
          >
            {output}
          </pre>
        </div>
      </div>
    </>
  );
};

export default Editor;
