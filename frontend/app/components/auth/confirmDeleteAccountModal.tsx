import { FormEvent, useState } from "react";
import { IoClose } from "react-icons/io5";

interface DeleteAccountModalProps {
    close: () => void;
    confirmDeleteAccount: (email: string, password: string) => void;
    isGoogle: boolean;
}

const DeleteAccountModal: React.FC<DeleteAccountModalProps> = (
    { close, confirmDeleteAccount, isGoogle },
) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [errorMessage, setErrorMessage] = useState<string>("");

    const deleteAccount = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        confirmDeleteAccount(email, password);
    };

    return (
        <>
            {isGoogle
                ? (
                    <main className="w-full h-screen flex self-center place-content-center place-items-center">
                        <div className="w-96 bg-white text-gray-600 space-y-5 p-4 shadow-xl border rounded-xl">
                            <div className="flex items-center justify-between mt-2">
                                <h3 className="text-gray-800 text-xl font-semibold sm:text-2xl w-full text-center">
                                    Delete Account?
                                </h3>
                            </div>
                            <div className="flex gap-4">
                                <button
                                    onClick={close}
                                    className="w-1/2 px-4 py-2 text-white font-medium rounded-lg bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl transition duration-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => confirmDeleteAccount("", "")}
                                    className="w-1/2 px-4 py-2 text-white font-medium rounded-lg bg-red-500 hover:bg-red-700 hover:shadow-xl transition duration-300"
                                >
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </main>
                )
                : (
                    <main className="w-full h-screen flex self-center place-content-center place-items-center">
                        <div className="w-96 bg-white text-gray-600 space-y-5 p-4 shadow-xl border rounded-xl">
                            <div className="flex items-center justify-between mt-2">
                                <h3 className="text-gray-800 text-xl font-semibold sm:text-2xl w-full text-center">
                                    Delete Account?
                                </h3>
                            </div>
                            <form
                                onSubmit={deleteAccount}
                                className="space-y-4"
                            >
                                <div>
                                    <label className="text-sm text-gray-600 font-bold">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        autoComplete="email"
                                        required
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)}
                                        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:indigo-600 shadow-sm rounded-lg transition duration-300"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm text-gray-600 font-bold">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        autoComplete="new-password"
                                        required
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)}
                                        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
                                    />
                                </div>

                                {errorMessage && (
                                    <span className="text-red-600 font-bold">
                                        {errorMessage}
                                    </span>
                                )}

                                <div className="flex gap-4">
                                    <button
                                        onClick={close}
                                        className="w-1/2 px-4 py-2 text-white font-medium rounded-lg bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl transition duration-300"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="w-1/2 px-4 py-2 text-white font-medium rounded-lg bg-red-500 hover:bg-red-700 hover:shadow-xl transition duration-300"
                                    >
                                        Confirm
                                    </button>
                                </div>
                            </form>
                        </div>
                    </main>
                )}
        </>
    );
};

export default DeleteAccountModal;
