import { useState, useEffect } from 'react';
import gsap from 'gsap';
import CharacterReveal from './CharacterReveal';
import ParagraphReveal from './ParagraphReveal';
import ProjectHint from './ProjectHint';

const projects = [
  {
    id: 1,
    title: "Ocean Simulation",
    description: "A sophisticated fluid dynamics simulation showcasing realistic water behavior, light interaction, and wave patterns. Implemented using advanced GPGPU techniques and custom shaders. Features include dynamic foam generation, realistic caustics, and interactive wave propagation. Built with WebGL and Three.js for optimal performance across devices.",
    video: "/public/Photos/Sea.mp4",
  },
  {
    id: 2,
    title: "Particle System Design",
    description: "Interactive neon particle system with dynamic color shifts and motion trails. Utilizes compute shaders for high-performance particle calculations. Features include velocity-based color variation, interactive force fields, and emergent behavioral patterns. Optimized for real-time rendering with up to 1 million particles.",
    video: "/public/Photos/ParticalNEon.mp4",
  },
  {
    id: 3,
    title: "Earth Visualization",
    description: "High-fidelity 3D Earth model with accurate atmospheric effects and cloud systems. Includes detailed terrain mapping, real-time weather data visualization, and atmospheric scattering. Features day/night cycle simulation, realistic cloud formation, and interactive point-of-interest navigation. Built using custom WebGL shaders and geospatial data integration.",
    video: "/public/Photos/EarthRotation.mp4",
  },
  {
    id: 4,
    title: "Atmospheric Rendering",
    description: "Atmospheric skull scene featuring volumetric lighting and dynamic flame simulation. Implements ray-marched volumetric fog, realistic fire behavior, and dynamic shadow mapping. Includes particle-based ember systems, heat distortion effects, and realistic light scattering. Optimized using compute shaders and advanced rendering techniques.",
    video: "/public/Photos/SkullCandel.mp4",
  },
  {
    id: 5,
    title: "Motion Graphics",
    description: "Dynamic timeline animation system with procedural generation and real-time effects. Features custom easing functions, morphing transitions, and interactive timeline controls. Includes dynamic typography, particle integrations, and responsive animations. Built using WebGL and custom animation framework for smooth performance.",
    video: "/public/Photos/Timeline 1.mp4",
  },
  {
    id: 6,
    title: "Visual Effects",
    description: "Advanced visual effects suite demonstrating next-gen rendering techniques. Showcases ray-traced reflections, dynamic particle systems, and procedural animations. Features include real-time post-processing, advanced material systems, and interactive lighting. Optimized using modern GPU features and efficient rendering pipelines.",
    video: "/public/Photos/Timeline 2.mp4",
  }
];

const boxTexts = {
  1: "Dive into fluid dynamics",
  2: "Experience particle magic",
  3: "Explore our world",
  4: "Witness ethereal flames",
  5: "Feel the motion",
  6: "Discover visual depth"
};

const boxTitles = {
  1: { text: "Fluid Ocean Dynamics" },
  2: { text: "Neon Particle System" },
  3: { text: "Earth's Digital Twin" },
  4: { text: "Ethereal Skull Flames" },
  5: { text: "Timeline Evolution" },
  6: { text: "Advanced Visual FX" }
};

const HeroSection = () => {
  const [expandedBox, setExpandedBox] = useState(null);
  const [showHint, setShowHint] = useState(true);

  const handleBoxClick = (boxId) => {
    setExpandedBox(expandedBox === boxId ? null : boxId);
    setShowHint(false);
  };

  const handleVideoError = (e) => {
    console.error("Video failed to load:", e);
    e.target.style.display = 'none'; // Hide broken video
  };

  useEffect(() => {
    // Set up text animations for each box
    const boxes = document.querySelectorAll('.project-box');
    
    boxes.forEach((box, index) => {
      const textElement = document.createElement('div');
      textElement.className = `hover-text-${index + 1} absolute inset-0 flex items-center justify-center opacity-0 pointer-events-none`;
      textElement.style.zIndex = "20";
      
      // Split text into characters
      const text = boxTexts[index + 1];
      const chars = text.split('').map(char => `<span class="char">${char}</span>`).join('');
      textElement.innerHTML = chars;
      box.appendChild(textElement);

      // Simpler animation on mouseenter
      box.addEventListener('mouseenter', () => {
        if (expandedBox !== index + 1) { // Only animate if box is not expanded
          const chars = box.querySelectorAll('.char');
          gsap.to(chars, {
            opacity: 1,
            y: 0,
            duration: 0.3,
            stagger: 0.02,
            ease: "power2.out",
            color: "white"
          });
        }
      });

      box.addEventListener('mouseleave', () => {
        if (expandedBox !== index + 1) { // Only animate if box is not expanded
          gsap.to(box.querySelectorAll('.char'), {
            opacity: 0,
            duration: 0.2,
            ease: "power2.in"
          });
        }
      });
    });

    // Hide text when a box is expanded
    if (expandedBox) {
      const expandedBoxElement = document.querySelector(`.project-box:nth-child(${expandedBox})`);
      if (expandedBoxElement) {
        gsap.to(expandedBoxElement.querySelectorAll('.char'), {
          opacity: 0,
          duration: 0.2,
          ease: "power2.in"
        });
      }
    }

    return () => {
      // Cleanup animations
      boxes.forEach(box => {
        box.removeEventListener('mouseenter', () => {});
        box.removeEventListener('mouseleave', () => {});
      });
    };
  }, [expandedBox]); // Add expandedBox to dependency array

  useEffect(() => {
    const boxes = document.querySelectorAll('.project-box');
    
    boxes.forEach((box, index) => {
      // Create title overlay with updated positioning
      const titleOverlay = document.createElement('div');
      titleOverlay.className = 'absolute inset-0 flex items-center justify-center pointer-events-none z-10';
      
      const titleText = document.createElement('h2');
      titleText.className = 'text-4xl font-bold opacity-0 tracking-wider px-4 text-center text-white';
      titleText.textContent = boxTitles[index + 1].text;
      
      titleOverlay.appendChild(titleText);
      // Use the box-content class instead of bg-[#313638]
      const boxContent = box.querySelector('.box-content');
      if (boxContent) {
        boxContent.appendChild(titleOverlay);
      }

      // Simpler title animations
      box.addEventListener('mouseenter', () => {
        if (expandedBox !== index + 1) { // Only animate if box is not expanded
          const title = titleOverlay.querySelector('h2');
          gsap.to(title, {
            opacity: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.out"
          });
        }
      });

      box.addEventListener('mouseleave', () => {
        if (expandedBox !== index + 1) { // Only animate if box is not expanded
          const title = titleOverlay.querySelector('h2');
          gsap.to(title, {
            opacity: 0,
            duration: 0.2,
            ease: "power2.in"
          });
        }
      });
    });

    return () => {
      boxes.forEach(box => {
        const boxContent = box.querySelector('.box-content');
        const overlay = boxContent?.querySelector('.absolute');
        if (overlay && boxContent) {
          boxContent.removeChild(overlay);
        }
      });
    };
  }, [expandedBox]); // Add expandedBox to dependency array

  return (
    <div id="hero-section" className="hero-section-container min-h-screen relative">
      {showHint && <ProjectHint />}
      <div className="Hero-Intro ml-40 mt-40 -mb-40"> 
        <CharacterReveal />
      </div>
      <div className="About-me flex justify-end mr-40 text-xl -mt-24 -mb-16">
        <ParagraphReveal text="I am an AI specialist with expertise in UI/UX design, 3D modeling, and machine learning, dedicated to creating innovative and user-centric solutions. My work combines technical proficiency with creative problem-solving to deliver impactful results. Driven by a love for continuous learning, I am always seeking new challenges and opportunities for growth.
" />
      </div>

      <div className="flex flex-col gap-4 p-4 ml-24 mr-24 mt-24">
        <div 
          onClick={() => handleBoxClick(1)}
          className={`project-box transition-all duration-500 ease-in-out cursor-pointer ${
            expandedBox === 1 ? 'h-96' : 'h-24'
          }`}
        >
          <div className={`box-content transition-all duration-500 ease-in-out ${
            expandedBox === 1 
              ? "bg-[#313638]" 
              : "bg-[#313638] hover:bg-black/90"
          } rounded-3xl h-full relative overflow-hidden`}>
            {expandedBox === 1 && (
              <div className="absolute inset-0 p-6 bg-white/40 border-l border-black/20">
                <div className="flex h-full">
                  <div className="flex-1">
                    <video 
                      src={projects[0].video}
                      autoPlay
                      muted
                      loop
                      playsInline
                      onError={handleVideoError}
                      className="w-full h-full object-cover rounded-3xl"
                      type="video/avi" // Add correct MIME type
                    />
                  </div>
                  <div className="flex-1 pl-6 text-white">
                    <h3 className="text-2xl font-bold mb-4">{projects[0].title}</h3>
                    <p className="text-lg">{projects[0].description}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-4">
          <div 
            onClick={() => handleBoxClick(2)}
            className={`project-box transition-all duration-500 ease-in-out cursor-pointer ${
              expandedBox === 2 ? 'w-full h-96' : 'w-1/4 h-24'
            }`}
          >
            <div className={`box-content transition-all duration-500 ease-in-out ${
              expandedBox === 2
                ? "bg-[#313638]"
                : "bg-[#313638] hover:bg-black/90"
            } rounded-3xl h-full relative overflow-hidden`}>
              {expandedBox === 2 && (
                <div className="absolute inset-0 p-6 bg-white/40 border-l border-black/20">
                  <div className="flex h-full">
                    <div className="flex-1">
                      <video 
                        src={projects[1].video}
                        autoPlay
                        muted
                        loop
                        playsInline
                        onError={handleVideoError}
                        className="w-full h-full object-cover rounded-3xl"
                        type="video/avi" // Add correct MIME type
                      />
                    </div>
                    <div className="flex-1 pl-6 text-white">
                      <h3 className="text-2xl font-bold mb-4">{projects[1].title}</h3>
                      <p className="text-lg">{projects[1].description}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div 
            onClick={() => handleBoxClick(3)}
            className={`project-box transition-all duration-500 ease-in-out cursor-pointer ${
              expandedBox === 3 ? 'w-full h-96' : 'flex-1 h-24'
            }`}
          >
            <div className={`box-content transition-all duration-500 ease-in-out ${
              expandedBox === 3
                ? "bg-[#313638]"
                : "bg-[#313638] hover:bg-black/90"
            } rounded-3xl h-full relative overflow-hidden`}>
              {expandedBox === 3 && (
                <div className="absolute inset-0 p-6 bg-white/40 border-l border-black/20">
                  <div className="flex h-full">
                    <div className="flex-1">
                      <video 
                        src={projects[2].video}
                        autoPlay
                        muted
                        loop
                        playsInline
                        onError={handleVideoError}
                        className="w-full h-full object-cover rounded-3xl"
                        type="video/avi" // Add correct MIME type
                      />
                    </div>
                    <div className="flex-1 pl-6 text-white">
                      <h3 className="text-2xl font-bold mb-4">{projects[2].title}</h3>
                      <p className="text-lg">{projects[2].description}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <div 
            onClick={() => handleBoxClick(4)}
            className={`project-box transition-all duration-500 ease-in-out cursor-pointer ${
              expandedBox === 4 ? 'w-full h-96' : 'h-24 w-2/5'
            }`}
          >
            <div className={`box-content transition-all duration-500 ease-in-out ${
              expandedBox === 4
                ? "bg-[#313638]"
                : "bg-[#313638] hover:bg-black/90"
            } rounded-3xl h-full relative overflow-hidden`}>
              {expandedBox === 4 && (
                <div className="absolute inset-0 p-6 bg-white/40 border-l border-black/20">
                  <div className="flex h-full">
                    <div className="flex-1">
                      <video 
                        src={projects[3].video}
                        autoPlay
                        muted
                        loop
                        playsInline
                        onError={handleVideoError}
                        className="w-full h-full object-cover rounded-3xl"
                        type="video/avi" // Add correct MIME type
                      />
                    </div>
                    <div className="flex-1 pl-6 text-white">
                      <h3 className="text-2xl font-bold mb-4">{projects[3].title}</h3>
                      <p className="text-lg">{projects[3].description}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div 
            onClick={() => handleBoxClick(5)}
            className={`project-box transition-all duration-500 ease-in-out cursor-pointer ${
              expandedBox === 5 ? 'w-full h-96' : 'h-24 w-100'
            }`}
          >
            <div className={`box-content transition-all duration-500 ease-in-out ${
              expandedBox === 5
                ? "bg-[#313638]"
                : "bg-[#313638] hover:bg-black/90"
            } rounded-3xl h-full relative overflow-hidden`}>
              {expandedBox === 5 && (
                <div className="absolute inset-0 p-6 bg-white/40 border-l border-black/20">
                  <div className="flex h-full">
                    <div className="flex-1">
                      <video 
                        src={projects[4].video}
                        autoPlay
                        muted
                        loop
                        playsInline
                        onError={handleVideoError}
                        className="w-full h-full object-cover rounded-3xl"
                        type="video/avi" // Add correct MIME type
                      />
                    </div>
                    <div className="flex-1 pl-6 text-white">
                      <h3 className="text-2xl font-bold mb-4">{projects[4].title}</h3>
                      <p className="text-lg">{projects[4].description}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div 
          onClick={() => handleBoxClick(6)}
          className={`project-box transition-all duration-500 ease-in-out cursor-pointer ${
            expandedBox === 6 ? 'h-96' : 'h-24'
          }`}
        >
          <div className={`box-content transition-all duration-500 ease-in-out ${
            expandedBox === 6
              ? "bg-[#313638]"
              : "bg-[#313638] hover:bg-black/90"
          } rounded-3xl h-full relative overflow-hidden`}>
            {expandedBox === 6 && (
              <div className="absolute inset-0 p-6 bg-white/40 border-l border-black/20">
                <div className="flex h-full">
                  <div className="flex-1">
                    <video 
                      src={projects[5].video}
                      autoPlay
                      muted
                      loop
                      playsInline
                      onError={handleVideoError}
                      className="w-full h-full object-cover rounded-3xl"
                      type="video/avi" // Add correct MIME type
                    />
                  </div>
                  <div className="flex-1 pl-6 text-white">
                    <h3 className="text-2xl font-bold mb-4">{projects[5].title}</h3>
                    <p className="text-lg">{projects[5].description}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
