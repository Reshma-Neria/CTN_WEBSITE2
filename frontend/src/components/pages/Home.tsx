import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, Wifi, Zap, Shield, Users } from 'lucide-react';
import { Link } from 'react-router';
import { useState, useEffect } from 'react';

// Import testimonial photos
import thandaManduwiPhoto from '../../assets/thanda-manduwi.avif';
import macdonaldNyoniPhoto from '../../assets/macdonald-nyoni.avif';
import kbgPhoto from '../../assets/kbg.avif';
import familyFootballImage from '../../assets/family-football.png';
import salonLadiesImage from '../../assets/salon ladies.webp';
import primaryImage from '../../assets/primary.webp';
import churchImage from '../../assets/church.webp';

export function Home() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);

  const testimonials = [
    {
      photo: thandaManduwiPhoto,
      quote: "It's a digital world, and everyone needs and deserves affordable, unlimited Wi-Fi. That's what Converged is to me.",
      name: "Nthanda Manduwi",
      title: "Managing Director, ByNtha Media"
    },
    {
      photo: macdonaldNyoniPhoto,
      quote: "Converged Technology Network's Unlimited Internet is value for money. In an era where business continuity refers to uninterrupted connectivity, CTN comes in hand.",
      name: "MacDonald Nyoni",
      title: "Web Developer"
    },
    {
      photo: kbgPhoto,
      quote: "I am one of those guys who needs and uses the internet a lot and I find Converged very affordable. In addition to that their good customer service makes them even more lovable.",
      name: "KBG",
      title: "Musician & Producer"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Auto-advance every 5 seconds

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const heroSlides = [
    { src: familyFootballImage, alt: 'Family watching football' },
    { src: salonLadiesImage, alt: 'Salon ladies' },
    { src: primaryImage, alt: 'Primary school learners' },
    { src: churchImage, alt: 'Church gathering' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [heroSlides.length]);

  const goToPrevious = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const goToSlide = (index: number) => {
    setCurrentTestimonial(index);
  };

  const features = [
    {
      icon: Wifi,
      title: 'Unlimited Data',
      description: 'No caps, no throttling. Use as much data as you need.',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Speeds from 10Mbps to 300Mbps to match your needs.',
    },
    {
      icon: Shield,
      title: 'Reliable Network',
      description: '99.9% uptime with 24/7 technical support.',
    },
    {
      icon: Users,
      title: 'Local Support',
      description: 'Malawian team ready to help you anytime.',
    },
  ];

  const stats = [
    { value: '40', label: 'Maximum Speed (Mbps)' },
    { value: 'Unlimited', label: 'Data' },
    { value: '24/7', label: 'Customer Support' },
    { value: 'Free', label: 'Installation (Plan B)' },
  ];

  return (
    <div className="min-h-[60vh] md:min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Connecting Malawi{' '}
                <span className="text-[#a4d65e]">with Unlimited BroadBand</span>
              </h1>
              <p className="text-xl md:text-2xl text-white mb-8 leading-relaxed">
                CTN, Tiyeni Pamodzi!! Break free from slow internet. Our improved Tiyeni plans are
                unlimited, unrestricted, and ridiculously fast.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/packages"
                  className="bg-gradient-to-br from-[#a4d65e] to-[#7fb83d] text-white px-8 py-4 rounded-xl font-semibold hover:scale-105 transition-transform flex items-center space-x-2"
                >
                  <span>View Packages</span>
                  <ArrowRight className="w-5 h-5 text-white" />
                </Link>
                <Link
                  to="/contact"
                  className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-colors border border-white/20"
                >
                  Contact Us
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl h-[400px]">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentHeroSlide}
                    src={heroSlides[currentHeroSlide].src}
                    alt={heroSlides[currentHeroSlide].alt}
                    className="w-full h-full object-cover absolute inset-0"
                    initial={{ opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7, ease: 'easeInOut' }}
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-[#1e3a5f] via-transparent to-transparent" />
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                  {heroSlides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentHeroSlide(index)}
                      className={`h-2 rounded-full transition-all ${
                        index === currentHeroSlide
                          ? 'w-8 bg-[#a4d65e]'
                          : 'w-2 bg-white/60 hover:bg-white/80'
                      }`}
                      aria-label={`Show image ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-[#a4d65e] mb-2">
                  {stat.value}
                </div>
                <div className="text-base md:text-lg text-white font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Why Choose CTN?
            </h2>
            <p className="text-xl md:text-2xl text-white max-w-2xl mx-auto leading-relaxed">
              We're committed to providing Malawi with reliable, unlimited internet access at speeds that matter.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-colors"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-[#a4d65e] to-[#7fb83d] rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-base md:text-lg text-white leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section - What People Say */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              WHAT PEOPLE SAY
            </h2>
            <div className="w-24 h-1 bg-[#a4d65e] mx-auto mb-4"></div>
          </motion.div>

          {/* Slideshow Container */}
          <div className="relative bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-3xl overflow-hidden shadow-2xl">
            <div className="grid md:grid-cols-2 min-h-[500px]">
              {/* Left Side - Text Content */}
              <div className="flex flex-col justify-center p-8 md:p-12">
                <motion.div
                  key={currentTestimonial}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <p className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif text-[#a4d65e] leading-relaxed italic">
                    "{testimonials[currentTestimonial].quote}"
                  </p>
                  <div className="pt-4 border-t border-[#a4d65e]/30">
                    <p className="text-2xl md:text-3xl lg:text-4xl font-semibold text-[#a4d65e]">
                      - {testimonials[currentTestimonial].name}
                    </p>
                    <p className="text-xl md:text-2xl lg:text-3xl text-[#a4d65e]/90">
                      {testimonials[currentTestimonial].title}
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Right Side - Image */}
              <div className="relative overflow-hidden">
                <motion.div
                  key={currentTestimonial}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full"
                >
                  <img
                    src={testimonials[currentTestimonial].photo}
                    alt={testimonials[currentTestimonial].name}
                    className="w-full h-full object-cover object-center"
                  />
                </motion.div>
            </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all z-10"
              aria-label="Previous testimonial"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all z-10"
              aria-label="Next testimonial"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Dot Indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentTestimonial
                      ? 'bg-black w-8'
                      : 'bg-black/40 hover:bg-black/60'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
              </div>
          </div>
        </div>
      </section>

    </div>
  );
}
