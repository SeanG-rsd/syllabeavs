import StarBorder from "./../../../components/StarBorder";

interface SubscribeModalProps {
    check: boolean;
}

const SubscribeModal: React.FC<SubscribeModalProps> = ({ check }) => {
    return (
        <div className="fixed bg-green-500 h-3/4 w-1/2 flex items-center justify-center top-1/8 left-1/4 pt-20 pb-10 text-white">
            <StarBorder
                thickness={10}
                speed="10s"
                className="h-full flex-1 bg-amber-400 m-10 p-4 flex flex-col justify-between rounded-2xl"
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

            <div
                className="absolute w-[300%] h-[50%] opacity-70 bottom-[-11px] right-[0%] rounded-full animate-star-movement-bottom z-0"
                style={{
                    background:
                        `radial-gradient(circle, blue, transparent 10%)`,
                    animationDuration: "1s",
                }}
            >
            </div>

            <div className="h-full flex-1 bg-blue-500 m-10 p-4 flex flex-col justify-between rounded-2xl">
                <div className="flex flex-col">
                    <div className="flex justify-between items-center mb-2">
                        <div className="font-semibold text-2xl">Syllabeavs</div>
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
        </div>
    );
};

export default SubscribeModal;
