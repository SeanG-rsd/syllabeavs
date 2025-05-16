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
    ) => void;
    updateStatus: (
        status: string,
        index: number,
    ) => void;
    syllabus: Assignment[];
}

const AssignmentList: React.FC<AssignmentListProps> = (
    { updateSyllabus, updateStatus, syllabus },
) => {
    return (
        <div className="w-full h-full items-center">
            <div className="m-4 rounded-lg flex items-center justify-center text-center bg-[#1E1E1E] text-white border-slate-300">
                <p className="title w-1/3">Task</p>
                <button
                    onClick={() =>
                        updateSyllabus(
                            getDifficulty,
                            getDate,
                            getProgress,
                        )}
                    className="title w-1/6"
                >
                    Difficulty
                </button>
                <button
                    onClick={() =>
                        updateSyllabus(
                            getDate,
                            getDifficulty,
                            getProgress,
                        )}
                    className="title w-1/4"
                >
                    Due Date
                </button>
                <button
                    onClick={() =>
                        updateSyllabus(
                            getProgress,
                            getDate,
                            getDifficulty,
                        )}
                    className="title w-1/4"
                >
                    Status
                </button>
            </div>

            <div>
                {syllabus.map((item, index) => (
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                        key={index}
                    >
                        <AssignmentUI
                            assignment={item}
                            updateStatus={(status) => {
                                updateStatus(status, index);
                            }}
                        />
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default AssignmentList;
