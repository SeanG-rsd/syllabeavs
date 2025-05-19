import OverviewTotalProgress from "./overviewTotalProgress";

interface OverviewProps {
    syllabi: {}
}

const Overview: React.FC<OverviewProps> = ({syllabi}) => {
    return (
        <div className="w-full h-full flex flex-col items-center">
            <div>

            </div>
            <div className="flex">
                <OverviewTotalProgress syllabi={syllabi}/>
            </div>
        </div>
    );
}

export default Overview;