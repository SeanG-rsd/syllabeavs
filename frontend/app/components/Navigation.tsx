import Link from "next/link";

export default function Navigation() {
  return (
    <div className="w-[80%] m-auto ">
      <div className="flex justify-between">
        <Link href="../">
          <div className="flex justify center items-center">
            <img src="/syllabeavs_logo.png" alt="logo" className="h-12" />
            <h1 className="text-slate-100 font-bold text-xl">
              Sylla
              <span className="bg-gradient-to-r from-red-500 to-orange-500 inline-block text-transparent bg-clip-text">
                Beavs
              </span>
            </h1>
          </div>
        </Link>
        <div className="hover:cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-8 text-slate-100"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
