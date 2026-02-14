import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { motion } from 'motion/react';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! Welcome to CTN. How can I help you today?',
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    // Packages and pricing
    if (lowerMessage.includes('package') || lowerMessage.includes('price') || lowerMessage.includes('cost')) {
      return 'We offer unlimited internet packages from 10Mbps to 300Mbps. Our packages start at affordable rates with no data caps! Visit our Packages page to see all options, or I can help you find the right package for your needs.';
    }

    // Speed-related
    if (lowerMessage.includes('speed') || lowerMessage.includes('fast') || lowerMessage.includes('mbps')) {
      return 'All our packages offer unlimited data at various speeds: 10Mbps, 20Mbps, 50Mbps, 100Mbps, 200Mbps, and 300Mbps. What speed do you think you need?';
    }

    // Installation
    if (lowerMessage.includes('install') || lowerMessage.includes('setup')) {
      return 'We provide professional installation service! Our technicians will set up everything for you. Installation typically takes 1-2 business days after sign-up. Contact us to schedule an installation.';
    }

    // Coverage/availability
    if (lowerMessage.includes('coverage') || lowerMessage.includes('available') || lowerMessage.includes('area')) {
      return 'CTN provides internet services across Malawi, with primary coverage in urban areas. Contact us with your specific location, and we\'ll confirm availability in your area!';
    }

    // Business solutions
    if (lowerMessage.includes('business') || lowerMessage.includes('company') || lowerMessage.includes('enterprise')) {
      return 'We offer specialized business solutions with dedicated support, custom packages, and priority service. Visit our Business page or contact us directly to discuss your business needs.';
    }

    // Contact information
    if (lowerMessage.includes('contact') || lowerMessage.includes('phone') || lowerMessage.includes('email') || lowerMessage.includes('call')) {
      return 'You can reach us at:\n📞 Phone: +265 981 187 766\n📧 Email: info@ctn.mw\n📍 Location: Lilongwe Area 47 Sector 1, Malawi\nOr visit our Contact page for more options!';
    }

    // Support
    if (lowerMessage.includes('support') || lowerMessage.includes('help') || lowerMessage.includes('problem') || lowerMessage.includes('issue')) {
      return 'We provide 24/7 customer support! For immediate assistance, please call us at +265 xxx xxx xxx or email support@ctn.mw. What specific issue are you experiencing?';
    }

    // Unlimited data
    if (lowerMessage.includes('unlimited') || lowerMessage.includes('data') || lowerMessage.includes('limit')) {
      return 'Yes! All our packages come with truly unlimited data - no caps, no throttling. Stream, browse, and download as much as you want!';
    }

    // Greetings
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return 'Hello! How can I assist you with CTN internet services today?';
    }

    // Thank you
    if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
      return 'You\'re welcome! Is there anything else I can help you with?';
    }

    // Default response
    return 'I\'m here to help! You can ask me about our packages, pricing, speeds, installation, coverage areas, or business solutions. What would you like to know?';
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');

    // Simulate bot thinking delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputValue),
        isBot: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-br from-[#a4d65e] to-[#7fb83d] rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
        >
          <MessageCircle className="w-6 h-6 text-white" />
        </motion.button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="fixed bottom-6 right-6 z-50 w-96 h-[500px] bg-[#1e3a5f]/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#a4d65e] to-[#7fb83d] rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold">CTN Support</h3>
                <p className="text-white/60 text-xs">Online now</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/60 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                    message.isBot
                      ? 'bg-white/10 text-white'
                      : 'bg-gradient-to-br from-[#a4d65e] to-[#7fb83d] text-white'
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{message.text}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-white/10">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 bg-white/10 text-white placeholder-white/40 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#a4d65e] text-sm"
              />
              <button
                onClick={handleSend}
                className="bg-gradient-to-br from-[#a4d65e] to-[#7fb83d] text-white rounded-xl px-4 py-2 hover:scale-105 transition-transform"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}
