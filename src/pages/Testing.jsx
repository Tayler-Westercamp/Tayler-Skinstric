import { useEffect, useState } from "react";
import ArrowButton from "../assets/ArrowButton.png";
import { Link } from "react-router-dom";
import gsap from "gsap";

const Testing = () => {
  const [userName, setUserName] = useState("");
  const [cityName, setCityName] = useState("");
  const [nameInput, setNameInput] = useState(true);
  const [currentValue, setCurrentValue] = useState("");
  const [dataEntered, setDataEntered] = useState(false);
  const [dataProcessed, setDataProcessed] = useState(false);

  useEffect(() => {
    if (cityName !== "") {
      submitData();
    }
  }, [cityName]);

  const submitData = async () => {
    const data = {
      name: userName,
      location: cityName,
    };

    try {
      const response = await fetch(
        "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseOne",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        const result = await response.json();
        setDataProcessed(true);
      } else {
        alert("Your input could not be processed. Please try again.");
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
      alert("There has been an error. Please try again.");
      window.location.reload();
    }
  };

  const acceptName = (value) => {
    if (typeof value === "string" && value.trim() !== "" && !/\d/.test(value)) {
      setNameInput(false);
      setUserName(value);
      setCurrentValue("");
    } else {
      alert("Please try again");
    }
  };

  const acceptCity = (value) => {
    if (typeof value === "string" && value.trim() !== "" && !/\d/.test(value)) {
      setCityName(value);
      setDataEntered(true);
    } else {
      alert("Please try again");
    }
  };

  useEffect(() => {
  gsap.to("#square1", { rotation: 360, repeat: -1, duration: 120, ease: "linear"});
  gsap.to("#square2", { rotation: 360, repeat: -1, duration: 140, ease: "linear", delay: 1});
  gsap.to("#square3", { rotation: 360, repeat: -1, duration: 160, ease: "linear", delay: 2});
}, []);

  return (
    <div className="flex items-center justify-center">
      <div className="absolute left-[32px] top-[86px]">
        <p className="roobert-font font-bold">TO START ANALYSIS</p>
      </div>
      <div className="relative h-[762px] w-[762px] flex items-center justify-center scale-75 sm:scale-90 md:scale-100">
        <div id="square1" className="w-[425px] h-[425px] border-2 border-dotted border-bluegray absolute rotate-45 z-0 top-[calc(50%+24px)] left-1/2 -translate-x-1/2 -translate-y-1/2 "></div>
        <div id="square2" className="w-[482px] h-[482px] border-2 border-dotted border-bluegray-60 absolute rotate-45 z-0 top-[calc(50%+24px)] left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
        <div id="square3" className="w-[538px] h-[538px] border-2 border-dotted border-bluegray-40 absolute rotate-45 z-0 top-[calc(50%+24px)] left-1/2 -translate-x-1/2 -translate-y-1/2"></div>

        {dataEntered ? (
          <div className=" flex justify-center items-center flex-col">
            <p className="font-roobert text-eerie-40 text[14px] h-[24px]">
              PROCESSING DATA
            </p>
            <div className="flex justify-center items-center flex-col">
              {dataProcessed ? (
                <h1 className="roobert-font text-[45px] h-[90px] tracking-[-0.07em] text-center focus:outline-none focus:border-transparent">
                  Success Please Proceed
                </h1>
              ) : (
                <div className="flex gap-2 h-[90px] items-center">
                  <span className="w-2 h-2 bg-black rounded-full animate-dotFlash"></span>
                  <span className="w-2 h-2 bg-black rounded-full animate-dotFlash [animation-delay:.2s]"></span>
                  <span className="w-2 h-2 bg-black rounded-full animate-dotFlash [animation-delay:.4s]"></span>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center flex-col scale-75 sm:scale-90 md:scale-100">
            <p className="font-roobert text-eerie-40 text[14px] h-[24px]">
              CLICK TO TYPE
            </p>
            <div className="flex justify-center items-center flex-col">
              {nameInput ? (
                <input
                  onChange={(event) => setCurrentValue(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      acceptName(currentValue);
                    }
                  }}
                  value={currentValue}
                  type="text"
                  placeholder="Introduce Yourself"
                  className="roobert-font text-[60px] tracking-[-0.07em] text-center bg-transparent focus:outline-none focus:border-transparent z-10"
                />
              ) : (
                <input
                  onChange={(event) => setCurrentValue(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      acceptCity(currentValue);
                    }
                  }}
                  value={currentValue}
                  type="text"
                  placeholder="Where are you from?"
                  className="roobert-font text-[60px] tracking-[-0.07em] text-center bg-transparent focus:outline-none focus:border-transparent z-10"
                />
              )}
              <div className="h-[1px] w-[417px] bg-eerie"></div>
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-between items-center absolute bottom-[32px] left-[32px] w-[97px] h-[44px]">
        <Link to={"/"}>
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
      {dataProcessed && (
        <div className="flex justify-between items-center absolute bottom-[32px] right-[32px] w-[123px] h-[44px]">
          <p className="roobert-font text-[14px]">PROCEED</p>
          <Link to={"/result"}>
            <div className="w-[44px] h-[44px]">
              <img
                src={ArrowButton}
                alt="Arrow button"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300 cursor-pointer"
              />
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Testing;
