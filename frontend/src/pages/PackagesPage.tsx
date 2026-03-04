import { motion } from "motion/react";
import { Check, Wifi, Zap, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { CoverageCheckModal } from "../components/CoverageCheckModal";

export function PackagesPage() {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const packages = [
    {
      id: "starter",
      speed: "10Mbps",
      price: "Contact for pricing",
      icon: Wifi,
      gradient: "from-blue-400 to-blue-600",
      features: [
        "Unlimited Data",
        "Perfect for browsing & email",
        "1-2 devices",
        "Free Installation",
        "Router included",
        "24/7 Support",
      ],
      ideal: "Home browsing",
    },
    {
      id: "basic",
      speed: "20Mbps",
      price: "Contact for pricing",
      icon: Wifi,
      gradient: "from-green-400 to-emerald-600",
      features: [
        "Unlimited Data",
        "Great for streaming",
        "2-3 devices",
        "Free Installation",
        "Router included",
        "Priority Support",
      ],
      ideal: "Home streaming",
    },
    {
      id: "popular",
      speed: "50Mbps",
      price: "Contact for pricing",
      icon: Zap,
      gradient: "from-[#a4d65e] to-[#8bc34a]",
      features: [
        "Unlimited Data",
        "HD streaming & gaming",
        "4-6 devices",
        "Free Installation",
        "Premium Router",
        "Priority Support",
      ],
      popular: true,
      ideal: "Family usage",
    },
    {
      id: "advanced",
      speed: "100Mbps",
      price: "Contact for pricing",
      icon: Zap,
      gradient: "from-orange-400 to-red-600",
      features: [
        "Unlimited Data",
        "4K streaming & gaming",
        "6-10 devices",
        "Free Installation",
        "Premium Router",
        "Dedicated Support",
      ],
      ideal: "Heavy users",
    },
    {
      id: "ultimate",
      speed: "300Mbps",
      price: "Contact for pricing",
      icon: Users,
      gradient: "from-purple-400 to-pink-600",
      features: [
        "Unlimited Data",
        "Business & power users",
        "10+ devices",
        "Free Installation",
        "Enterprise Router",
        "Dedicated Technician",
      ],
      ideal: "Business & Pro",
    },
  ];

  const faqs = [
    {
      q: "Is the data really unlimited?",
      a: "Yes! All our packages come with truly unlimited data. No caps, no throttling, no fair usage policies. Use as much data as you need.",
    },
    {
      q: "How long does installation take?",
      a: "Installation typically takes 24-48 hours from the time you sign up. Our technicians will coordinate with you to schedule a convenient time.",
    },
    {
      q: "Do I need to buy a router?",
      a: "No, all packages include a router as part of the installation. We provide professional-grade equipment suited to your package speed.",
    },
    {
      q: "Can I upgrade my package later?",
      a: "Absolutely! You can upgrade or downgrade your package at any time. Contact our support team to make changes to your plan.",
    },
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-[#1e3a5f] via-[#2d4a6f] to-[#1e3a5f] overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23a4d65e' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v6h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-white mb-6">Choose Your Perfect Speed</h1>
            <p className="text-white/80 text-xl max-w-3xl mx-auto">
              All packages include unlimited data, free installation, and 24/7 local support.
              Select the speed that matches your lifestyle.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {packages.map((pkg, index) => {
              const IconComponent = pkg.icon;
              const isSelected = selectedPackage === pkg.id;
              
              return (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  onClick={() => setSelectedPackage(pkg.id)}
                  className={`relative rounded-3xl p-6 cursor-pointer transition-all bg-white ${
                    pkg.popular
                      ? "border-2 border-[#a4d65e] scale-105 shadow-2xl"
                      : isSelected
                      ? "border-2 border-[#a4d65e] shadow-xl"
                      : "border border-gray-200 hover:border-[#a4d65e] hover:shadow-xl"
                  }`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-[#a4d65e] to-[#8bc34a] text-white px-4 py-1 rounded-full text-sm shadow-lg">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="flex justify-center mb-4">
                    <div className={`w-16 h-16 bg-gradient-to-br ${pkg.gradient} rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform`}>
                      <IconComponent className="text-white" size={32} />
                    </div>
                  </div>

                  <div className="text-center mb-6">
                    <div className={`text-4xl text-transparent bg-clip-text bg-gradient-to-r ${pkg.gradient} mb-2`}>
                      {pkg.speed}
                    </div>
                    <div className="text-gray-600 text-sm mb-2">{pkg.price}</div>
                    <div className="inline-block px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
                      {pkg.ideal}
                    </div>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className={`flex-shrink-0 mt-0.5 bg-gradient-to-r ${pkg.gradient} text-white rounded-full p-0.5`} size={16} />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => {
                      setSelectedPackage(pkg.id);
                      setIsModalOpen(true);
                    }}
                    className={`w-full py-3 rounded-full transition-all flex items-center justify-center gap-2 group ${
                      pkg.popular || isSelected
                        ? `bg-gradient-to-r ${pkg.gradient} text-white shadow-lg hover:shadow-xl`
                        : "bg-gray-100 text-gray-700 hover:bg-gradient-to-r hover:from-[#a4d65e] hover:to-[#8bc34a] hover:text-white"
                    }`}
                  >
                    Get Started
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-[#1e3a5f] mb-4">What Can You Do?</h2>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto">
              Choose the right speed for your internet activities.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "10-20 Mbps",
                activities: ["Web browsing", "Email", "Social media", "Music streaming", "Video calls"],
                image: "https://images.unsplash.com/photo-1680878903102-92692799ef36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwd29tYW4lMjBzbWFydHBob25lJTIwaW50ZXJuZXR8ZW58MXx8fHwxNzYzNjI5OTAwfDA&ixlib=rb-4.1.0&q=80&w=1080",
              },
              {
                title: "50-100 Mbps",
                activities: ["HD streaming", "Online gaming", "Work from home", "Multiple devices", "Large downloads"],
                image: "https://images.unsplash.com/photo-1694175271713-a6e2cc378980?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwc3R1ZGVudCUyMGxhcHRvcHxlbnwxfHx8fDE3NjM2Mjk5MDF8MA&ixlib=rb-4.1.0&q=80&w=1080",
              },
              {
                title: "300 Mbps",
                activities: ["4K streaming", "Cloud computing", "Large file transfers", "Business operations", "10+ devices"],
                image: "https://images.unsplash.com/photo-1739269552506-377309b10c7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwYnVzaW5lc3MlMjBwZW9wbGUlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc2MzYyOTkwMXww&ixlib=rb-4.1.0&q=80&w=1080",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-gradient-to-br from-gray-50 to-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-gray-100"
              >
                <div className="h-48 relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1e3a5f] to-transparent" />
                  <h3 className="absolute bottom-4 left-6 text-white">{item.title}</h3>
                </div>
                <div className="p-6">
                  <ul className="space-y-2">
                    {item.activities.map((activity, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-gray-700">
                        <Check className="text-[#a4d65e] flex-shrink-0" size={18} />
                        {activity}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-[#1e3a5f] mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 text-xl">
              Everything you need to know about our packages.
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100"
              >
                <h3 className="text-[#1e3a5f] mb-3">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Packages Link Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-[#1e3a5f] to-[#2d4a6f] rounded-3xl p-12"
          >
            <h2 className="text-white mb-4">Looking for Business Solutions?</h2>
            <p className="text-white/80 text-xl mb-8">
              Explore our specialized business packages designed for enterprises and growing companies.
            </p>
            <Link
              to="/business-packages"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#a4d65e] to-[#8bc34a] text-[#1e3a5f] px-8 py-4 rounded-full hover:shadow-2xl hover:shadow-[#a4d65e]/50 transition-all font-semibold"
            >
              View Business Packages
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#1e3a5f] to-[#2d4a6f]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-white mb-6">Still Not Sure?</h2>
            <p className="text-white/80 text-xl mb-8">
              Talk to our team and we'll help you choose the perfect package for your needs.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#a4d65e] to-[#8bc34a] text-[#1e3a5f] px-8 py-4 rounded-full hover:shadow-2xl hover:shadow-[#a4d65e]/50 transition-all"
            >
              Contact Us
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>
      {/* Coverage Check Modal */}
      {selectedPackage && (
        <CoverageCheckModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedPackage(null);
          }}
          onConfirm={() => {
            setIsModalOpen(false);
            window.location.href = `/contact?package=${encodeURIComponent(selectedPackage || '')}`;
          }}
          packageName={selectedPackage}
        />
      )}
    </div>
  );
}
