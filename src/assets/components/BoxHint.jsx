import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const BoxHint = () => {
  const hintRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      delay: 3.5,
      repeat: -1,
      repeatDelay: 3
    });

    // Initial setup
    gsap.set(hintRef.current, {
      opacity: 0,
      scale: 0.8,
      x: -50,
      y: 100
    });

    // Animation sequence
    tl.to(hintRef.current, {
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
      duration: 0.8,
      ease: "back.out(1.7)"
    })
    .to(".click-icon", {
      y: -10,
      duration: 0.5,
      repeat: 2,
      yoyo: true,
      ease: "power2.inOut"
    })
    .to(hintRef.current, {
      opacity: 0,
      y: -20,
      scale: 0.8,
      duration: 0.5,
      delay: 1
    });

    return () => tl.kill();
  }, []);

  return (
    <div 
      ref={hintRef} 
      className="fixed z-50 left-[40%] top-[50%] transform -translate-x-1/2 -translate-y-1/2 flex items-center gap-3"
    >
      <div className="relative flex items-center bg-[#377CFD] text-white px-6 py-3 rounded-xl">
        <div className="click-icon text-2xl mr-3">👆</div>
        <p className="font-medium whitespace-nowrap">
          Click boxes to view projects
        </p>
        <div className="absolute -right-2 top-1/2 transform translate-x-full -translate-y-1/2">
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path 
              d="M5 12h14M12 5l7 7-7 7" 
              stroke="#377CFD"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-pulse"
            />
          </svg>
        </div>
        <div className="absolute inset-0 bg-white/10 rounded-xl backdrop-blur-sm -z-10"></div>
        <div className="absolute inset-0 animate-pulse-slow bg-[#377CFD]/20 rounded-xl -z-20"></div>
      </div>
    </div>
  );
};

export default BoxHint;
