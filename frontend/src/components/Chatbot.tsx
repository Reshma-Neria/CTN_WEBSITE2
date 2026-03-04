import { useState, useRef, useEffect } from 'react';
import { X, Send } from 'lucide-react';
import { motion } from 'motion/react';
import type { ReactNode } from 'react';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

// Comprehensive CTN Knowledge Base
const CTN_KNOWLEDGE_BASE = {
  company: {
    name: 'CTN (Converged Technology Networks)',
    description: "Malawi's leading internet service provider, dedicated to delivering exceptional connectivity solutions",
    mission: 'To provide Malawi with world-class internet connectivity that empowers individuals, businesses, and communities',
    tagline: 'Connecting Malawi to the World',
  },
  packages: [
    {
      speed: '10Mbps',
      price: 'Contact for pricing',
      ideal: 'Home browsing',
      features: ['Unlimited Data', 'Perfect for browsing & email', '1-2 devices', 'Free Installation', 'Router included', '24/7 Support'],
    },
    {
      speed: '20Mbps',
      price: 'Contact for pricing',
      ideal: 'Home streaming',
      features: ['Unlimited Data', 'Great for streaming', '2-3 devices', 'Free Installation', 'Router included', 'Priority Support'],
    },
    {
      speed: '50Mbps',
      price: 'Contact for pricing',
      ideal: 'Family usage',
      popular: true,
      features: ['Unlimited Data', 'HD streaming & gaming', '4-6 devices', 'Free Installation', 'Premium Router', 'Priority Support'],
    },
    {
      speed: '100Mbps',
      price: 'Contact for pricing',
      ideal: 'Heavy users',
      features: ['Unlimited Data', '4K streaming & gaming', '6-10 devices', 'Free Installation', 'Premium Router', 'Dedicated Support'],
    },
    {
      speed: '300Mbps',
      price: 'Contact for pricing',
      ideal: 'Business & Pro',
      features: ['Unlimited Data', 'Business & power users', '10+ devices', 'Free Installation', 'Enterprise Router', 'Dedicated Technician'],
    },
  ],
  business: {
    solutions: [
      {
        type: 'Office Solutions',
        description: 'Enterprise-grade internet for business operations',
        features: ['Dedicated bandwidth', 'Static IP address', 'Business SLA guarantee', 'Priority support', 'Scalable plans', 'Network monitoring'],
      },
      {
        type: 'Conference Connectivity',
        description: 'Seamless internet for conferences and large events',
        features: ['High capacity bandwidth', 'Multiple access points', 'On-site technical support', 'Dedicated connection', 'Load balancing', '24/7 monitoring'],
      },
      {
        type: 'Event Rentals',
        description: 'Flexible short-term internet solutions',
        features: ['Up to 300Mbps speed', 'Free setup & removal', 'Professional equipment', 'MK55,000/day', 'Custom duration', 'Technical on-site support'],
      },
    ],
    benefits: [
      '99.9% uptime guarantee with redundant systems',
      'Enterprise-grade security with firewall protection',
      'Assigned account manager and priority technical support',
    ],
    industries: ['Healthcare', 'Education', 'Finance', 'Retail', 'Hospitality', 'Manufacturing'],
  },
  contact: {
    phone: '+265 981 187 766',
    email: 'info@ctnmw.net',
    website: 'www.ctnmw.net',
    whatsapp: '+265 981 187 766',
    offices: [
      { city: 'Blantyre', address: 'Victoria Avenue, City Centre', hours: 'Mon-Fri: 8AM-5PM, Sat: 9AM-1PM' },
      { city: 'Lilongwe', address: 'Capital City, Area 4', hours: 'Mon-Fri: 8AM-5PM, Sat: 9AM-1PM' },
      { city: 'Mzuzu', address: 'M1 Road, Town Centre', hours: 'Mon-Fri: 8AM-5PM' },
    ],
    support: '24/7 customer support available',
  },
  services: {
    installation: 'Professional installation service. Installation typically takes 24-48 hours from sign-up. Free installation included with all packages.',
    coverage: 'CTN provides internet services across Malawi, with primary coverage in urban areas. Check coverage using our coverage map on the packages page.',
    unlimited: 'All packages come with truly unlimited data - no caps, no throttling, no fair usage policies. Use as much data as you need.',
    router: 'All packages include a router as part of the installation. We provide professional-grade equipment suited to your package speed.',
    upgrade: 'You can upgrade or downgrade your package at any time. Contact our support team to make changes to your plan.',
  },
  partners: {
    vision: 'Broadband For the Rest of Us',
    description: 'Join us as we bring affordable, unlimited, uncapped and high quality internet to the market',
    levels: [
      {
        name: 'Silver Partner',
        description: 'Entry-level partnership providing installation and support services. Minimum team of two with own vehicle or transport needed.',
      },
      {
        name: 'Gold Partner',
        description: 'Silver Partners who meet/exceed install targets. Eligible to earn from sales with access to CRM and pipeline.',
      },
    ],
    location: 'Currently available in Lilongwe only',
  },
  stats: {
    maxSpeed: '300Mbps',
    uptime: '99.9%',
    support: '24/7',
    teamMembers: '50+',
    customers: '5000+',
  },
  faqs: [
    {
      q: 'Is the data really unlimited?',
      a: 'Yes! All our packages come with truly unlimited data. No caps, no throttling, no fair usage policies. Use as much data as you need.',
    },
    {
      q: 'How long does installation take?',
      a: 'Installation typically takes 24-48 hours from the time you sign up. Our technicians will coordinate with you to schedule a convenient time.',
    },
    {
      q: 'Do I need to buy a router?',
      a: 'No, all packages include a router as part of the installation. We provide professional-grade equipment suited to your package speed.',
    },
    {
      q: 'Can I upgrade my package later?',
      a: 'Absolutely! You can upgrade or downgrade your package at any time. Contact our support team to make changes to your plan.',
    },
  ],
};

// Keywords that indicate questions outside CTN's scope
const OUT_OF_SCOPE_KEYWORDS = [
  'weather', 'news', 'sports', 'cooking', 'recipe', 'movie', 'music', 'game', 'entertainment',
  'travel', 'hotel', 'flight', 'restaurant', 'shopping', 'fashion', 'beauty', 'health', 'medical',
  'banking', 'loan', 'credit', 'insurance', 'investment', 'stock', 'crypto', 'bitcoin',
  'education', 'school', 'university', 'course', 'degree', 'job', 'career', 'resume', 'interview',
  'government', 'politics', 'election', 'law', 'legal', 'court',
  'other company', 'competitor', 'rival', 'alternative to ctn',
];

const CUSTOMER_CARE_CONTACT =
  'Please contact our customer care: Phone +265 981 187 766, Email info@ctnmw.net, WhatsApp +265 981 187 766, Website www.ctnmw.net.';

// Check if question is outside CTN's scope
function isOutOfScope(message: string): boolean {
  const lowerMessage = message.toLowerCase();
  
  // Check for out-of-scope keywords
  for (const keyword of OUT_OF_SCOPE_KEYWORDS) {
    if (lowerMessage.includes(keyword)) {
      return true;
    }
  }
  
  // Check if question is clearly not about CTN services
  const ctnKeywords = ['ctn', 'internet', 'wifi', 'connection', 'package', 'speed', 'coverage', 'installation', 'business', 'partner'];
  const hasCtnKeyword = ctnKeywords.some(keyword => lowerMessage.includes(keyword));
  
  // If no CTN-related keywords and question seems unrelated, it's out of scope
  if (!hasCtnKeyword && lowerMessage.length > 10) {
    // Check if it's a general question that doesn't relate to CTN
    const generalQuestionPatterns = [
      /^what is (?!.*(ctn|internet|wifi|connection|package|speed|coverage|installation|business|partner))/i,
      /^how (?!.*(ctn|internet|wifi|connection|package|speed|coverage|installation|business|partner))/i,
      /^where (?!.*(ctn|internet|wifi|connection|package|speed|coverage|installation|business|partner))/i,
      /^when (?!.*(ctn|internet|wifi|connection|package|speed|coverage|installation|business|partner))/i,
      /^why (?!.*(ctn|internet|wifi|connection|package|speed|coverage|installation|business|partner))/i,
    ];
    
    for (const pattern of generalQuestionPatterns) {
      if (pattern.test(message)) {
        return true;
      }
    }
  }
  
  return false;
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! Welcome to CTN (Converged Technology Networks). I\'m here to help you with information about our internet services, packages, business solutions, and more. How can I assist you today?',
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
    const lowerMessage = userMessage.toLowerCase().trim();
    
    // Check if question is outside CTN's scope
    if (isOutOfScope(userMessage)) {
      return `Sorry, i'm unable to answer this. ${CUSTOMER_CARE_CONTACT}`;
    }

    // Greetings
    if (lowerMessage.match(/^(hi|hello|hey|good morning|good afternoon|good evening|greetings)/)) {
      return `Hello! Welcome to CTN. I can answer questions based on information on our website. How can I help you today?`;
    }

    // Company information
    if (lowerMessage.includes('what is ctn') || lowerMessage.includes('who is ctn')) {
      return CTN_KNOWLEDGE_BASE.company.description;
    }
    if (lowerMessage.includes('about ctn') || lowerMessage.includes('tell me about ctn')) {
      return `${CTN_KNOWLEDGE_BASE.company.description}. We offer unlimited high-speed internet packages from 10Mbps to 300Mbps across Malawi.`;
    }

    // Specific speed packages - check this first before general speed questions
    const speedMatch = lowerMessage.match(/(\d+)\s*mbps/);
    if (speedMatch) {
      const speed = speedMatch[1] + 'Mbps';
      const pkg = CTN_KNOWLEDGE_BASE.packages.find(p => p.speed === speed);
      if (pkg) {
        if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
          return `The ${pkg.speed} package pricing is available upon request. Please contact us at +265 981 187 766.`;
        }
        if (lowerMessage.includes('feature') || lowerMessage.includes('include') || lowerMessage.includes('what')) {
          return `The ${pkg.speed} package includes: ${pkg.features.slice(0, 3).join(', ')}. Ideal for ${pkg.ideal}.`;
        }
        return `Our ${pkg.speed} package is ideal for ${pkg.ideal}.`;
      }
    }

    // Packages and pricing
    if (lowerMessage.includes('package') && (lowerMessage.includes('list') || lowerMessage.includes('all') || lowerMessage.includes('what'))) {
      const speeds = CTN_KNOWLEDGE_BASE.packages.map(p => p.speed).join(', ');
      return `We offer packages with speeds: ${speeds}. All include unlimited data, free installation, and router.`;
    }

    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || (lowerMessage.includes('package') && lowerMessage.includes('price'))) {
      return 'Pricing is available upon request. Please contact us at +265 981 187 766 for package pricing.';
    }

    // Speed-related
    if (lowerMessage.includes('speed') || lowerMessage.includes('fast') || lowerMessage.includes('mbps') || lowerMessage.includes('bandwidth')) {
      if (lowerMessage.includes('max') || lowerMessage.includes('maximum') || lowerMessage.includes('highest')) {
        return `Our maximum speed is ${CTN_KNOWLEDGE_BASE.stats.maxSpeed}.`;
      }
      const speeds = CTN_KNOWLEDGE_BASE.packages.map(p => p.speed).join(', ');
      return `We offer speeds: ${speeds}. All with unlimited data.`;
    }

    // Installation
    if (lowerMessage.includes('install') || lowerMessage.includes('setup') || lowerMessage.includes('installation')) {
      if (lowerMessage.includes('how long') || lowerMessage.includes('time') || lowerMessage.includes('when')) {
        return 'Installation typically takes 24-48 hours from sign-up.';
      }
      if (lowerMessage.includes('free') || lowerMessage.includes('cost')) {
        return 'Installation is free with all packages.';
      }
      return 'We provide professional installation service. Installation typically takes 24-48 hours from sign-up.';
    }

    // Coverage/availability
    if (lowerMessage.includes('coverage') || lowerMessage.includes('available') || lowerMessage.includes('area') || lowerMessage.includes('location')) {
      if (lowerMessage.includes('office') || lowerMessage.includes('where')) {
        const officeList = CTN_KNOWLEDGE_BASE.contact.offices.map(o => `${o.city}: ${o.address}`).join(', ');
        return `Our offices: ${officeList}`;
      }
      return 'CTN provides internet services across Malawi, with primary coverage in urban areas. Check coverage using our coverage map on the Packages page.';
    }

    // Unlimited data
    if (lowerMessage.includes('unlimited') || (lowerMessage.includes('data') && lowerMessage.includes('limit')) || lowerMessage.includes('cap')) {
      return 'Yes, all packages come with truly unlimited data - no caps, no throttling.';
    }

    // Router
    if (lowerMessage.includes('router') || lowerMessage.includes('equipment') || lowerMessage.includes('device')) {
      if (lowerMessage.includes('include') || lowerMessage.includes('free')) {
        return 'Yes, all packages include a router as part of the installation.';
      }
      return 'All packages include a router as part of the installation.';
    }

    // Upgrade/downgrade
    if (lowerMessage.includes('upgrade') || lowerMessage.includes('downgrade') || lowerMessage.includes('change package') || lowerMessage.includes('switch')) {
      return 'Yes, you can upgrade or downgrade your package at any time. Contact our support team at +265 981 187 766.';
    }

    // Business solutions
    if (lowerMessage.includes('business') || lowerMessage.includes('company') || lowerMessage.includes('enterprise') || lowerMessage.includes('office')) {
      if (lowerMessage.includes('solution') || lowerMessage.includes('offer') || lowerMessage.includes('what')) {
        const solutionTypes = CTN_KNOWLEDGE_BASE.business.solutions.map(s => s.type).join(', ');
        return `We offer business solutions: ${solutionTypes}. Contact us at +265 981 187 766 to discuss your needs.`;
      }
      return 'We offer specialized business solutions with dedicated support. Contact us at +265 981 187 766.';
    }

    // Conference/Event
    if (lowerMessage.includes('conference') || lowerMessage.includes('event') || lowerMessage.includes('rental') || lowerMessage.includes('meeting')) {
      if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
        return 'Event rentals start at MK55,000/day. Contact us at +265 981 187 766 for details.';
      }
      const eventSolution = CTN_KNOWLEDGE_BASE.business.solutions.find(s => s.type.includes('Conference') || s.type.includes('Event'));
      if (eventSolution) {
        return `${eventSolution.type}: ${eventSolution.description}. Contact us at +265 981 187 766.`;
      }
    }

    // Contact information - be specific based on what's asked
    if (lowerMessage.includes('phone') || lowerMessage.includes('call') || lowerMessage.includes('number')) {
      return `Phone: ${CTN_KNOWLEDGE_BASE.contact.phone}`;
    }

    if (lowerMessage.includes('email') || lowerMessage.includes('mail')) {
      return `Email: ${CTN_KNOWLEDGE_BASE.contact.email}`;
    }

    if (lowerMessage.includes('whatsapp') || lowerMessage.includes('whats app')) {
      return `WhatsApp: ${CTN_KNOWLEDGE_BASE.contact.whatsapp}`;
    }

    if (lowerMessage.includes('address') || (lowerMessage.includes('location') && lowerMessage.includes('office')) || (lowerMessage.includes('where') && lowerMessage.includes('office'))) {
      const officeList = CTN_KNOWLEDGE_BASE.contact.offices.map(o => `${o.city}: ${o.address}`).join(', ');
      return `Our offices: ${officeList}`;
    }

    if (lowerMessage.includes('contact') || lowerMessage.includes('reach') || lowerMessage.includes('get in touch')) {
      return `Phone: ${CTN_KNOWLEDGE_BASE.contact.phone}, Email: ${CTN_KNOWLEDGE_BASE.contact.email}, WhatsApp: ${CTN_KNOWLEDGE_BASE.contact.whatsapp}`;
    }

    // Support
    if (lowerMessage.includes('support') || lowerMessage.includes('help') || lowerMessage.includes('problem') || lowerMessage.includes('issue') || lowerMessage.includes('trouble')) {
      if (lowerMessage.includes('phone') || lowerMessage.includes('call') || lowerMessage.includes('number')) {
        return `For support, call ${CTN_KNOWLEDGE_BASE.contact.phone} or WhatsApp ${CTN_KNOWLEDGE_BASE.contact.whatsapp}.`;
      }
      return `24/7 support available. Contact us at ${CTN_KNOWLEDGE_BASE.contact.phone} or ${CTN_KNOWLEDGE_BASE.contact.email}.`;
    }

    // Partner program
    if (lowerMessage.includes('partner') || lowerMessage.includes('partnership') || lowerMessage.includes('certified')) {
      if (lowerMessage.includes('level') || lowerMessage.includes('type')) {
        const levels = CTN_KNOWLEDGE_BASE.partners.levels.map(l => l.name).join(' and ');
        return `We have ${levels} levels. ${CTN_KNOWLEDGE_BASE.partners.location}`;
      }
      return `CTN Partner Program: ${CTN_KNOWLEDGE_BASE.partners.description}. Contact us at +265 981 187 766.`;
    }

    // Uptime/reliability
    if (lowerMessage.includes('uptime') || lowerMessage.includes('reliable') || lowerMessage.includes('reliability') || lowerMessage.includes('downtime')) {
      return `We guarantee ${CTN_KNOWLEDGE_BASE.stats.uptime} uptime with redundant systems.`;
    }

    // FAQ answers
    for (const faq of CTN_KNOWLEDGE_BASE.faqs) {
      const faqKeywords = faq.q.toLowerCase().split(' ');
      if (faqKeywords.some(keyword => lowerMessage.includes(keyword))) {
        return faq.a;
      }
    }

    // Thank you
    if (lowerMessage.includes('thank') || lowerMessage.includes('thanks') || lowerMessage.includes('appreciate')) {
      return 'You\'re welcome!';
    }

    // Default response
    return `Sorry, i'm unable to answer this. ${CUSTOMER_CARE_CONTACT}`;
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

  const renderLinkedMessage = (text: string): ReactNode => {
    const lines = text.split('\n');
    const pattern = /((?:https?:\/\/)?(?:www\.)[^\s]+|[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}|\+?\d[\d\s]{7,}\d)/g;

    return lines.map((line, lineIndex) => {
      const parts = line.split(pattern);
      return (
        <span key={`line-${lineIndex}`}>
          {parts.map((part, partIndex) => {
            if (!part) return null;

            const isEmail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(part);
            const isWebsite = /^(?:https?:\/\/)?(?:www\.)[^\s]+$/.test(part);
            const isPhone = /^\+?\d[\d\s]{7,}\d$/.test(part);

            if (isEmail) {
              return (
                <a
                  key={`part-${lineIndex}-${partIndex}`}
                  href={`mailto:${part}`}
                  className="underline hover:text-[#a4d65e]"
                >
                  {part}
                </a>
              );
            }

            if (isWebsite) {
              const href = part.startsWith('http://') || part.startsWith('https://') ? part : `https://${part}`;
              return (
                <a
                  key={`part-${lineIndex}-${partIndex}`}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-[#a4d65e]"
                >
                  {part}
                </a>
              );
            }

            if (isPhone) {
              const tel = part.replace(/\s+/g, '');
              return (
                <a
                  key={`part-${lineIndex}-${partIndex}`}
                  href={`tel:${tel}`}
                  className="underline hover:text-[#a4d65e]"
                >
                  {part}
                </a>
              );
            }

            return <span key={`part-${lineIndex}-${partIndex}`}>{part}</span>;
          })}
          {lineIndex < lines.length - 1 ? <br /> : null}
        </span>
      );
    });
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[9999] flex items-center gap-2">
          <span className="hidden sm:inline-block rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[#1e3a5f] shadow">
            Chat with us
          </span>
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            onClick={() => setIsOpen(true)}
            aria-label="Open chatbot"
            className="w-14 h-14 bg-gradient-to-br from-[#a4d65e] to-[#7fb83d] rounded-full shadow-lg ring-2 ring-white/70 flex items-center justify-center hover:scale-110 transition-transform"
          >
            <Send className="w-6 h-6 text-white" />
          </motion.button>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="fixed z-[9999] left-3 right-3 bottom-3 h-[72vh] sm:left-auto sm:right-6 sm:bottom-6 sm:w-96 sm:h-[500px] bg-[#1e3a5f]/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#a4d65e] to-[#7fb83d] rounded-full flex items-center justify-center">
                <Send className="w-5 h-5 text-white" />
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
                  <p className="text-sm">{renderLinkedMessage(message.text)}</p>
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
