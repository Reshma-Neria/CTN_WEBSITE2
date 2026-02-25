import { motion } from 'motion/react';
import { Building2, Check, ArrowRight, Shield, Users, Zap } from 'lucide-react';
import { Link } from 'react-router';
import { useState } from 'react';
import { CoverageCheckModal } from '../CoverageCheckModal';

export function BusinessPackages() {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Business packages - Update these with details from the PDF document
  const businessPackages = [
    {
      id: 'business-starter',
      name: 'Business Starter',
      speed: '50Mbps',
      users: '5-10 users',
      price: 'Contact for pricing',
      icon: Building2,
      gradient: 'from-blue-400 to-blue-600',
      features: [
        'Unlimited data',
        'Static IP address',
        'Business hours support',
        'Free installation',
        'Basic SLA',
        'Router included',
      ],
      ideal: 'Small Business',
    },
    {
      id: 'business-pro',
      name: 'Business Pro',
      speed: '100Mbps',
      users: '10-25 users',
      price: 'Contact for pricing',
      icon: Shield,
      gradient: 'from-[#a4d65e] to-[#8bc34a]',
      popular: true,
      features: [
        'Unlimited data',
        'Static IP address',
        '24/7 priority support',
        'Free installation',
        'Enhanced SLA',
        'Backup connection option',
        'Dedicated account manager',
      ],
      ideal: 'Growing Business',
    },
    {
      id: 'business-enterprise',
      name: 'Enterprise',
      speed: '300Mbps+',
      users: '25+ users',
      price: 'Contact for pricing',
      icon: Zap,
      gradient: 'from-purple-400 to-pink-600',
      features: [
        'Unlimited data',
        'Multiple static IPs',
        'Dedicated account manager',
        'Free installation',
        'Premium SLA',
        'Redundant connections',
        'Custom network solutions',
        '24/7 dedicated support',
      ],
      ideal: 'Large Enterprise',
    },
  ];

  const benefits = [
    {
      icon: Shield,
      title: 'SLA Guarantee',
      description: '99.9% uptime guarantee with service level agreements.',
    },
    {
      icon: Users,
      title: 'Dedicated Support',
      description: 'Priority 24/7 support with dedicated account manager.',
    },
    {
      icon: Building2,
      title: 'Enterprise Solutions',
      description: 'Custom packages tailored to your business size and requirements.',
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
            <h1 className="text-white mb-6">Business Packages</h1>
            <p className="text-white/80 text-xl max-w-3xl mx-auto">
              Power your business with reliable, unlimited internet designed for the demands 
              of modern enterprises. All packages include unlimited data, free installation, and dedicated support.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-[#a4d65e] to-[#7fb83d] rounded-xl flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#1e3a5f] mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Business Packages Grid */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {businessPackages.map((pkg, index) => {
              const IconComponent = pkg.icon;
              const isSelected = selectedPackage === pkg.id;
              
              return (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  onClick={() => setSelectedPackage(pkg.id)}
                  className={`relative rounded-3xl p-8 cursor-pointer transition-all bg-white ${
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

                  <div className="flex justify-center mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-br ${pkg.gradient} rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform`}>
                      <IconComponent className="text-white" size={32} />
                    </div>
                  </div>

                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-[#1e3a5f] mb-2">{pkg.name}</h3>
                    <div className={`text-4xl text-transparent bg-clip-text bg-gradient-to-r ${pkg.gradient} mb-2`}>
                      {pkg.speed}
                    </div>
                    <div className="text-gray-600 text-sm mb-2">{pkg.users}</div>
                    <div className="text-xl font-bold text-[#1e3a5f] mb-2">{pkg.price}</div>
                    <div className="inline-block px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
                      {pkg.ideal}
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8">
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

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#1e3a5f] to-[#2d4a6f]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-white mb-6">Need a Custom Solution?</h2>
            <p className="text-white/80 text-xl mb-8">
              Our business team can create a tailored package that perfectly fits your company's needs.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#a4d65e] to-[#8bc34a] text-[#1e3a5f] px-8 py-4 rounded-full hover:shadow-2xl hover:shadow-[#a4d65e]/50 transition-all"
            >
              Contact Business Team
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
