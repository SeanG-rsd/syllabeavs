import { useState } from "react";
import AddClassModal from "./addClassModal";

interface SideBarProps {
    syllabi: {};
    currentClass: string;
    isInOverview: boolean;
    selectClass: (name: string) => void;
    addClass: (className: string) => void;
    selectOverview: () => void;
}

const SideBar: React.FC<SideBarProps> = (
    { syllabi, currentClass, selectClass, addClass, selectOverview, isInOverview },
) => {
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(false);
    };

    return (
        <div className="w-72 h-screen bg-[#1E1E1E] col-span-1 p-10 flex-shrink-0 fixed">
            <div className="flex justify-center">
                <div className="w-[90%] space-y-5 flex flex-col">
                    <h1 className="text-start text-white">
                        Your classes
                    </h1>
                    {isInOverview
                        ? (
                            <button
                                    onClick={selectOverview}
                                    className="text-white flex w-full items-center rounded-lg py-2 px-3 hover:cursor-pointer bg-[#292929]"
                                >
                                {"Overview"}
                            </button>
                        )
                        : (
                            <button
                                onClick={selectOverview}
                                className="text-white flex w-full items-center rounded-lg py-2 px-3 hover:cursor-pointer hover:bg-[#292929]"
                            >
                                {"Overview"}
                            </button>
                        )}
                    {Object.keys(syllabi).length == 0
                        ? <div />
                        : <div className="w-full bg-white h-1" />}
                    {Object.keys(syllabi).map((name, index) =>
                        name == currentClass
                            ? (
                                <button
                                    key={index}
                                    onClick={() => selectClass(name)}
                                    className="text-white flex w-full items-center rounded-lg py-2 px-3 hover:cursor-pointer bg-[#292929]"
                                >
                                    {name}
                                </button>
                            )
                            : (
                                <button
                                    key={index}
                                    onClick={() => selectClass(name)}
                                    className="text-white flex w-full items-center rounded-lg py-2 px-3 hover:cursor-pointer hover:bg-[#292929]"
                                >
                                    {name}
                                </button>
                            )
                    )}
                    {Object.keys(syllabi).length == 0
                        ? <div />
                        : <div className="w-full bg-white h-1" />}
                    <button
                        onClick={() => setShowModal(true)}
                        className="group flex justify-start items-center rounded-lg py-2 px-3 hover:cursor-pointer hover:bg-[#292929]"
                    >
                        <h1 className="text-white">Add a new class</h1>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="group-hover:rotate-180 transition duration-200 ml-2 text-white size-4"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 4.5v15m7.5-7.5h-15"
                            />
                        </svg>
                    </button>
                    {showModal && (
                        <div className="fixed bg-black/50 min-h-screen w-screen z-10 flex justify-center items-center top-0 left-0 text-white">
                            {showModal
                                ? (
                                    <AddClassModal
                                        closeModal={toggleModal}
                                        addClass={addClass}
                                    />
                                )
                                : null}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SideBar;
