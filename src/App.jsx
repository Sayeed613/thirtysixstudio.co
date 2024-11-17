import "./index.css";
import Canvas from "./Canvas";
import data from "./data";
import { useEffect, useState, useRef } from "react";
import LocomotiveScroll from "locomotive-scroll";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { HiMenu, HiX } from "react-icons/hi";

function App() {
  const [showCanvas, setShowCanvas] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const headingref = useRef(null);
  const growingSpan = useRef(null);

  // Initialize smooth scroll
  useEffect(() => {
    const scroll = new LocomotiveScroll({
      smooth: true,
      lerp: 0.05,
      multiplier: 0.5
    });
    return () => scroll.destroy();
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      setShowCanvas((prevShowCanvas) => {
        if (!prevShowCanvas) {
          gsap.set(growingSpan.current, {
            top: e.clientY,
            left: e.clientX,
          });

          gsap.to("body", {
            color: "#000",
            backgroundColor: "#fd2c2a",
            duration: 1.2,
            ease: "power2.inOut",
          });

          gsap.to(growingSpan.current, {
            scale: 1500, // Increased scale for better coverage
            duration: 2,
            ease: "power2.inOut",
            onComplete: () => {
              gsap.set(growingSpan.current, {
                scale: 0,
                clearProps: "all",
              });
            },
          });
        } else {
          gsap.to("body", {
            color: "#fff",
            backgroundColor: "#000",
            duration: 1.2,
            ease: "power2.inOut",
          });
        }

        return !prevShowCanvas;
      });
    };

    const headingElement = headingref.current;
    headingElement.addEventListener("click", handleClick);

    return () => headingElement.removeEventListener("click", handleClick);
  }, []);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <>
      <span
        ref={growingSpan}
        className="growing rounded-full block fixed top-[-20px] left-[-20px] w-6 h-6 transform-gpu"
      ></span>
      <div className="w-full relative min-h-screen font-['Helvetica_Now_Display'] overflow-x-hidden">
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
          {showCanvas &&
            data[0].map((canvasdets, index) => (
              <Canvas key={index} details={canvasdets} />
            ))}
        </div>
        <div className="w-full relative z-[1] h-screen">
          <nav className="w-full fixed top-0 p-6 md:p-8 flex justify-between items-center z-50 backdrop-blur-sm bg-opacity-80">
            <div className="brand text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">thirtysixstudios</div>

            {/* Mobile Menu Button */}
            <button className="md:hidden text-2xl p-2 hover:bg-white/10 rounded-lg transition-colors" onClick={toggleMenu}>
              {showMenu ? <HiX /> : <HiMenu />}
            </button>

            {/* Desktop Menu */}
            <div className="hidden md:flex links gap-8 lg:gap-12">
              {["What we do", "Who we are", "How we give back", "Talk to us"].map(
                (link, index) => (
                  <a
                    key={index}
                    href={`#${link.toLowerCase()}`}
                    className="text-md hover:text-gray-300 transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-current hover:after:w-full after:transition-all"
                  >
                    {link}
                  </a>
                )
              )}
            </div>
          </nav>

          {/* Mobile Menu */}
          <div className={`fixed inset-0 bg-black/95 z-40 transform transition-all duration-500 ease-in-out ${showMenu ? 'translate-x-0 opacity-100 pointer-events-auto' : 'translate-x-full opacity-0 pointer-events-none'} md:hidden`}>
            <div className="flex flex-col items-center justify-center h-full space-y-10">
              {["What we do", "Who we are", "How we give back", "Talk to us"].map(
                (link, index) => (
                  <a
                    key={index}
                    href={`#${link.toLowerCase()}`}
                    className="text-2xl font-light hover:text-gray-300 transition-colors transform hover:scale-105"
                    onClick={toggleMenu}
                  >
                    {link}
                  </a>
                )
              )}
            </div>
          </div>

          <div className="textcontainer w-full px-6 sm:px-8 md:px-[15%] lg:px-[20%] pt-32 md:pt-40">
            <div className="text w-full md:w-[60%] lg:w-[50%] relative z-10 bg-black/50 p-4 rounded-lg backdrop-blur-sm">
              <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] font-bold">
                At Thirtysixstudio, we build immersive digital experiences for
                brands with a purpose.
              </h3>
              <p className="text-lg sm:text-xl md:text-2xl w-full md:w-[90%] lg:w-[80%] mt-8 md:mt-10 font-light leading-relaxed">
                We are a team of designers, developers, and strategists who are
                passionate about creating digital experiences that are both
                beautiful and functional.
              </p>
              <p className="text-base md:text-lg mt-12 animate-bounce inline-flex items-center gap-2">
                scroll
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </p>
            </div>
          </div>
          <div className="w-full absolute bottom-0 left-0">
            <h1
              ref={headingref}
              className="text-3xl sm:text-5xl md:text-[10rem] lg:text-[14rem] font-bold tracking-tighter leading-none pl-5 cursor-pointer hover:opacity-90 transition-opacity"
            >
              Thirtysixstudios
            </h1>
          </div>
        </div>
      </div>
      <div className="w-full relative min-h-screen mt-16 sm:mt-24 md:mt-32 px-6 sm:px-8 md:px-10">
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
          {showCanvas &&
            data[1].map((canvasdets, index) => (
              <Canvas key={index} details={canvasdets} />
            ))}
        </div>
        <div className="relative z-10 bg-black/50 p-4 rounded-lg backdrop-blur-sm">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tighter font-bold">about the brand</h1>
          <p className="text-2xl sm:text-3xl md:text-4xl leading-[1.6] md:leading-[1.8] w-full md:w-[90%] lg:w-[80%] mt-8 md:mt-10 font-light">
            we are a team of designers, developers, and strategists who are
            passionate about creating digital experiences that are both beautiful
            and functional, we are a team of designers, developers, and
            strategists who are passionate about creating digital experiences that
            are both beautiful and functional.
          </p>

          <img
            className="w-full md:w-[90%] lg:w-[80%] mt-12 md:mt-16 object-cover rounded-lg shadow-2xl"
            src="https://directus.funkhaus.io/assets/b3b5697d-95a0-4af5-ba59-b1d423411b1c?withoutEnlargement=true&fit=outside&width=1400&height=1400"
            alt="Brand showcase"
            loading="lazy"
          />
        </div>
      </div>
    </>
  );
}

export default App;
