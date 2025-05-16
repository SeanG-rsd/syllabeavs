import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

interface AddClassModalProps {
    addClass: (className: string) => void;
    closeModal: () => void;
}

const AddClassModal: React.FC<AddClassModalProps> = ({
    addClass,
    closeModal,
}) => {
    const [shake, setShake] = useState(false);

    const [input, setInput] = useState("");

    const submit = () => {
        if (input != "") {
            addClass(input);
            closeModal();
            setShake(false);

            setInput("");
        } else {
            setShake(true);

            setTimeout(() => {
                setShake(false);
            }, 500);
        }
    };

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
                            <h2 className="text-slate-200 text-xl font-semibold">
                                Add a new class
                            </h2>
                            <div className="relative">
                                <input
                                    onChange={(e) => setInput(e.target.value)}
                                    className="peer w-full bg-transparent placeholder:text-slate-400 text-slate-200 text-sm border border-slate-400 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-200 hover:border-slate-300 shadow-sm focus:shadow"
                                    required
                                />
                                <label className="absolute cursor-text bg-[#343434] px-1 left-2.5 top-2.5 text-slate-400 text-sm transition-all transform origin-left peer-focus:-top-2 peer-focus:left-2.5 peer-focus:text-xs peer-focus:text-slate-200 peer-focus:scale-90">
                                    Enter name *
                                </label>
                            </div>
                            <div className="flex px-3 mt-4 justify-between">
                                <div
                                    className={`text-sm ${
                                        shake
                                            ? "text-red-700"
                                            : "text-slate-500"
                                    } ${shake ? "shake-text" : ""}`}
                                >
                                    <p>Input fields marked with *</p>
                                    <p>are required</p>
                                </div>
                                <div className="flex gap-4">
                                    <button
                                        onClick={submit}
                                        className="group bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 rounded-full p-[1.5px] hover:cursor-pointer hover:scale-105 hover:from-yellow-500 hover:to-red-500 transition duration-200"
                                    >
                                        <div className="h-full w-full flex items-center justify-center py-3 px-5 rounded-full bg-[#292929]">
                                            <h2 className="text-white font-semibold">
                                                Add Class
                                            </h2>
                                        </div>
                                    </button>
                                    <button
                                        onClick={closeModal}
                                        className="bg-gray-500 text-black py-3 px-5 rounded-full font-semibold hover:bg-gray-400 hover:cursor-pointer hover:scale-105 transition duration-200"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default AddClassModal;
