import ArrowButton from "../assets/ArrowButton.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { useEffect, useState, useRef } from "react";

const Summary = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [SelectedOption, setSelectedOption] = useState("RACE");
  const [selectedRace, setSelectedRace] = useState("");
  const [selectedAge, setSelectedAge] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [activeRace, setactiveRace] = useState({});
  const [activeAge, setActiveAge] = useState({});
  const [activeGender, setActiveGender] = useState({});
  const [demoData, setDemoData] = useState({});
  const location = useLocation();
  const raceRef = useRef(null);
  const ageRef = useRef(null);
  const genderRef = useRef(null);

  useEffect(() => {
    if (raceRef.current && SelectedOption === "RACE") {
      gsap.to(raceRef.current, {
        "--progress": `${activeRace.percent * 360}deg`,
        duration: 2,
        ease: "power2.out",
      });
    }
  }, [activeRace.percent, SelectedOption]);

  useEffect(() => {
    if (ageRef.current && SelectedOption === "AGE") {
      gsap.to(ageRef.current, {
        "--progress": `${activeAge.percent * 360}deg`,
        duration: 2,
        ease: "power2.out",
      });
    }
  }, [activeAge.percent, SelectedOption]);

  useEffect(() => {
    if (genderRef.current && SelectedOption === "GENDER") {
      gsap.to(genderRef.current, {
        "--progress": `${activeGender.percent * 360}deg`,
        duration: 2,
        ease: "power2.out",
      });
    }
  }, [activeGender.percent, SelectedOption]);

  useEffect(() => {
    const { data } = location.state || {};
    setDemoData(data);
  }, []);

  useEffect(() => {
    if (Object.keys(demoData).length > 0) {
      setInitialData();
    }
  }, [demoData]);

  const setInitialData = () => {
    const highestRace = Object.entries(demoData.race).reduce(
      (max, [raceGroup, value]) => {
        return value > max.value ? { raceGroup, value } : max;
      },
      { raceGroup: "", value: 0 }
    );
    setactiveRace({ race: highestRace.raceGroup, percent: highestRace.value });
    setSelectedRace(highestRace.raceGroup);
    const highestAge = Object.entries(demoData.age).reduce(
      (max, [ageGroup, value]) => {
        return value > max.value ? { ageGroup, value } : max;
      },
      { ageGroup: "", value: 0 }
    );
    setActiveAge({ age: highestAge.ageGroup, percent: highestAge.value });
    setSelectedAge(highestAge.ageGroup);
    const highestGender = Object.entries(demoData.gender).reduce(
      (max, [gender, value]) => {
        return value > max.value ? { gender, value } : max;
      },
      { gender: "", value: 0 }
    );
    setActiveGender({
      gender: highestGender.gender,
      percent: highestGender.value,
    });
    setSelectedGender(highestGender.gender);
    setIsLoading(false);
  };

  return (
    <div className="flex items-center justify-center w-full h-full lg:h-[calc(100vh-64px)]">
      <div className="flex items-center justify-around flex-wrap md:flex-row w-[100vw]">
        <div className="absolute left-[32px] top-[86px]">
          <p className="roobert-font font-bold text-[16px] mb-[12px]">
            A.I. ANALYSIS
          </p>
          <h1 className="roobert-font text-[40px] sm:text-[60px] lg:text-[72px] leading-[64px] tracking-[-6%]">
            DEMOGRAPHICS
          </h1>
          <p className="roobert-font text-[14px] mt-[12px]">
            PREDICTED RACE & AGE
          </p>
        </div>

        {isLoading ? (
          <div> LOADING </div>
        ) : (
          <div className="flex gap-4 w-full flex-col mt-56 lg:flex-row lg:mt-0 justify-center">
            <div id="leftSelect" className="flex flex-col justify-start gap-2">
              <div
                id="race"
                onClick={() => setSelectedOption("RACE")}
                className={`flex flex-col justify-between lg:w-[208px] h-[104px]  p-[12px] border-t-[1px] border-t-black  cursor-pointer
                ${
                  SelectedOption === "RACE"
                    ? "bg-black text-white"
                    : "bg-antiflash text-eerie hover:bg-lotion-hover"
                }`}
              >
                <p className="uppercase font-roobert font-bold text-[16px]">
                  {activeRace.race}
                </p>
                <p className="uppercase font-roobert font-bold text-[16px]">
                  RACE
                </p>
              </div>
              <div
                id="age"
                onClick={() => setSelectedOption("AGE")}
                className={`flex flex-col justify-between lg:w-[208px] h-[104px]  p-[12px] border-t-[1px] border-t-black  cursor-pointer
                ${
                  SelectedOption === "AGE"
                    ? "bg-black text-white"
                    : "bg-antiflash text-eerie hover:bg-lotion-hover"
                }`}
              >
                <p className="uppercase font-roobert font-bold text-[16px]">
                  {activeAge.age}
                </p>
                <p className="uppercase font-roobert font-bold text-[16px]">
                  AGE
                </p>
              </div>
              <div
                id="gender"
                onClick={() => setSelectedOption("GENDER")}
                className={`flex flex-col justify-between lg:w-[208px] h-[104px]  p-[12px] border-t-[1px] border-t-black  cursor-pointer
                ${
                  SelectedOption === "GENDER"
                    ? "bg-black text-white"
                    : "bg-antiflash text-eerie hover:bg-lotion-hover"
                }`}
              >
                <p className="uppercase font-roobert font-bold text-[16px]">
                  {activeGender.gender}
                </p>
                <p className="uppercase font-roobert font-bold text-[16px]">
                  SEX
                </p>
              </div>
            </div>
            <div
              id="centerContent"
              className="w-full max-w-[1168px] h-[544px] bg-antiflash border-t-[1px] border-t-black relative"
            >
              {SelectedOption === "RACE" ? (
                <div>
                  <p className="roobert-font capitalize text-[40px] tracking-[-5%] ml-[18px] ">
                    {activeRace.race}
                  </p>
                  <div className="absolute right-4 bottom-6">
                    <div className="relative w-[384px] h-[384px]">
                      <div
                        ref={raceRef}
                        className="absolute inset-0 rounded-full"
                        style={{
                          "--progress": `${activeRace.percent * 360}deg`,
                          background: `conic-gradient(#1A1B1C var(--progress), #C1C2C3 0deg)`,
                        }}
                      ></div>
                      <div className="absolute inset-[3px] bg-antiflash rounded-full"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <h1 className="roobert-font uppercase text-[40px]">
                          {(activeRace.percent * 100).toFixed(0)}%
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              ) : SelectedOption === "AGE" ? (
                <div>
                  <p className="roobert-font capitalize text-[40px] ml-[18px] ">
                    {activeAge.age}
                  </p>
                  <div className="absolute right-4 bottom-6">
                    <div className="relative w-[384px] h-[384px]">
                      <div
                        ref={ageRef}
                        className="absolute inset-0 rounded-full"
                        style={{
                          "--progress": `${activeAge.percent * 360}deg`,
                          background: `conic-gradient(#1A1B1C var(--progress), #C1C2C3 0deg)`,
                        }}
                      ></div>
                      <div className="absolute inset-[3px] bg-antiflash rounded-full"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <h1 className="roobert-font uppercase text-[40px]">
                          {(activeAge.percent * 100).toFixed(0)}%
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="roobert-font capitalize text-[40px] tracking-[-5%] ml-[18px] ">
                    {activeGender.gender}
                  </p>
                  <div className="absolute right-4 bottom-6">
                    <div className="relative w-[384px] h-[384px]">
                      <div
                        ref={genderRef}
                        className="absolute inset-0 rounded-full"
                        style={{
                          "--progress": `${activeGender.percent * 360}deg`,
                          background: `conic-gradient(#1A1B1C var(--progress), #C1C2C3 0deg)`,
                        }}
                      ></div>
                      <div className="absolute inset-[3px] bg-antiflash rounded-full"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <h1 className="roobert-font uppercase text-[40px]">
                          {(activeGender.percent * 100).toFixed(0)}%
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div
              id="rightSelect"
              className="w-full lg:max-w-[448px] h-[544px] bg-antiflash border-t-[1px] border-t-black"
            >
              {SelectedOption === "RACE" ? (
                <div>
                  <div className="h-[48px] flex justify-between items-center p-4">
                    <p className="roobert-font text-[16px]  ">RACE</p>
                    <p className="roobert-font text-[16px]  ">
                      A.I. CONFIDENCE
                    </p>
                  </div>
                  {Object.entries(demoData.race).map(([race, value]) => (
                    <div
                      key={race}
                      onClick={() => {
                        setactiveRace({ race: race, percent: value });
                        setSelectedRace(race);
                      }}
                      className={`p-4 h-[48px] flex justify-between items-center cursor-pointer  
                        ${
                          selectedRace === race
                            ? "bg-black"
                            : "hover:bg-lotion-hover"
                        }`}
                    >
                      <div className="flex items-center">
                        <div
                          className={`w-[8.49px] h-[8.49px] border-[1px]  rotate-45 mr-3 flex justify-center items-center 
                          ${
                            selectedRace === race
                              ? "border-white"
                              : "border-black"
                          }`}
                        >
                          <div
                            className={`w-[4.24px] h-[4.24px] ${
                              selectedRace === race && "bg-white"
                            }`}
                          ></div>
                        </div>
                        <p
                          className={`capitalize font-roobert text-[16px] ${
                            selectedRace === race ? "text-white" : "text-eerie"
                          }`}
                        >
                          {race}
                        </p>
                      </div>

                      <p
                        className={`${
                          selectedRace === race ? "text-white" : "text-eerie"
                        }`}
                      >
                        {(value * 100).toFixed(0)} %
                      </p>
                    </div>
                  ))}
                </div>
              ) : SelectedOption === "AGE" ? (
                <div>
                  <div className="h-[48px] flex justify-between items-center p-4">
                    <p className="roobert-font text-[16px]  ">AGE</p>
                    <p className="roobert-font text-[16px]  ">
                      A.I. CONFIDENCE
                    </p>
                  </div>
                  {Object.entries(demoData.age).map(([age, value]) => (
                    <div
                      key={age}
                      onClick={() => {
                        setActiveAge({ age: age, percent: value });
                        setSelectedAge(age);
                      }}
                      className={`p-4 h-[48px] flex justify-between items-center cursor-pointer  
                        ${
                          selectedAge === age
                            ? "bg-black"
                            : "hover:bg-lotion-hover"
                        }`}
                    >
                      <div className="flex items-center">
                        <div
                          className={`w-[8.49px] h-[8.49px] border-[1px]  rotate-45 mr-3 flex justify-center items-center 
                          ${
                            selectedAge === age
                              ? "border-white"
                              : "border-black"
                          }`}
                        >
                          <div
                            className={`w-[4.24px] h-[4.24px] ${
                              selectedAge === age && "bg-white"
                            }`}
                          ></div>
                        </div>
                        <p
                          className={`capitalize font-roobert text-[16px] ${
                            selectedAge === age ? "text-white" : "text-eerie"
                          }`}
                        >
                          {age}
                        </p>
                      </div>

                      <p
                        className={`${
                          selectedAge === age ? "text-white" : "text-eerie"
                        }`}
                      >
                        {(value * 100).toFixed(0)} %
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div>
                  <div className="h-[48px] flex justify-between items-center p-4">
                    <p className="roobert-font text-[16px]  ">AGE</p>
                    <p className="roobert-font text-[16px]  ">
                      A.I. CONFIDENCE
                    </p>
                  </div>
                  {Object.entries(demoData.gender).map(([gender, value]) => (
                    <div
                      key={gender}
                      onClick={() => {
                        setActiveGender({ gender: gender, percent: value });
                        setSelectedGender(gender);
                      }}
                      className={`p-4 h-[48px] flex justify-between items-center cursor-pointer  
                        ${
                          selectedGender === gender
                            ? "bg-black"
                            : "hover:bg-lotion-hover"
                        }`}
                    >
                      <div className="flex items-center">
                        <div
                          className={`w-[8.49px] h-[8.49px] border-[1px]  rotate-45 mr-3 flex justify-center items-center 
                          ${
                            selectedGender === gender
                              ? "border-white"
                              : "border-black"
                          }`}
                        >
                          <div
                            className={`w-[4.24px] h-[4.24px] ${
                              selectedGender === gender && "bg-white"
                            }`}
                          ></div>
                        </div>
                        <p
                          className={`capitalize font-roobert text-[16px] ${
                            selectedGender === gender
                              ? "text-white"
                              : "text-eerie"
                          }`}
                        >
                          {gender}
                        </p>
                      </div>

                      <p
                        className={`${
                          selectedGender === gender
                            ? "text-white"
                            : "text-eerie"
                        }`}
                      >
                        {(value * 100).toFixed(0)} %
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        <div className="flex justify-between items-center my-[24px] lg:my-0 lg:absolute bottom-[32px] left-[32px] w-[97px] h-[44px]">
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

        <div className="my-[14px] lg:my-0  lg:absolute bottom-8">
          <p className="font-roobert text-[16px] text-bluegray">If A.I. estimate is wrong, select the correct one.</p>
        </div>
        <div className="flex my-[24px] lg:my-0 lg:absolute bottom-8 right-8">
          <button onClick={() => setInitialData()} className="font-roobert font-bold border-black border-[1px] py-1 px-4 mr-4">RESET</button>
          <button className="font-roobert font-bold text-white bg-black py-1 px-4 cursor-not-allowed">CONFIRM</button>
        </div>

      </div>
    </div>
  );
};

export default Summary;
