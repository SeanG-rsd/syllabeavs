"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import AssignmentUI from "../components/assignments/assignment";
import { Assignment } from "../types/assignment";
import Navigation from "../components/Navigation";
import {
  getDate,
  getDifficulty,
  getProgress,
} from "@/app/util/syllabusSorting";
import {
  getSyllabiData,
  parseSyllabusData,
  updateAssignmentData,
} from "../api/syllabus/syllabi";
import AddClassModal from "../components/generatePage/addClassModal";
import AssignmentList from "../components/generatePage/assignmentList";
import ButtonBar from "../components/generatePage/buttonBar";
import SideBar from "../components/generatePage/classSideBar";
import LoadingIndicator from "../components/generatePage/loadingIndicator";
import NoClasses from "../components/generatePage/noClasses";
import Overview from "../components/generatePage/overview";
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
      setLoaded(true);
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

  const updateCurrentSyllabus = (assignment: []) => {
    syllabi[currentClass] = assignment;
    setSyllabi(syllabi);
    setCurrentClass(currentClass);
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
  ) => {
    setCurrentSyllabus(currentSyllabus.sort((a, b) => {
      if (first(a, b) != 0) {
        return first(a, b);
      } else if (second(a, b) != 0) {
        return second(a, b);
      }
      return third(a, b);
    }));
  };

  const updateCurrentStatus = async (status: string, index: number) => {
    // const response = updateAssignmentData(
    //   status,
    //   index,
    //   currentClass,
    //   currentSyllabus,
    // );
  };

  const getSyllabi = async () => {
    const output = await getSyllabiData();

    if (output != null) {
      setSyllabi((prev) => ({
        ...output,
        ...prev,
      }));
    }
  };

  const parseSyllabus = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);

    const parsed = await parseSyllabusData(e, currentClass);

    setLoading(false);
    updateCurrentSyllabus(parsed);
  };

  return (
    <section className="flex min-w-screen min-h-screen bg-[#292929]">
      <div className="h-full w-full overflow-hidden">
        <SideBar
          syllabi={syllabi}
          currentClass={currentClass}
          selectClass={selectClass}
          addClass={addClass}
          selectOverview={selectOverview}
          isInOverview={isInOverview}
        >
        </SideBar>
        <div className="h-screen col-span-4 py-10 ml-72 overflow-y-auto flex-1 ">
          <div className="mr-8">
            <Navigation />
          </div>
          <div className="flex h-full justify-center items-center">
            {isInOverview
              ? Object.keys(syllabi).length != 0
                ? <Overview syllabi={syllabi} />
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
    </section>
  );
}
