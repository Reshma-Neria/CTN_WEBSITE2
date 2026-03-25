import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { Link } from 'react-router';
// Import contact image
import contactImage from '../../assets/contact.avif';

export function Contact() {
  const splynxSignupUrl =
    'https://demo.splynx.com/admin/crm/sign-up?selected_internet=0&selected_voice=0&selected_recurring=0&selected_bundle=0&formTitle=Signup&formButtonText=Register&submitThanks=Thanks%20for%20signing%20up!&required_tariff=1&vat_included=0&partner_id=1&admin_id=0&crm_status=1&location=1&show_form_terms=1&form_terms_template=&required_first_name=1&required_last_name=1&required_email=1&required_phone=1&required_street=1&required_city=1&required_zip=1';

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
    <div className="min-h-[60vh] md:min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto text-white">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Get In <span className="text-[#a4d65e]">Touch</span>
          </h1>
          <p className="text-2xl md:text-3xl text-white max-w-3xl mx-auto leading-relaxed">
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
              <h3 className="text-xl md:text-2xl font-semibold text-white mb-3">{info.title}</h3>
              {info.details.map((detail, dIndex) => {
                // Check if it's a phone number
                const isPhone = /^\+?\d/.test(detail);
                // Check if it's an email
                const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(detail);
                
                if (isPhone) {
                  const phoneLink = `tel:${detail.replace(/\s/g, '')}`;
                  return (
                    <a
                      key={dIndex}
                      href={phoneLink}
                      className="text-white text-lg md:text-xl hover:text-[#a4d65e] transition-colors block"
                    >
                      {detail}
                    </a>
                  );
                } else if (isEmail) {
                  return (
                    <a
                      key={dIndex}
                      href={`mailto:${detail}`}
                      className="text-white text-lg md:text-xl hover:text-[#a4d65e] transition-colors block"
                    >
                      {detail}
                    </a>
                  );
                } else {
                  return (
                    <p key={dIndex} className="text-white text-lg md:text-xl">
                      {detail}
                    </p>
                  );
                }
              })}
              <p className="text-white text-lg md:text-xl mt-2 font-medium">{info.action}</p>
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
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Send us a message</h2>

              <div className="bg-white/10 rounded-xl p-4 border border-white/10">
                <iframe
                  data-widget-type="embedded"
                  width="100%"
                  src={splynxSignupUrl}
                  id="splynx-signup-widget-frame"
                  title="Splynx Signup Form"
                  frameBorder={0}
                  loading="eager"
                  allow="fullscreen"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-[820px] sm:h-[980px] rounded-lg border-0 pointer-events-auto"
                />
              </div>

              <div className="mt-4 pt-4 border-t border-white/10">
                <p className="text-white text-center mb-3 text-lg md:text-xl">
                  Prefer our website application form?
                </p>
                <Link
                  to="/subscribe"
                  className="w-full bg-gradient-to-br from-[#002147] to-[#001A36] text-white py-3 rounded-xl font-semibold hover:scale-105 transition-transform flex items-center justify-center space-x-2"
                >
                  <Send className="w-5 h-5" />
                  <span>Go to Subscription Form</span>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-8"
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={contactImage}
                alt="Contact CTN"
                className="w-full h-[300px] object-cover"
              />
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
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">Visit Our Office</h2>
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
            <p className="text-white font-semibold text-lg md:text-xl">Lilongwe Area 47 Sector 1, Malawi</p>
            <p className="text-white text-lg mt-1">Coordinates: 13deg58'01.9"S 33deg44'57.2"E</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
