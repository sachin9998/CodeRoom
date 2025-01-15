import React, { useEffect, useState, version } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import Navbar from "../components/Navbar";
import { api_base_url } from "../helper";

const Home = () => {
  const navigate = useNavigate();
  const [isCreateModelShow, setIsCreateModelShow] = useState(false);

  const [name, setName] = useState("");

  return (
    <>
      <Navbar />
      <div className="flex items-center px-[100px] justify-between mt-5">
        <h3 className="text-2xl">👋 Hi, Mahdi</h3>
        <div className="flex items-center">
          <button
            onClick={() => {
              setIsCreateModelShow(true);
            }}
            className="btnNormal bg-blue-500 transition-all hover:bg-blue-600"
          >
            Create Project
          </button>
        </div>
      </div>

      <div className="projects px-[100px] mt-5 pb-10">
        {projects && projects.length > 0
          ? projects.map((project, index) => {
              return (
                <>
                  <div className="project w-full p-[15px] flex items-center justify-between bg-[#0f0e0e]">
                    <div
                      onClick={() => {
                        navigate("/editior/" + project._id);
                      }}
                      className="flex w-full items-center gap-[15px]"
                    >
                      {project.projLanguage === "python" ? (
                        <>
                          <img
                            className="w-[130px] h-[100px] object-cover"
                            src="https://images.ctfassets.net/em6l9zw4tzag/oVfiswjNH7DuCb7qGEBPK/b391db3a1d0d3290b96ce7f6aacb32b0/python.png"
                            alt=""
                          />
                        </>
                      ) : project.projLanguage === "javascript" ? (
                        <>
                          <img
                            className="w-[130px] h-[100px] object-cover"
                            src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png"
                            alt=""
                          />
                        </>
                      ) : project.projLanguage === "cpp" ? (
                        <>
                          <img
                            className="w-[130px] h-[100px] object-cover"
                            src="https://upload.wikimedia.org/wikipedia/commons/3/32/C%2B%2B_logo.png"
                            alt=""
                          />
                        </>
                      ) : project.projLanguage === "c" ? (
                        <>
                          <img
                            className="w-[130px] h-[100px] object-cover"
                            src="https://upload.wikimedia.org/wikipedia/commons/1/19/C_Logo.png"
                            alt=""
                          />
                        </>
                      ) : project.projLanguage === "java" ? (
                        <>
                          <img
                            className="w-[130px] h-[100px] object-cover"
                            src="https://static-00.iconduck.com/assets.00/java-icon-1511x2048-6ikx8301.png"
                            alt=""
                          />
                        </>
                      ) : project.projLanguage === "bash" ? (
                        <>
                          <img
                            className="w-[130px] h-[100px] object-cover"
                            src="https://w7.pngwing.com/pngs/48/567/png-transparent-bash-shell-script-command-line-interface-z-shell-shell-rectangle-logo-commandline-interface-thumbnail.png"
                            alt=""
                          />
                        </>
                      ) : (
                        ""
                      )}
                      <div>
                        <h3 className="text-xl">{project.name}</h3>
                        <p className="text-[14px] text-[gray]">
                          {new Date(project.date).toDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-[15px]">
                      <button
                        className="btnNormal bg-blue-500 transition-all hover:bg-blue-600"
                        onClick={() => {
                          setIsEditModelShow(true);
                          setEditProjId(project._id);
                          setName(project.name);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          deleteProject(project._id);
                        }}
                        className="btnNormal bg-red-500 transition-all hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </>
              );
            })
          : "No Project Found !"}
      </div>

      {isCreateModelShow && (
        <div
          onClick={(e) => {
            if (e.target.classList.contains("modelCon")) {
              setIsCreateModelShow(false);
              setName("");
            }
          }}
          className="modelCon flex flex-col items-center justify-center w-screen h-screen fixed top-0 left-0 bg-[rgba(0,0,0,0.5)]"
        >
          <div className="modelBox flex flex-col items-start rounded-xl p-[20px] w-[25vw] h-[auto] bg-[#0F0E0E]">
            <h3 className="text-xl font-bold text-center">Create Project</h3>

            <div className="inputBox">
              {/* Setting Project Name */}
              <input
                onChange={(e) => {
                  setName(e.target.value);
                }}
                value={name}
                type="text"
                placeholder="Enter your project name"
                className="text-black"
              />
            </div>

            <Select
              placeholder="Select a Language"
              options={languageOptions}
              styles={customStyles}
              onChange={handleLanguageChange} // Handle language selection
            />
            {selectedLanguage && (
              <>
                <p className="text-[14px] text-green-500 mt-2">
                  Selected Language: {selectedLanguage.label}
                </p>
                <button
                  onClick={createProj}
                  className="btnNormal bg-blue-500 transition-all hover:bg-blue-600 mt-2"
                >
                  Create
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {isEditModelShow && (
        <div
          onClick={(e) => {
            if (e.target.classList.contains("modelCon")) {
              setIsEditModelShow(false);
              setName("");
            }
          }}
          className="modelCon flex flex-col items-center justify-center w-screen h-screen fixed top-0 left-0 bg-[rgba(0,0,0,0.5)]"
        >
          <div className="modelBox flex flex-col items-start rounded-xl p-[20px] w-[25vw] h-[auto] bg-[#0F0E0E]">
            <h3 className="text-xl font-bold text-center">Update Project</h3>
            <div className="inputBox">
              <input
                onChange={(e) => {
                  setName(e.target.value);
                }}
                value={name}
                type="text"
                placeholder="Enter your project name"
                className="text-black"
              />
            </div>

            <button
              onClick={updateProj}
              className="btnNormal bg-blue-500 transition-all hover:bg-blue-600 mt-2"
            >
              Update
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
