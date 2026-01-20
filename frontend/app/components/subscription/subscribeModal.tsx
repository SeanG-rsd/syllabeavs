import { useRef } from "react";
import StarBorder from "./../../../components/StarBorder";

interface SubscribeModalProps {
    onClose: () => void;
}

const SubscribeModal: React.FC<SubscribeModalProps> = (
    { onClose },
) => {
    const overlayRef = useRef(null);

    const handleOverlayClick = (e: any) => {
        if (e.target === overlayRef.current) {
            onClose();
            console.log("alksjdf")
        }
    };

    return (
        <div
            className="fixed bg-black/80 h-full w-full top-0 left-0 z-10"
            ref={overlayRef}
            onClick={handleOverlayClick}
        >
            <div className="fixed h-3/4 w-1/2 flex items-center justify-center top-1/8 left-1/4 pt-20 pb-10 text-white">
                <StarBorder
                    thickness={10}
                    speed="2s"
                    color="#00FFFF"
                    className="h-full flex-1 m-10 transition-transform duration-300 hover:scale-105"
                >
                    <div className="flex flex-col">
                        <div className="flex justify-between items-center mb-2">
                            <div className="font-semibold text-2xl">
                                Syllabeavs
                            </div>
                            <div className="border-1 rounded-2xl px-2 text-center">
                                Inactive
                            </div>
                        </div>
                        <div className="font-bold text-5xl">PLUS</div>
                        <div className="font-semibold text-xl">Monthly</div>
                    </div>

                    <div className="">
                        <div>40% off for 3 months</div>
                        <div>$2.00 Per Month</div>
                        <div>Ends on March 15, 2026</div>
                    </div>
                </StarBorder>

                <StarBorder
                    thickness={10}
                    speed="2s"
                    color="magenta"
                    className="h-full flex-1 m-10 transition-transform duration-300 hover:scale-105"
                >
                    <div className="h-full flex flex-col justify-between">
                        <div className="flex flex-col">
                            <div className="flex justify-between items-center mb-2">
                                <div className="font-semibold text-2xl">
                                    Syllabeavs
                                </div>
                                <div className="border-1 rounded-2xl px-2 text-center">
                                    Inactive
                                </div>
                            </div>
                            <div className="font-bold text-5xl">PRO</div>
                            <div className="font-semibold text-xl">Yearly</div>
                        </div>

                        <div className="">
                            <div>50% off for 1 Year</div>
                            <div>$20.00 Per Year</div>
                            <div>Ends on Jan 15, 2027</div>
                        </div>
                    </div>
                </StarBorder>
            </div>
        </div>
    );
};

export default SubscribeModal;
