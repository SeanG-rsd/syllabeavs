interface AssignmentProps {
    taskName: string;
    dueDate: string;
    difficulty: string;
    status: string;
}

const Assignment: React.FC<AssignmentProps> = ({ taskName, dueDate, difficulty, status }) => {
    return (
        <div className="flex gap-8 p-8 w-full justify-between">
            <p className="info w-1/3">{taskName}</p>
            <p className="info w-1/6">{difficulty}</p>
            <p className="info w-1/4">{dueDate}</p>
            <p className="info w-1/4">{status}</p>
        </div>
    );
};

export default Assignment;
