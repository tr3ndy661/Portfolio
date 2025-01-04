import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const TextReveal = () => {
  const textRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // Split text into individual lines
    const splitText = (text) => {
      const words = text.textContent.split(' ');
      text.textContent = '';
      
      words.forEach((word) => {
        const span = document.createElement('span');
        span.textContent = word + ' ';
        span.style.display = 'inline-block';
        text.appendChild(span);
      });
      
      return text.children;
    };

    // Create animation timeline
    const tl = gsap.timeline({ defaults: { ease: 'power4.uut' } });
    const words = splitText(textRef.current);

    // Set initial state
    gsap.set(containerRef.current, { visibility: 'visible' });
    gsap.set(words, { 
      y: 100,
      opacity: 0
    });

    // Animate each word
    tl.to(words, {
      duration: 1.5,
      y: 0,
      opacity: 1,
      stagger: 0.15,
    });
    //or animate each word
    // tl.to(words, {duration: 1, x: 10, autoAlpha: 0, ease: "elastic", stagger: 0.05});
  }, []);

  return (
    <div ref={containerRef} className="font-5xl text-black font-extrabold" style={{ visibility: 'hidden' }}>
      <h1 ref={textRef} className="text-4xl font-bold">
        Abdulrahman Al-Tayeb
      </h1>
    </div>
  );
};

export default TextReveal;