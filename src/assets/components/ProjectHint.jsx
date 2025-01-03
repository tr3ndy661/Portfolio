import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const ProjectHint = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      delay: 3,
      repeat: -1,
      repeatDelay: 4
    });

    gsap.set(containerRef.current, { opacity: 0, y: -20 });

    tl.to(containerRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out"
    })
    .to(".arrow-icon", {
      y: 10,  // Changed from x to y for downward animation
      duration: 0.5,
      repeat: 3,
      yoyo: true,
      ease: "power1.inOut"
    })
    .to(containerRef.current, {
      opacity: 0,
      y: 20,  // Changed direction
      duration: 0.6,
      delay: 1
    });

    return () => tl.kill();
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed top-[45%] left-1/2 transform -translate-x-1/2 z-50 flex items-center gap-3 bg-black/60 backdrop-blur-md px-6 py-4 rounded-2xl border border-[#377CFD]/20"
      style={{ boxShadow: '0 8px 32px rgba(55, 124, 253, 0.1)' }}
    >
      <div className="flex flex-col items-center gap-2">
        <div className="text-white/90">
          <div className="font-medium text-sm tracking-wide text-center">
            Discover My 3D Projects
          </div>
          <div className="text-xs text-white/60 text-center mt-1">
            Click boxes below to expand
          </div>
        </div>
        <div className="arrow-icon text-[#377CFD] text-2xl">
          ↓
        </div>
      </div>
    </div>
  );
};

export default ProjectHint;
