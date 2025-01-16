import Editor2 from "@monaco-editor/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { api_base_url } from "../helper";

const Editor = () => {
  const [code, setCode] = useState(""); // State to hold the code
  const { id } = useParams(); // Extract project ID from URL params
  const [output, setOutput] = useState("");
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);

  // Fetch project data on mount
  useEffect(() => {
    fetch(`${api_base_url}/getProject`, {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: localStorage.getItem("token"),
        projectId: id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setCode(data.project.code); // Set the fetched code
          setData(data.project);
        } else {
          toast.error(data.msg);
        }
      })
      .catch((err) => {
        console.error("Error fetching project:", err);
        toast.error("Failed to load project.");
      });
  }, [id]);

  const runProject = () => {
    fetch("https://emkc.org/api/v2/piston/execute", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        language: data.projLanguage,
        version: data.version,
        files: [
          {
            filename:
              data.name + data.projLanguage === "python"
                ? ".py"
                : data.projLanguage === "java"
                ? ".java"
                : data.projLanguage === "javascript"
                ? ".js"
                : data.projLanguage === "c"
                ? ".c"
                : data.projLanguage === "cpp"
                ? ".cpp"
                : data.projLanguage === "bash"
                ? ".sh"
                : "",
            content: code,
          },
        ],
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setOutput(data.run.output);
        setError(data.run.code === 1 ? true : false);
      });
  };

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
