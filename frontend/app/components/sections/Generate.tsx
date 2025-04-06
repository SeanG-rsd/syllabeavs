import { useState } from "react";
import Assignment from "../assignment";

export default function Generate() {
  const [currentSyllabus, setSyllabus] = useState([]);

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
      setSyllabus(JSON.parse(data.message));
      console.log(data.message);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className="h-full w-full">
      <div className="grid grid-cols-5">
        <div className="bg-white col-span-1">
          <button>Class List</button>
        </div>
        <div className="bg-[#292929] col-span-4">
          {currentSyllabus.length === 0
            ? <input type="file" onChange={parseSyllabus} />
            : (
              <div className="w-full">
                <div className="flex h-20 bg-black">
                  <p></p>
                </div>
                <div className="flex bg-white g-8 p-8 items-center justify-center text-center">
                  <p className="title w-1/3">Task</p>
                  <p className="title w-1/6">Difficulty</p>
                  <p className="title w-1/4">Due Date</p>
                  <p className="title w-1/4">Status</p>
                </div>
                <div className="p-2 bg-gray-600 m-4"></div>
                {currentSyllabus.map((item) => (
                  <Assignment 
                    taskName={item["task"]} 
                    difficulty={item["difficulty"]} 
                    dueDate={item["dueDate"]} 
                    status={item["status"]} 
                  />
                ))}
              </div>
            )}
        </div>
      </div>
    </div>
  );
}
