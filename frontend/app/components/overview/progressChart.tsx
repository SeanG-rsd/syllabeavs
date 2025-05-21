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
        <div className="w-full flex flex-col items-center">
            <div>
                <svg width="400" height="400" viewBox="0 0 42 42">
                    <circle
                        r="15.915"
                        cx="21"
                        cy="21"
                        fill="transparent"
                        stroke="var(--color-complete)"
                        strokeWidth="3"
                        strokeDasharray={`${completePercent} ${
                            100 - completePercent
                        }`}
                        strokeDashoffset="0"
                    />
                    <circle
                        r="15.915"
                        cx="21"
                        cy="21"
                        fill="transparent"
                        stroke="var(--color-inprogress)"
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
                        stroke="var(--color-notstarted)"
                        strokeWidth="3"
                        strokeDasharray={`${notStartedPercent} ${
                            100 - notStartedPercent
                        }`}
                        strokeDashoffset={`${
                            100 - (completePercent + inProgressPercent)
                        }`}
                    />
                    <text x="21" y="21" fill="white" fontSize="4" textAnchor="middle" dominantBaseline="central">1000 / 1000</text>
                </svg>
            </div>
            <div className="flex w-full justify-around py-4 text-lg text-white">
                <h1 className="p-4 border-black rounded-lg box-shadow-red">Not Started: 10</h1>
                <h1 className="p-4 border-black rounded-lg box-shadow-orange">In Progress: 10</h1>
                <h1 className="p-4 border-black rounded-lg box-shadow-green">Complete: 10</h1>
            </div>
        </div>
    );
};

export default OverviewTotalProgress;
