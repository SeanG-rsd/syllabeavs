"use client";

import { useEffect, useState } from "react";
import { Assignment } from "../types/assignment";
import Navigation from "../components/Navigation";
import {
  deleteSyllabus,
  getSyllabiData,
  parseSyllabusData,
  updateAssignmentData,
  updateSyllabus
} from "../api/syllabus/syllabi";
import AssignmentList from "../components/generatePage/assignmentList";
import ButtonBar from "../components/generatePage/buttonBar";
import SideBar from "../components/generatePage/classSideBar";
import LoadingIndicator from "../components/generatePage/loadingIndicator";
import NoClasses from "../components/generatePage/noClasses";
import Overview from "../components/overview/overview";
import UploadSyllabus from "../components/generatePage/uploadSyllabus";

export default function Generate() {
  const [currentSyllabus, setCurrentSyllabus] = useState<Assignment[]>([]);

  const [isInOverview, setOverview] = useState(true);
  const [currentClass, setCurrentClass] = useState("");

  const [newClass, setNewClass] = useState("");

  const [loaded, setLoaded] = useState(false);

  const [syllabi, setSyllabi] = useState<{ [key: string]: Assignment[] }>({});

  const [isLoading, setLoading] = useState(false);
  const [loadingInfo, setLoadingInfo] = useState("Loading Assignments...");

  useEffect(() => {
    if (!loaded) {
      getSyllabi();
    }
  });

  useEffect(() => {
    if (isLoading) {
      console.log("test");
      setTimeout(() => {
        if (isLoading) {
          setLoadingInfo("Almost There...");
        }
      }, 5000);
    } else {
      setLoadingInfo("Loading Assignments...");
    }
  }, [isLoading]);

  useEffect(() => {
    if (newClass != "") {
      selectClass(newClass);
      setNewClass("");
    }
  }, [syllabi]);

  const addClass = (className: string) => {
    // adds empty class to syllabi list
    setNewClass(className);

    setSyllabi((prev) => ({
      ...prev,
      [className]: [],
    }));
  };

  const deleteClass = (className: string) => {
    console.log(`Delete Class: ${className}`);
    deleteSyllabus(className);

    const updatedSyllabi = syllabi;
    delete updatedSyllabi[className];
    setSyllabi(updatedSyllabi);
    selectOverview();
  };

  const updateCurrentSyllabus = (assignment: Assignment[]) => {
    const updatedSyllabi = {
      ...syllabi,
      [currentClass]: assignment,
    };

    setSyllabi(updatedSyllabi);
    setCurrentSyllabus(assignment);
  };

  const selectClass = (className: string) => {
    setCurrentClass(className);
    setCurrentSyllabus(syllabi[className]);
    setOverview(false);
  };

  const selectOverview = () => {
    setOverview(true);
    setCurrentClass("");
    setCurrentSyllabus([]);
  };

  const sortCurrentSyllabus = (
    first: Function,
    second: Function,
    third: Function,
    ascending: boolean,
  ) => {
    console.log("update syllabus: ", ascending);

    const copy = [...currentSyllabus];
    copy.sort((a, b) => {
      let result = first(a, b);
      if (result !== 0) return ascending ? result : -result;

      result = second(a, b);
      if (result !== 0) return result;

      result = third(a, b);
      return result;
    });

    console.log("sorted");
    console.log("Sorted by progress:", copy.map((a) => a.status));

    updateCurrentSyllabus(copy);
  };

  const updateCurrentStatus = async (status: string, index: number) => {
    updateAssignmentData(
      status,
      index,
      currentClass,
      currentSyllabus,
    );
  };

  const updateSyllabusStatus = (
    status: string,
    assignment: Assignment,
    syllabus: string,
  ) => {
    const updatedAssignments = syllabi[syllabus].map((a) =>
    a === assignment ? { ...a, status } : a
  );

  updateSyllabus(syllabus, updatedAssignments);

  setSyllabi({
    ...syllabi,
    [syllabus]: updatedAssignments,
  });
  };

  const getSyllabi = async () => {
    const output = await getSyllabiData();

    if (output != null) {
      setSyllabi((prev) => ({
        ...output,
        ...prev,
      }));
    }

    setLoaded(true);
  };

  const parseSyllabus = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);

    const parsed = await parseSyllabusData(e, currentClass);

    setLoading(false);
    updateCurrentSyllabus(parsed);
  };

  return (
    <section className="flex min-w-screen min-h-screen bg-[#292929]">
      {loaded
        ? (
          <div className="w-full overflow-hidden">
            <SideBar
              syllabi={syllabi}
              currentClass={currentClass}
              selectClass={selectClass}
              addClass={addClass}
              deleteClass={deleteClass}
              selectOverview={selectOverview}
              isInOverview={isInOverview}
            >
            </SideBar>
            <div className="col-span-4 ml-72 h-screen overflow-y-auto flex flex-col py-6">
              <div className="mr-8">
                <Navigation />
              </div>
              <div className="flex-1 flex justify-center items-center mt-2">
                {isInOverview
                  ? Object.keys(syllabi).length != 0
                    ? (
                      <Overview
                        syllabi={syllabi}
                        update={updateSyllabusStatus}
                      />
                    )
                    : <NoClasses addClass={addClass} />
                  : (currentSyllabus.length === 0
                    ? (
                      isLoading
                        ? <LoadingIndicator loadingText={loadingInfo} />
                        : <UploadSyllabus parseSyllabus={parseSyllabus} />
                    )
                    : (
                      <div className="w-full h-full items-center mt-10">
                        <ButtonBar />
                        <AssignmentList
                          updateSyllabus={sortCurrentSyllabus}
                          syllabus={currentSyllabus}
                          updateStatus={updateCurrentStatus}
                        />
                      </div>
                    ))}
              </div>
            </div>
          </div>
        )
        : (
          <div
            role="status"
            className="w-full h-screen flex items-center justify-center"
          >
            <svg
              aria-hidden="true"
              className="w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-orange-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />{" "}
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
        )}
    </section>
  );
}
