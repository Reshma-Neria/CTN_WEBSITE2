import { motion } from "motion/react";
import { Check, Wifi, Zap, Users } from "lucide-react";

export function Packages() {
  const packages = [
    {
      speed: "10Mbps",
      price: "Contact for pricing",
      icon: Wifi,
      features: [
        "Unlimited Data",
        "Perfect for browsing & email",
        "Free Installation",
        "Router included",
        "24/7 Support",
      ],
      popular: false,
    },
    {
      speed: "20Mbps",
      price: "Contact for pricing",
      icon: Wifi,
      features: [
        "Unlimited Data",
        "Great for streaming",
        "Free Installation",
        "Router included",
        "Priority Support",
      ],
      popular: false,
    },
    {
      speed: "50Mbps",
      price: "Contact for pricing",
      icon: Zap,
      features: [
        "Unlimited Data",
        "HD streaming & gaming",
        "Free Installation",
        "Premium Router",
        "Priority Support",
      ],
      popular: true,
    },
    {
      speed: "100Mbps",
      price: "Contact for pricing",
      icon: Zap,
      features: [
        "Unlimited Data",
        "Multiple devices",
        "Free Installation",
        "Premium Router",
        "Dedicated Support",
      ],
      popular: false,
    },
    {
      speed: "300Mbps",
      price: "Contact for pricing",
      icon: Users,
      features: [
        "Unlimited Data",
        "Business & power users",
        "Free Installation",
        "Enterprise Router",
        "Dedicated Technician",
      ],
      popular: false,
    },
  ];

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="packages" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-[#1e3a5f] mb-4">Choose Your Speed</h2>
          <p className="text-gray-600 text-xl max-w-3xl mx-auto">
            All packages include unlimited data, free installation, and 24/7 local support.
            Select the speed that's right for you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {packages.map((pkg, index) => {
            const IconComponent = pkg.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative rounded-2xl p-6 border-2 hover:shadow-xl transition-all bg-white ${
                  pkg.popular
                    ? "border-[#a4d65e] scale-105"
                    : "border-gray-200 hover:border-[#a4d65e]"
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-[#a4d65e] text-white px-4 py-1 rounded-full text-sm">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="flex justify-center mb-4">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                    pkg.popular ? "bg-[#a4d65e]" : "bg-gray-100"
                  }`}>
                    <IconComponent className={pkg.popular ? "text-white" : "text-[#1e3a5f]"} size={32} />
                  </div>
                </div>

                <div className="text-center mb-6">
                  <div className="text-3xl text-[#1e3a5f] mb-2">{pkg.speed}</div>
                  <div className="text-gray-600 text-sm">{pkg.price}</div>
                </div>

                <ul className="space-y-3 mb-6">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="text-[#a4d65e] flex-shrink-0 mt-0.5" size={18} />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={scrollToContact}
                  className={`w-full py-3 rounded-full transition-all ${
                    pkg.popular
                      ? "bg-[#a4d65e] text-white hover:bg-[#8bc34a]"
                      : "bg-gray-100 text-[#1e3a5f] hover:bg-[#a4d65e] hover:text-white"
                  }`}
                >
                  Get Started
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
