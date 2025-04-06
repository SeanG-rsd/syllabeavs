interface AssignmentProps {
    taskName: string;
    dueDate: string;
    difficulty: number;
    status: string;
}

const Assignment: React.FC<AssignmentProps> = ({ taskName, dueDate, difficulty, status }) => {
    const elements = [];
    for (let i = 0; i < difficulty; i++) {
        elements.push(<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
          </svg>
          );
    }

    return (
        <div className="flex bg-white items-center justify-center text-center border-b-2 border-red-500">
            <p className="info w-1/3">{taskName}</p>
            <div className="info flex w-1/6">
                {elements}
            </div>
            <p className="info w-1/4">{dueDate}</p>
            <p className="info w-1/4">{status}</p>
        </div>
    );
};

export default Assignment;
