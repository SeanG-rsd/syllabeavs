import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface DateChangePopupProps {
    dueDate: Date;
    setNewDate: (date: Date) => void;
    close: () => void;
}

const DateChangePopup: React.FC<DateChangePopupProps> = ({ dueDate, setNewDate, close }) => {
    const today = new Date();
    
    const [month, setMonth] = useState(new Date());

    const monthName = month.toLocaleDateString("en", { month: "short", year: "2-digit" });

    var firstDay = new Date(month.getFullYear(), month.getMonth(), 1);
    var lastDay = new Date(month.getFullYear(), month.getMonth() + 1, 0);

    var weeks = Math.ceil((firstDay.getDay() + lastDay.getDate()) / 7.0);

    var visual = [];
    const days = ["S", "M", "T", "W", "T", "F", "S"];
    const style = "h-6 w-6 rounded-full text-sm text-center flex items-center justify-center";

    const clickDate = (day: number) => {
        setNewDate(new Date(month.getFullYear(), month.getMonth(), day));
        close();
    }

    const increaseMonth = () => {
        setMonth(new Date(month.getFullYear(), month.getMonth() + 1))
    }

    const decreaseMonth = () => {
        setMonth(new Date(month.getFullYear(), month.getMonth() - 1))
    }

    for (let i = 0; i < 7; i++) {
        visual.push(
            <div className={`${style} text-white font-semibold`} key={`date_change_popup_${days[i]}-${i}`}>
                {days[i]}
            </div>,
        );
    }

    for (let i = 0; i < firstDay.getDay(); i++) {
        visual.push(
            <div className="size-6" key={`date_change_popup_${i}-blank`}>
            </div>,
        );
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
        var newStyle = style;

        newStyle += " hover:cursor-pointer"

        if (i == dueDate.getDate() && month.getMonth() == dueDate.getMonth() && month.getFullYear() == today.getFullYear()) {
            newStyle += " bg-orange-400 text-white font-semibold";
        } else if (i == today.getDate() && month.getMonth() == today.getMonth() && month.getFullYear() == today.getFullYear()) {
            newStyle += " text-orange-400 font-semibold";
        } else {
            newStyle += " text-white";
        }

        visual.push(
            <button className={newStyle} onClick={() => clickDate(i)} key={`date_change_popup_${i}`}>
                {i}
            </button>,
        );
    }

    return (
        <div className="relative">
            <motion.div
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{ opacity: 1, scaleY: 1 }}
                transition={{ duration: 0.25 }}
                style={{ transformOrigin: "top" }}
            >
                <div className="absolute top-full border border-white bg-[#292929] rounded-lg p-3 shadow-md space-y-1">
                    <div>
                        <div className="flex items-center mb-2 justify-around">
                            <button className="hover:cursor-pointer" onClick={decreaseMonth}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="white"
                                    className="size-4"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15.75 19.5 8.25 12l7.5-7.5"
                                    />
                                </svg>
                            </button>
                            <p className="text-white text-center w-5/12">
                                {monthName}
                            </p>
                            <button className="hover:cursor-pointer" onClick={increaseMonth}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="white"
                                    className="size-4"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m8.25 4.5 7.5 7.5-7.5 7.5"
                                    />
                                </svg>
                            </button>
                        </div>
                        <div className="display grid grid-cols-7 gap-1">
                            {visual}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default DateChangePopup;
