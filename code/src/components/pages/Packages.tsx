import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { Link } from 'react-router';
import { useState } from 'react';
import { CoverageCheckModal } from '../CoverageCheckModal';

interface Package {
  speed: string;
  name: string;
  price: string;
  features: string[];
  popular?: boolean;
  color: string;
}

interface VPSPackage {
  name: string;
  price: string;
  cpu: string;
  ram: string;
  storage: string;
  popular?: boolean;
  color: string;
  features: string[];
}

export function Packages() {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const tiyeniPackages: Package[] = [
    {
      speed: '10',
      name: 'Tiyeni Standard',
      price: 'MK 49,500',
      color: 'from-blue-500 to-blue-600',
      features: [
        '10 mbps Unlimited, Uncapped, No FUP',
        '10 mbps Unlimited Internet Access',
        'Up to 8 Devices',
        '2 Streaming',
        'Valid until canceled',
      ],
    },
    {
      speed: '20',
      name: 'Tiyeni Premium',
      price: 'MK 79,500',
      color: 'from-green-500 to-green-600',
      features: [
        '20 mbps Unlimited, Uncapped, No FUP',
        '20 mbps Unlimited Internet Access',
        'Up to 12 Devices',
        '3 Streaming',
        'Valid until canceled',
      ],
    },
    {
      speed: '40',
      name: 'Tiyeni Executive',
      price: 'MK 109,500',
      color: 'from-purple-500 to-purple-600',
      popular: true,
      features: [
        '40 mbps Unlimited, Uncapped, No FUP',
        '40 mbps Unlimited Internet Access',
        'Up to 14 devices',
        '4 Streaming',
        'Valid until canceled',
      ],
    },
  ];

  const vpsPackages: VPSPackage[] = [
    {
      name: 'VPS Starter',
      price: 'MK 50,000',
      cpu: '1 CPU',
      ram: '2 GB RAM',
      storage: '30 GB Storage',
      color: 'from-blue-500 to-blue-600',
      features: [
        'Perfect for testing and short term light workloads',
        'Malawi VPS',
        'Unlimited Bandwidth',
      ],
    },
    {
      name: 'VPS Basic',
      price: 'MK 75,000',
      cpu: '2 CPU',
      ram: '4 GB RAM',
      storage: '60 GB Storage',
      color: 'from-green-500 to-green-600',
      features: [
        'Ideal for Light Workloads',
        'Malawi VPS',
        'Unlimited Bandwidth',
      ],
    },
    {
      name: 'VPS Pro',
      price: 'MK 110,000',
      cpu: '4 CPU',
      ram: '8 GB RAM',
      storage: '128 GB Storage',
      color: 'from-purple-500 to-purple-600',
      popular: true,
      features: [
        'Perfect for Medium Workloads',
        'Malawi VPS',
        'Unlimited Bandwidth',
      ],
    },
    {
      name: 'VPS Enterprise',
      price: 'MK 250,000',
      cpu: '6 CPU',
      ram: '16 GB RAM',
      storage: '256 GB Storage',
      color: 'from-orange-500 to-orange-600',
      features: [
        'Ideal for heavy workloads',
        'Malawi VPS',
        'Unlimited Bandwidth',
      ],
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
            Choose Your <span className="text-[#a4d65e]">Package</span>
          </h1>
          <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto mb-8 leading-relaxed">
            Experience Faster Internet with CTN's Improved Tiyeni Plans and Packages. 
            All packages include unlimited, uncapped data with no FUP.
          </p>
        </motion.div>

        {/* Tiyeni Packages Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">Tiyeni Broadband Plans</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tiyeniPackages.map((pkg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden ${
                  pkg.popular ? 'ring-2 ring-[#a4d65e]' : ''
                }`}
              >
              {/* Popular Badge */}
              {pkg.popular && (
                <div className="absolute top-0 right-0 bg-gradient-to-br from-[#a4d65e] to-[#7fb83d] text-white px-4 py-1 text-sm font-semibold rounded-bl-xl">
                  Most Popular
                </div>
              )}

              <div className="p-8">
                {/* Package Info */}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
                  <div className="mt-2 mb-4">
                    <span className="text-3xl md:text-4xl font-bold text-[#a4d65e]">{pkg.price}</span>
                    <span className="text-white/60 text-base md:text-lg block mt-1">Every month</span>
                  </div>
                  <div className="flex items-baseline space-x-2 mb-2">
                    <span className="text-2xl font-bold text-white">{pkg.speed}</span>
                    <span className="text-white/60">mbps</span>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-[#a4d65e] flex-shrink-0 mt-0.5" />
                      <span className="text-white">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  onClick={() => {
                    setSelectedPackage(pkg.name);
                    setIsModalOpen(true);
                  }}
                  className={`block w-full text-center py-3 rounded-xl font-semibold transition-transform hover:scale-105 ${
                    pkg.popular
                      ? 'bg-gradient-to-br from-[#a4d65e] to-[#7fb83d] text-white'
                      : 'bg-white/10 text-white border border-white/20'
                  }`}
                >
                  Select
                </button>
              </div>
            </motion.div>
          ))}
          </div>
        </motion.div>

        {/* Installation Procedure Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">Installation Procedure</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
              <div className="text-[#a4d65e] font-bold text-xl md:text-2xl mb-4">Plan A</div>
              <div className="space-y-3 text-white">
                <p><span className="font-semibold text-white">Subscription:</span> 1 Month</p>
                <p><span className="font-semibold text-white">Non-refundable installation fee:</span> K50,000</p>
                <p><span className="font-semibold text-white">Refundable equipment deposit fee:</span> K50,000</p>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
              <div className="text-[#a4d65e] font-bold text-xl mb-4">Plan B</div>
              <div className="space-y-3 text-white">
                <p><span className="font-semibold text-white">Subscription:</span> 3 Month</p>
                <p><span className="font-semibold text-white">Non-refundable installation fee:</span> Free</p>
                <p><span className="font-semibold text-white">Refundable equipment deposit fee:</span> K50,000</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* VPS Packages Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">Virtual Private Servers</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {vpsPackages.map((pkg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className={`relative bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden ${
                  pkg.popular ? 'ring-2 ring-[#a4d65e]' : ''
                }`}
              >
                {/* Popular Badge */}
                {pkg.popular && (
                  <div className="absolute top-0 right-0 bg-gradient-to-br from-[#a4d65e] to-[#7fb83d] text-white px-4 py-1 text-sm font-semibold rounded-bl-xl">
                    Best Value
                  </div>
                )}

                <div className="p-8">
                  {/* Package Info */}
                  <div className="mb-6">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">{pkg.name}</h3>
                    <div className="mt-2 mb-4">
                      <span className="text-3xl md:text-4xl font-bold text-[#a4d65e]">{pkg.price}</span>
                      <span className="text-white/60 text-base md:text-lg block mt-1">Every month</span>
                    </div>
                    <div className="space-y-2 text-white text-base md:text-lg">
                      <p>{pkg.cpu}</p>
                      <p>{pkg.ram}</p>
                      <p>{pkg.storage}</p>
                      <p>Unlimited Bandwidth</p>
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-start space-x-3">
                        <Check className="w-5 h-5 text-[#a4d65e] flex-shrink-0 mt-0.5" />
                        <span className="text-white text-base">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Link
                    to="/contact"
                    className={`block w-full text-center py-3 rounded-xl font-semibold transition-transform hover:scale-105 ${
                      pkg.popular
                        ? 'bg-gradient-to-br from-[#a4d65e] to-[#7fb83d] text-white'
                        : 'bg-white/10 text-white border border-white/20'
                    }`}
                  >
                    Select
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-20 bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg md:text-xl font-semibold text-white mb-3">
                Is the data really unlimited?
              </h3>
              <p className="text-white">
                Yes! All our Tiyeni packages come with truly unlimited, uncapped data with no FUP (Fair Usage Policy). 
                Use as much data as you need without any restrictions.
              </p>
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-semibold text-white mb-3">
                What is the installation process?
              </h3>
              <p className="text-white">
                We offer two installation plans: Plan A (1 month subscription) with K50,000 installation fee, 
                or Plan B (3 month subscription) with FREE installation. Both require a refundable K50,000 equipment deposit.
              </p>
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-semibold text-white mb-3">
                Can I upgrade or downgrade my package?
              </h3>
              <p className="text-white">
                Absolutely! You can change your package at any time. Contact our support team 
                and we'll help you switch to a different speed tier.
              </p>
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-semibold text-white mb-3">
                What are VPS packages used for?
              </h3>
              <p className="text-white">
                Our Virtual Private Servers are perfect for hosting websites, applications, databases, 
                and other workloads. All VPS packages include unlimited bandwidth and are hosted in Malawi.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

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
