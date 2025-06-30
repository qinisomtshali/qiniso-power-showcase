
import React from 'react';
import { ExternalLink, Github, Zap, FileText, Users } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: "HearConnect Leave Request App",
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
      color: "from-blue-500 to-cyan-500"
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
      color: "from-green-500 to-emerald-500"
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
      color: "from-purple-500 to-violet-500"
    }
  ];

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Featured <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real-world business solutions built with the Microsoft Power Platform
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full mt-6"></div>
        </div>

        <div className="space-y-12">
          {projects.map((project, index) => (
            <div key={index} className={`group ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''} flex flex-col lg:flex-row gap-8 items-center`}>
              {/* Project Image */}
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

              {/* Project Content */}
              <div className="lg:w-1/2 space-y-6">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-full bg-gradient-to-r ${project.color} text-white`}>
                    {project.icon}
                  </div>
                  <h3 className="text-3xl font-bold text-gray-800">{project.title}</h3>
                </div>

                <p className="text-lg text-gray-600 leading-relaxed">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className={`px-4 py-2 bg-gradient-to-r ${project.color} text-white rounded-full text-sm font-medium`}>
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Features */}
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

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <button className={`bg-gradient-to-r ${project.color} text-white px-6 py-3 rounded-full hover:shadow-lg transition-all duration-300 flex items-center gap-2`}>
                    View Details
                    <ExternalLink size={16} />
                  </button>
                  <button className="border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-full hover:border-blue-500 hover:text-blue-500 transition-all duration-300 flex items-center gap-2">
                    Case Study
                    <Github size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
