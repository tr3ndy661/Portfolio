import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CharacterReveal = () => {
  const nameRef = useRef(null);
  const titleRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // Split text into characters
    const splitText = (text) => {
      const characters = text.textContent.split('');
      text.textContent = '';
      
      characters.forEach((char) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char; // Use non-breaking space for actual spaces
        span.style.display = 'inline-block';
        text.appendChild(span);
      });
      
      return text.children;
    };

    // Create animation timeline
    const tl = gsap.timeline({ defaults: { ease: 'elastic.out(1, 0.3)' } });
    
    // Split both texts
    const nameChars = splitText(nameRef.current);
    const titleChars = splitText(titleRef.current);

    // Set initial state
    gsap.set(containerRef.current, { visibility: 'visible' });
    gsap.set([nameChars, titleChars], {
      scale: 0,
      y: 50,
      opacity: 0,
      rotateX: -90
    });

    // Animate name characters first
    tl.to(nameChars, {
      duration: 1,
      scale: 1,
      y: 0,
      opacity: 1,
      rotateX: 0,
      stagger: 0.04,
      transformOrigin: "50% 50% -30"
    })
    // Then animate title characters
    .to(titleChars, {
      duration: 1,
      scale: 1,
      y: 0,
      opacity: 1,
      rotateX: 0,
      stagger: 0.04,
      transformOrigin: "50% 50% -30"
    }, "<=0.6");

  }, []);

  return (
    <div
      ref={containerRef}
      className=""
      style={{ visibility: 'hidden' }}
    >
      <h1
        ref={nameRef}
        className="text-5xl font-black -mb-5"
      >
        ABDULRAHMAN ALTAYEB
      </h1>
      <h1
        ref={titleRef}
        className="text-[70px] font-black"
      >
        AI DEVELOPER
      </h1>
    </div>
  );
};

export default CharacterReveal;