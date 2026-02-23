import { motion } from "motion/react";
import { Target, Users, Award, Lightbulb, Heart, Globe } from "lucide-react";

export function AboutPage() {
  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description: "To provide Malawi with world-class internet connectivity that empowers individuals, businesses, and communities to thrive in the digital age.",
    },
    {
      icon: Users,
      title: "Customer First",
      description: "Every decision we make prioritizes our customers' needs, ensuring exceptional service and support at every touchpoint.",
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We maintain the highest standards in network infrastructure, customer service, and technical support.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Continuously evolving our technology and services to meet the changing needs of modern connectivity.",
    },
    {
      icon: Heart,
      title: "Community",
      description: "Committed to bridging the digital divide and connecting all corners of Malawi to the global community.",
    },
    {
      icon: Globe,
      title: "Reliability",
      description: "Building a robust network infrastructure that ensures consistent, high-quality internet access 24/7.",
    },
  ];

  const timeline = [
    {
      year: "Founded",
      title: "The Beginning",
      description: "CTN was established with a vision to transform internet connectivity across Malawi.",
    },
    {
      year: "Growth",
      title: "Expanding Network",
      description: "Rapid expansion of our fiber-optic network infrastructure across major cities.",
    },
    {
      year: "Innovation",
      title: "Leading Technology",
      description: "Introduced speeds up to 300Mbps with unlimited data packages.",
    },
    {
      year: "Today",
      title: "Connecting Malawi",
      description: "Serving thousands of satisfied customers with reliable, high-speed internet.",
    },
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-[#1e3a5f] to-[#2d4a6f] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23a4d65e' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v6h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-white mb-6">About CTN</h1>
            <p className="text-white/80 text-xl max-w-3xl mx-auto">
              Converged Technology Networks is Malawi's leading internet service provider,
              dedicated to delivering exceptional connectivity solutions that transform how
              people live, work, and connect.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-[#1e3a5f] mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                CTN was born from a simple belief: every person in Malawi deserves access
                to fast, reliable, and affordable internet. What started as a vision has
                grown into a mission that drives everything we do.
              </p>
              <p className="text-gray-600 mb-4">
                We've invested heavily in modern fiber-optic infrastructure, bringing
                world-class internet speeds to homes, businesses, and institutions across
                the country. Our commitment to unlimited data means you never have to worry
                about caps or throttling.
              </p>
              <p className="text-gray-600">
                Today, we're proud to serve thousands of customers who trust us to keep
                them connected to what matters most - whether it's education, business,
                entertainment, or staying in touch with loved ones.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1758519291531-e96279895745?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwb2ZmaWNlJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjM2Mjk5MDJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="CTN Office"
                  className="w-full h-[500px] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-[#a4d65e] rounded-full blur-3xl opacity-20" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-[#1e3a5f] mb-4">Our Values</h2>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto">
              The principles that guide everything we do at CTN.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all group border border-gray-100"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-[#a4d65e] to-[#8bc34a] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <IconComponent className="text-white" size={32} />
                  </div>
                  <h3 className="text-[#1e3a5f] mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-[#1e3a5f] mb-4">Our Journey</h2>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto">
              From humble beginnings to connecting thousands across Malawi.
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#a4d65e] to-[#8bc34a] hidden md:block" />

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  } flex-col`}
                >
                  <div className={`md:w-1/2 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                    <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl shadow-lg border border-gray-100">
                      <div className="text-[#a4d65e] mb-2">{item.year}</div>
                      <h3 className="text-[#1e3a5f] mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>

                  <div className="w-16 h-16 bg-gradient-to-br from-[#a4d65e] to-[#8bc34a] rounded-full flex items-center justify-center shadow-xl my-4 md:my-0 z-10">
                    <div className="w-8 h-8 bg-white rounded-full" />
                  </div>

                  <div className="md:w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gradient-to-br from-[#1e3a5f] to-[#2d4a6f] relative overflow-hidden">
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
            className="text-center"
          >
            <h2 className="text-white mb-6">Built by Experts, Powered by Passion</h2>
            <p className="text-white/80 text-xl max-w-3xl mx-auto mb-12">
              Our team of dedicated professionals works around the clock to ensure you
              have the best internet experience possible. From our engineers to our
              support staff, everyone at CTN is committed to your connectivity.
            </p>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
                <div className="text-5xl text-[#a4d65e] mb-2">50+</div>
                <div className="text-white">Team Members</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
                <div className="text-5xl text-[#a4d65e] mb-2">5000+</div>
                <div className="text-white">Happy Customers</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
                <div className="text-5xl text-[#a4d65e] mb-2">24/7</div>
                <div className="text-white">Support Available</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
