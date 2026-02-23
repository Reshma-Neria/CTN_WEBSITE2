import { motion } from "motion/react";
import { Building2, Users, Calendar, Wifi, Shield, Headphones, ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";

export function BusinessPage() {
  const solutions = [
    {
      icon: Building2,
      title: "Office Solutions",
      description: "Enterprise-grade internet for your business operations",
      features: [
        "Dedicated bandwidth",
        "Static IP address",
        "Business SLA guarantee",
        "Priority support",
        "Scalable plans",
        "Network monitoring",
      ],
      image: "https://images.unsplash.com/photo-1758519291531-e96279895745?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwb2ZmaWNlJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjM2Mjk5MDJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      icon: Users,
      title: "Conference Connectivity",
      description: "Seamless internet for conferences and large events",
      features: [
        "High capacity bandwidth",
        "Multiple access points",
        "On-site technical support",
        "Dedicated connection",
        "Load balancing",
        "24/7 monitoring",
      ],
      image: "https://images.unsplash.com/photo-1571645163064-77faa9676a46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGNvbmZlcmVuY2UlMjBuZXR3b3JraW5nfGVufDF8fHx8MTc2MzUxMzkzMXww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      icon: Calendar,
      title: "Event Rentals",
      description: "Flexible short-term internet solutions",
      features: [
        "Up to 300Mbps speed",
        "Free setup & removal",
        "Professional equipment",
        "MK55,000/day",
        "Custom duration",
        "Technical on-site support",
      ],
      image: "https://images.unsplash.com/photo-1630283017802-785b7aff9aac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzYzNjEwNjE1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
  ];

  const benefits = [
    {
      icon: Wifi,
      title: "Reliable Connectivity",
      description: "99.9% uptime guarantee with redundant systems and backup solutions.",
    },
    {
      icon: Shield,
      title: "Secure Network",
      description: "Enterprise-grade security with firewall protection and encryption.",
    },
    {
      icon: Headphones,
      title: "Dedicated Support",
      description: "Assigned account manager and priority technical support.",
    },
  ];

  const industries = [
    { name: "Healthcare", icon: "🏥" },
    { name: "Education", icon: "🎓" },
    { name: "Finance", icon: "💼" },
    { name: "Retail", icon: "🏪" },
    { name: "Hospitality", icon: "🏨" },
    { name: "Manufacturing", icon: "🏭" },
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-[#1e3a5f] via-[#2d4a6f] to-[#1e3a5f] overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1739269552506-377309b10c7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwYnVzaW5lc3MlMjBwZW9wbGUlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc2MzYyOTkwMXww&ixlib=rb-4.1.0&q=80&w=1080')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}>
          <div className="absolute inset-0 bg-gradient-to-r from-[#1e3a5f]/95 via-[#2d4a6f]/90 to-[#1e3a5f]/95" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-white mb-6">Business & Events Solutions</h1>
            <p className="text-white/80 text-xl max-w-3xl mx-auto mb-8">
              Enterprise-grade internet solutions designed for businesses, conferences,
              and events. Reliable connectivity when you need it most.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#a4d65e] to-[#8bc34a] text-[#1e3a5f] px-8 py-4 rounded-full hover:shadow-2xl hover:shadow-[#a4d65e]/50 transition-all"
            >
              Request a Quote
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-[#1e3a5f] mb-4">Our Solutions</h2>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto">
              Tailored internet solutions for every business need.
            </p>
          </motion.div>

          <div className="space-y-20">
            {solutions.map((solution, index) => {
              const IconComponent = solution.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className={`grid lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                    <div className="w-16 h-16 bg-gradient-to-br from-[#a4d65e] to-[#8bc34a] rounded-2xl flex items-center justify-center mb-6">
                      <IconComponent className="text-white" size={32} />
                    </div>
                    <h3 className="text-[#1e3a5f] mb-4">{solution.title}</h3>
                    <p className="text-gray-600 text-lg mb-6">
                      {solution.description}
                    </p>
                    <ul className="grid md:grid-cols-2 gap-3 mb-8">
                      {solution.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="text-[#a4d65e] flex-shrink-0 mt-1" size={18} />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 text-[#a4d65e] hover:gap-3 transition-all"
                    >
                      Learn More
                      <ArrowRight size={18} />
                    </Link>
                  </div>

                  <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                      <img
                        src={solution.image}
                        alt={solution.title}
                        className="w-full h-[400px] object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1e3a5f]/50 to-transparent" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-[#1e3a5f] mb-4">Why Choose CTN for Business?</h2>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto">
              Enterprise features that keep your business connected.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all border border-gray-100 group"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-[#a4d65e] to-[#8bc34a] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <IconComponent className="text-white" size={32} />
                  </div>
                  <h3 className="text-[#1e3a5f] mb-3">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-[#1e3a5f] mb-4">Industries We Serve</h2>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto">
              Trusted by businesses across diverse sectors in Malawi.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {industries.map((industry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100 text-center group hover:border-[#a4d65e]"
              >
                <div className="text-5xl mb-3">{industry.icon}</div>
                <div className="text-[#1e3a5f] group-hover:text-[#a4d65e] transition-colors">
                  {industry.name}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white p-12 rounded-3xl shadow-2xl border border-gray-100"
          >
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">💼</div>
              <h3 className="text-[#1e3a5f] mb-4">
                "CTN has transformed our business operations"
              </h3>
              <p className="text-gray-600 text-lg">
                The reliable high-speed internet from CTN has been instrumental in our
                digital transformation. Their support team is always responsive and the
                service has been consistently excellent.
              </p>
            </div>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#a4d65e] to-[#8bc34a] rounded-full" />
              <div>
                <div className="text-[#1e3a5f]">Business Client</div>
                <div className="text-gray-500 text-sm">CTN Enterprise Customer</div>
              </div>
            </div>
          </motion.div>
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
            <h2 className="text-white mb-6">Ready to Power Your Business?</h2>
            <p className="text-white/80 text-xl mb-8">
              Get a custom quote tailored to your business needs. Our team is ready to
              help you find the perfect solution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-gradient-to-r from-[#a4d65e] to-[#8bc34a] text-[#1e3a5f] px-8 py-4 rounded-full hover:shadow-2xl hover:shadow-[#a4d65e]/50 transition-all inline-flex items-center justify-center gap-2"
              >
                Request a Quote
                <ArrowRight size={20} />
              </Link>
              <a
                href="tel:+265981187766"
                className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full border-2 border-white/20 hover:bg-white hover:text-[#1e3a5f] transition-all inline-flex items-center justify-center"
              >
                Call: +265 981 187 766
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
