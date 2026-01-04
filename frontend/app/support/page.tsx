"use client";

import Navigation from "../components/Navigation";
import { HiAnnotation } from "react-icons/hi";

function Support() {
    return (
        <div className="bg-[#1E1E1E] min-h-screen h-screen py-12">
            <Navigation />

            <div className="flex flex-col items-center h-[80%]">
                <div className="text-4xl font-bold text-white text-center my-6">
                    Support Center
                </div>

                <div className="w-[90%] flex gap-8 h-full">
                    {/* Sidebar */}
                    <div className="border-green-400 border-4 rounded-4xl p-4 flex flex-col items-start gap-8 w-[40%] h-full">
                        <div className="text-white text-3xl font-semibold">
                            Browse by Topic
                        </div>
                        <div className="border-blue-500 border-2 rounded-2xl p-3 flex items-center justify-start gap-1 w-full">
                            <HiAnnotation size={25} color="white">
                            </HiAnnotation>
                            <div className="text-white">
                                Getting Started
                            </div>
                        </div>
                        <div className="border-blue-500 border-2 rounded-2xl p-3 flex items-center justify-start gap-1 w-full">
                            <HiAnnotation size={25} color="white">
                            </HiAnnotation>
                            <div className="text-white">
                                Calendar Sync
                            </div>
                        </div>
                        <div className="border-blue-500 border-2 rounded-2xl p-3 flex items-center justify-start gap-1 w-full">
                            <HiAnnotation size={25} color="white">
                            </HiAnnotation>
                            <div className="text-white">
                                Account & Settings
                            </div>
                        </div>
                    </div>

                    <div className="w-[60%]">
                        {/* User information & Account Settings */}
                        <div className="border-green-400 border-4 h-fit rounded-4xl p-4 flex flex-col items-start gap-1">
                            <p className="text-white text-2xl font-semibold">
                                Billing & Subscriptions
                            </p>
                            <a className="border-blue-500 border-2 rounded-2xl p-3 px-12 my-3 w-fit bg-orange-400 font-semibold">
                                Manage Subscription
                            </a>
                            <a className="w-full text-white">
                                Refund Policy
                            </a>
                            <a className="w-full text-white">
                                Update Payment Method
                            </a>
                            <a className="w-full text-white">
                                View Invoice History
                            </a>
                        </div>

                        {/* Getting Started */}
                        <div>
                        </div>

                        {/* FAQ */}
                        <div>
                        </div>

                        {/* Support Ticket */}
                        <div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="h-[20%] pt-12 mx-12 flex flex-col items-center">
                <div className="w-full h-0.5 bg-amber-400"></div>
                <div className="flex gap-8 justify-center w-[70%] mt-4 text-white">
                    <p>Privacy Policy</p>
                    <p>Terms of Service</p>
                    <p>© 2026 Nutron Labs LLC</p>
                </div>
            </div>
        </div>
    );
}

//export default Support;
