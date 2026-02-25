import { motion } from 'motion/react';
import { Users, Award, Check, Send } from 'lucide-react';
import { useState, type FormEvent, type ChangeEvent } from 'react';

export function Partners() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    willingToPay: false,
    hasVehicle: '',
    experience: '',
    qualifications: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In a real app, this would submit to a backend
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        willingToPay: false,
        hasVehicle: '',
        experience: '',
        qualifications: '',
      });
    }, 3000);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? (target as HTMLInputElement).checked : target.value;
    const name = target.name;

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const partnerLevels = [
    {
      icon: Award,
      title: 'Silver Partner',
      subtitle: 'Silver Certified Partners',
      description: 'Our entry-level partnership. You shall provide installation and support services. Earning a generous fee for each assigned job. We are looking for a (minimum) team of two, with their own vehicle or transport to get quickly to customer homes all over Lilongwe.',
      features: [
        'Installation and support services',
        'Generous fee per assigned job',
        'Minimum team of two required',
        'Own vehicle or transport needed',
        'Service customers across Lilongwe',
      ],
    },
    {
      icon: Users,
      title: 'Gold Partner',
      subtitle: 'Gold Certified Partners',
      description: 'Silver Partners who meet and/or exceed a prescribed number of installs earn the right get certified at this level. In addition to installation and support services, Gold partners are eligible earn from sales. These partners will have access to our CRM and pipeline for a steady flow of opportunities.',
      features: [
        'All Silver Partner benefits',
        'Eligible to earn from sales',
        'Access to CRM and pipeline',
        'Steady flow of opportunities',
        'Higher earning potential',
      ],
    },
  ];

  return (
    <div className="min-h-[60vh] md:min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Certified <span className="text-[#a4d65e]">Partner Program</span>
          </h1>
          <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto leading-relaxed mb-8">
            Join us as we bring affordable, unlimited, uncapped and high quality internet to the market.
          </p>
        </motion.div>

        {/* Vision Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-20"
        >
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-white/10 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-[#a4d65e] to-[#7fb83d] rounded-xl flex items-center justify-center mx-auto mb-6">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Vision</h2>
            <h3 className="text-2xl md:text-3xl font-semibold text-[#a4d65e] mb-6">Broadband For the Rest of Us</h3>
            <p className="text-lg md:text-xl text-white max-w-4xl mx-auto leading-relaxed">
              For too long, quality internet access has been inaccessible to a majority of the population due to cost, coverage and quality. 
              Join us as we bring affordable, unlimited, uncapped and high quality internet to the market.
            </p>
          </div>
        </motion.div>

        {/* Service Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-20"
        >
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Partners in Service</h2>
            <p className="text-lg md:text-xl text-white max-w-4xl mx-auto leading-relaxed">
              Our customers deserve the highest level of technical services and support, and we work tirelessly to maintain those standards. 
              When you choose to work with our team, know that you are consistently choosing quality and excellence. 
              Customer service is at the heart of everything that we do.
            </p>
          </div>
        </motion.div>

        {/* Partner Levels */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">Partner Levels</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {partnerLevels.map((level, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-[#a4d65e] to-[#7fb83d] rounded-xl flex items-center justify-center mb-4">
                  <level.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{level.title}</h3>
                <h4 className="text-xl md:text-2xl font-semibold text-[#a4d65e] mb-4">{level.subtitle}</h4>
                <p className="text-base md:text-lg text-white mb-6 leading-relaxed">{level.description}</p>
                <ul className="space-y-3">
                  {level.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-[#a4d65e] flex-shrink-0 mt-0.5" />
                      <span className="text-white text-base md:text-lg">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Application Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-20"
        >
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">
              Interested in becoming a partner?
            </h2>
            <p className="text-xl md:text-2xl text-white text-center mb-8">
              Get in touch to learn more.
            </p>

            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gradient-to-br from-[#a4d65e] to-[#7fb83d] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">Application Submitted!</h3>
                <p className="text-base md:text-lg text-white">We'll get back to you as soon as possible.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white mb-2 text-base md:text-lg font-medium">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full bg-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#a4d65e] border border-white/10"
                    />
                  </div>
                  <div>
                    <label className="block text-white mb-2 text-base md:text-lg font-medium">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full bg-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#a4d65e] border border-white/10"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white mb-2 text-base md:text-lg font-medium">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#a4d65e] border border-white/10"
                  />
                </div>

                <div>
                  <label className="block text-white mb-2 text-base md:text-lg font-medium">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#a4d65e] border border-white/10"
                  />
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    name="willingToPay"
                    id="willingToPay"
                    checked={formData.willingToPay}
                    onChange={handleChange}
                    className="w-5 h-5 text-[#a4d65e] bg-white/10 border-white/20 rounded focus:ring-[#a4d65e]"
                  />
                  <label htmlFor="willingToPay" className="text-white text-base md:text-lg">
                    I am willing to pay 15,000 MK to participate in the partner training.
                  </label>
                </div>

                <div>
                  <label className="block text-white mb-2 text-base md:text-lg font-medium">
                    I have my own vehicle
                  </label>
                  <select
                    name="hasVehicle"
                    value={formData.hasVehicle}
                    onChange={handleChange}
                    className="w-full bg-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#a4d65e] border border-white/10"
                  >
                    <option value="" className="bg-[#1e3a5f]">Choose an option</option>
                    <option value="yes" className="bg-[#1e3a5f]">Yes</option>
                    <option value="no" className="bg-[#1e3a5f]">No</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white mb-2 text-base md:text-lg font-medium">
                    Choose your level of experience with computer networking * <span className="text-white/60">Required</span>
                  </label>
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#a4d65e] border border-white/10"
                  >
                    <option value="" className="bg-[#1e3a5f]">Select experience level</option>
                    <option value="0-2" className="bg-[#1e3a5f]">0-2 Years</option>
                    <option value="2-4" className="bg-[#1e3a5f]">2-4 Years</option>
                    <option value="4+" className="bg-[#1e3a5f]">More than 4 Years</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white mb-2 text-base md:text-lg font-medium">
                    List your qualifications (education, certifications, diploma, degree etc)
                  </label>
                  <textarea
                    name="qualifications"
                    value={formData.qualifications}
                    onChange={handleChange}
                    rows={5}
                    className="w-full bg-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#a4d65e] border border-white/10 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-br from-[#a4d65e] to-[#7fb83d] text-white py-4 rounded-xl font-semibold hover:scale-105 transition-transform flex items-center justify-center space-x-2"
                >
                  <Send className="w-5 h-5" />
                  <span>Submit</span>
                </button>
              </form>
            )}
          </div>
        </motion.div>

        {/* Note Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 text-center"
        >
          <p className="text-lg md:text-xl text-white">
            <span className="text-[#a4d65e] font-semibold">Note:</span> This program is currently available in Lilongwe only.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
