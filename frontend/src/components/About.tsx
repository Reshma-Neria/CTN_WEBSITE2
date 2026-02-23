import { motion } from "motion/react";
import { Wifi, Shield, Headphones, Zap } from "lucide-react";

export function About() {
  const features = [
    {
      icon: Wifi,
      title: "High-Speed Unlimited",
      description: "Enjoy truly unlimited data with consistent high speeds for all your needs.",
    },
    {
      icon: Shield,
      title: "Reliable Network",
      description: "Built on modern infrastructure for maximum uptime and reliability.",
    },
    {
      icon: Headphones,
      title: "Local Support",
      description: "Dedicated customer support team ready to assist you 24/7.",
    },
    {
      icon: Zap,
      title: "Quick Setup",
      description: "Free professional installation and setup by our expert technicians.",
    },
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-[#1e3a5f] mb-4">About CTN</h2>
          <p className="text-gray-600 text-xl max-w-3xl mx-auto">
            Converged Technology Networks (CTN) is Malawi's trusted network service provider,
            delivering high-quality unlimited internet solutions that keep you connected to what matters most.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border border-gray-100 hover:border-[#a4d65e] hover:shadow-lg transition-all group"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-[#a4d65e] to-[#8bc34a] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <feature.icon className="text-white" size={28} />
              </div>
              <h3 className="text-[#1e3a5f] mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
