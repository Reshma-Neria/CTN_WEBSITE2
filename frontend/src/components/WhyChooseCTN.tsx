import { motion } from "motion/react";
import { Infinity, Zap, Headphones, TrendingUp, DollarSign, Network } from "lucide-react";

export function WhyChooseCTN() {
  const features = [
    {
      icon: Infinity,
      title: "Unlimited Data",
      description: "Truly unlimited data with no caps or throttling. Browse, stream, and download freely.",
    },
    {
      icon: Zap,
      title: "High Speeds",
      description: "Speeds up to 300Mbps for seamless streaming, gaming, and work.",
    },
    {
      icon: Headphones,
      title: "Local Support",
      description: "24/7 customer support from our dedicated Malawian team.",
    },
    {
      icon: TrendingUp,
      title: "Reliable Uptime",
      description: "Built on modern infrastructure for maximum reliability and consistent performance.",
    },
    {
      icon: DollarSign,
      title: "Affordable Pricing",
      description: "Competitive packages designed to fit your budget without compromising quality.",
    },
    {
      icon: Network,
      title: "Modern Infrastructure",
      description: "State-of-the-art network technology for the best internet experience.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-[#1e3a5f] mb-4">Why Choose CTN?</h2>
          <p className="text-gray-600 text-xl max-w-3xl mx-auto">
            We're committed to providing Malawi with the best internet experience through
            quality service, reliable technology, and local support.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:border-[#a4d65e] hover:shadow-lg transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#a4d65e] to-[#8bc34a] rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <IconComponent className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-[#1e3a5f] mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
