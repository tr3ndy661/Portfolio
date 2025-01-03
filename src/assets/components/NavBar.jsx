import { useState, useEffect } from 'react';

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`nav-bar fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-gray-900/10 ${
      scrolled ? 'bg-white/80 backdrop-blur-md shadow-lg' : 'bg-transparent' 
    }`}>
      <nav className="max-w-7xl mx-auto flex items-center justify-between p-4 text-black">
        <div className="flex items-center">
          <span className={`text-lg font-bold transition-all duration-300 ${
            scrolled ? 'scale-90' : ''
          }`}>Portfolio</span>
        </div>
        <div className="flex items-center space-x-6">
          <a href="#hero-section" className="hover:text-gray-600 transition-colors">Home</a>
          <a href="#technologies-section" className="hover:text-gray-600 transition-colors">Technologies</a>
          <a 
            href="#projects-section" 
            className={`bg-[#313638]
              px-4 py-2 rounded-lg hover:scale-105 transition-all duration-300 
              text-white transform ${scrolled ? 'scale-90' : ''}`}
          >
            Projects
          </a>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
