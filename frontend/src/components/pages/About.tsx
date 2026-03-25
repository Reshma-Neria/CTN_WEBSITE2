import { motion } from 'motion/react';
import { Target, Users, Award, Globe, Zap } from 'lucide-react';
import { useState, useEffect, type ComponentType } from 'react';

// Import team photos
import teamCivo from '../../assets/team-civo.jpeg';
import teamDinner from '../../assets/team-dinner.png';
import teamIndoor from '../../assets/team-indoor.jpeg';
import teamLuanar from '../../assets/team-luanar.jpeg';
import teamRoof from '../../assets/team-roof.png';

interface ValueItem {
  icon: ComponentType<{ className?: string; size?: number | string }>;
  title: string;
  description: string;
}

interface TeamHighlightItem {
  icon: ComponentType<{ className?: string; size?: number | string }>;
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
    {
      year: 'About',
      event: 'MACRA Licensed ISP',
      description: 'Converged Technology Networks is an Internet Service Provider licensed by the Malawi Communications Regulatory Authority (MACRA).',
    },
    {
      year: '2017 - 2019',
      event: 'Established and Operational',
      description: 'Established in 2017, the company commenced commercial operations in 2019 and is primarily focused on addressing the unmet demand for residential broadband internet access in Malawi.',
    },
    {
      year: 'Leadership',
      event: 'Regional Experience',
      description: 'CTN leadership brings many years of experience from building and managing internet networks in Kenya, Uganda, South Africa, Botswana, and a number of other African countries.',
    },
  ];

  return (
    <div className="min-h-[60vh] md:min-h-screen px-4 py-14 md:py-20">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-14 text-center md:mb-20"
        >
          <h1 className="mb-5 text-4xl font-bold text-white md:mb-6 md:text-6xl">
            About <span className="text-[#a4d65e]">CTN</span>
          </h1>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-white md:text-2xl">
            Converged Technology Networks is Malawi's leading provider of unlimited internet services, 
            committed to connecting communities and empowering digital transformation.
          </p>
        </motion.div>

        {/* Journey/Timeline Section - First */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-14 md:mb-20"
        >
          <h2 className="mb-8 text-center text-3xl font-bold text-white md:mb-12 md:text-4xl">
            Our Journey
          </h2>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-[#a4d65e]/30 hidden md:block" />
            
            <div className="space-y-6 md:space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className={`flex flex-col gap-4 md:items-center md:gap-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className={`w-full flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-lg md:p-6">
                      <div className="mb-2 text-lg font-bold text-[#a4d65e] md:text-2xl">{item.year}</div>
                      <h3 className="mb-3 text-xl font-semibold text-white md:text-2xl">{item.event}</h3>
                      <p className="text-base leading-relaxed text-white md:text-lg">{item.description}</p>
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

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-14 md:mb-20"
        >
          <h2 className="mb-8 text-center text-3xl font-bold text-white md:mb-12 md:text-4xl">
            Our Core Values
          </h2>
          <div className="grid gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-4">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-lg md:p-6"
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
    { src: teamCivo, alt: 'CTN team at Civo' },
    { src: teamDinner, alt: 'CTN team dinner' },
    { src: teamIndoor, alt: 'CTN team indoors' },
    { src: teamLuanar, alt: 'CTN team at LUANAR' },
    { src: teamRoof, alt: 'CTN team on the rooftop' },
  ];

  const teamHighlights: TeamHighlightItem[] = [
    {
      icon: Target,
      title: 'Strong Technical Backbone',
      description: 'Our engineering and network teams keep the infrastructure resilient, dependable, and ready to serve growing communities.',
    },
    {
      icon: Users,
      title: 'Support That Stays Close',
      description: 'Customer care works hand in hand with operations so questions are answered quickly and problems are resolved clearly.',
    },
    {
      icon: Zap,
      title: 'One Team, One Standard',
      description: 'Clear roles, steady communication, and shared accountability help us deliver a smoother experience at every stage.',
    },
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
      className="mb-14 md:mb-20"
    >
      <div className="mb-8 md:mb-12">
        <motion.h2 
          className="mb-6 text-center text-3xl font-bold text-white md:text-5xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          About Our <span className="text-[#a4d65e]">Team</span>
        </motion.h2>
        <motion.div 
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="rounded-[1.5rem] border border-white/10 bg-white/6 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.18)] backdrop-blur-lg md:rounded-[2rem] md:p-10">
            <div className="grid gap-5 md:gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div className="text-left">
                <h3 className="mt-2 max-w-3xl text-2xl font-semibold leading-tight text-white md:mt-5 md:text-4xl">
                  A reliable team behind every connection.
                </h3>
                <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/82 md:mt-5 md:text-xl">
                  CTN is built on teamwork, clear communication, and a shared commitment to reliable service.
                </p>
              </div>

            </div>

            <div className="mt-5 grid gap-4 md:mt-6 md:grid-cols-3">
              {teamHighlights.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55 + index * 0.08 }}
                  className="rounded-2xl border border-white/10 bg-[#0d223f]/55 p-4 text-left md:p-5"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#a4d65e] to-[#7fb83d] text-white">
                    <item.icon size={20} />
                  </div>
                  <h4 className="text-lg font-semibold text-white">{item.title}</h4>
                  <p className="mt-2 text-sm leading-6 text-white/75">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Slideshow Container */}
      <div className="relative max-w-6xl mx-auto">
        <div className="relative h-[320px] overflow-hidden rounded-[1.5rem] shadow-2xl sm:h-[400px] md:h-[600px] md:rounded-3xl">
          <motion.div
            key={teamPhotos[currentIndex].src}
            initial={{ opacity: 0.35, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <img
              src={teamPhotos[currentIndex].src}
              alt={teamPhotos[currentIndex].alt}
              className="block h-full w-full object-cover"
              loading="eager"
            />
          </motion.div>
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-t from-[#1e3a5f]/80 via-[#1e3a5f]/40 to-transparent" />
            
            {/* Image info overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8">
              <div className="max-w-md rounded-xl border border-white/20 bg-white/10 p-3 backdrop-blur-md md:p-4">
                <p className="text-base font-semibold text-white md:text-lg">
                  {teamPhotos[currentIndex].alt}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-all hover:bg-white/30 md:left-4 md:h-12 md:w-12"
            aria-label="Previous slide"
          >
            <span className="text-xl leading-none md:text-2xl" aria-hidden="true">
              &lsaquo;
            </span>
          </button>
          <button
            onClick={goToNext}
            className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-all hover:bg-white/30 md:right-4 md:h-12 md:w-12"
            aria-label="Next slide"
          >
            <span className="text-xl leading-none md:text-2xl" aria-hidden="true">
              &rsaquo;
            </span>
          </button>
        </div>

        {/* Slide Indicators */}
        <div className="mt-5 flex justify-center gap-2 md:mt-6">
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
        <div className="mt-3 text-center md:mt-4">
          <span className="text-white text-sm">
            {currentIndex + 1} / {teamPhotos.length}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
