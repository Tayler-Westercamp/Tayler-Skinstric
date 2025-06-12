import { Link, useLocation } from "react-router-dom";

const NavBar = () => {
  const location = useLocation();
  return (
    <header>
      <div className="flex justify-between py-[16px] px-[32px]">
        <div className="flex items-center ">
          <Link
            to={"/"}
            className="roobert-font text-[14px] cursor-pointer pr-[16px] font-bold"
          >
            SKINSTRIC
          </Link>
          <div className="flex items-center justify-between min-w-[61px] h-[17px]">
            <div className="border-y border-l w-[4px] h-[17px] rounded-tl-sm rounded-bl-sm border-eerie-60"></div>
            {location.pathname === "/select" || location.pathname === "/summary" ? (
              <p className="font-roobert text-[14px] font-bold text-eerie-60 mx-1">ANALYSIS</p>
            ) : (
              <p className="font-roobert text-[14px] font-bold text-eerie-60 ">INTRO</p>
            )}
            
            <div className="border-y border-r w-[4px] h-[17px] rounded-tr-sm rounded-br-sm border-eerie-60"></div>
          </div>
        </div>
        <button className="font-roobert text-[10px] bg-eerie text-white py-[8px] px-[16px]">ENTER CODE</button>
      </div>
    </header>
  );
};

export default NavBar;
