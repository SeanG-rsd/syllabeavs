import { useState } from "react";
import AddClassModal from "./addClassModal";
import DeleteClassModal from "./deleteClassModal";

interface SideBarProps {
    syllabi: {};
    currentClass: string;
    isInOverview: boolean;
    selectClass: (name: string) => void;
    addClass: (className: string) => void;
    deleteClass: (className: string) => void;
    selectOverview: () => void;
}

const SideBar: React.FC<SideBarProps> = (
    {
        syllabi,
        currentClass,
        selectClass,
        addClass,
        selectOverview,
        isInOverview,
        deleteClass,
    },
) => {
    const [addClassModal, setAddClassModal] = useState(false);
    const [deleteClassModal, setDeleteClassModal] = useState(false);
    const [deleteClassName, setDeleteClass] = useState("");

    const toggleAddClassModal = () => {
        setAddClassModal(false);
    };

    const toggleDeleteClassModal = () => {
        setDeleteClassModal(false);
    };

    const openDeleteClass = (clasName: string) => {
        setDeleteClass(clasName);
        setDeleteClassModal(true);
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
                                    className="w-full rounded-lg py-2 px-3 hover:cursor-pointer bg-[#292929] flex items-center justify-between text-white"
                                    key={index}
                                    onClick={() => selectClass(name)}
                                >
                                    <h1>
                                        {name}
                                    </h1>
                                    <button
                                        className="bg-transparent"
                                        onClick={() => openDeleteClass(name)}
                                    >
                                        <div className="w-6 h-6 flex items-center justify-center hover:cursor-pointer">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className="size-4 hover:size-6 duration-100"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                                />
                                            </svg>
                                        </div>
                                    </button>
                                </button>
                            )
                            : (
                                <button
                                    className="text-white flex w-full items-center justify-between rounded-lg py-2 px-3 hover:cursor-pointer hover:bg-[#292929]"
                                    key={index}
                                    onClick={() => selectClass(name)}
                                >
                                    <div>
                                        {name}
                                    </div>
                                    <button
                                        className="bg-transparent"
                                        onClick={() => openDeleteClass(name)}
                                    >
                                        <div className="w-6 h-6 flex items-center justify-center hover:cursor-pointer">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className="size-4 hover:size-6 duration-100"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                                />
                                            </svg>
                                        </div>
                                    </button>
                                </button>
                            )
                    )}
                    {Object.keys(syllabi).length == 0
                        ? <div />
                        : <div className="w-full bg-white h-1" />}
                    <button
                        onClick={() => setAddClassModal(true)}
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
                    {addClassModal && (
                        <AddClassModal
                            closeModal={toggleAddClassModal}
                            addClass={addClass}
                        />
                    )}
                    {deleteClassModal && (
                        <DeleteClassModal
                            close={toggleDeleteClassModal}
                            deleteClass={deleteClass}
                            className={deleteClassName}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default SideBar;
