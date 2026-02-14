import { useState } from "react";
import { motion } from "motion/react";
import { Mail, Phone, MapPin, MessageCircle, Clock, Send } from "lucide-react";
import { toast } from "sonner@2.0.3";

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    package: "",
    businessType: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you! We'll contact you within 24 hours.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      package: "",
      businessType: "",
      message: "",
    });
  };

  const contactMethods = [
    {
      icon: Phone,
      title: "Call Us",
      value: "+265 981 187 766",
      link: "tel:+265981187766",
      description: "Mon-Sun, 8AM-8PM",
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      value: "+265 981 187 766",
      link: "https://wa.me/265981187766",
      description: "24/7 instant messaging",
    },
    {
      icon: Mail,
      title: "Email",
      value: "info@ctnmw.net",
      link: "mailto:info@ctnmw.net",
      description: "We reply within 24 hours",
    },
    {
      icon: MapPin,
      title: "Website",
      value: "www.ctnmw.net",
      link: "https://www.ctnmw.net",
      description: "Visit our website",
    },
  ];

  const offices = [
    {
      city: "Blantyre",
      address: "Victoria Avenue, City Centre",
      hours: "Mon-Fri: 8AM-5PM, Sat: 9AM-1PM",
    },
    {
      city: "Lilongwe",
      address: "Capital City, Area 4",
      hours: "Mon-Fri: 8AM-5PM, Sat: 9AM-1PM",
    },
    {
      city: "Mzuzu",
      address: "M1 Road, Town Centre",
      hours: "Mon-Fri: 8AM-5PM",
    },
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-[#1e3a5f] via-[#2d4a6f] to-[#1e3a5f] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23a4d65e' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v6h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-white mb-6">Get In Touch</h1>
            <p className="text-white/80 text-xl max-w-3xl mx-auto">
              Ready to get connected? Our team is here to help you choose the perfect
              package and answer any questions you may have.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {contactMethods.map((method, index) => {
              const IconComponent = method.icon;
              return (
                <motion.a
                  key={index}
                  href={method.link}
                  target={method.link.startsWith("http") ? "_blank" : undefined}
                  rel={method.link.startsWith("http") ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-all border border-gray-100 group hover:border-[#a4d65e]"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-[#a4d65e] to-[#8bc34a] rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <IconComponent className="text-white" size={28} />
                  </div>
                  <h3 className="text-[#1e3a5f] mb-2">{method.title}</h3>
                  <p className="text-gray-700 mb-2">{method.value}</p>
                  <p className="text-gray-500 text-sm">{method.description}</p>
                </motion.a>
              );
            })}
          </div>

          {/* Form and Image */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-3xl shadow-xl border border-gray-100"
            >
              <h2 className="text-[#1e3a5f] mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#a4d65e] transition-colors bg-white"
                    placeholder="John Banda"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#a4d65e] transition-colors bg-white"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#a4d65e] transition-colors bg-white"
                      placeholder="+265 xxx xxx xxx"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="package" className="block text-gray-700 mb-2">
                      Interested Package
                    </label>
                    <select
                      id="package"
                      value={formData.package}
                      onChange={(e) => setFormData({ ...formData, package: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#a4d65e] transition-colors bg-white"
                    >
                      <option value="">Select a package</option>
                      <option value="10mbps">10 Mbps - Home Browsing</option>
                      <option value="20mbps">20 Mbps - Home Streaming</option>
                      <option value="50mbps">50 Mbps - Family Usage</option>
                      <option value="100mbps">100 Mbps - Heavy Users</option>
                      <option value="300mbps">300 Mbps - Business & Pro</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="businessType" className="block text-gray-700 mb-2">
                      Account Type
                    </label>
                    <select
                      id="businessType"
                      value={formData.businessType}
                      onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#a4d65e] transition-colors bg-white"
                    >
                      <option value="">Select type</option>
                      <option value="residential">Residential</option>
                      <option value="business">Business/Office</option>
                      <option value="conference">Conference/Event</option>
                      <option value="rental">Event Rental</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#a4d65e] transition-colors resize-none bg-white"
                    placeholder="Tell us about your internet needs..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#a4d65e] to-[#8bc34a] text-white py-4 rounded-xl hover:shadow-2xl hover:shadow-[#a4d65e]/50 transition-all flex items-center justify-center gap-2 group"
                >
                  Send Message
                  <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </motion.div>

            {/* Right Side - Image and Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              {/* Image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[300px]">
                <img
                  src="https://images.unsplash.com/photo-1680878903102-92692799ef36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwd29tYW4lMjBzbWFydHBob25lJTIwaW50ZXJuZXR8ZW58MXx8fHwxNzYzNjI5OTAwfDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Customer support"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1e3a5f]/80 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <h3 className="mb-2">We're Here to Help</h3>
                  <p className="text-white/90">
                    Our team is ready to assist you with any questions about our services.
                  </p>
                </div>
              </div>

              {/* Quick Info Card */}
              <div className="bg-gradient-to-r from-[#1e3a5f] to-[#2d4a6f] p-8 rounded-3xl text-white">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="text-[#a4d65e]" size={28} />
                  <h3>Need Immediate Assistance?</h3>
                </div>
                <p className="text-white/80 mb-6">
                  Our support team is available 24/7 to help you with any urgent matters.
                  Get instant responses via WhatsApp or call us directly.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="https://wa.me/265981187766"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#a4d65e] text-[#1e3a5f] px-6 py-3 rounded-full hover:bg-[#8bc34a] transition-all flex items-center justify-center gap-2"
                  >
                    <MessageCircle size={20} />
                    WhatsApp Now
                  </a>
                  <a
                    href="tel:+265981187766"
                    className="bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-full border border-white/20 hover:bg-white hover:text-[#1e3a5f] transition-all flex items-center justify-center gap-2"
                  >
                    <Phone size={20} />
                    Call Us
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-[#1e3a5f] mb-4">Our Locations</h2>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto">
              Visit us at any of our offices across Malawi.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {offices.map((office, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all border border-gray-100"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-[#a4d65e] to-[#8bc34a] rounded-2xl flex items-center justify-center mb-6">
                  <MapPin className="text-white" size={28} />
                </div>
                <h3 className="text-[#1e3a5f] mb-3">{office.city}</h3>
                <p className="text-gray-600 mb-2">{office.address}</p>
                <p className="text-gray-500 text-sm flex items-start gap-2">
                  <Clock size={16} className="mt-0.5 flex-shrink-0" />
                  {office.hours}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
