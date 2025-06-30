import React, { useState } from 'react';

import { motion, AnimatePresence } from "framer-motion";

import { ExternalLink, Github, Zap, FileText, Users, X } from 'lucide-react';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      title: "HR Leave Request Management App",
      description: "Comprehensive leave management system with role-based access, automated approval workflows, sick note validation, and detailed logging capabilities.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
      technologies: ["Power Apps", "SharePoint", "Power Automate", "Dataverse"],
      features: [
        "Role-based access control",
        "Automated approval workflows", 
        "Sick note logic validation",
        "Comprehensive audit logging"
      ],
      icon: <Users className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-500",
      caseStudyUrl: "https://github.com/qinisomtshali/Leave-Request-App"
    },
    {
      title: "Payment QA Flow",
      description: "Automated document processing system that tags SharePoint files with metadata and tracks approval status for real-world QA processes.",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop",
      technologies: ["Power Automate", "SharePoint", "Power Apps", "Office 365"],
      features: [
        "Automatic metadata tagging",
        "Approval status tracking",
        "Document classification",
        "Integration with existing workflows"
      ],
      icon: <FileText className="w-6 h-6" />,
      color: "from-green-500 to-emerald-500",
      caseStudyUrl: "https://github.com/qinisomtshali/Leave-Request-App"
    },
    {
      title: "D365 Sales App Extensions",
      description: "Custom workflows and forms built on Dynamics 365 for enhanced client tracking, automated onboarding processes, and sales pipeline management.",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop",
      technologies: ["Dynamics 365", "Power Platform", "Power Automate", "Power Apps"],
      features: [
        "Custom client onboarding",
        "Automated workflow triggers",
        "Enhanced tracking capabilities", 
        "Sales pipeline optimization"
      ],
      icon: <Zap className="w-6 h-6" />,
      color: "from-purple-500 to-violet-500",
      caseStudyUrl: "https://github.com/qinisomtshali/Leave-Request-App"
    }
  ];

  return (
    <section id="projects" className="py-20 bg-white relative">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl lg:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
          >
            Featured <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Projects</span>
          </motion.h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real-world business solutions built with the Microsoft Power Platform
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full mt-6"></div>
        </div>

        <div className="space-y-12">
          {projects.map((project, index) => (
            <div key={index} className={`group ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''} flex flex-col lg:flex-row gap-8 items-center`}>
              <div className="lg:w-1/2">
                <div className="relative overflow-hidden rounded-2xl shadow-2xl group-hover:shadow-3xl transition-all duration-500">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              </div>

              <div className="lg:w-1/2 space-y-6">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-full bg-gradient-to-r ${project.color} text-white`}>
                    {project.icon}
                  </div>
                  <h3 className="text-3xl font-bold text-gray-800">{project.title}</h3>
                </div>

                <p className="text-lg text-gray-600 leading-relaxed">{project.description}</p>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className={`px-4 py-2 bg-gradient-to-r ${project.color} text-white rounded-full text-sm font-medium`}>
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="bg-gray-50 p-6 rounded-xl">
                  <h4 className="font-semibold text-gray-800 mb-3">Key Features:</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {project.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2 text-gray-600">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className={`bg-gradient-to-r ${project.color} text-white px-6 py-3 rounded-full hover:shadow-lg transition-all duration-300 flex items-center gap-2`}
                  >
                    View Details
                    <ExternalLink size={16} />
                  </button>
                  <a
                    href={project.caseStudyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-full hover:border-blue-500 hover:text-blue-500 transition-all duration-300 flex items-center gap-2"
                  >
                    Case Study
                    <Github size={16} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedProject && (
       <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white max-w-2xl w-full rounded-2xl shadow-2xl p-6 relative"
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition"
              >
                <X size={24} />
              </button>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">{selectedProject.title}</h3>
              <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-64 object-cover rounded-xl mb-4" />
              <p className="text-gray-700 mb-4">{selectedProject.description}</p>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Key Features</h4>
              <ul className="list-disc list-inside text-gray-600 space-y-1 mb-4">
                {selectedProject.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2">
                {selectedProject.technologies.map((tech, techIndex) => (
                  <span key={techIndex} className={`px-4 py-2 bg-gradient-to-r ${selectedProject.color} text-white rounded-full text-sm font-medium`}>
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      )}
    </section>
  );
};

export default Projects;
