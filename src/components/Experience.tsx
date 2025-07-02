import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Building, ChevronRight } from 'lucide-react';

const Experience = () => {
  const experiences = [
    {
      title: "Power Platform Developer Intern",
      company: "HearConnect",
      location: "South Africa",
      period: "MAR 2025 – Present",
      type: "Internship",
      description:
        "Building end-to-end business solutions using Power Apps, Power Automate, and SharePoint. Enhancing leave management and approval systems, integrating Microsoft services, and supporting digital transformation within the organization.",
      achievements: [
        "Built HearConnect leave management application",
        "Automated document processing workflows",
        "Implemented role-based access control systems",
        "Reduced manual processing time by 60%"
      ],
      logo: "hearconnect.png",
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Power Platform Developer Trainee",
      company: "Mecer Inter-Ed",
      location: "South Africa",
      period: "JUL 2024 – DEC 2025",
      type: "Training",
      description:
        "Completed structured Microsoft PL-200, PL-400, MB-210 training. Built end-to-end low-code solutions using Power Apps, Dataverse, and Dynamics 365.",
      achievements: [
        "Completed Microsoft PL-200, PL-400, MB-210 certifications",
        "Developed custom business apps with Dataverse",
        "Built sales automation flows using Dynamics 365",
        "Gained hands-on experience with Power Platform architecture"
      ],
      logo: "mecer.png",
      color: "from-purple-500 to-violet-500"
    },
    {
      title: "Machine Operator",
      company: "Ford Motor Company of Southern Africa",
      location: "South Africa",
      period: "FEB 2023 – JAN 2024",
      type: "Full-time",
      description:
        "Gained hands-on experience in the automotive manufacturing sector, operating industrial machinery with precision and adhering to strict quality and safety protocols. Contributed to streamlined production workflows and efficient reporting systems.",
      achievements: [
        "Maintained high quality standards",
        "Optimized production processes",
        "Contributed to safety initiatives",
        "Developed process improvement ideas"
      ],
      logo: "ford.png",
      color: "from-orange-500 to-red-500"
    },
    {
      title: "Multimedia Engineer Intern",
      company: "Mbula RND",
      location: "South Africa",
      period: "JUN 2022 – DEC 2022",
      type: "Internship",
      description:
        "Designed and developed an inclusive video game for the deaf community using Unity, C#, and Azure. Integrated multimedia elements and game mechanics to improve accessibility and promote digital inclusion.",
      achievements: [
        "Designed accessible video game using Unity and C#",
        "Integrated Azure cloud services",
        "Promoted inclusion for the deaf community",
        "Worked across multimedia teams for UX improvements"
      ],
      logo: "mbula.png",
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Technical Lab Tutor",
      company: "Tshwane University of Technology",
      location: "South Africa",
      period: "MAR 2021 – MAY 2022",
      type: "Part-time",
      description:
        "Provided academic support in multimedia computing labs, mentoring students and facilitating practical sessions in animation, coding, and digital design. Developed strong foundations in education and technical communication.",
      achievements: [
        "Mentored 50+ students per semester",
        "Assisted with programming assignments",
        "Conducted lab sessions and tutorials",
        "Improved student success rates"
      ],
      logo: "tut.png",
      color: "from-indigo-500 to-blue-500"
    },
    {
      title: "VR Developer",
      company: "Go4IR",
      location: "South Africa",
      period: "JAN 2020 – MAR 2021",
      type: "Contract",
      description:
        "Created interactive virtual reality experiences using Unity3D and Blender. Contributed to educational tools using multimedia pipelines.",
      achievements: [
        "Developed VR applications for deaf learners",
        "Integrated sign language recognition",
        "Built Unity-based educational games",
        "Implemented Azure cloud integration"
      ],
      logo: "vr.png",
      color: "from-pink-500 to-red-400"
    }
  ];

  return (
    <section id="experience" className="py-20 bg-white">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl lg:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
          >
            Professional <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Experience</span>
          </motion.h2>
          <p className="text-xl text-gray-600">
            A journey of continuous learning and delivering impactful solutions
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full mt-6"></div>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-blue-500 to-purple-500"></div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {/* Timeline Dot with Pulse */}
                <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-white border-4 border-blue-500 z-10 flex items-center justify-center overflow-hidden animate-pulse">
                  <img src={`/Images/logos/${exp.logo}`} alt={exp.company} className="w-6 h-6 object-contain" />
                </div>

                {/* Card */}
                <motion.div
                  className={`ml-12 md:ml-0 ${index % 2 === 0 ? 'md:mr-8 md:ml-0' : 'md:ml-8 md:mr-0'} md:w-5/12`}
                  whileHover={{ y: -8 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <motion.div
                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl overflow-hidden border border-gray-100 group transition-all duration-300"
                    initial="rest"
                    animate="rest"
                    whileHover="hover"
                  >
                    {/* Animated Top Border */}
                    <motion.div
                      className={`h-1 bg-gradient-to-r ${exp.color}`}
                      variants={{
                        rest: { scaleX: 0 },
                        hover: { scaleX: 1 }
                      }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                      style={{ transformOrigin: 'center' }}
                    />

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
                      <p className="text-gray-600 mb-4 leading-relaxed">{exp.description}</p>

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
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
