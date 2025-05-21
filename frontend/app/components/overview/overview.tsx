import NextAssignments from "./nextAssignments";
import OverviewTotalProgress from "./progressChart";

interface OverviewProps {
    syllabi: {}
}

const Overview: React.FC<OverviewProps> = ({syllabi}) => {
    return (
        <div className="w-full flex items-center mt-4">
            <div className="flex flex-col w-1/2 items-center">
                <OverviewTotalProgress syllabi={syllabi}/>
            </div>
            <div className="flex flex-col w-1/2 items-center">
                <NextAssignments syllabi={syllabi}/>
            </div>
        </div>
    );
}

export default Overview;