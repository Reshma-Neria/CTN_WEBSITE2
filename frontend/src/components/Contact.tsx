import { useState } from "react";
import { motion } from "motion/react";
import { Mail, Phone, MapPin } from "lucide-react";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    package: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock form submission
    alert("Thank you! We'll contact you soon.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      package: "",
      message: "",
    });
  };

  const contactInfo = [
    {
      icon: Phone,
      label: "Phone",
      value: "+265 981 187 766",
      link: "tel:+265981187766",
    },
    {
      icon: Phone,
      label: "WhatsApp",
      value: "+265 981 187 766",
      link: "https://wa.me/265981187766",
    },
    {
      icon: Mail,
      label: "Email",
      value: "info@ctnmw.net",
      link: "mailto:info@ctnmw.net",
    },
    {
      icon: MapPin,
      label: "Website",
      value: "www.ctnmw.net",
      link: "https://www.ctnmw.net",
    },
  ];

  return (
    <section id="contact" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-white mb-4">Get In Touch</h2>
          <p className="text-white text-xl max-w-3xl mx-auto">
            Ready to get connected? Contact us today and our team will help you choose
            the perfect package for your needs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white/5 backdrop-blur-lg p-8 rounded-2xl shadow-lg border border-white/10"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-white mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 text-white placeholder-white/40 border border-white/10 rounded-xl focus:outline-none focus:border-[#a4d65e] transition-colors"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-white mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 text-white placeholder-white/40 border border-white/10 rounded-xl focus:outline-none focus:border-[#a4d65e] transition-colors"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-white mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 text-white placeholder-white/40 border border-white/10 rounded-xl focus:outline-none focus:border-[#a4d65e] transition-colors"
                  placeholder="+265 xxx xxx xxx"
                />
              </div>

              <div>
                <label htmlFor="package" className="block text-white mb-2">
                  Interested Package
                </label>
                <select
                  id="package"
                  value={formData.package}
                  onChange={(e) => setFormData({ ...formData, package: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 text-white border border-white/10 rounded-xl focus:outline-none focus:border-[#a4d65e] transition-colors"
                >
                  <option value="" className="bg-[#1e3a5f]">Select a package</option>
                  <option value="10mbps" className="bg-[#1e3a5f]">10 Mbps</option>
                  <option value="20mbps" className="bg-[#1e3a5f]">20 Mbps</option>
                  <option value="50mbps" className="bg-[#1e3a5f]">50 Mbps</option>
                  <option value="100mbps" className="bg-[#1e3a5f]">100 Mbps</option>
                  <option value="300mbps" className="bg-[#1e3a5f]">300 Mbps</option>
                  <option value="business" className="bg-[#1e3a5f]">Business Solution</option>
                  <option value="events" className="bg-[#1e3a5f]">Events Rental</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-white mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 text-white placeholder-white/40 border border-white/10 rounded-xl focus:outline-none focus:border-[#a4d65e] transition-colors resize-none"
                  placeholder="Tell us about your internet needs..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#a4d65e] text-white py-4 rounded-xl hover:bg-[#8bc34a] transition-colors shadow-lg"
              >
                Send Message
              </button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon;
              return (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-white/10 hover:border-[#a4d65e] transition-all group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#a4d65e] to-[#8bc34a] rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <IconComponent className="text-white" size={24} />
                    </div>
                    <div>
                      <div className="text-white mb-1">{info.label}</div>
                      <a
                        href={info.link}
                        target={info.link.startsWith("http") ? "_blank" : undefined}
                        rel={info.link.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="text-white hover:text-[#a4d65e] transition-colors"
                      >
                        {info.value}
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* CTA Card */}
            <div className="bg-gradient-to-br from-[#1e3a5f] to-[#2d4a6f] p-8 rounded-2xl text-white">
              <h3 className="mb-4">Need Immediate Assistance?</h3>
              <p className="text-white/80 mb-6">
                Our support team is available 24/7 to help you with any questions or concerns.
              </p>
              <a
                href="https://wa.me/265981187766"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#a4d65e] text-white px-6 py-3 rounded-full hover:bg-[#8bc34a] transition-all"
              >
                <Phone size={20} />
                Chat on WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
