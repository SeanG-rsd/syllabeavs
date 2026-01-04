import { Assignment } from "@/app/types/assignment";
import NextAssignments from "./nextAssignments";
import OverviewTotalProgress from "./progressChart";
import NoAssignments from "../generatePage/noAssignments";

interface OverviewProps {
    syllabi: {}
    update: (status: string, assignment: Assignment, syllabus: string) => void;
}

const Overview: React.FC<OverviewProps> = ({syllabi, update}) => {
    var count = 0;
    for (var syllabus in syllabi) {
        count += syllabus.length
    }

    if (count == 0) {
        return <NoAssignments/>
    }

    return (
        <div className="w-full flex items-center mt-4">
            <div className="flex flex-col w-5/12 items-center">
                <OverviewTotalProgress syllabi={syllabi}/>
            </div>
            <div className="flex flex-col w-7/12 items-center">
                <NextAssignments syllabi={syllabi} update={update}/>
            </div>
        </div>
    );
}

export default Overview;