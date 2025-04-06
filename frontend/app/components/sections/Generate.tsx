import { IoClose } from "react-icons/io5";

import { useEffect, useState } from "react";
import Assignment from "../assignment";
import Navigation from "../Navigation";

export default function Generate() {
  const [showModal, setShowModal] = useState(false);
  const [currentSyllabus, setCurrentSyllabus] = useState([]);
  const [currentClass, setCurrentClass] = useState("");
  const [shake, setShake] = useState(false);
  const [currentInput, setInput] = useState("");
  const [syllabi, setSyllabi] = useState<{ [key: string]: [] }>({});

  const addClass = () => {
    if (currentInput != "") {
      setSyllabi((prev) => ({
        ...prev,
        [currentInput]: [],
      }));

      setCurrentClass(currentInput);
      setInput("");
      setShowModal(false);
      setShake(false);
    } else {
      setShake(true);

      setTimeout(() => {
        setShake(false);
      }, 500);
    }
  };

  const updateCurrentSyllabus = (assignment: []) => {
    syllabi[currentClass] = assignment;
    setSyllabi(syllabi);
    setCurrentClass(currentClass);
    setCurrentSyllabus(assignment);
    console.log("update syllabi");
    console.log(assignment.length);
  };

  const updateCurrentClass = (className: string) => {
    setCurrentClass(className);
    setCurrentSyllabus(syllabi[className]);
  };

  const parseSyllabus = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const formData = new FormData();
    if (file != null) {
      formData.append("file", file);
    } else {
      return;
    }

    try {
      const response = await fetch("http://localhost:8001/input", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log(data.message);
      updateCurrentSyllabus(JSON.parse(data.message));
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className="h-full w-full">
      <div className="grid grid-cols-5">
        <div className="min-h-screen bg-[#1E1E1E] col-span-1 p-10">
          <div className="flex justify-center">
            <div className="w-[90%] space-y-5 flex flex-col">
              <h1 className="text-start text-white">Your classes</h1>
              {Object.keys(syllabi).map((name) =>
                name == currentClass ? (
                  <button
                    onClick={() => updateCurrentClass(name)}
                    className="text-white flex w-full items-center rounded-lg py-2 px-3 hover:cursor-pointer bg-[#292929]"
                  >
                    {name}
                  </button>
                ) : (
                  <button
                    onClick={() => updateCurrentClass(name)}
                    className="text-white flex w-full items-center rounded-lg py-2 px-3 hover:cursor-pointer hover:bg-[#292929]"
                  >
                    {name}
                  </button>
                )
              )}
              {Object.keys(syllabi).length == 0 ? (
                <div />
              ) : (
                <div className="w-full bg-white h-1" />
              )}
              <button
                onClick={() => setShowModal(true)}
                className="group flex justify-start items-center rounded-lg py-2 px-3 hover:cursor-pointer hover:bg-[#292929]"
              >
                <h1 className="text-white">Add a new class</h1>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="group-hover:rotate-180 transition duration-200 ml-2 text-white size-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </button>
              {showModal && (
                <div className="fixed bg-black/50 min-h-screen w-screen z-10 flex justify-center items-center top-0 left-0 text-white">
                  <div className="bg-[#343434] shadow-xl p-4 relative rounded-lg">
                    <div className="flex flex-col gap-4 w-[500px]">
                      <h2 className="text-slate-200 text-xl font-semibold">
                        Add a new class
                      </h2>
                      <div className="relative">
                        <input
                          onChange={(e) => setInput(e.target.value)}
                          className="peer w-full bg-transparent placeholder:text-slate-400 text-slate-200 text-sm border border-slate-400 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-200 hover:border-slate-300 shadow-sm focus:shadow"
                          required
                        />
                        <label className="absolute cursor-text bg-[#343434] px-1 left-2.5 top-2.5 text-slate-400 text-sm transition-all transform origin-left peer-focus:-top-2 peer-focus:left-2.5 peer-focus:text-xs peer-focus:text-slate-200 peer-focus:scale-90">
                          Enter name *
                        </label>
                      </div>
                      <div className="flex px-3 mt-4 justify-between">
                        <div
                          className={`text-sm ${
                            shake ? "text-red-700" : "text-slate-500"
                          } ${shake ? "shake-text" : ""}`}
                        >
                          <p>Input fields marked with *</p>
                          <p>are required</p>
                        </div>
                        <div className="flex gap-4">
                          <button
                            onClick={addClass}
                            className="group bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 rounded-full p-[1.5px] hover:cursor-pointer hover:scale-105 hover:from-yellow-500 hover:to-red-500 transition duration-200"
                          >
                            <div className="h-full w-full flex items-center justify-center py-3 px-5 rounded-full bg-[#292929]">
                              <h2 className="text-white font-semibold">
                                Add Class
                              </h2>
                            </div>
                          </button>
                          <button
                            onClick={() => setShowModal(false)}
                            className="bg-gray-500 text-black py-3 px-5 rounded-full font-semibold hover:bg-gray-400 hover:cursor-pointer hover:scale-105 transition duration-200"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-2 right-2 hover:scale-105 hover:cursor-pointer transition duration-200">
                      <IoClose
                        onClick={() => setShowModal(false)}
                        size={30}
                        className="mt-1 mr-1 text-white"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="h-screen col-span-4 py-10">
          <div className="mr-8">
            <Navigation />
          </div>
          <div className="flex h-full justify-center items-center">
            {Object.keys(syllabi).length != 0 ? (
              currentSyllabus.length === 0 ? (
                <div className="flex h-fit items-center justify-center">
                  <input
                    type="file"
                    onChange={parseSyllabus}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="h-full p-24 space-y-10 cursor-pointer border border-dashed border-slate-200 border-spacing-7 rounded-xl"
                  >
                    <div className="flex justify-center items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="size-30 text-slate-300"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m6.75 12-3-3m0 0-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                        />
                      </svg>
                    </div>
                    <p className="text-center text-slate-300 text-xl font-semibold">
                      Select your syllabus file and watch the magic happen.
                    </p>
                  </label>
                </div>
              ) : (
                <div className="w-full h-full items-center">
                  <div className="p-4 flex justify-end">
                    <button className="p-2 pl-4 pr-2 bg-white rounded-lg flex gap-2">
                      <p>Export</p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15M9 12l3 3m0 0 3-3m-3 3V2.25"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="w-[90%] m-auto rounded-lg flex items-center justify-center text-center bg-[#1E1E1E] text-white border-slate-300">
                    <p className="title w-1/3">Task</p>
                    <p className="title w-1/6">Difficulty</p>
                    <p className="title w-1/4">Due Date</p>
                    <p className="title w-1/4">Status</p>
                  </div>
                  {currentSyllabus.map((item) => (
                    <Assignment
                      taskName={item["task"]}
                      difficulty={item["difficulty"]}
                      dueDate={item["dueDate"]}
                      status={item["status"]}
                    />
                  ))}
                </div>
              )
            ) : (
              <button onClick={() => setShowModal(true)} className="group hover:cursor-pointer rounded-lg  hover:border hover:border-dashed hover:border-slate-100 transition-all duration-200">
                <div className="flex h-fit items-center justify-center">
                  <div className="h-full p-24 space-y-10 rounded-xl">
                    <div className="flex justify-center items-center">
                      <svg
                        className="size-20 group-hover:rotate-180 transition duration-200 text-slate-100 dark:text-slate-100"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <g clip-path="url(#a)">
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="m10.4149 10.7623.0005.0109m3.0868 3.0764.0005.0108M8.91554 15.349l.00046.0108m-.8276-8.44549L4.39857 19.9133l12.95163-3.7371m-.8271-8.43475c2.0971 2.09707 3.269 4.77055 3.5172 7.51635.067.7413-.4619 1.3752-1.1869 1.5293-1.0146.2158-1.9613-.5811-2.0926-1.615-.2412-1.9-.9437-3.5721-2.52-5.1484-1.5779-1.57793-3.3173-2.3457-5.25302-2.61955-1.02139-.1445-1.79555-1.1099-1.5387-2.10314.17236-.66653.76818-1.14208 1.45754-1.08543 2.78088.22851 5.49388 1.40332 7.61648 3.52587Z"
                          />
                        </g>
                        <defs>
                          <clipPath id="a">
                            <path fill="#fff" d="M0 0h24v24H0z" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <p className="text-center text-slate-100 text-xl font-semibold">
                      Looks like you haven't added any classes yet... lame...
                    </p>
                  </div>
                </div>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
