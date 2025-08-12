import { HandPlatterIcon, SquaresExcludeIcon, UserIcon } from "lucide-react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className={`flex gap-5 mt-10 w-11/12 max-w-[1200px] mx-auto`}>
      <Link
        to="/clients"
        className="bg-teal-500 text-slate-50 w-46 h-20 flex items-center gap-2 font-semibold text-xl  cursor-pointer select-none group"
      >
        <div className="bg-teal-600 h-full w-20 flex justify-center items-center group-hover:bg-teal-800 duration-300">
          <UserIcon className="text-slate-50 h-12 w-12" />
        </div>
        <span>Clientes</span>
      </Link>
      <Link
        to="/rooms"
        className="bg-indigo-400 text-slate-50 w-46 h-20 flex items-center gap-2 font-semibold text-xl  cursor-pointer select-none group"
      >
        <div className="bg-indigo-600 h-full w-20 flex justify-center items-center group-hover:bg-indigo-800 duration-300">
          <SquaresExcludeIcon className="text-slate-50 h-12 w-12" />
        </div>
        <span>Sala</span>
      </Link>
      <Link
        to="/reserves"
        className="bg-amber-400 text-slate-50 w-46 h-20 flex items-center gap-2 font-semibold text-xl  cursor-pointer select-none group"
      >
        <div className="bg-amber-600 h-full w-20 flex justify-center items-center group-hover:bg-amber-800 duration-300">
          <HandPlatterIcon className="text-slate-50 h-12 w-12" />
        </div>
        <span>Reservas</span>
      </Link>
    </div>
  );
};
export default HomePage;
