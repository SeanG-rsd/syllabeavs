import { Assignment } from "@/app/types/assignment";
import { useEffect, useState } from "react";
import OverviewAssignmentUI from "./overviewAssignmentUI";
import { getNextAssignments } from "@/app/util/syllabusSorting";

interface NextAssignmentsProps {
    syllabi: { [key: string]: Assignment[] };
    update: (status: string, assignment: Assignment, syllabus: string) => void;
}

const NextAssignments: React.FC<NextAssignmentsProps> = ({ syllabi, update }) => {
    const updateStatus = (assignment: Assignment, className: string, status: string) => {
        update(status, assignment, className);
    };
    
    var nextAssignments = getNextAssignments(syllabi, 5);

    return (
        <div className="w-11/12 flex flex-col items-center mt-8">
            <h1 className="w-full p-4 text-center font-semibold bg-[#1E1E1E] rounded-2xl text-white border-slate-300 flex flex-col items-center">
                Upcoming Assignments
                <div className="bg-blue-100 h-0.5 mt-0.5 w-1/2"></div>
            </h1>
            <div className="flex flex-col gap-2 w-full mt-2">
                {nextAssignments.map((a) => (<OverviewAssignmentUI assignment={a} updateStatus={updateStatus} key={`${a.task}-OverviewAssignment-${a.class}`}/>))}
            </div>
        </div>
    );
};

export default NextAssignments;
