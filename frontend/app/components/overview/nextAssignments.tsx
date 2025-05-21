import { Assignment } from "@/app/types/assignment";
import { useEffect, useState } from "react";
import OverviewAssignmentUI from "./overviewAssignmentUI";

interface NextAssignmentsProps {
    syllabi: { [key: string]: Assignment[] };
}

const NextAssignments: React.FC<NextAssignmentsProps> = ({ syllabi }) => {
    const updateStatus = (status: string) => {
    };

    var ass = syllabi["test"][1];

    return (
        <div className="w-11/12 flex flex-col items-center mt-8">
            <h1 className="w-full p-4 text-center font-semibold bg-[#1E1E1E] rounded-2xl text-white border-slate-300 flex flex-col items-center">
                Upcoming Assignments
                <div className="bg-blue-100 h-0.5 mt-0.5 w-1/2"></div>
            </h1>
            <div className="flex flex-col gap-2 w-full mt-2">
                <OverviewAssignmentUI
                    assignment={ass}
                    updateStatus={updateStatus}
                />
                <OverviewAssignmentUI
                    assignment={ass}
                    updateStatus={updateStatus}
                />
                <OverviewAssignmentUI
                    assignment={ass}
                    updateStatus={updateStatus}
                />
                <OverviewAssignmentUI
                    assignment={ass}
                    updateStatus={updateStatus}
                />
                <OverviewAssignmentUI
                    assignment={ass}
                    updateStatus={updateStatus}
                />
            </div>
        </div>
    );
};

export default NextAssignments;
