interface UploadSyllabusProps {
    parseSyllabus: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const UploadSyllabus: React.FC<UploadSyllabusProps> = ({parseSyllabus}) => {
    return (<div className="flex justify-center items-center w-full h-full">
                        <input
                          type="file"
                          accept=".pdf,.txt,.docx"
                          onChange={parseSyllabus}
                          className="hidden"
                          id="file-upload"
                        />
                        <label
                          htmlFor="file-upload"
                          className="p-24 space-y-10 cursor-pointer border border-dashed border-slate-200 border-spacing-7 rounded-xl"
                        >
                          <div className="flex justify-center items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="size-30 text-slate-300"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m6.75 12-3-3m0 0-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                              />
                            </svg>
                          </div>
                          <p className="text-center text-xl font-semibold bg-gradient-to-r from-orange-500 to-red-500 text-transparent inline-block bg-clip-text">
                            Select your syllabus file and watch the magic
                            happen.
                          </p>
                        </label>
                      </div>);
}  

export default UploadSyllabus;