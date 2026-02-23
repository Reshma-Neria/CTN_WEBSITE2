import { motion } from "motion/react";
import { Building2, Users, Calendar } from "lucide-react";

export function BusinessSolutions() {
  const solutions = [
    {
      icon: Building2,
      title: "Office Solutions",
      description: "Reliable high-speed internet for your business operations and team productivity.",
      features: ["Dedicated bandwidth", "Business support", "Scalable plans"],
    },
    {
      icon: Users,
      title: "Conference Connectivity",
      description: "Professional internet solutions for conferences with seamless connectivity.",
      features: ["High capacity", "Multiple access points", "Technical support on-site"],
    },
    {
      icon: Calendar,
      title: "Event Rentals",
      description: "Temporary internet solutions for events with flexible rental packages.",
      features: ["Up to 300Mbps", "Free setup & removal", "MK55,000/day"],
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
    <section
      id="business"
      className="py-20 bg-gradient-to-br from-[#1e3a5f] to-[#2d4a6f] relative overflow-hidden"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1571645163064-77faa9676a46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGNvbmZlcmVuY2UlMjBuZXR3b3JraW5nfGVufDF8fHx8MTc2MzUxMzkzMXww&ixlib=rb-4.1.0&q=80&w=1080')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a5f]/95 to-[#2d4a6f]/95" />

      {/* Network Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23a4d65e' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v6h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-white mb-4">Business & Events Solutions</h2>
          <p className="text-white/80 text-xl max-w-3xl mx-auto">
            Specialized internet solutions for businesses, conferences, and events.
            Reliable connectivity when you need it most.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {solutions.map((solution, index) => {
            const IconComponent = solution.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 hover:bg-white/15 transition-all group"
              >
                <div className="w-16 h-16 bg-[#a4d65e] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <IconComponent className="text-white" size={32} />
                </div>
                <h3 className="text-white mb-3">{solution.title}</h3>
                <p className="text-white/70 mb-6">{solution.description}</p>
                <ul className="space-y-2 mb-6">
                  {solution.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-white/80">
                      <div className="w-1.5 h-1.5 bg-[#a4d65e] rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={scrollToContact}
                  className="text-[#a4d65e] hover:text-white transition-colors"
                >
                  Learn More →
                </button>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <button
            onClick={scrollToContact}
            className="bg-[#a4d65e] text-[#1e3a5f] px-8 py-4 rounded-full hover:bg-[#8bc34a] transition-all shadow-lg"
          >
            Request a Business Quote
          </button>
        </motion.div>
      </div>
    </section>
  );
}
