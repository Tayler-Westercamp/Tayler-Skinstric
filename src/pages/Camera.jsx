import gsap from "gsap";
import camera from "../assets/camera.png";
import { useRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ArrowButton from "../assets/ArrowButton.png";
import Picture from "../assets/Picture.png";

const Camera = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [photoProcessed, setPhotoProcessed] = useState(false);
  const videoRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        alert("Camera was unable to be accessed");
        navigate("/");
      }
    };
    setIsLoading(false);
    startCamera();
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const handleTakePicture = () => {
    if (!videoRef.current) return;

    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext("2d");

    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const photoDataUrl = canvas.toDataURL("image/png");

    setCapturedPhoto(photoDataUrl);

    setPhotoProcessed(true);
  };

  const uploadIMG = async () => {
    setIsLoading(true)
    if (!capturedPhoto) {
      alert("Please select a file first!");
      return;
    }

    const data = {
      image: capturedPhoto,
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

  useEffect(() => { 
    gsap.to(".loading-container #square1", {
      rotation: 360,
      repeat: -1,
      duration: 120,
      ease: "linear",
    });
    gsap.to(".loading-container #square2", {
      rotation: 360,
      repeat: -1,
      duration: 140,
      ease: "linear",
      delay: 1,
    });
    gsap.to(".loading-container #square3", {
      rotation: 360,
      repeat: -1,
      duration: 160,
      ease: "linear",
      delay: 2,
    });
  }, []);

  return (
    <div className="flex items-center justify-center  h-[100vh]">
      <div className="flex items-center justify-around w-[100vw]">
        {isLoading ? (
          <div className=".loading-container w-[482px] h-[482px] flex items-center justify-center relative">
            <div className="absolute top-2/3 right-1/2 translate-x-1/2 font-roobert font-bold">
              SETTING UP CAMERA...
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
            <div className="w-[136px] h-[136px]">
              <img src={camera} alt="" className="w-full h-full" />
            </div>
             <div id="invisable" className="absolute bottom-[-60px]  w-full h-full max-w-[491.94] max-h-[64px] hidden md:flex flex-col justify-between items-center"> 
              <p className=" w-full text-center text-[14px] roobert-font">
                TO GET BETTER RESULTS MAKE SURE TO HAVE
              </p>
              <div className="flex justify-between w-full gap-5">
                <div className="flex items-center ">
                  <div
                    className={"w-[8.49px] h-[8.49px] border-[1px] border-black rotate-45 mr-2 flex justify-center items-center"}
                  ></div>
                  <p className={"capitalize font-roobert text-[14px]"}>
                    NEUTRAL EXPRESSION
                  </p>
                </div>
                <div className="flex items-center">
                  <div
                    className={"w-[8.49px] h-[8.49px] border-[1px]  border-black rotate-45 mr-2 flex justify-center items-center"}
                  ></div>
                  <p className={"capitalize font-roobert text-[14px]"}>
                    FRONTAL POSE
                  </p>
                </div>
                <div className="flex items-center">
                  <div
                    className={"w-[8.49px] h-[8.49px] border-[1px] border-black rotate-45 mr-2 flex justify-center items-center"}
                  ></div>
                  <p className={"capitalize font-roobert text-[14px]"}>
                    ADEQUATE LIGHTING
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center w-screen h-screen bg-black relative z-10">
            {capturedPhoto ? (
              <img
                src={capturedPhoto}
                alt="Captured"
                className="w-full h-full object-cover z-10"
              />
            ) : (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover z-10"
              />
            )}
            <div className="absolute top-6 left-8 z-10">
              <div className="flex items-center ">
                <Link
                  to={"/"}
                  className="font-roobert text-white text-[14px] cursor-pointer pr-[16px] font-bold z-10"
                >
                  SKINSTRIC
                </Link>
                <div className="flex items-center justify-between min-w-[61px] h-[17px]">
                  <div className="border-y border-l w-[4px] h-[17px] rounded-tl-sm rounded-bl-sm border-white"></div>
                  {photoProcessed && (
                    <p className="font-roobert text-[14px] font-bold text-bluegray mx-1">
                      ANALYSIS
                    </p>
                  )}
                  <div className="border-y border-r w-[4px] h-[17px] rounded-tr-sm rounded-br-sm border-white"></div>
                </div>
              </div>
            </div>
            <div className="absolute bottom-12 w-full h-full max-w-[491.94] max-h-[64px] z-0 md:z-10">
              <div className=" w-full h-full flex flex-col justify-between items-center">
                <p className="w-full text-center text-white text-[14px] font-roobert ">
                  TO GET BETTER RESULTS MAKE SURE TO HAVE
                </p>
                <div className="flex justify-between gap-5 max-w-[491.94]">
                  <div className="flex items-center ">
                    <div
                      className={`w-[8.49px] h-[8.49px] border-[1px] rotate-45 mr-2 flex justify-center items-center
                        ${
                          photoProcessed
                            ? "border-bluegray bg-bluegray"
                            : "border-white "
                        }`}
                    ></div>
                    <p
                      className={`capitalize font-roobert text-[14px]
                        ${photoProcessed ? "text-bluegray" : "text-white "}`}
                    >
                      NEUTRAL EXPRESSION
                    </p>
                  </div>
                  <div className="flex items-center">
                    <div
                      className={`w-[8.49px] h-[8.49px] border-[1px]   rotate-45 mr-2 flex justify-center items-center
                        ${
                          photoProcessed
                            ? "border-bluegray bg-bluegray"
                            : "border-white "
                        }`}
                    ></div>
                    <p
                      className={`capitalize font-roobert text-[14px]
                        ${photoProcessed ? "text-bluegray" : "text-white "}`}
                    >
                      FRONTAL POSE
                    </p>
                  </div>
                  <div className="flex items-center">
                    <div
                      className={`w-[8.49px] h-[8.49px] border-[1px] border-white rotate-45 mr-2 flex justify-center items-center`}
                    ></div>
                    <p
                      className={`capitalize font-roobert text-white text-[14px]`}
                    >
                      ADEQUATE LIGHTING
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center absolute right-1/2 translate-x-1/2 bottom-[32px] md:bottom-1/2 md:translate-y-1/2 md:translate-x-0 md:right-[32px] z-10">
              <p className="font-roobert text-white text-[14px] px-5 hidden sm:block">
                TAKE PICTURE
              </p>
              <div
                className="w-[62px] h-[62px] cursor-pointer"
                onClick={handleTakePicture}
              >
                <img
                  src={Picture}
                  alt="Arrow button"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300 cursor-pointer"
                />
              </div>
            </div>
            <div className="flex justify-between items-center absolute bottom-[32px] left-[32px] w-[97px] h-[44px] z-10">
              <div
                onClick={() => {
                  if (photoProcessed) {
                    window.location.reload();
                  } else {
                    navigate("/result");
                  }
                }}
                className="w-[44px] h-[44px] cursor-pointer"
              >
                <img
                  src={ArrowButton}
                  alt="Arrow button"
                  className="w-full h-full fill-white object-cover filter brightness-0 invert transform -scale-x-100 hover:[transform:scale(1.10)_scaleX(-1)] transition-transform duration-300"
                />
              </div>
              <p className="font-roobert text-white text-[14px] hidden sm:block z-10">BACK</p>
            </div>
            {photoProcessed && (
              <div className="flex justify-between items-center absolute bottom-[32px] right-[32px] sm:w-[123px] h-[44px] z-10">
                <p className="font-roobert text-white text-[14px] hidden sm:block">PROCEED</p>
                
                  <div className="w-[44px] h-[44px]"
                  onClick={uploadIMG}>
                    <img
                      src={ArrowButton}
                      alt="Arrow button"
                      className="w-full h-full object-cover filter brightness-0 invert hover:scale-110 transition-transform duration-300 cursor-pointer"
                    />
                  </div>
                
              </div>
            )}
            {photoProcessed && (
              <div className="flex justify-between items-center absolute bottom-3/4 right-1/2 translate-x-1/2 w-[123px] h-[44px] z-10">
                <p className="font-roobert text-white text-[14px]">
                  GREAT SHOT!
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Camera;
