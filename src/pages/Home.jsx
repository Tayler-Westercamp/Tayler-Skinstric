import { Link } from "react-router-dom";
import ArrowButton from "../assets/ArrowButton.png";
import Arrow from "../assets/Polygon.png";
import { useEffect } from "react";
import gsap from "gsap";

const Home = () => {
  useEffect(() => {
    const trigger = document.getElementById("arrowTrigger");

    const handleMouseEnter = () => {
      const screenWidth = window.innerWidth;

      const sophisticated = document.getElementById("sophisticated");
      const skincare = document.getElementById("skincare");
      const discover = document.getElementById("discover");

      const sophisticatedWidth = sophisticated.offsetWidth;
      const skincareWidth = skincare.offsetWidth;

      const distanceSophisticated =
        -screenWidth / 2 + sophisticatedWidth / 2 + 32;
      const distanceSkincare = -screenWidth / 2 + skincareWidth / 2 + 32;
      if (window.innerWidth >= 1024) {
        gsap.to(sophisticated, {
          x: distanceSophisticated,
          duration: 1,
          ease: "power2.out",
        });

        gsap.to(skincare, {
          x: distanceSkincare,
          duration: 1,
          ease: "power2.out",
          delay: 0.1,
        });
      }
      if (window.innerWidth >= 640) {
        gsap.to("#square1", {
          scale: 1.2,
          duration: 1,
          ease: "power2.out",
        });
        gsap.to("#square2", {
          scale: 1.4,
          duration: 1.5,
          ease: "power2.out",
        });
        gsap.to("#square3", {
          scale: 1.6,
          duration: 1.8,
          ease: "power2.out",
        });
      }

      gsap.to("#discoverAI", {
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
        onComplete: () => {
          gsap.set("#discoverAI", { pointerEvents: "none" });
        },
      });
    };

    const handleMouseLeave = () => {
      gsap.to("#sophisticated", { x: 0, duration: 0.5, ease: "power2.out" });
      gsap.to("#skincare", {
        x: 0,
        duration: 0.5,
        ease: "power2.out",
        delay: 0.1,
      });
      gsap.to("#discoverAI", {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
        onStart: () => {
          gsap.set("#discoverAI", { pointerEvents: "auto" });
        },
      });
      gsap.to("#square1", {
        scale: 1,
        duration: 0.5,
        ease: "power2.out",
      });
      gsap.to("#square2", {
        scale: 1,
        duration: 0.5,
        ease: "power2.out",
        delay: 0.1,
      });
      gsap.to("#square3", {
        scale: 1,
        duration: 0.5,
        ease: "power2.out",
        delay: 0.2,
      });
    };

    trigger.addEventListener("mouseenter", handleMouseEnter);
    trigger.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      trigger.removeEventListener("mouseenter", handleMouseEnter);
      trigger.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="relative">
      <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center h-[calc(100vh-64px)]">
        <div
          id="discoverAI"
          className=" hidden lg:flex items-center w-[150px] justify-between ml-[32px] relative"
        >
          <div className="w-[425px] h-[425px] border-2 border-dotted border-bluegray absolute transform -translate-x-[75%] rotate-45"></div>
          <div className="w-[44px] h-[44px] relative z-10">
            <img
              src={ArrowButton}
              alt="Arrow button"
              className="w-full h-full object-cover transform -scale-x-100 hover:[transform:scale(1.10)_scaleX(-1)] transition-transform duration-300 cursor-not-allowed"
            />
          </div>
          <p className="roobert-font text-[14px]">DISCOVER A.I.</p>
        </div>

        <div className="flex flex-col justify-between items-center sm:mb-[400px] sm:ml-[60px] md:ml-[32px] md:mb-0 md:items-start lg:ml-0 lg:items-center">
          <h1
            id="sophisticated"
            className="roobert-font text-[60px] md:text-[82px] lg:h1-home lg:text-[128px] lg:font-light lg:tracking-[-0.07em] lg:text-center lg:leading-[120px]"
          >
            Sophisticated
          </h1>
          <h1
            id="skincare"
            className="roobert-font text-[60px] md:text-[82px] lg:h1-home lg:text-[128px] lg:font-light lg:tracking-[-0.07em] lg:text-center lg:leading-[120px]"
          >
            skincare
          </h1>
        </div>

        <div
          id="arrowTrigger"
          className="flex items-center w-[127px] justify-between mt-7 sm:mt-0 mr-[32px] relative"
        >
          <div
            id="square1"
            className=" hidden sm:block w-[300px] h-[300px] md:w-[425px] md:h-[425px] border-2 border-dotted border-bluegray absolute rotate-45 z-0 "
          ></div>
          <div
            id="square2"
            className=" hidden sm:block w-[300px] h-[300px] md:w-[425px] md:h-[425px] border-2 border-dotted border-bluegray-60 absolute rotate-45 z-0 "
          ></div>
          <div
            id="square3"
            className=" hidden sm:block w-[300px] h-[300px] md:w-[425px] md:h-[425px] border-2 border-dotted border-bluegray-40 absolute rotate-45 z-0 "
          ></div>
          <p className="roobert-font text-[14px] mr-3">TAKE TEST</p>
          <Link to={"/testing"}>
            <div className="w-[31px] h-[31px] relative z-10 flex justify-center items-center rotate-45 border-[1px] border-black hover:scale-125 transition-transform duration-300 cursor-pointer">
              <div className="w-[31px] h-[31px] absolute border-[1px] z-0 border-dotted border-bluegray hover:scale-75 transition-transform duration-300"></div>
              <img
                src={Arrow}
                alt="Arrow button"
                className="w-[9.43px] h-[10.89px] object-cover rotate-[-45deg] z-0"
              />
            </div>
          </Link>
        </div>
      </div>

      <p className="roobert-font font-light absolute h-[72px] text[14px] bottom-7 left-[32px] leading-[24px] uppercase tracking-[0]">
        Skinstric developed an A.I. that creates
        <br />
        a highly-personalized routine tailored to
        <br />
        what your skin needs.
      </p>
    </div>
  );
};

export default Home;
