import { motion } from "motion/react";
import { ArrowRight, Wifi, Zap, Shield, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { NetworkBackground } from "../components/NetworkBackground";

export function HomePage() {
  const stats = [
    { icon: Zap, value: "300Mbps", label: "Max Speed", color: "from-yellow-400 to-orange-500" },
    { icon: Wifi, value: "Unlimited", label: "Data", color: "from-[#a4d65e] to-[#8bc34a]" },
    { icon: Shield, value: "99.9%", label: "Uptime", color: "from-blue-400 to-blue-600" },
    { icon: TrendingUp, value: "24/7", label: "Support", color: "from-purple-400 to-pink-500" },
  ];

  const features = [
    {
      image: "https://images.unsplash.com/photo-1680878903102-92692799ef36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwd29tYW4lMjBzbWFydHBob25lJTIwaW50ZXJuZXR8ZW58MXx8fHwxNzYzNjI5OTAwfDA&ixlib=rb-4.1.0&q=80&w=1080",
      title: "Stay Connected",
      description: "Seamless connectivity for all your devices, from smartphones to smart homes.",
    },
    {
      image: "https://images.unsplash.com/photo-1694175271713-a6e2cc378980?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwc3R1ZGVudCUyMGxhcHRvcHxlbnwxfHx8fDE3NjM2Mjk5MDF8MA&ixlib=rb-4.1.0&q=80&w=1080",
      title: "Learn & Grow",
      description: "Fast internet for online education, research, and professional development.",
    },
    {
      image: "https://images.unsplash.com/photo-1739269552506-377309b10c7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwYnVzaW5lc3MlMjBwZW9wbGUlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc2MzYyOTkwMXww&ixlib=rb-4.1.0&q=80&w=1080",
      title: "Business Growth",
      description: "Reliable high-speed internet to power your business operations.",
    },
  ];

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0a1628] via-[#1e3a5f] to-[#2d4a6f] pt-20">
        <NetworkBackground />
        
        {/* Animated gradient orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#a4d65e] rounded-full blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-10 animate-pulse" style={{ animationDelay: "1s" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#a4d65e]/20 border border-[#a4d65e]/30 rounded-full mb-6 backdrop-blur-sm"
              >
                <Wifi className="text-[#a4d65e]" size={20} />
                <span className="text-[#a4d65e]">Connecting Malawi to the World</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-white mb-6 text-5xl md:text-6xl lg:text-7xl"
              >
                The Future of
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#a4d65e] to-[#8bc34a]">
                  Internet
                </span>
                is Unlimited
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-white/80 text-xl mb-8 max-w-xl"
              >
                Experience lightning-fast speeds up to 300Mbps with truly unlimited data.
                No caps. No throttling. Just pure, uninterrupted connectivity.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link
                  to="/packages"
                  className="group bg-gradient-to-r from-[#a4d65e] to-[#8bc34a] text-[#1e3a5f] px-8 py-4 rounded-full hover:shadow-2xl hover:shadow-[#a4d65e]/50 transition-all flex items-center justify-center gap-2"
                >
                  Explore Packages
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                </Link>
                <Link
                  to="/contact"
                  className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full border-2 border-white/20 hover:bg-white hover:text-[#1e3a5f] transition-all flex items-center justify-center"
                >
                  Contact Sales
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1694286080674-f2881c3c2107?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIweW91dGglMjBtb2JpbGUlMjBwaG9uZXxlbnwxfHx8fDE3NjM2Mjk5MDJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="African youth using internet"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1e3a5f]/80 to-transparent" />
                
                {/* Floating Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.8 }}
                  className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-lg rounded-2xl p-6 shadow-2xl"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#a4d65e] to-[#8bc34a] rounded-full flex items-center justify-center">
                      <Zap className="text-white" size={24} />
                    </div>
                    <div>
                      <div className="text-gray-500 text-sm">Current Speed</div>
                      <div className="text-2xl text-[#1e3a5f]">300 Mbps</div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#a4d65e] rounded-full blur-2xl opacity-50" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-500 rounded-full blur-2xl opacity-30" />
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20"
          >
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all group"
                >
                  <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <IconComponent className="text-white" size={24} />
                  </div>
                  <div className="text-3xl text-white mb-1">{stat.value}</div>
                  <div className="text-white/60">{stat.label}</div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" className="w-full h-auto">
            <path
              d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-[#1e3a5f] mb-4">Empowering Lives Across Malawi</h2>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto">
              From students to entrepreneurs, families to businesses - we're connecting
              communities to endless possibilities.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all"
              >
                <div className="aspect-[4/5] relative overflow-hidden">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1e3a5f] via-[#1e3a5f]/50 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="mb-2">{feature.title}</h3>
                  <p className="text-white/80">{feature.description}</p>
                </div>
                <div className="absolute top-4 right-4 w-12 h-12 bg-[#a4d65e] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="text-white" size={20} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#1e3a5f] to-[#2d4a6f] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23a4d65e' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v6h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-white mb-6">Ready to Get Connected?</h2>
            <p className="text-white/80 text-xl mb-8">
              Join thousands of satisfied customers enjoying unlimited high-speed internet.
              Get started today with CTN.
            </p>
            <Link
              to="/packages"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#a4d65e] to-[#8bc34a] text-[#1e3a5f] px-8 py-4 rounded-full hover:shadow-2xl hover:shadow-[#a4d65e]/50 transition-all"
            >
              View Our Packages
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
