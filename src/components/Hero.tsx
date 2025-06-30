
import React from 'react';
import { motion } from "framer-motion";
import { ArrowRight, Code, Zap } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                Hi, I'm{' '}
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Qiniso Mtshali
                </span>
              </h1>
              <h2 className="text-2xl lg:text-3xl font-semibold text-gray-800">
                Power Platform Developer
              </h2>
            </div>

            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
              I build low-code business solutions using Power Apps, Power Automate, 
              SharePoint, and Dataverse — with a creative edge from my multimedia background.
            </p>

           <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => {
                const el = document.getElementById("projects");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 text-lg font-semibold"
            >
              View Projects
              <ArrowRight size={20} />
            </button>

            <button
              onClick={() => {
                const el = document.getElementById("contact");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full hover:border-blue-600 hover:text-blue-600 transition-all duration-300 flex items-center justify-center gap-2 text-lg font-semibold"
            >
              Contact Me
            </button>
          </div>


           {/* Stats */}
            <motion.div
              className="flex gap-8 pt-8 border-t border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {[
                { value: "4+", label: "Certifications", color: "text-blue-600" },
                { value: "10+", label: "Projects", color: "text-purple-600" },
                { value: "2+", label: "Years Experience", color: "text-indigo-600" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 * index, duration: 0.6 }}
                >
                  <div className={`text-3xl font-bold ${stat.color}`}>{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Profile Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="w-80 h-80 bg-gradient-to-br from-blue-400 via-purple-500 to-indigo-600 rounded-full p-1 animate-pulse">
                <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                  <div className="w-72 h-72 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                    <img
                      src="/my-photo.jpg"
                      alt="Qiniso Mtshali"
                      className="w-72 h-72 object-cover rounded-full"
                    />
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg">
                <Code size={24} />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-purple-500 text-white p-3 rounded-full shadow-lg">
                <Zap size={24} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
