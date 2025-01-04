import { useState, useEffect } from 'react';
import { Send, X, Check } from 'lucide-react';
import emailjs from '@emailjs/browser';

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);

    try {
      // Replace these with your actual EmailJS credentials
      await emailjs.send(
        'service_x54tx19',
        'template_46e63rz',
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        'epGkSqkWjTIG8OCNR'
      );

      setIsSuccess(true);
      setTimeout(() => {
        setIsOpen(false);
        setIsSuccess(false);
        setFormData({ name: '', email: '', message: '' });
      }, 2000);
    } catch (error) {
      console.error('Error sending email:', error);
    } finally {
      setIsSending(false);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

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
        <button 
          onClick={() => setIsOpen(true)}
          className="px-6 py-3 rounded-full border border-white hover:bg-white hover:text-black transition-all duration-300"
        >
          Get in touch
        </button>
      </div>

      {/* Custom Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-[#313638] text-white rounded-lg p-6 w-full max-w-md relative transform transition-all duration-300 scale-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Get in Touch</h2>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full hover:bg-black/20 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-5 rounded-2xl bg-black/20 border border-gray-600 focus:border-white focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-5 rounded-2xl bg-black/20 border border-gray-600 focus:border-white focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Message</label>
                <textarea
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full p-2 rounded-2xl bg-black/20 border border-gray-600 focus:border-white focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSending || isSuccess}
                className={`w-full py-4 px-4 rounded-2xl flex items-center justify-center space-x-2 transition-all duration-300 ${
                  isSuccess 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {isSuccess ? (
                  <Check className="h-5 w-5 animate-bounce" />
                ) : isSending ? (
                  <Send className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="h-5 w-5" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}