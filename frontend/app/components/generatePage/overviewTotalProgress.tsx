import { Assignment } from "@/app/types/assignment";
import { useEffect, useState } from "react";

interface OverviewTotalProgressProps {
    syllabi: { [key: string]: Assignment[] };
}

const OverviewTotalProgress: React.FC<OverviewTotalProgressProps> = (
    { syllabi },
) => {
    const [info, setInfo] = useState<{ [key: string]: number }>({
        "Total": 0,
        "Complete": 0,
        "In Progress": 0,
        "Not Started": 0,
    });

    useEffect(() => {
        const counts: Record<string, number> = {
            "Total": 0,
            "Complete": 0,
            "In Progress": 0,
            "Not Started": 0,
        };

        for (const className in syllabi) {
            const syllabus = syllabi[className];
            syllabus.forEach((assignment) => {
                counts[assignment.status]++;
                counts["Total"]++;
            });
        }

        setInfo(counts);
    }, [syllabi]);

    var completePercent = Math.ceil((info["Complete"] / info["Total"]) * 100);
    var inProgressPercent = Math.ceil(
        (info["In Progress"] / info["Total"]) * 100,
    );
    var notStartedPercent = 100 - completePercent - inProgressPercent;

    return (
        <svg width="400" height="400" viewBox="0 0 42 42">
            <circle
                r="15.915"
                cx="21"
                cy="21"
                fill="transparent"
                stroke="green"
                strokeWidth="3"
                strokeDasharray={`${completePercent} ${100 - completePercent}`}
                strokeDashoffset="0"
            />
            <circle
                r="15.915"
                cx="21"
                cy="21"
                fill="transparent"
                stroke="orange"
                strokeWidth="3"
                strokeDasharray={`${inProgressPercent} ${
                    100 - inProgressPercent
                }`}
                strokeDashoffset={`${100 - completePercent}`}
            />
            <circle
                r="15.915"
                cx="21"
                cy="21"
                fill="transparent"
                stroke="red"
                strokeWidth="3"
                strokeDasharray={`${notStartedPercent} ${
                    100 - notStartedPercent
                }`}
                strokeDashoffset={`${
                    100 - (completePercent + inProgressPercent)
                }`}
            />
        </svg>
    );
};

export default OverviewTotalProgress;
