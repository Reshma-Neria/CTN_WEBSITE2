import { motion } from 'motion/react';
import { Target, Users, Award, Globe, ArrowLeft, ArrowRight } from 'lucide-react';
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
    {
      src: teamCivo,
      alt: 'CTN team at Civo',
      title: 'Sharing ideas beyond the office',
      description: 'The team regularly comes together in spaces that encourage collaboration, learning, and fresh thinking.',
    },
    {
      src: teamDinner,
      alt: 'CTN team dinner',
      title: 'Celebrating wins together',
      description: 'We make time to connect as people, not only as colleagues, and that shows up in how we work together.',
    },
    {
      src: teamIndoor,
      alt: 'CTN team indoors',
      title: 'Focused and hands-on',
      description: 'Behind every installation and support request is a team that stays organized and ready to respond.',
    },
    {
      src: teamLuanar,
      alt: 'CTN team at LUANAR',
      title: 'Close to the communities we serve',
      description: 'Our work stays grounded in real partnerships, real places, and people who depend on reliable connectivity.',
    },
    {
      src: teamRoof,
      alt: 'CTN team on the rooftop',
      title: 'Proud of the journey ahead',
      description: 'CTN keeps growing through teamwork, accountability, and a shared commitment to dependable service.',
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
          className="mx-auto max-w-4xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#08172c] shadow-[0_24px_60px_rgba(4,14,30,0.3)] md:rounded-[2rem]">
            <motion.div
              key={teamPhotos[currentIndex].src}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              <div className="bg-[#08111d] p-3 md:p-4">
                <div className="overflow-hidden rounded-[1rem] border border-white/8 bg-[#030913] md:rounded-[1.4rem]">
                  <img
                    src={teamPhotos[currentIndex].src}
                    alt={teamPhotos[currentIndex].alt}
                    className="mx-auto block h-[220px] w-full object-cover sm:h-[260px] md:h-[320px] lg:h-[360px]"
                    loading="eager"
                  />
                </div>
              </div>

              <div className="border-t border-white/10 bg-[#0b1b31] p-5 md:px-6 md:py-6">
                <div className="text-left md:text-center">
                  <h4 className="text-xl font-semibold text-white md:text-[1.65rem]">
                    {teamPhotos[currentIndex].title}
                  </h4>
                  <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-white/72 md:text-base">
                    {teamPhotos[currentIndex].description}
                  </p>
                </div>

                <div className="mt-5 flex items-center justify-between gap-4 border-t border-white/10 pt-4">
                  <button
                    onClick={goToPrevious}
                    className="inline-flex h-11 items-center gap-2 rounded-full border border-white/12 bg-white/6 px-4 text-sm font-medium text-white transition-colors hover:bg-white/12"
                    aria-label="Previous team photo"
                  >
                    <ArrowLeft size={20} />
                    <span>Previous</span>
                  </button>

                  <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/70">
                    {currentIndex + 1} / {teamPhotos.length}
                  </div>

                  <button
                    onClick={goToNext}
                    className="inline-flex h-11 items-center gap-2 rounded-full border border-white/12 bg-white/6 px-4 text-sm font-medium text-white transition-colors hover:bg-white/12"
                    aria-label="Next team photo"
                  >
                    <span>Next</span>
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
