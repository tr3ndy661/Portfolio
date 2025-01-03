import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

const technologies = [
  {
    title: "Web Development",
    icon: "🌐",
    description: "Developing intuitive, fast, and scalable applications using modern frameworks and tools. Proficient in both frontend and backend technologies to deliver full-stack solutions.",
    skills: [
      { name: "React", level: 9 },
      { name: "TailwindCSS", level: 9 },
      { name: "Node.js", level: 7 },
      { name: "MongoDB", level: 6 }
    ]
  },
  {
    title: "Artificial Intelligence",
    icon: "🤖",
    description: "Specializing in building intelligent systems and predictive models. Leveraging data to create solutions that learn, adapt, and solve complex problems efficiently.",
    skills: [
      { name: "Machine Learning", level: 6 },
      { name: "Deep Learning", level: 3 },
      { name: "Neural Networks", level: 3 }
    ]
  },
  {
    title: "3D Design",
    icon: "🎨",
    description: "Creating immersive 3D designs and visualizations for diverse applications. Skilled in procedural modeling, rendering, and digital art to bring creative ideas to life.",
    skills: [
      { name: "Blender", level: 9 },
      { name: "Geometry Nodes", level: 6 },
      { name: "Photoshop", level: 6 }
    ]
  },
  {
    title: "Soft Skills",
    icon: "🤝",
    description: "Excelling in communication, problem-solving, and strategic thinking to foster teamwork and innovation. Dedicated to building strong professional relationships and delivering results.",
    skills: [
      { name: "Communication Skills", level: 6 },
      { name: "Cognitive Thinking", level: 6 },
      { name: "Problem Solving", level: 9 }
    ]
  },
  /* Commenting out redundant Machine Learning section
  {
    title: "Machine Learning",
    icon: "🧠",
    content: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    expertise: 7
  },
  */
  {
    title: "Programming",
    icon: "💻",
    description: "Mastering multiple programming languages to craft efficient, scalable, and maintainable code. Focused on solving real-world problems through innovative software solutions.",
    skills: [
      { name: "Python", level: 9 },
      { name: "JavaScript", level: 9 },
      { name: "C++", level: 6 },
      { name: "Java", level: 6 }
    ]
  }
];

const ExpertiseScale = ({ level }) => {
  const dots = 10;
  
  const getColor = (index) => {
    if (index + 1 <= level) {
      if (index < 4) return 'bg-red-500/90';
      if (index < 7) return 'bg-orange-500/90';
      return 'bg-green-500/90';
    }
    return 'bg-gray-700';
  };

  return (
    <div className="flex gap-1 items-center bg-black/30 rounded-full px-2 py-1">
      {[...Array(dots)].map((_, index) => (
        <div
          key={index}
          className={`w-1.5 h-2 rounded-sm transition-colors duration-300 ${getColor(index)} 
            ${index + 1 <= level ? 'shadow-glow' : ''}`}
        />
      ))}
    </div>
  );
};

export default function TechnologiesSection() {
  const [openSection, setOpenSection] = useState(null);

  return (
    <div id="technologies-section" className="ml-24 mr-24 mt-24 mb-24 p-6 space-y-2">
      <h2 className="text-xl font-semibold mb-4">Technologies</h2>
      
      {technologies.map((tech, index) => (
        <div key={index} className="border-b border-gray-200/10 relative group p-5">
          <div className="absolute inset-0 bg-[#313638] opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-300" />
          <button
            onClick={() => setOpenSection(openSection === index ? null : index)}
            className="relative w-full flex items-center justify-between py-4 group-hover:text-white transition-colors duration-300"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">{tech.icon}</span>
              <span className="font-medium">{tech.title}</span>
            </div>
            <ChevronDown 
              className={`w-5 h-5 transition-transform duration-200 ${
                openSection === index ? 'rotate-180' : ''
              }`}
            />
          </button>
          
          <div 
            className={`relative overflow-hidden transition-all duration-300 ease-in-out ${
              openSection === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="p-6 rounded-3xl bg-gradient-to-br from-[#313638] to-[#1a1d1e] shadow-xl">
              <div className="flex-1 space-y-6">
                <p className="text-gray-300 text-lg leading-relaxed border-l-2 border-gray-500 pl-4">
                  {tech.description}
                </p>
                <div className="space-y-4 mt-6">
                  <div className="text-sm uppercase tracking-wider text-gray-400 mb-2">Expertise Level</div>
                  {tech.skills?.map((skill, idx) => (
                    <div key={idx} className="flex items-center justify-between gap-4 bg-black/20 p-4 rounded-xl hover:bg-black/30 transition-colors duration-200">
                      <span className="text-gray-200 font-medium tracking-wide">
                        {skill.name}
                      </span>
                      <div className="flex items-center gap-4">
                        <ExpertiseScale level={skill.level} />
                        <span className="text-sm text-gray-400 w-8">
                          {skill.level}/10
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}