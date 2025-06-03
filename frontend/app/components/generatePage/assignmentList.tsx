import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import {
    getDate,
    getDifficulty,
    getProgress,
} from "@/app/util/syllabusSorting";
import { Assignment } from "@/app/types/assignment";
import AssignmentUI from "@/app/components/assignments/assignment";

interface AssignmentListProps {
    updateSyllabus: (
        first: Function,
        second: Function,
        third: Function,
        ascending: boolean,
    ) => void;
    updateStatus: (
        status: string,
        index: number,
    ) => void;
    updateDate: (
        date: Date,
        index: number
    ) => void;
    syllabus: Assignment[];
}

const AssignmentList: React.FC<AssignmentListProps> = (
    { updateSyllabus, updateStatus, updateDate, syllabus },
) => {
    const [dateAscend, setDate] = useState(false);
    const [diffAscend, setDiff] = useState(false);
    const [progressAscend, setProgress] = useState(false);

    return (
        <div className="w-full h-full items-center">
            <div className="m-4 rounded-lg flex items-center justify-center text-center bg-[#1E1E1E] text-white border-slate-300">
                <p className="title w-1/3">Task</p>
                <button
                    onClick={() => {
                        const newAscend = !diffAscend;
                        setDiff(newAscend);
                        updateSyllabus(
                            getDifficulty,
                            getDate,
                            getProgress,
                            newAscend,
                        );
                    }}
                    className="w-1/6 flex items-center cursor-pointer"
                >
                    <div className="title">
                        Difficulty
                    </div>
                    <motion.div
                        animate={{ rotateZ: diffAscend ? 0 : 180 }}
                        transition={{ duration: 0.2 }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="white"
                            className="w-4 h-4 font-semibold"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m4.5 15.75 7.5-7.5 7.5 7.5"
                            />
                        </svg>
                    </motion.div>
                </button>
                <button
                    className="w-1/4 flex items-center cursor-pointer"
                    onClick={() => {
                        const newAscend = !dateAscend;
                        setDate(newAscend);
                        updateSyllabus(
                            getDate,
                            getDifficulty,
                            getProgress,
                            newAscend,
                        );
                    }}
                >
                    <div className="title">
                        Due Date
                    </div>
                    <motion.div
                        animate={{ rotateZ: dateAscend ? 0 : 180 }}
                        transition={{ duration: 0.2 }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="white"
                            className="w-4 h-4 font-semibold"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m4.5 15.75 7.5-7.5 7.5 7.5"
                            />
                        </svg>
                    </motion.div>
                </button>
                <button
                    className="w-1/4 flex items-center cursor-pointer"
                    onClick={() => {
                        const newAscend = !progressAscend;
                        setProgress(newAscend);
                        updateSyllabus(
                            getProgress,
                            getDate,
                            getDifficulty,
                            newAscend,
                        );
                    }}
                >
                    <div className="title">
                        Status
                    </div>
                    <motion.div
                        animate={{ rotateZ: progressAscend ? 0 : 180 }}
                        transition={{ duration: 0.2 }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="white"
                            className="w-4 h-4 font-semibold"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m4.5 15.75 7.5-7.5 7.5 7.5"
                            />
                        </svg>
                    </motion.div>
                </button>
            </div>

            <div>
                {syllabus.map((item, index) => (
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                        key={`${item.task}-${item.dueDate}`}
                    >
                        <AssignmentUI
                            assignment={item}
                            updateStatus={(status) => {
                                updateStatus(status, index);
                            }}
                            updateDate={(date) => {updateDate(date, index);}}
                        />
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default AssignmentList;
