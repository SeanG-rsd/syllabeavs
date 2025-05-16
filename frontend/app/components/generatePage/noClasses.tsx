import { useState } from "react";
import AddClassModal from "./addClassModal";

interface NoClassesProps {
    addClass: (className: string) => void;
}

const NoClasses: React.FC<NoClassesProps> = ({addClass}) => {
    const [showModal, setShowModal] = useState(false);
    
        const toggleModal = () => {
            setShowModal(false);
        };

    return (
        <div>
            {showModal ? <AddClassModal addClass={addClass} closeModal={toggleModal}></AddClassModal> : <div/>}
            <button 
             onClick={() => setShowModal(true)}
             className="group hover:cursor-pointer rounded-lg  border border-dashed border-slate-100 transition-all duration-200">
                <div className="flex h-fit items-center justify-center">
                    <div className="h-full p-24 space-y-10 rounded-xl">
                        <div className="flex justify-center items-center ">
                            <svg
                                className="size-20 group-focus:hidden group-hover:rotate-180 transition duration-200v text-slate-300"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <g clipPath="url(#a)">
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m10.4149 10.7623.0005.0109m3.0868 3.0764.0005.0108M8.91554 15.349l.00046.0108m-.8276-8.44549L4.39857 19.9133l12.95163-3.7371m-.8271-8.43475c2.0971 2.09707 3.269 4.77055 3.5172 7.51635.067.7413-.4619 1.3752-1.1869 1.5293-1.0146.2158-1.9613-.5811-2.0926-1.615-.2412-1.9-.9437-3.5721-2.52-5.1484-1.5779-1.57793-3.3173-2.3457-5.25302-2.61955-1.02139-.1445-1.79555-1.1099-1.5387-2.10314.17236-.66653.76818-1.14208 1.45754-1.08543 2.78088.22851 5.49388 1.40332 7.61648 3.52587Z"
                                    />
                                </g>
                                <defs>
                                    <clipPath id="a">
                                        <path fill="#fff" d="M0 0h24v24H0z" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>
                        <p className="text-center bg-gradient-to-r from-red-500 to-orange-500 inline-block text-transparent bg-clip-text text-xl font-semibold">
                            Looks like you haven't added any classes yet...
                            lame...
                        </p>
                    </div>
                </div>
            </button>
        </div>
    );
};

export default NoClasses;
