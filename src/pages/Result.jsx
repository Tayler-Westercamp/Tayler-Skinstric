import { useState, useRef, useEffect } from "react";
import ArrowButton from "../assets/ArrowButton.png";
import { Link, useNavigate } from "react-router-dom";
import camera from "../assets/camera.png";
import gallery from "../assets/gallery.png";
import resultline from "../assets/resultline.png";
import gsap from "gsap";

const Result = () => {
  const [selectedFile, setSelectedFile] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const [cameraMenu, setCameraMenu] = useState(false)

  useEffect(() => {
    if (selectedFile !== "") {
      uploadIMG();
    }
  }, [selectedFile]);

  const uploadIMG = async () => {
    setIsLoading(true)
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }

    const data = {
      image: selectedFile,
    };

    try {
      const response = await fetch(
        "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        const { data } = await response.json();
        navigate("/select", { state: { data } });
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

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.split(",")[1];
        setSelectedFile(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    gsap.to("#square1", {
      rotation: 360,
      repeat: -1,
      duration: 120,
      ease: "linear",
    });
    gsap.to("#square2", {
      rotation: 360,
      repeat: -1,
      duration: 140,
      ease: "linear",
      delay: 1,
    });
    gsap.to("#square3", {
      rotation: 360,
      repeat: -1,
      duration: 160,
      ease: "linear",
      delay: 2,
    });
    gsap.to("#square4", {
      rotation: -360,
      repeat: -1,
      duration: 120,
      ease: "linear",
    });
    gsap.to("#square5", {
      rotation: -360,
      repeat: -1,
      duration: 140,
      ease: "linear",
      delay: 1,
    });
    gsap.to("#square6", {
      rotation: -360,
      repeat: -1,
      duration: 160,
      ease: "linear",
      delay: 2,
    });
    gsap.to("#square7", {
      rotation: 360,
      repeat: -1,
      duration: 20,
      ease: "linear",
    });
    gsap.to("#square8", {
      rotation: 360,
      repeat: -1,
      duration: 25,
      ease: "linear",
      delay: 1,
    });
    gsap.to("#square9", {
      rotation: 360,
      repeat: -1,
      duration: 30,
      ease: "linear",
      delay: 2,
    });
  }, []);

  return (
    <div className="flex items-center justify-center  h-[calc(100vh-64px)]">
      <div className="flex items-center justify-around w-[100vw]">
        <div className="absolute left-[32px] top-[86px]">
          <p className="roobert-font font-bold">TO START ANALYSIS</p>
        </div>
        {isLoading ? (
          <div className="flex items-center justify-around w-[100vw]">
            <div className="w-[482px] h-[482px] flex items-center justify-center relative">
              <div
                id="square7"
                className="w-[286.64px] h-[286.64px] border-2 border-dotted border-bluegray absolute rotate-45 z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 "
              ></div>
              <div
                id="square8"
                className="w-[314.28px] h-[314.28px] border-2 border-dotted border-bluegray-60 absolute rotate-45 z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              ></div>
              <div
                id="square9"
                className="w-[340.75px] h-[340.75px] border-2 border-dotted border-bluegray-40 absolute rotate-45 z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              ></div>
              <h1 className="roobert-font font-bold text-[16px]">PREPARING YOUR ANALYSIS...</h1>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-around flex-wrap scale-75 lg:scale-100 w-[100vw]">
            <div className="w-[482px] h-[482px] flex items-center justify-center relative">
              <div className="absolute top-[140px] right-[138px]">
                <img src={resultline} alt="" className="rotate-180" />
              </div>
              <div className="absolute top-[125px] right-[-16px]">
                ALLOW A.I. <br /> TO SCAN YOUR FACE
              </div>
              <div
                id="square1"
                className="w-[286.64px] h-[286.64px] border-2 border-dotted border-bluegray absolute rotate-45 z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 "
              ></div>
              <div
                id="square2"
                className="w-[314.28px] h-[314.28px] border-2 border-dotted border-bluegray-60 absolute rotate-45 z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              ></div>
              <div
                id="square3"
                className="w-[340.75px] h-[340.75px] border-2 border-dotted border-bluegray-40 absolute rotate-45 z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              ></div>
              <div className="w-[136px] h-[136px] z-10">
                  <img
                  onClick={() => setCameraMenu(true)}
                    src={camera}
                    alt=""
                    className="w-full h-full hover:scale-105 transition-transform duration-300 cursor-pointer z-10"
                  />
              </div>
              {cameraMenu && (<div className="absolute w-full h-full max-w-[352px] max-h-[136px] bottom-0 bg-black md:right-[-220px] md:bottom-[140px] ">
                <div className=" h-[101px] ">
                  <p className="font-roobert text-white font-bold p-4">ALLOW A.I. TO ACCESS YOUR CAMERA</p>
                  
                </div>
                <div className="flex justify-end border-white border-t-[1px]">
                  <button onClick={() => setCameraMenu(false)} className="text-white py-1 px-5 hover:font-bold">DENY</button>
                  <button onClick={() => navigate("/camera")} className="text-white py-1 px-5 hover:font-bold">ALLOW</button>
                </div>
              </div>)}
              
            </div>
            <div className="w-[482px] h-[482px] flex items-center justify-center relative">
              <div className="absolute bottom-[135px] left-[145px]">
                <img src={resultline} alt="" />
              </div>
              <div className="absolute bottom-[100px] left-[12px] text-right">
                ALLOW A.I. <br /> ACCESS GALLERY
              </div>
              <div
                id="square4"
                className="w-[286.64px] h-[286.64px] border-2 border-dotted border-bluegray absolute rotate-45 z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 "
              ></div>
              <div
                id="square5"
                className="w-[314.28px] h-[314.28px] border-2 border-dotted border-bluegray-60 absolute rotate-45 z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              ></div>
              <div
                id="square6"
                className="w-[340.75px] h-[340.75px] border-2 border-dotted border-bluegray-40 absolute rotate-45 z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              ></div>
              <div className="w-[136px] h-[136px] z-10">
                <img
                  src={gallery}
                  alt="Gallery icon"
                  onClick={handleImageClick}
                  className="w-full h-full hover:scale-105 transition-transform duration-300 cursor-pointer z-10"
                />
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between items-center absolute bottom-[32px] left-[32px] w-[97px] h-[44px]">
          <Link to={"/testing"}>
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

export default Result;
