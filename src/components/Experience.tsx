
import React from 'react';
import { Calendar, MapPin, Building, ChevronRight } from 'lucide-react';

const Experience = () => {
  const experiences = [
    {
      title: "Power Platform Developer Intern",
      company: "Afrika Tikkun / Mecer Inter-Ed",
      location: "South Africa",
      period: "2023 - Present",
      type: "Internship",
      description: "Developing automated business solutions using Microsoft Power Platform, creating workflows, and building custom applications for organizational efficiency.",
      achievements: [
        "Built HearConnect leave management application",
        "Automated document processing workflows",
        "Implemented role-based access control systems",
        "Reduced manual processing time by 60%"
      ],
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Multimedia Engineer Intern", 
      company: "Mbula R&D",
      location: "South Africa",
      period: "2022 - 2023",
      type: "Internship",
      description: "Worked on multimedia projects, web development, and creative technology solutions combining technical skills with creative vision.",
      achievements: [
        "Developed interactive multimedia applications",
        "Created responsive web interfaces",
        "Collaborated on creative technology projects",
        "Enhanced user experience design skills"
      ],
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Virtual Reality Developer",
      company: "Go4IR",
      location: "South Africa", 
      period: "2021 - 2022",
      type: "Contract",
      description: "Specialized in VR application development, focusing on educational content and immersive experiences for hearing-impaired learners.",
      achievements: [
        "Developed VR applications for deaf learners",
        "Integrated sign language recognition",
        "Built Unity-based educational games",
        "Implemented Azure cloud integration"
      ],
      color: "from-purple-500 to-violet-500"
    },
    {
      title: "Machine Operator",
      company: "Ford South Africa",
      location: "South Africa",
      period: "2019 - 2021", 
      type: "Full-time",
      description: "Operated manufacturing equipment and gained valuable experience in industrial processes and quality control systems.",
      achievements: [
        "Maintained high quality standards",
        "Optimized production processes",
        "Contributed to safety initiatives",
        "Developed process improvement ideas"
      ],
      color: "from-orange-500 to-red-500"
    },
    {
      title: "Lab Tutor",
      company: "Tshwane University of Technology (TUT)",
      location: "South Africa",
      period: "2018 - 2019",
      type: "Part-time",
      description: "Assisted students with computer science and multimedia coursework, providing guidance and technical support.",
      achievements: [
        "Mentored 50+ students per semester",
        "Assisted with programming assignments",
        "Conducted lab sessions and tutorials",
        "Improved student success rates"
      ],
      color: "from-indigo-500 to-blue-500"
    }
  ];

  return (
    <section id="experience" className="py-20 bg-white">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Professional <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Experience</span>
          </h2>
          <p className="text-xl text-gray-600">
            My journey from manufacturing to cutting-edge technology
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full mt-6"></div>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-blue-500 to-purple-500"></div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                {/* Timeline Dot */}
                <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-4 border-blue-500 rounded-full z-10"></div>

                {/* Content Card */}
                <div className={`ml-12 md:ml-0 ${index % 2 === 0 ? 'md:mr-8 md:ml-0' : 'md:ml-8 md:mr-0'} md:w-5/12`}>
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                    <div className={`h-1 bg-gradient-to-r ${exp.color}`}></div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <span className={`px-3 py-1 bg-gradient-to-r ${exp.color} text-white text-xs font-semibold rounded-full`}>
                          {exp.type}
                        </span>
                        <div className="flex items-center text-gray-500 text-sm">
                          <Calendar size={14} className="mr-1" />
                          {exp.period}
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-gray-800 mb-2">{exp.title}</h3>
                      
                      <div className="flex items-center text-blue-600 font-semibold mb-2">
                        <Building size={16} className="mr-2" />
                        {exp.company}
                      </div>

                      <div className="flex items-center text-gray-500 mb-4">
                        <MapPin size={16} className="mr-2" />
                        {exp.location}
                      </div>

                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {exp.description}
                      </p>

                      <div className="space-y-2">
                        <h4 className="font-semibold text-gray-800">Key Achievements:</h4>
                        <ul className="space-y-1">
                          {exp.achievements.map((achievement, achIndex) => (
                            <li key={achIndex} className="flex items-start text-gray-600 text-sm">
                              <ChevronRight size={14} className="mr-2 mt-0.5 text-blue-500 flex-shrink-0" />
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
