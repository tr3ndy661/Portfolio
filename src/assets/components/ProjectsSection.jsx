import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Typewriter from 'typewriter-effect';
import ChatBot from './ChatBot';

const mlProjects = [
  {
    id: 1,
    name: "Smart Housing Price Predictor",
    description: "A machine learning model that predicts housing prices based on property features such as size, number of bedrooms, and location quality. It provides a quick and data-driven way to estimate property values.",
    code: `# Import Libraries
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error

# Create Dataset
data = {
    'SquareFootage': [1500, 2000, 2500, 1800, 2200],
    'Bedrooms': [3, 4, 3, 2, 5],
    'LocationScore': [7, 8, 9, 6, 10],
    'Price': [300000, 400000, 500000, 350000, 600000]
}
df = pd.DataFrame(data)
X = df[['SquareFootage', 'Bedrooms', 'LocationScore']]
y = df['Price']

# Split Data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train Model
model = LinearRegression()
model.fit(X_train, y_train)

# Evaluate Model
y_pred = model.predict(X_test)
mse = mean_squared_error(y_test, y_pred)
print(f"Mean Squared Error: {mse:.2f}")

# Predict New Example
new_house = [[2300, 4, 8]]
predicted_price = model.predict(new_house)
print(f"Predicted Price for New House: $ {predicted_price[0]:.2f}")
`,
    explanation: "This project uses a Linear Regression model to analyze housing data and predict property prices. The model takes input features (like square footage and location score) and learns the relationship between these features and house prices. Once trained, the model can predict the price of a new property based on its characteristics, aiding in real estate decision-making."
  },
  {
    id: 2,
    name: "AI-Powered Plant Disease Detector",
    description: "A computer vision model to detect and classify plant diseases from leaf images, helping farmers and gardeners protect their crops efficiently.",
    code: `# Import Libraries
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.preprocessing import image
import numpy as np

# Data Preprocessing
train_path = 'path_to_training_images'
test_path = 'path_to_testing_images'
train_datagen = ImageDataGenerator(rescale=1./255)
test_datagen = ImageDataGenerator(rescale=1./255)
train_generator = train_datagen.flow_from_directory(
    train_path, target_size=(64, 64), batch_size=32, class_mode='binary'
)
test_generator = test_datagen.flow_from_directory(
    test_path, target_size=(64, 64), batch_size=32, class_mode='binary'
)

# Build and Compile Model
model = Sequential([
    Conv2D(32, (3, 3), activation='relu', input_shape=(64, 64, 3)),
    MaxPooling2D(2, 2),
    Flatten(),
    Dense(128, activation='relu'),
    Dense(1, activation='sigmoid')
])
model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])

# Train Model
model.fit(train_generator, epochs=5, validation_data=test_generator)

# Predict New Image
new_image_path = 'path_to_leaf_image.jpg'
img = image.load_img(new_image_path, target_size=(64, 64))
img_array = np.expand_dims(image.img_to_array(img) / 255.0, axis=0)
prediction = model.predict(img_array)
print(f"Disease Detected: {'Yes' if prediction[0][0] > 0.5 else 'No'}")
 "`,
    explanation: "Using a Convolutional Neural Network (CNN), this project processes images of leaves to identify patterns associated with diseases. Trained on a dataset of healthy and diseased plant images, the model provides fast and accurate diagnostics, ensuring timely interventions to mitigate crop damage. "
  },
  // Add more ML projects as needed
];

const designProjects = [
  {
    name: "Abstract Harmony",
    description: "An exploration of mathematical beauty through architectural forms. This visualization combines precise geometric patterns with dynamic lighting to create a sense of depth and movement. The design emphasizes the interplay between light and shadow, creating an ethereal atmosphere that challenges traditional spatial perception.",
    image: "/public/Photos/6.RenderSix.png",
    type: "design",
    color: "#808AF7"
  },
  {
    name: "Crystal Pavilion",
    description: "A futuristic architectural concept merging transparency and structural complexity. This design investigates how light interacts with crystalline forms, creating intricate reflections and refractions. The visualization demonstrates advanced material studies and environmental lighting techniques.",
    image: "/public/Photos/7.RenderSeven.png",
    type: "design",
    color: "#4CC9F0"
  },
  {
    name: "Modern Living Space",
    description: "A meticulously crafted interior visualization showcasing contemporary kitchen design. This space balances functionality with aesthetic refinement, featuring carefully considered material selections, ambient lighting, and architectural detailing that creates an inviting atmosphere for modern living.",
    image: "/public/Photos/Kitchen.png",
    type: "design",
    color: "#F72585"
  },
  {
    name: "Geometric Dreams",
    description: "An abstract architectural study exploring the relationship between form and void. This visualization pushes the boundaries of conventional design through bold geometric compositions and dramatic lighting effects, creating a powerful sense of scale and dimension.",
    image: "/public/Photos/Render3.png",
    type: "design",
    color: "#7209B7"
  },
  {
    name: "Urban Oasis",
    description: "A conceptual environment blending natural elements with urban architecture. This visualization explores the harmony between organic forms and geometric structures, enhanced by atmospheric effects and careful composition to create a sense of sanctuary within a metropolitan context.",
    image: "/public/Photos/SecondRender5.png",
    type: "design",
    color: "#4361EE"
  },
  {
    name: "Serene Interior",
    description: "A minimalist interior space that celebrates simplicity and light. This visualization demonstrates mastery of interior lighting techniques, material properties, and spatial composition. The design creates a peaceful atmosphere through careful attention to proportion and detail.",
    image: "/public/Photos/Room.png",
    type: "design",
    color: "#4361EE"
  }
];

export default function ProjectSection() {
  const [activeTab, setActiveTab] = useState('all');
  const [currentProject, setCurrentProject] = useState(0);
  const [expandedCard, setExpandedCard] = useState(null);
  const [isTyping, setIsTyping] = useState(false);

  const renderMLProject = () => (
    <div className="w-full h-[800px] bg-[#313638] rounded-3xl p-8 shadow-2xl relative overflow-hidden">
      <AnimatePresence mode='wait'>
        <motion.div
          key={currentProject}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5, ease: "backOut" }}
          className="h-full flex flex-col lg:flex-row gap-6"
        >
          {/* Code Section */}
          <div className="flex-1 h-full flex flex-col">
            <motion.div 
              className="flex-1 bg-black/20 rounded-2xl overflow-hidden shadow-xl backdrop-blur-sm"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="p-4 bg-gradient-to-r from-[#808AF7]/10 via-transparent to-transparent border-b border-gray-700/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-2">
                      <motion.div 
                        className="w-3 h-3 rounded-full bg-[#dc322f]"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.4, type: "spring" }}
                      />
                      <motion.div 
                        className="w-3 h-3 rounded-full bg-[#b58900]"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5, type: "spring" }}
                      />
                      <motion.div 
                        className="w-3 h-3 rounded-full bg-[#859900]"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.6, type: "spring" }}
                      />
                    </div>
                    <motion.span 
                      className="text-gray-400 text-sm font-mono"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7 }}
                    >
                      {mlProjects[currentProject].name}.py
                    </motion.span>
                  </div>
                  <motion.div 
                    className="text-xs text-gray-500 font-mono px-2 py-1 rounded-md bg-black/20"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    Python
                  </motion.div>
                </div>
              </div>
              
              <div className="p-6 h-full bg-gradient-to-b from-transparent to-black/20">
                <pre className="text-gray-300 font-mono text-sm h-full overflow-x-auto">
                  <Typewriter
                    onInit={(typewriter) => {
                      setIsTyping(true);
                      typewriter
                        .typeString(mlProjects[currentProject].code)
                        .callFunction(() => setIsTyping(false))
                        .start();
                    }}
                    options={{
                      delay: 30,
                      cursor: '▋',
                      wrapperClassName: "text-blue-400"
                    }}
                  />
                </pre>
              </div>
            </motion.div>
          </div>

          {/* Description Section */}
          <motion.div 
            className="flex-1 h-full flex flex-col gap-6"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex-1 bg-black/20 rounded-2xl p-6 backdrop-blur-sm border border-gray-700/50">
              <motion.h3 
                className="text-3xl font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <span className="bg-white bg-clip-text text-transparent">
                  {mlProjects[currentProject].name}
                </span>
              </motion.h3>
              <motion.p 
                className="text-gray-300 mb-6 leading-relaxed text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                {mlProjects[currentProject].description}
              </motion.p>
              <motion.div 
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <div className="flex items-center gap-2 text-[#808AF7]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h4 className="font-semibold">Implementation Details</h4>
                </div>
                <div className="bg-black/30 rounded-xl p-4 border border-gray-700/50">
                  <p className="text-gray-400">{mlProjects[currentProject].explanation}</p>
                </div>
              </motion.div>
            </div>

            {/* Navigation Controls */}
            <motion.div 
              className="h-16 flex justify-between items-center bg-black/20 p-4 rounded-xl backdrop-blur-sm border border-gray-700/50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <button
                onClick={() => setCurrentProject((prev) => prev === 0 ? mlProjects.length - 1 : prev - 1)}
                disabled={isTyping}
                className="px-6 py-3 bg-[#808AF7]/10 text-white rounded-xl hover:scale-105 
                         transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100
                         border border-[#808AF7]/20 hover:border-[#808AF7]/50 hover:bg-[#808AF7]/20"
              >
                Previous
              </button>
              
              <div className="flex gap-2">
                {mlProjects.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentProject(index)}
                    className={`h-1.5 rounded-full transition-all duration-300 
                      ${currentProject === index 
                        ? 'bg-white w-5' 
                        : 'bg-gray-700 w-4'
                      }`}
                  />
                ))}
              </div>
              
              <button
                onClick={() => setCurrentProject((prev) => prev === mlProjects.length - 1 ? 0 : prev + 1)}
                disabled={isTyping}
                className="px-6 py-3 bg-[#808AF7]/10 text-white rounded-xl hover:scale-105 
                         transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100
                         border border-[#808AF7]/20 hover:border-[#808AF7]/50 hover:bg-[#808AF7]/20"
              >
                Next
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );

  const renderCard = (project, index) => {
    if (activeTab === 'web') { // Design view
      return (
        <div className="break-inside-avoid mb-6">
          <div 
            className="bg-[#313638] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl 
                     transition-all duration-500 transform hover:-translate-y-2 cursor-pointer
                     border border-gray-800 h-[400px]" // Fixed height
            onClick={() => setExpandedCard(expandedCard === index ? null : index)}
          >
            <div className="relative overflow-hidden group h-[200px]"> {/* Fixed height for image container */}
              <img 
                src={project.image} 
                alt={project.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#313638]/90 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            
            <div className="p-6 flex flex-col h-[200px]"> {/* Fixed height for content */}
              <h3 className="text-xl font-bold text-white mb-2">{project.name}</h3>
              <p className="text-gray-300 text-sm line-clamp-4"> {/* Limit to 4 lines */}
                {project.description}
                {project.description.length > 200 && 
                  <span className="text-blue-400 ml-1">See more...</span>
                }
              </p>
            </div>
          </div>

          {/* Expanded Card Modal */}
          {expandedCard === index && (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
              <div className="bg-[#313638] rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-modalFade border border-gray-800">
                <div className="relative rounded-xl overflow-hidden mb-6">
                  <img 
                    src={project.image} 
                    alt={project.name}
                    className="w-full h-auto"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setExpandedCard(null);
                    }}
                    className="absolute top-4 right-4 bg-black/50 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/75 transition-all backdrop-blur-sm"
                  >
                    ✕
                  </button>
                </div>
                
                <h2 className="text-2xl font-bold mb-4 text-white">{project.name}</h2>
                <p className="text-gray-300 text-lg mb-6">{project.description}</p>
                
                {/* <div className="flex flex-wrap gap-3 mt-4">
                  {project.tags.map((tag, i) => (
                    <span 
                      key={i}
                      className="px-4 py-2 rounded-full text-sm font-medium bg-black/30 text-white"
                      style={{ borderColor: project.color }}
                    >
                      {tag}
                    </span>
                  ))}
                </div> */}
              </div>
            </div>
          )}
        </div>
      );
    }

    return (
      // Original code card view
      <div className="h-[32rem] flex flex-col"> {/* Fixed height container */}
        <div 
          className="bg-[#fdf6e3] rounded-2xl overflow-hidden p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full"
        >
          <div className="bg-[#002b36] rounded-lg p-4 mb-4 h-[180px] overflow-hidden"> {/* Fixed height code block */}
            <div className="flex gap-2 mb-3">
              <div className="w-3 h-3 rounded-full bg-[#dc322f]" />
              <div className="w-3 h-3 rounded-full bg-[#b58900]" />
              <div className="w-3 h-3 rounded-full bg-[#859900]" />
            </div>
            <pre className="text-[#93a1a1] font-mono text-sm overflow-x-auto h-[120px]">
              <code>{project.code}</code>
            </pre>
          </div>
          
          <h3 className="text-xl font-semibold mb-2 text-[#002b36]">{project.name}</h3>
          <p className="text-[#586e75] mb-4 flex-1 overflow-y-auto">{project.description}</p>
          
          <button
            onClick={() => setExpandedCard(expandedCard === index ? null : index)}
            className="w-full py-2 px-4 rounded-lg bg-gradient-to-r from-pink-300 via-[#808AF7] to-[#09E482] text-white font-medium hover:scale-105 transition-all duration-300 mt-auto"
          >
            {expandedCard === index ? 'Close' : 'Expand'}
          </button>
        </div>

        {/* Expanded Card Modal */}
        {expandedCard === index && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-[#fdf6e3] rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-modalFade">
              <div className="bg-[#002b36] rounded-lg p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#dc322f]" />
                    <div className="w-3 h-3 rounded-full bg-[#b58900]" />
                    <div className="w-3 h-3 rounded-full bg-[#859900]" />
                  </div>
                  <button
                    onClick={() => setExpandedCard(null)}
                    className="text-[#93a1a1] hover:text-white transition-colors"
                  >
                    ✕
                  </button>
                </div>
                <pre className="text-[#93a1a1] font-mono text-lg">
                  <code>{project.code}</code>
                </pre>
              </div>
              
              <h2 className="text-2xl font-semibold mb-4 text-[#002b36]">{project.name}</h2>
              <p className="text-[#586e75] text-lg mb-6">{project.description}</p>
              
              <button
                onClick={() => setExpandedCard(null)}
                className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-pink-300 via-[#808AF7] to-[#09E482] text-white font-medium hover:scale-105 transition-all duration-300"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderContent = () => {
    if (activeTab === 'mobile') {
      return (
        <div className="w-full h-[800px] bg-gradient-to-br from-[#313638] to-[#1a1d1e] rounded-3xl p-4 overflow-hidden">
          <div className="h-full overflow-hidden">
            <ChatBot />
          </div>
        </div>
      );
    }
    if (activeTab === 'all') return renderMLProject();
    return (
      <div className={activeTab === 'web' 
        ? "columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6" 
        : "grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      }>
        {designProjects.map((project, index) => (
          <div key={`project-${index}-${project.name}`}>
            {renderCard(project, index)}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div id="projects-section" className="max-w-7xl mx-auto p-8 mt-24 mb-24">
      <h2 className="text-xl font-semibold mb-6">Projects</h2>
      
      {/* Tab buttons */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-6 py-2 rounded-full transition-all duration-300 hover:scale-105 ${
            activeTab === 'all' 
              ? 'bg-[#313638] text-white shadow-lg' 
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          Machine Learning
        </button>
        <button
          onClick={() => setActiveTab('web')}
          className={`px-6 py-2 rounded-full transition-all duration-300 hover:scale-105 ${
            activeTab === 'web' 
              ? 'bg-[#313638] text-white shadow-lg' 
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          Design
        </button>
        <button
          onClick={() => setActiveTab('mobile')}
          className={`px-6 py-2 rounded-full transition-all duration-300 hover:scale-105 ${
            activeTab === 'mobile' 
              ? 'bg-[#313638] text-white shadow-lg' 
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          Artificial Intelligence
        </button>
      </div>

      {renderContent()}
    </div>
  );
}