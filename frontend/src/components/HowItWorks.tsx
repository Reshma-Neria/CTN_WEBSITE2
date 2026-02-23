import { motion } from "motion/react";
import { Package, Wrench, Wifi } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      icon: Package,
      title: "Choose a Package",
      description: "Select the internet speed that matches your needs and budget.",
      step: "01",
    },
    {
      icon: Wrench,
      title: "Professional Installation",
      description: "Our certified technicians will install and set up everything for free.",
      step: "02",
    },
    {
      icon: Wifi,
      title: "Enjoy Unlimited Browsing",
      description: "Start using your unlimited high-speed internet right away.",
      step: "03",
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
          <h2 className="text-[#1e3a5f] mb-4">How It Works</h2>
          <p className="text-gray-600 text-xl max-w-3xl mx-auto">
            Getting started with CTN is simple and hassle-free. Follow these three easy steps.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* Connection Line (desktop) */}
          <div className="hidden md:block absolute top-20 left-[16.666%] right-[16.666%] h-0.5 bg-gradient-to-r from-[#a4d65e] via-[#a4d65e] to-[#a4d65e] opacity-30" />

          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative text-center"
              >
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div className="w-32 h-32 bg-gradient-to-br from-[#a4d65e] to-[#8bc34a] rounded-full flex items-center justify-center shadow-lg">
                      <IconComponent className="text-white" size={48} />
                    </div>
                    <div className="absolute -top-2 -right-2 w-12 h-12 bg-[#1e3a5f] rounded-full flex items-center justify-center text-white shadow-lg">
                      {step.step}
                    </div>
                  </div>
                </div>
                <h3 className="text-[#1e3a5f] mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
