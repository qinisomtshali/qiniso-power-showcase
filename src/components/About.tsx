import React from 'react';
import { motion } from "framer-motion";
import { MapPin, Award, Heart, Lightbulb } from 'lucide-react';

const About = () => {
  const highlights = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Based in Johannesburg",
      description: "Working with global standards and local insights"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Microsoft Certified",
      description: "PL-400, PL-200, AZ-900, MB-210 certified professional"
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Multimedia Background",
      description: "Creative edge from game dev, VR design, and multimedia"
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: "Innovation Focus",
      description: "Passionate about automation and accessible design"
    }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-6 max-w-6xl">

        {/* Section Title */}
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl lg:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
          >
            About <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Me</span>
          </motion.h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left: Text & Focus Areas */}
          <div className="space-y-6">
            <motion.p
              className="text-lg text-gray-600 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6 }}
            >
              I'm a passionate Power Platform Developer with a unique blend of technical expertise 
              and creative vision. My journey spans from multimedia engineering to low-code development, 
              giving me a distinctive perspective on building user-centric business solutions.
            </motion.p>

            <motion.p
              className="text-lg text-gray-600 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              I specialize in the Microsoft Power Platform ecosystem, creating automated workflows, 
              intuitive applications, and integrated solutions that transform how businesses operate. 
              My background in VR development and game design brings an innovative approach to 
              traditional business challenges.
            </motion.p>

            <motion.div
              className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Core Focus Areas</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Power Platform (Power Apps, Automate, D365, SharePoint, Dataverse)</li>
                <li>• Business process automation and improvement</li>
                <li>• Accessible design and user experience</li>
                <li>• Integration and workflow optimization</li>
              </ul>
            </motion.div>
          </div>

          {/* Right: Highlight Cards with Border Glow */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.2 }
              }
            }}
          >
            {highlights.map((item, index) => (
              <motion.div
                key={index}
                className="relative group p-[2px] rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="bg-white rounded-2xl p-6 w-full h-full relative z-10">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="text-blue-600 mb-4"
                  >
                    {item.icon}
                  </motion.div>
                  <h4 className="font-semibold text-gray-800 mb-2">{item.title}</h4>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;
