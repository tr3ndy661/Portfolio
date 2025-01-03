import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import PropTypes from 'prop-types';

const ParagraphReveal = ({ text }) => {
  const textRef = useRef(null);
  const containerRef = useRef(null);

  // Format text into lines of 7 words
  const formatText = (text) => {
    const words = text.split(' ');
    const lines = [];
    let currentLine = [];
    let currentWordCount = 0;
    
    words.forEach((word) => {
      if (currentWordCount < 7) {
        currentLine.push(word);
        currentWordCount++;
      } else {
        lines.push(currentLine.join(' '));
        currentLine = [word];
        currentWordCount = 1;
      }
    });
    
    if (currentLine.length > 0) {
      lines.push(currentLine.join(' '));
    }
    
    return lines;
  };

  useEffect(() => {
    if (!textRef.current) return;

    const lines = formatText(text);
    const spans = [];

    // Create spans for each character
    lines.forEach((line) => {
      const lineChars = line.split('');
      lineChars.forEach((char) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.display = 'inline-block';
        spans.push(span);
      });
      // Add line break
      const br = document.createElement('br');
      spans.push(br);
    });

    // Clear and append all spans at once
    textRef.current.innerHTML = '';
    spans.forEach(span => textRef.current.appendChild(span));

    // Animate
    gsap.set(containerRef.current, { visibility: 'visible' });
    gsap.set(spans, { 
      scale: 0,
      y: 50,
      opacity: 0,
      rotateX: -90
    });

    gsap.to(spans, {
      duration: 1,
      scale: 1,
      y: 0,
      opacity: 1,
      rotateX: 0,
      stagger: 0.02,
      transformOrigin: "50% 50% -30",
      ease: 'elastic.out(1, 0.3)'
    });

    // Cleanup
    return () => {
      gsap.killTweensOf(spans);
    };
  }, [text]);

  return (
    <div 
      ref={containerRef} 
      style={{ visibility: 'hidden' }}
      className="flex flex-col items-end text-xl leading-relaxed"
    >
      <div 
        ref={textRef}
        className="text-left space-y-1 max-w-[600px]"
        style={{ marginLeft: 'auto' }}
      />
    </div>
  );
};
ParagraphReveal.propTypes = {
  text: PropTypes.string.isRequired,
};


export default ParagraphReveal;