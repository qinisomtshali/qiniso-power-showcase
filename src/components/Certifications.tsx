
import React from 'react';
import { Award, ExternalLink } from 'lucide-react';

const Certifications = () => {
  const certifications = [
    {
      name: "PL-400: Power Platform Developer",
      issuer: "Microsoft",
      date: "2024",
      color: "from-blue-500 to-blue-600",
      description: "Advanced development capabilities in Power Platform"
    },
    {
      name: "PL-200: Power Platform Functional Consultant",
      issuer: "Microsoft", 
      date: "2024",
      color: "from-green-500 to-green-600",
      description: "Business process consulting and solution design"
    },
    {
      name: "MB-210: Dynamics 365 Sales",
      issuer: "Microsoft",
      date: "2024", 
      color: "from-purple-500 to-purple-600",
      description: "Sales automation and customer relationship management"
    },
    {
      name: "AZ-900: Azure Fundamentals",
      issuer: "Microsoft",
      date: "2023",
      color: "from-orange-500 to-orange-600", 
      description: "Cloud computing fundamentals and Azure services"
    }
  ];

  const additionalCerts = [
    "Kubernetes Fundamentals",
    "DevOps Principles", 
    "Alison Certified Courses"
  ];

  return (
    <section id="certifications" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Professional <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Certifications</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Validated expertise in Microsoft technologies and cloud platforms
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full mt-6"></div>
        </div>

        {/* Main Certifications */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
          {certifications.map((cert, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
              <div className={`h-2 bg-gradient-to-r ${cert.color}`}></div>
              <div className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-full bg-gradient-to-r ${cert.color} text-white`}>
                    <Award size={24} />
                  </div>
                  <span className="text-sm text-gray-500 font-medium">{cert.date}</span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                  {cert.name}
                </h3>
                
                <p className="text-blue-600 font-semibold mb-3">{cert.issuer}</p>
                
                <p className="text-gray-600 mb-4">{cert.description}</p>
                
                <button className="flex items-center gap-2 text-blue-600 hover:text-purple-600 transition-colors font-medium">
                  View Certificate
                  <ExternalLink size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Certifications */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Additional Certifications & Training
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {additionalCerts.map((cert, index) => (
              <span key={index} className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm font-medium hover:from-blue-100 hover:to-purple-100 hover:text-blue-700 transition-all duration-300">
                {cert}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
