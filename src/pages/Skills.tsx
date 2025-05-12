import { motion } from 'framer-motion';
import pythonLogo from '../assets/python.png';
import javaLogo from '../assets/java.png';
import cLogo from '../assets/c.png';
import cppLogo from '../assets/cpp.png';
import html5Logo from '../assets/html5.png';
import css3Logo from '../assets/css3.png';

import reactLogo from '../assets/react.png';
import nodeLogo from '../assets/nodejs.png';
import djangoLogo from '../assets/django.png';

import dockerLogo from '../assets/docker.png';
import kubernetesLogo from '../assets/kubernetes.png';
import microservicesLogo from '../assets/microservice.png';
import cicdLogo from '../assets/CI_CD.png';

import sqlLogo from '../assets/sql.png';
import mongodbLogo from '../assets/mongodb.png';

import githubLogo from '../assets/github.png';
import cloudNativeLogo from '../assets/azure.png';

import communicationLogo from '../assets/communication.png';
import teamworkLogo from '../assets/teamwork.png';
import leadershipLogo from '../assets/leadership.png';

type Skill = {
  name: string;
  icon: string;
  logo?: string;
};

type SkillCategory = {
  category: string;
  skills: Skill[];
};

const skillCategories: SkillCategory[] = [
  {
    category: "Programming Languages",
    skills: [
      { name: "Python", icon: "🐍", logo: pythonLogo },
      { name: "Java", icon: "☕", logo: javaLogo },
      { name: "C", icon: "💾", logo: cLogo },
      { name: "C++", icon: "➕", logo: cppLogo },
      { name: "R", icon: "📊" },
      { name: "Shell Scripting", icon: "📜" },
    ],
  },
  {
    category: "Web Technologies",
    skills: [
      { name: "HTML5", icon: "🌐", logo: html5Logo },
      { name: "CSS3", icon: "🎨", logo: css3Logo },
      { name: "React", icon: "⚛️", logo: reactLogo },
      { name: "Node.js", icon: "🌳", logo: nodeLogo },
      { name: "Django", icon: "🟩", logo: djangoLogo },
      { name: "RESTful APIs", icon: "🔄" },
      // { name: "GraphQL", icon: "◢" },
      // { name: "Responsive Design", icon: "📱" },
    ],
  },
  {
    category: "Databases",
    skills: [
      { name: "SQL", icon: "🗄️", logo: sqlLogo },
      { name: "NoSQL", icon: "🍃" },
      { name: "MongoDB", icon: "🍃", logo: mongodbLogo },
      { name: "PostgreSQL", icon: "🐘" },
      { name: "MySQL", icon: "🐬" },
      // { name: "Redis", icon: "🔴" },
      { name: "Database Design", icon: "📝" },
    ],
  },
  {
    category: "Data Science",
    skills: [
      { name: "Pandas", icon: "🐼" },
      { name: "NumPy", icon: "🔢" },
      { name: "SciPy", icon: "🧪" },
      { name: "PySpark", icon: "⚡" },
      { name: "Jupyter", icon: "📓" },
      { name: "Data Visualization", icon: "📊" },
      { name: "ETL Pipelines", icon: "🔄" },
      { name: "Statistical Analysis", icon: "📈" },
    ],
  },
  {
    category: "Machine Learning",
    skills: [
      { name: "PyTorch", icon: "🔥" },
      { name: "TensorFlow", icon: "📊" },
      { name: "Scikit-learn", icon: "🔍" },
      { name: "Transformers", icon: "🤖" },
      { name: "Hugging Face", icon: "🤗" },
      { name: "Neural Networks", icon: "🧠" },
      { name: "Ensemble Methods", icon: "🌲" },
      { name: "Time Series", icon: "⏱️" },
    ],
  },
  {
    category: "AI & Computer Vision",
    skills: [
      { name: "OpenCV", icon: "👁️" },
      { name: "CNNs", icon: "🔍" },
      { name: "GANs", icon: "🎭" },
      { name: "Object Detection", icon: "🎯" },
      { name: "NLP", icon: "💬" },
      { name: "LLMs", icon: "📝" },
      { name: "Reinforcement Learning", icon: "🎮" },
      { name: "Image Processing", icon: "🖼️" },
    ],
  },
  {
    category: "Cloud & DevOps",
    skills: [
      { name: "Docker", icon: "🐳", logo: dockerLogo },
      { name: "Kubernetes", icon: "☸️", logo: kubernetesLogo },
      { name: "AWS", icon: "☁️" },
      { name: "Azure", icon: "☁️", logo: cloudNativeLogo },
      { name: "Microservices", icon: "🧩", logo: microservicesLogo },
      { name: "CI/CD", icon: "🔁", logo: cicdLogo },
      // { name: "Infrastructure as Code", icon: "📄" },
      // { name: "Monitoring", icon: "📊" },
    ],
  },
  {
    category: "Tools & Collaboration",
    skills: [
      { name: "Git", icon: "📝", logo: githubLogo },
      { name: "GitHub", icon: "🐙", logo: githubLogo },
      { name: "Agile/Scrum", icon: "🔄" },
      { name: "JIRA", icon: "📋" },
      // { name: "Confluence", icon: "📄" },
      // { name: "Project Management", icon: "📅" },
      // { name: "Code Review", icon: "👀" },
      // { name: "Documentation", icon: "📚" },
    ],
  },
  {
    category: "Business Intelligence",
    skills: [
      { name: "Power BI", icon: "📊" },
      { name: "Tableau", icon: "📈" },
      { name: "Power Apps", icon: "⚡" },
      { name: "Microsoft Automate", icon: "🤖" },
      { name: "Excel VBA", icon: "📑" },
      { name: "Data Modeling", icon: "🏗️" },
      // { name: "Dashboard Design", icon: "📊" },
      // { name: "KPI Reporting", icon: "🎯" },
    ],
  },
  {
    category: "Certifications",
    skills: [
      { name: "Google Cert. Scholar", icon: "🎓" },
      { name: "Advanced Excel", icon: "📊" },
      { name: "Web Development", icon: "🌐" },
      // { name: "Cloud Practitioner", icon: "☁️" },
      // { name: "Agile Methodology", icon: "🔄" },
      // { name: "Data Science", icon: "📊" },
      { name: "Machine Learning", icon: "🤖" },
    ],
  },
  {
    category: "Soft Skills",
    skills: [
      { name: "Communication", icon: "💬", logo: communicationLogo },
      { name: "Teamwork", icon: "🤝", logo: teamworkLogo },
      { name: "Leadership", icon: "👥", logo: leadershipLogo },
      // { name: "Problem Solving", icon: "🧩" },
      { name: "Critical Thinking", icon: "🧠" },
      // { name: "Time Management", icon: "⏰" },
      { name: "Adaptability", icon: "🔄" },
      { name: "Creativity", icon: "💡" },
    ],
  },
];

const Skills = () => {
  return (
    <section className="w-full min-h-screen relative bg-gradient-to-b from-white to-pink-50 py-16">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-darkPink/5 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-darkPink/5 to-transparent"></div>
      <div className="absolute right-0 top-1/3 w-32 h-64 bg-gradient-to-l from-darkPink/10 to-transparent rounded-l-full"></div>
      <div className="absolute left-0 top-2/3 w-32 h-64 bg-gradient-to-r from-darkPink/10 to-transparent rounded-r-full"></div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header with visual elements */}
        <div className="mb-16 text-center">
          <div className="inline-block relative">
            <h2 className="text-4xl md:text-5xl font-bold text-darkPink tracking-tight mb-4 relative z-10">
              My Skills
            </h2>
            <div className="absolute -bottom-2 left-0 w-full h-4 bg-darkPink/20 -z-10 skew-x-3 rounded"></div>
          </div>
          <p className="text-darkPink/70 max-w-2xl mx-auto text-center text-lg">
            {/* A comprehensive showcase of my technical expertise and professional capabilities */}
          </p>
        </div>
        
        {/* Skills Grid - Enhanced Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className="h-full"
            >
              <div className="relative bg-white rounded-xl overflow-hidden shadow-[0_5px_15px_rgba(0,0,0,0.05)] h-full border border-darkPink/10 group hover:shadow-[0_10px_25px_rgba(0,0,0,0.08)] transition-all duration-300">
                {/* Category Header with Subtle Gradient */}
                <div className="bg-gradient-to-r from-darkPink/10 to-darkPink/5 p-4 border-b border-darkPink/10">
                  <h3 className="text-xl font-bold text-darkPink">
                    {category.category}
                  </h3>
                </div>
                
                {/* Skills with improved readability */}
                <div className="p-5">
                  <div className="grid grid-cols-3 gap-3">
                    {category.skills.map((skill) => (
                      <motion.div
                        key={`${category.category}-${skill.name}`}
                        whileHover={{ scale: 1.05, backgroundColor: 'rgba(158, 21, 87, 0.08)' }}
                        className="flex flex-col items-center justify-center rounded-lg p-3 border border-gray-100 shadow-sm bg-white hover:border-darkPink/20 transition-all duration-200 aspect-square"
                      >
                        <div className="mb-2 flex items-center justify-center h-10">
                          {skill.logo ? (
                            <img
                              src={skill.logo}
                              alt={skill.name + ' logo'}
                              className="w-8 h-8 object-contain"
                            />
                          ) : (
                            <span className="text-2xl">{skill.icon}</span>
                          )}
                        </div>
                        <span className="text-sm font-medium text-darkPink/90 text-center line-clamp-2">
                          {skill.name}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                {/* Visual indicator for hover state */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-darkPink/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Extra flourish at the bottom */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-darkPink/10 rounded-full px-6 py-2 text-darkPink/70 text-sm font-medium">
            Continuously learning everyday....
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;