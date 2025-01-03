import { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! I'm Makhs A assistant. How can I help you today?", isBot: true }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Initialize Gemini API
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ 
        behavior: "smooth",
        block: "end",
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!input.trim() || isLoading) return;

    try {
      setIsLoading(true);
      setMessages(prev => [...prev, { text: input, isBot: false }]);
      
      // Add safety context to the prompt
      const safePrompt = `As a professional assistant, please provide a helpful response to: ${input}`;
      
      const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: safePrompt }]}],
        generationConfig: {
          temperature: 0.8,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
        safetySettings: [
          { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
          { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
          { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
          { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
        ],
      });

      const response = await result.response;
      const text = response.text();
      
      setMessages(prev => [...prev, { text, isBot: true }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        text: "I apologize, but I couldn't process that request. Please try rephrasing your question.",
        isBot: true
      }]);
    } finally {
      setIsLoading(false);
      setInput('');
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#313638] rounded-xl overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
          >
            <div
              className={`max-w-[80%] p-4 rounded-2xl ${
                message.isBot
                  ? 'bg-black/30 text-white'
                  : 'bg-gray-100'
              }`}
            >
              <p className="text-sm whitespace-pre-wrap">{message.text}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} className="h-0" /> {/* Added height-0 to prevent extra space */}
      </div>

      <form 
        onSubmit={handleSubmit} 
        className="p-4 border-t border-gray-700 bg-[#1a1d1e]"
      >
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={isLoading ? "AI is thinking..." : "Type your message..."}
            disabled={isLoading}
            className="flex-1 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#808AF7] disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-[#313638] text-white hover:bg-white hover:text-black rounded-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100" 
          >
            {isLoading ? "..." : "Send"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatBot;
