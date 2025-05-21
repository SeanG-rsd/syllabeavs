import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Assignment } from "@/app/types/assignment";

interface AssignmentProps {
  assignment: Assignment;
  updateStatus: (status: string) => void;
}

const OverviewAssignmentUI: React.FC<AssignmentProps> = ({
  assignment,
  updateStatus,
}) => {
  const [assignmentState, setAssignmentState] = useState(assignment.status);
  const [stateColor, setStateColor] = useState("text-[var(--color-notstarted)]");

  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    if (assignmentState == "Not Started") setStateColor("text-[var(--color-notstarted)]");
    else if (assignmentState == "In Progress") setStateColor("text-[var(--color-inprogress)]");
    else if (assignmentState == "Complete") setStateColor("text-[var(--color-complete)]");
    if (isLoaded) {
      updateStatus(assignmentState);
    } else { setLoaded(true); }
  }, [assignmentState]);

  const elements = [];
  for (let i = 0; i < assignment.difficulty; i++) {
    elements.push(
      <svg
      key={i}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="size-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
        />
      </svg>,
    );
  }

  return (
    <div className="rounded-lg flex items-center justify-center w-full">
      <p className="info w-1/3 text-white text-sm">{assignment.task}</p>
      <div className="info flex w-1/4 text-slate-400">{elements}</div>
      <p className="info w-1/6 text-slate-400">{assignment.dueDate}</p>
      <div
        className={`info w-1/4 flex items-center text-sm group relative ${stateColor} hover:cursor-pointer`}
      >
        {assignmentState}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="white"
          className="size-4 ml-2 font-semibold group-hover:rotate-180 duration-200"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m4.5 15.75 7.5-7.5 7.5 7.5"
          />
        </svg>
        <div className="absolute top-full border border-white bg-[#292929] z-10 grid grid-row-4 rounded-lg p-3 shadow-md
                      space-y-1 scale-y-0 group-hover:scale-y-100 origin-top duration-200">
          <button
            onClick={() => setAssignmentState("Not Started")}
            className="text-sm py-1 rounded-md flex text-[var(--color-notstarted)] hover:bg-slate-700  hover:cursor-pointer transition-all duration-100"
          >
            Not Started
          </button>
          <button
            onClick={() => setAssignmentState("In Progress")}
            className="text-sm py-1 rounded-md flex text-[var(--color-inprogress)] hover:bg-slate-700 gray-800 hover:cursor-pointer transition-all duration-100"
          >
            In Progress
          </button>
          <button
            onClick={() => setAssignmentState("Complete")}
            className="text-sm py-1 rounded-md flex text-[var(--color-complete)] hover:bg-slate-700 hover:cursor-pointer transition-all duration-100"
          >
            Complete
          </button>
        </div>
      </div>
    </div>
  );
};

export default OverviewAssignmentUI;
