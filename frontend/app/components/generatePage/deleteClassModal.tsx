import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

interface DeleteClassModalProps {
    close: () => void;
    deleteClass: (className: string) => void;
    className: string;
}

const DeleteClassModal: React.FC<DeleteClassModalProps> = (
    { close, deleteClass, className },
) => {
    return (
        <div className="fixed bg-black/50 min-h-screen w-screen z-10 flex justify-center items-center top-0 left-0 text-white">
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ scale: 0 }}
                    key="box"
                >
                    <div className="bg-[#343434] z-20 shadow-xl p-6 relative rounded-lg">
                        <div className="flex flex-col gap-4 w-[500px]">
                            <h2 className="text-slate-200 text-xl font-semibold text-center">
                                Delete {className}?
                            </h2>
                            <div className="flex px-3 mt-4 justify-around">
                                <button
                                    onClick={() => {
                                        deleteClass(className);
                                        close();
                                    }}
                                    className="group bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 rounded-full p-[1.5px] hover:cursor-pointer hover:scale-105 hover:from-yellow-500 hover:to-red-500 transition duration-200"
                                >
                                    <div className="h-full w-full flex items-center justify-center py-3 px-5 rounded-full bg-[#292929]">
                                        <h2 className="text-white font-semibold">
                                            Delete Class
                                        </h2>
                                    </div>
                                </button>
                                <button
                                    onClick={close}
                                    className="bg-gray-500 text-black py-3 px-5 rounded-full font-semibold hover:bg-gray-400 hover:cursor-pointer hover:scale-105 transition duration-200"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default DeleteClassModal;
