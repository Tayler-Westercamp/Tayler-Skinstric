import ArrowButton from "../assets/ArrowButton.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { useEffect, useState } from "react";
const Select = () => {
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const { data } = location.state || {};
    setData(data);
  }, []);

  useEffect(() => {
    gsap.to("#square1", {
      scale: 1.05,
      repeat: -1,
      yoyo: true,
      duration: 3,
      ease: "power1.inOut",
    });
    gsap.to("#square2", {
      scale: 1.05,
      repeat: -1,
      yoyo: true,
      duration: 3,
      ease: "power1.inOut",
      delay: 0.4,
    });
    gsap.to("#square3", {
      scale: 1.05,
      repeat: -1,
      yoyo: true,
      duration: 3,
      ease: "power1.inOut",
      delay: 0.8,
    });
  }, []);
  return (
    <div className="flex items-center justify-center h-[calc(100vh-64px)]">
      <div className="flex items-center justify-around w-[100vw]">
        <div className="absolute left-[32px] top-[86px]">
          <p className="roobert-font font-bold text-[16px]">A.I. ANALYSIS</p>
          <p className="roobert-font text-[14px] mt-[12px]">
            A.I. HAS ESTIMATED THE FOLLOWING. <br /> FIX ESTIMATED INFORMATION
            IF NEEDED.
          </p>
        </div>
        <div className="w-[482px] h-[482px] flex items-center justify-center relative scale-75 md:scale-100">
          <div
            id="square1"
            className="w-[425px] h-[425px] border-2 border-dotted border-bluegray absolute rotate-45 z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 "
          ></div>
          <div
            id="square2"
            className="w-[482px] h-[482px] border-2 border-dotted border-bluegray-60 absolute rotate-45 z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          ></div>
          <div
            id="square3"
            className="w-[538px] h-[538px] border-2 border-dotted border-bluegray-40 absolute rotate-45 z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          ></div>

          <div className="w-[313.67px] h-[313.67px] rotate-45 flex flex-wrap gap-1">
            
              <div className="w-[153.88px] h-[153.88px] bg-lotion flex justify-center items-center hover:bg-lotion-hover cursor-pointer"
              >
                <p className="rotate-[-45deg] roobert-font text-[16px] text-center font-bold" onClick={() => navigate("/summary", { state: { data } })}>
                  DEMOGRAPHICS
                </p>
              </div>
            
            <div className="w-[153.88px] h-[153.88px] bg-lotion flex justify-center items-center cursor-not-allowed hover:opacity-50">
              <p className="rotate-[-45deg] roobert-font text-[16px] text-center font-bold ">
                COSMETIC <br /> CONCERNS
              </p>
            </div>
            <div className="w-[153.88px] h-[153.88px] bg-lotion flex justify-center items-center cursor-not-allowed hover:opacity-50">
              <p className="rotate-[-45deg] roobert-font text-[16px] text-center font-bold">
                SKIN TYPE <br /> DETAILS
              </p>
            </div>
            <div className="w-[153.88px] h-[153.88px] bg-lotion flex justify-center items-center cursor-not-allowed hover:opacity-50">
              <p className="rotate-[-45deg] roobert-font text-[16px] text-center font-bold">
                WEATHER
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center absolute bottom-[32px] left-[32px] w-[97px] h-[44px]">
          <Link to={"/result"}>
            <div className="w-[44px] h-[44px]">
              <img
                src={ArrowButton}
                alt="Arrow button"
                className="w-full h-full object-cover transform -scale-x-100 hover:[transform:scale(1.10)_scaleX(-1)] transition-transform duration-300 cursor-pointer"
              />
            </div>
          </Link>

          <p className="roobert-font text-[14px]">BACK</p>
        </div>
      </div>
    </div>
  );
};

export default Select;
