
import React from 'react';
import { motion } from "framer-motion";

const TechStack = () => {
  const powerPlatform = [
    { name: "Power Apps", level: 90, color: "bg-blue-500" },
    { name: "Power Automate", level: 95, color: "bg-purple-500" },
    { name: "SharePoint", level: 85, color: "bg-green-500" },
    { name: "Dataverse", level: 80, color: "bg-indigo-500" },
    { name: "Dynamics 365", level: 75, color: "bg-orange-500" }
  ];

  const cloudTools = [
    "Microsoft Azure",
    "PowerShell", 
    "Power BI",
    "Office 365",
    "Azure Active Directory"
  ];

  const devTools = [
    "Git & GitHub",
    "Visual Studio Code",
    "Power Platform CLI",
    "Azure DevOps",
    "REST APIs"
  ];

  const creative = [
    "Unity 3D",
    "Blender",
    "Adobe Creative Suite",
    "VR Development",
    "Game Design"
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-indigo-50">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl lg:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
          >
            Tech <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Stack</span>
          </motion.h2>
          <p className="text-xl text-gray-600">
            Technologies and tools I use to build powerful solutions
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full mt-6"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Power Platform Skills */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
              Power Platform Expertise
            </h3>
            <div className="space-y-6">
              {powerPlatform.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-700">{skill.name}</span>
                    <span className="text-sm text-gray-500">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`${skill.color} h-3 rounded-full transition-all duration-1000 ease-out`}
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tool Categories */}
          <div className="space-y-8">
            {/* Cloud & Azure */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                Cloud & Azure
              </h4>
              <div className="flex flex-wrap gap-2">
                {cloudTools.map((tool, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Development Tools */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Development Tools
              </h4>
              <div className="flex flex-wrap gap-2">
                {devTools.map((tool, index) => (
                  <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Creative & Multimedia */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                Creative & Multimedia
              </h4>
              <div className="flex flex-wrap gap-2">
                {creative.map((tool, index) => (
                  <span key={index} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
