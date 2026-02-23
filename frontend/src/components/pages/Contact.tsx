import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { useState, type FormEvent, type ChangeEvent } from 'react';
// Import contact image
import contactImage from '../../assets/contact.avif';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In a real app, this would submit to a backend
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: ['+265 981 187 766'],
      action: 'Call us',
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['info@ctn.mw', 'support@ctn.mw'],
      action: 'Send email',
    },
    {
      icon: MapPin,
      title: 'Office',
      details: ['Lilongwe Area 47 Sector 1', 'Malawi'],
      action: 'Get directions',
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: ['Mon-Fri: 8AM - 6PM', 'Sat: 9AM - 2PM'],
      action: 'Support available 24/7',
    },
  ];

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Get In <span className="text-[#a4d65e]">Touch</span>
          </h1>
          <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto leading-relaxed">
            Have questions? We're here to help. Reach out to us and we'll respond as soon as possible.
          </p>
        </motion.div>

        {/* Contact Info Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactInfo.map((info, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 text-center"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-[#a4d65e] to-[#7fb83d] rounded-xl flex items-center justify-center mx-auto mb-4">
                <info.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-white mb-3">{info.title}</h3>
              {info.details.map((detail, dIndex) => (
                <p key={dIndex} className="text-white text-base md:text-lg">
                  {detail}
                </p>
              ))}
              <p className="text-[#a4d65e] text-base md:text-lg mt-2 font-medium">{info.action}</p>
            </motion.div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Send us a message</h2>
              
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#a4d65e] to-[#7fb83d] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">Message Sent!</h3>
                  <p className="text-base md:text-lg text-white">We'll get back to you as soon as possible.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-white mb-2 text-base md:text-lg font-medium">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-white/10 text-white placeholder-white/40 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#a4d65e] border border-white/10"
                    />
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white mb-2 text-base md:text-lg font-medium">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-white/10 text-white placeholder-white/40 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#a4d65e] border border-white/10"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-white mb-2 text-base md:text-lg font-medium">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full bg-white/10 text-white placeholder-white/40 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#a4d65e] border border-white/10"
                        placeholder="+265 xxx xxx xxx"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-white mb-2 text-base md:text-lg font-medium">Subject</label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full bg-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#a4d65e] border border-white/10"
                    >
                      <option value="" className="bg-[#1e3a5f]">Select a subject</option>
                      <option value="packages" className="bg-[#1e3a5f]">Package Information</option>
                      <option value="business" className="bg-[#1e3a5f]">Business Solutions</option>
                      <option value="support" className="bg-[#1e3a5f]">Technical Support</option>
                      <option value="installation" className="bg-[#1e3a5f]">Installation</option>
                      <option value="other" className="bg-[#1e3a5f]">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-white mb-2 text-base md:text-lg font-medium">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full bg-white/10 text-white placeholder-white/40 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#a4d65e] border border-white/10 resize-none"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-br from-[#a4d65e] to-[#7fb83d] text-white py-3 rounded-xl font-semibold hover:scale-105 transition-transform flex items-center justify-center space-x-2"
                  >
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Image & Additional Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-8"
          >
            {/* Image */}
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={contactImage}
                alt="Contact CTN"
                className="w-full h-[300px] object-cover"
              />
            </div>

            {/* FAQ Box */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-4">Quick Answers</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-white font-semibold mb-1">Need immediate help?</h4>
                  <p className="text-white text-base md:text-lg leading-relaxed">
                    Try our AI chatbot in the bottom right corner for instant answers to common questions.
                  </p>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Installation queries?</h4>
                  <p className="text-white text-base md:text-lg leading-relaxed">
                    Call our installation hotline during business hours for scheduling and technical questions.
                  </p>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Business inquiries?</h4>
                  <p className="text-white text-base md:text-lg leading-relaxed">
                    Email our business team directly at business@ctn.mw for custom enterprise solutions.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 text-center">Visit Our Office</h2>
          <div className="bg-white/10 rounded-xl h-[400px] overflow-hidden relative w-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3839.5!2d33.749222!3d-13.967194!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDU4JzAxLjkiUyAzM8KwNDQnNTcuMiJF!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="CTN Office Location - Lilongwe Area 47 Sector 1"
              className="w-full h-full absolute inset-0"
            />
          </div>
          <div className="mt-4 text-center">
            <p className="text-white font-semibold text-base md:text-lg">Lilongwe Area 47 Sector 1, Malawi</p>
            <p className="text-white text-base mt-1">Coordinates: 13°58'01.9"S 33°44'57.2"E</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
