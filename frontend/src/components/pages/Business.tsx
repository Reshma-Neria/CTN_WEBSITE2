import { motion } from 'motion/react';
import { Building2, Users, Phone, ArrowUpRight, Shield, Clock, Check } from 'lucide-react';
import { Link } from 'react-router';

export function Business() {
  const benefits = [
    {
      icon: Building2,
      title: 'Enterprise Solutions',
      description: 'Custom packages tailored to your business size and requirements.',
    },
    {
      icon: Phone,
      title: 'Dedicated Support',
      description: 'Priority 24/7 support with dedicated account manager.',
    },
    {
      icon: Shield,
      title: 'SLA Guarantee',
      description: '99.9% uptime guarantee with service level agreements.',
    },
    {
      icon: ArrowUpRight,
      title: 'Scalable Plans',
      description: 'Easily upgrade as your business grows.',
    },
    {
      icon: Clock,
      title: 'Quick Deployment',
      description: 'Fast installation and setup to get you online quickly.',
    },
    {
      icon: Users,
      title: 'Multi-Location',
      description: 'Connect multiple offices with unified network management.',
    },
  ];

  const businessPackages = [
    {
      name: 'Business Starter',
      speed: '50Mbps',
      users: '5-10 users',
      price: 'Custom Pricing',
      features: [
        'Unlimited data',
        'Static IP address',
        'Business hours support',
        'Free installation',
        'Basic SLA',
      ],
    },
    {
      name: 'Business Pro',
      speed: '100Mbps',
      users: '10-25 users',
      price: 'Custom Pricing',
      popular: true,
      features: [
        'Unlimited data',
        'Static IP address',
        '24/7 priority support',
        'Free installation',
        'Enhanced SLA',
        'Backup connection option',
      ],
    },
    {
      name: 'Enterprise',
      speed: '300Mbps+',
      users: '25+ users',
      price: 'Custom Pricing',
      features: [
        'Unlimited data',
        'Multiple static IPs',
        'Dedicated account manager',
        'Free installation',
        'Premium SLA',
        'Redundant connections',
        'Custom network solutions',
      ],
    },
  ];

  const useCases = [
    {
      title: 'Remote Work',
      description: 'Support your distributed team with reliable, high-speed connectivity for video calls and cloud collaboration.',
      image: 'https://images.unsplash.com/photo-1758519289200-384c7ef2d163?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwYnVzaW5lc3MlMjB0ZWFtJTIwbWVldGluZ3xlbnwxfHx8fDE3NzA3NTA4Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      title: 'Retail & Hospitality',
      description: 'Keep your point-of-sale systems, guest WiFi, and payment processing running smoothly 24/7.',
      image: 'https://images.unsplash.com/photo-1758611972971-1c8b9c6d7822?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwZW50cmVwcmVuZXVyJTIwc21hcnRwaG9uZSUyMGJ1c2luZXNzfGVufDF8fHx8MTc3MDc1MDgyOHww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      title: 'Education',
      description: 'Enable online learning platforms, virtual classrooms, and digital resources for students and teachers.',
      image: 'https://images.unsplash.com/photo-1655720348616-184ae7fad7e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwc3R1ZGVudCUyMG9ubGluZSUyMGxlYXJuaW5nfGVufDF8fHx8MTc3MDc1MDgyN3ww&ixlib=rb-4.1.0&q=80&w=1080',
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
            Business <span className="text-[#a4d65e]">Solutions</span>
          </h1>
          <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto leading-relaxed">
            Power your business with reliable, unlimited internet designed for the demands 
            of modern enterprises.
          </p>
        </motion.div>

        {/* Benefits Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-colors"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-[#a4d65e] to-[#7fb83d] rounded-xl flex items-center justify-center mb-4">
                <benefit.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-white mb-3">
                {benefit.title}
              </h3>
              <p className="text-white">{benefit.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Business Packages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Business Packages
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {businessPackages.map((pkg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className={`relative bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-8 ${
                  pkg.popular ? 'ring-2 ring-[#a4d65e]' : ''
                }`}
              >
                {pkg.popular && (
                  <div className="absolute top-0 right-0 bg-gradient-to-br from-[#a4d65e] to-[#7fb83d] text-white px-4 py-1 text-sm font-semibold rounded-bl-xl">
                    Most Popular
                  </div>
                )}
                
                <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
                <div className="text-3xl font-bold text-[#a4d65e] mb-2">{pkg.speed}</div>
                <div className="text-white mb-4">{pkg.users}</div>
                <div className="text-xl font-bold text-white mb-6">{pkg.price}</div>
                
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-[#a4d65e] flex-shrink-0 mt-0.5" />
                      <span className="text-white">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link
                  to="/contact"
                  className={`block w-full text-center py-3 rounded-xl font-semibold transition-transform hover:scale-105 ${
                    pkg.popular
                      ? 'bg-gradient-to-br from-[#a4d65e] to-[#7fb83d] text-white'
                      : 'bg-white/10 text-white border border-white/20'
                  }`}
                >
                  Contact Sales
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Use Cases Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Perfect For Every Industry
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={useCase.image}
                    alt={useCase.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl md:text-2xl font-semibold text-white mb-3">
                    {useCase.title}
                  </h3>
                  <p className="text-white">{useCase.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-br from-[#a4d65e] to-[#7fb83d] rounded-3xl p-12 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Ready to Upgrade Your Business?
          </h2>
          <p className="text-xl md:text-2xl text-white mb-8 max-w-2xl mx-auto">
            Let's discuss your specific needs and create a custom solution for your business.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center space-x-2 bg-[#1e3a5f] text-white px-8 py-4 rounded-xl font-semibold hover:scale-105 transition-transform"
          >
            <span>Contact Our Business Team</span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
