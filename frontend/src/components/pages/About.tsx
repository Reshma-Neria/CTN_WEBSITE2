import { motion, AnimatePresence } from 'motion/react';
import { Target, Users, Award, Globe, ChevronLeft, ChevronRight, type LucideIcon } from 'lucide-react';
import { useState, useEffect } from 'react';

// Import team photos
import team1 from '../../assets/team-1.jpeg';
import team2 from '../../assets/team-2.jpeg';
import team3 from '../../assets/team-3.jpeg';
import team4 from '../../assets/team-4.jpeg';
import team5 from '../../assets/team-5.jpeg';
import team6 from '../../assets/team-6.jpeg';
import team7 from '../../assets/team-7.jpeg';
import team8 from '../../assets/team-8.jpeg';

interface ValueItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function About() {
  const values: ValueItem[] = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'To connect every corner of Malawi with reliable, affordable, and unlimited internet access.',
    },
    {
      icon: Users,
      title: 'Customer First',
      description: 'We prioritize our customers\' needs with 24/7 support and personalized service.',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We maintain the highest standards in network reliability and service quality.',
    },
    {
      icon: Globe,
      title: 'Innovation',
      description: 'Continuously upgrading our infrastructure to bring you the latest technology.',
    },
  ];

  interface TimelineItem {
    year: string;
    event: string;
    description: string;
  }

  const timeline: TimelineItem[] = [
    { year: '2018', event: 'CTN Founded', description: 'Started with a vision to transform internet access in Malawi' },
    { year: '2019', event: 'Network Expansion', description: 'Extended coverage to major urban areas across the country' },
    { year: '2021', event: '10,000 Customers', description: 'Reached milestone of serving 10,000 satisfied customers' },
    { year: '2024', event: '40Mbps Launch', description: 'Introduced improved Tiyeni plans with unlimited, uncapped data' },
  ];

  return (
    <div className="min-h-[60vh] md:min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            About <span className="text-[#a4d65e]">CTN</span>
          </h1>
          <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto leading-relaxed">
            Converged Technology Networks is Malawi's leading provider of unlimited internet services, 
            committed to connecting communities and empowering digital transformation.
          </p>
        </motion.div>

        {/* Journey/Timeline Section - First */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Our Journey
          </h2>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-[#a4d65e]/30 hidden md:block" />
            
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className={`flex items-center gap-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                      <div className="text-[#a4d65e] font-bold text-xl md:text-2xl mb-2">{item.year}</div>
                      <h3 className="text-xl md:text-2xl font-semibold text-white mb-3">{item.event}</h3>
                      <p className="text-base md:text-lg text-white leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                  
                  <div className="hidden md:block w-4 h-4 bg-[#a4d65e] rounded-full border-4 border-[#1e3a5f] z-10" />
                  
                  <div className="flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* About Team Section with Slideshow */}
        <TeamSection />

        {/* Story Section */}
          <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-20"
          >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">Our Story</h2>
          <div className="max-w-4xl mx-auto space-y-5 text-white text-lg md:text-xl leading-relaxed">
              <p>
                Founded in 2018, CTN emerged from a simple yet powerful vision: to make high-speed, 
                unlimited internet accessible to everyone in Malawi. We recognized that internet 
                connectivity is not just a luxury—it's a necessity for education, business, and 
                staying connected with the world.
              </p>
              <p>
                Starting with just a handful of customers in Lilongwe Area 47 Sector 1, we've grown to serve thousands 
                of homes and businesses across the country. Our commitment to providing truly unlimited 
                data with no hidden caps or throttling has made us the trusted choice for Malawians 
                who demand reliable internet.
              </p>
              <p>
                Today, we continue to invest in our network infrastructure, expand our coverage, 
                and introduce faster speeds—all while maintaining the affordable pricing and 
                exceptional customer service that our customers have come to expect.
              </p>
            </div>
          </motion.div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-[#a4d65e] to-[#7fb83d] rounded-xl flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-white" size={24} />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-base md:text-lg text-white leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Team Section with Slideshow
function TeamSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const teamPhotos = [
    { src: team1, alt: 'CTN Team Collaboration' },
    { src: team2, alt: 'CTN Team at Work' },
    { src: team3, alt: 'CTN Team Members' },
    { src: team4, alt: 'CTN Team Coordination' },
    { src: team5, alt: 'CTN Team Working Together' },
    { src: team6, alt: 'CTN Team Excellence' },
    { src: team7, alt: 'CTN Team Innovation' },
    { src: team8, alt: 'CTN Team Unity' },
  ];

  // Auto-play slideshow
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % teamPhotos.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, teamPhotos.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + teamPhotos.length) % teamPhotos.length);
    setIsAutoPlaying(false);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % teamPhotos.length);
    setIsAutoPlaying(false);
  };

  return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="mb-20"
    >
      <div className="text-center mb-12">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-white mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          About Our <span className="text-[#a4d65e]">Team</span>
        </motion.h2>
        <motion.div 
          className="max-w-4xl mx-auto space-y-5 text-white text-lg md:text-xl leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p>
            At CTN, we pride ourselves on being an exceptionally organized and well-coordinated team. 
            Our success stems from seamless collaboration, clear communication, and a shared commitment 
            to excellence in everything we do.
          </p>
          <p>
            Every member of our team understands their role and works in perfect harmony with others. 
            From our technical experts who maintain our network infrastructure to our customer support 
            specialists who ensure your satisfaction, we operate as a unified force dedicated to 
            connecting Malawi with reliable, unlimited broadband.
          </p>
          <p>
            Our coordinated approach means faster response times, better problem-solving, and a 
            consistently exceptional experience for our customers. We're not just a team—we're a 
            well-oiled machine working together to deliver the best internet service in Malawi.
          </p>
        </motion.div>
      </div>

      {/* Slideshow Container */}
      <div className="relative max-w-6xl mx-auto">
        <div className="relative h-[500px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl">
          <AnimatePresence mode="wait">
                <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 300 }}
                  animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <img
                src={teamPhotos[currentIndex].src}
                alt={teamPhotos[currentIndex].alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1e3a5f]/80 via-[#1e3a5f]/40 to-transparent" />
              
              {/* Image info overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 max-w-md">
                  <p className="text-white font-semibold text-lg">
                    {teamPhotos[currentIndex].alt}
                  </p>
                    </div>
                  </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all z-10"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all z-10"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {teamPhotos.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'w-8 bg-[#a4d65e]'
                  : 'w-2 bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
              ))}
            </div>

        {/* Slide Counter */}
        <div className="text-center mt-4">
          <span className="text-white text-sm">
            {currentIndex + 1} / {teamPhotos.length}
          </span>
          </div>
      </div>
    </motion.div>
  );
}
