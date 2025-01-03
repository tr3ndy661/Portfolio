import { useState, useEffect } from 'react';

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="bg-[#313638] rounded-3xl min-h-[600px] flex flex-col items-center justify-center text-white p-8 m-20">
      <div className={`space-y-8 text-center transform transition-all duration-1000 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}>
        <p className="text-lg">Contact</p>
        
        <h1 className="text-5xl md:text-6xl font-bold space-y-2">
          <div>Let&apos;s create your</div>
          <div>big new idea.</div>
        </h1>
        
        <button className="px-6 py-3 rounded-full border border-white hover:bg-white hover:text-black">
          Get in touch
        </button>
      </div>
      
      {/* <nav className="absolute bottom-8">
        <ul className="flex space-x-8 text-gray-300">
          {['Home', 'Projects', 'Technologies', 'Contact', 'About'].map((item) => (
            <li key={item} className="hover:text-white transition-colors duration-200 cursor-pointer">
              {item}
            </li>
          ))}
        </ul>
      </nav> */}
    </div>
  );
}