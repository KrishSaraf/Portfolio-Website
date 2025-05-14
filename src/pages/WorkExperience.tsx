import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Import company logos (assuming they are in the public/logos directory)
// You'll need to add these logo files to your project
const experiences = [
  {
    company: "United Overseas Bank Singapore",
    position: "Group Wholesale Banking and Global Markets Technology Intern",
    duration: "May 2025 - Present",
    description: "Spearheaded a digital overhaul of Global Markets workflows, building a Python-Tesseract OCR pipeline that extracts key trade document fields & feeds the output into Power Automate - eliminating errors by 90%. Digitized intraday cash-position reporting by streaming SWIFT MT940 files into a Python + Kafka pipeline feeding an in-house Dashboard, improving liquidity visibility from T+1 to T+0 and cutting manual spreadsheet work by 50%.",
    technologies: ["Python", "OCR", "Tesseract", "Power Automate", "SWIFT", "Kafka"],
    logo: "/logos/uob-logo.png",
  },
  {
    company: "Keppel Limited",
    position: "Data Science Intern",
    duration: "May 2024 - Aug 2024",
    description: "Created an ensemble VAR & LSTM driven time-series forecasting model to predict pan-India hyperscale data-center demand. Enhanced MSPE by 45% versus ARIMA baseline, enabling agile land-banking decisions months ahead of competitors. Built a multilingual NLP pipeline with Lang Chain, Azure DevOps and created its Fast API endpoint to automate language detection and conduct large scale PDF translation, processing at 97% accuracy. Collaborated with EY on 'Alpha AI', a RAG-based engine using OpenAI embeddings and a vector database that creates investment memos on EPT- improving production speed by 80%.",
    technologies: ["Python", "VAR", "LSTM", "Time-series forecasting", "NLP", "Azure", "OpenAI"],
    logo: "/logos/keppel-logo.png",
  },
  {
    company: "BASF Singapore",
    position: "AI Sales Automation Project Lead",
    duration: "Jan 2024 - Apr 2024",
    description: "Engineered 'Get my Lead+', an AI agent to scrape LinkedIn, ACRA & global registries alongside Gemini API to find New Leads with detailed research on company finances & demographic data- eliminating 90% of manual research effort. Integrated with Salesforce & optimized Random Forest lead-scoring by combining historical deal data with real-time scraped metrics which boosted qualified lead capture and prioritization, raising overall sales-conversion rate by 20%. Added personalized email automation that tailor's outreach to prospects, overall boosting lead identification & client conversion time from weeks to days & boosting pipeline for regional sales teams struggling to uncover new accounts.",
    technologies: ["AI", "Salesforce", "Random Forest", "Lead Scoring", "Automation"],
    logo: "/logos/basf-logo.png",
  },
  {
    company: "First Abu Dhabi Bank Singapore",
    position: "Data Analyst, CEO Office",
    duration: "May 2023 - Jul 2023",
    description: "Automated monthly KYC reporting to MAS with large data sets using 66k lines of Excel VBA scripts, reducing processing time from 6 hours to 14 minutes. Established a Data Governance Framework for the Data Analytics Global Team, improving data accuracy and compliance. Led Southeast Asia emerging market research, uncovering three high-growth regions for potential bank expansion. Developed an Algorithm to automate ETL workflows that consolidate datasets from multiple databases into a master Excel book & trigger real-time updates to Power BI reports - eliminating one full day of manual processing each month.",
    technologies: ["Excel VBA", "Data Governance", "ETL", "Power BI"],
    logo: "/logos/fab-logo.png",
  },
  {
    company: "Tech Exactly",
    position: "Software Engineering Intern",
    duration: "Jan 2022 - Feb 2023",
    description: "Analyzed customer feedback and project data, performed competitor pricing analytics, and developed a dynamic pricing formula. Developed and deployed a web app on Vercel using Flask & MongoDB for efficient data storage. Integrated ChatGPT-powered NLP to transform intake questionnaires into detailed client-requirement documents. Leveraged XGBoost model on historical pricing data to auto-generate quotes for clients, increased profit margins by 15% and reducing onboarding time by 60%.",
    technologies: ["Python", "Flask", "MongoDB", "NLP", "XGBoost", "Vercel"],
    logo: "/logos/techexactly-logo.png",
  },
  {
    company: "Think Design Make Pte Ltd. Singapore",
    position: "Business Operations Automation Intern",
    duration: "Dec 2022",
    description: "Single-handedly designed and automated pipeline for invoice generation and P&L creation, reducing man-hours by 60%. Led competitor analysis to develop pricing strategies, driving 15% revenue growth.",
    technologies: ["Automation", "Financial Analysis", "Process Optimization"],
    logo: "/logos/tdm-logo.png",
  },
];

const WorkExperience = () => {
  const [selectedExp, setSelectedExp] = useState<number | null>(null);

  const Modal = ({ isOpen, onClose, experience }: { isOpen: boolean; onClose: () => void; experience: typeof experiences[0] | null }) => {
    if (!isOpen || !experience) return null;

    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto relative"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-darkPink hover:text-darkPink/80 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="space-y-6">
              {/* Header Section with Logo */}
              <div className="border-b border-darkPink/10 pb-6 flex items-center gap-6">
                {experience.logo && (
                  <div className="flex-shrink-0 bg-white rounded-lg shadow-md p-3 border-2 border-darkPink/10 w-28 h-28 flex items-center justify-center">
                    <img 
                      src={experience.logo} 
                      alt={`${experience.company} logo`} 
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                )}
                <div>
                  <h3 className="text-2xl font-bold text-darkPink mb-2">{experience.position}</h3>
                  <div className="flex flex-col space-y-1">
                    <span className="text-darkPink/80 font-semibold text-lg">{experience.company}</span>
                    <span className="text-darkPink/60 text-base">{experience.duration}</span>
                  </div>
                </div>
              </div>

              {/* Description Section */}
              {experience.description && (
                <div className="space-y-2">
                  <h4 className="text-darkPink font-semibold text-lg">Description</h4>
                  <ul className="list-none space-y-3">
                    {experience.description
                      .split('.')
                      .filter(sentence => sentence.trim().length > 0)
                      .map((sentence, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-darkPink mr-2">•</span>
                          <span className="text-darkPink/70 leading-relaxed text-base">
                            {sentence.trim()}.
                          </span>
                        </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Technologies Section */}
              {experience.technologies && experience.technologies.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-darkPink font-semibold text-lg">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {experience.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-sm text-darkPink bg-darkPink/10 px-3 py-1 rounded-full font-medium shadow-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <section className="w-full min-h-screen section-padding overflow-hidden bg-darkPink/5 relative">
      {/* Blurred background shapes - these are direct children of section */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-darkPink/10 rounded-full filter blur-3xl z-0" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-darkPink/10 rounded-full filter blur-3xl z-0" />
      {/* Content container */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-extrabold text-darkPink mb-16 text-center tracking-tight">
            Work Experience
          </h2>

          <div className="relative grid grid-cols-1 md:grid-cols-12 gap-y-24 w-full">
            {/* Timeline vertical line */}
            <div className="hidden md:block absolute left-1/2 top-0 h-full w-2 bg-darkPink -translate-x-1/2 z-0" />
            {experiences.map((exp, index) => {
              const isLeft = index % 2 === 0;
              return (
                <React.Fragment key={exp.company + exp.position + exp.duration}>
                  {/* Left card */}
                  {isLeft && (
                    <div className="md:col-span-5 md:col-start-1 flex justify-end relative group">
                      {/* Logo positioned outside the card - left side */}
                      {exp.logo && (
                        <div className="absolute right-[-100px] top-8 z-30 bg-white rounded-lg shadow-xl p-3 flex-shrink-0 w-28 h-28 flex items-center justify-center border-2 border-darkPink/10 hover:border-darkPink/30 transition-all duration-300 transform group-hover:scale-105">
                          <img 
                            src={exp.logo} 
                            alt={`${exp.company} logo`} 
                            className="max-w-full max-h-full object-contain"
                          />
                        </div>
                      )}
                      
                      <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="w-full max-w-[665px] bg-white/80 backdrop-blur-md shadow-2xl rounded-2xl p-8 border-l-8 border-darkPink/60 text-left relative transition-all duration-300 hover:shadow-3xl hover:-translate-y-2">
                        {/* Dot absolutely centered to card */}
                        <div className="hidden md:block absolute top-1/2 right-[-128px] w-8 h-8 flex items-center justify-center -translate-y-1/2 z-20">
                          <div className="w-5 h-5 rounded-full bg-darkPink shadow-lg ring-4 ring-darkPink/10 group-hover:ring-darkPink/30 transition-all duration-300" />
                        </div>
                        
                        {/* Job details without logo */}
                        <div className="flex flex-col mb-4">
                          <h3 className="text-lg font-bold text-darkPink mb-2 tracking-tight">
                            {exp.position}
                          </h3>
                          <div className="flex flex-col mb-3">
                            <span className="text-darkPink/80 font-semibold text-base">{exp.company}</span>
                            <span className="text-darkPink/60 text-sm">{exp.duration}</span>
                          </div>
                        </div>

                        {/* Technologies pills */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {exp.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="text-xs md:text-sm text-darkPink bg-darkPink/10 px-3 py-1 rounded-full font-medium shadow-sm"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                        
                        {/* View details button */}
                        {exp.description && (
                          <button
                            onClick={() => setSelectedExp(index)}
                            className="group relative inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-darkPink bg-darkPink/5 rounded-lg transition-all duration-300 hover:bg-darkPink/10 hover:shadow-md hover:-translate-y-0.5"
                          >
                            <span>View Details</span>
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" 
                              fill="none" 
                              viewBox="0 0 24 24" 
                              stroke="currentColor"
                            >
                              <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M9 5l7 7-7 7" 
                              />
                            </svg>
                          </button>
                        )}
                      </motion.div>
                    </div>
                  )}
                  {/* Timeline dot for mobile */}
                  <div className="md:col-span-2 flex flex-col items-center md:justify-center relative">
                    <div className="md:hidden w-6 h-6 rounded-full bg-darkPink border-4 border-white shadow-lg z-10 mb-2" />
                  </div>
                  {/* Right card */}
                  {!isLeft && (
                    <div className="md:col-span-7 md:col-start-8 flex justify-start relative group">
                      {/* Logo positioned outside the card - right side */}
                      {exp.logo && (
                        <div className="absolute left-[-100px] top-8 z-30 bg-white rounded-lg shadow-xl p-3 flex-shrink-0 w-28 h-28 flex items-center justify-center border-2 border-darkPink/10 hover:border-darkPink/30 transition-all duration-300 transform group-hover:scale-105">
                          <img 
                            src={exp.logo} 
                            alt={`${exp.company} logo`} 
                            className="max-w-full max-h-full object-contain"
                          />
                        </div>
                      )}
                      
                      <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="w-full max-w-[545px] bg-white/80 backdrop-blur-md shadow-2xl rounded-2xl p-8 border-r-8 border-darkPink/60 text-left relative transition-all duration-300 hover:shadow-3xl hover:-translate-y-2"
                      >
                        {/* Dot absolutely centered to card */}
                        <div className="hidden md:block absolute top-1/2 left-[-117px] w-8 h-8 flex items-center justify-center -translate-y-1/2 z-20">
                          <div className="w-5 h-5 rounded-full bg-darkPink shadow-lg ring-4 ring-darkPink/10 group-hover:ring-darkPink/30 transition-all duration-300" />
                        </div>
                        
                        {/* Job details without logo */}
                        <div className="flex flex-col mb-4">
                          <h3 className="text-lg font-bold text-darkPink mb-2 tracking-tight">
                            {exp.position}
                          </h3>
                          <div className="flex flex-col mb-3">
                            <span className="text-darkPink/80 font-semibold text-base">{exp.company}</span>
                            <span className="text-darkPink/60 text-sm">{exp.duration}</span>
                          </div>
                        </div>

                        {/* Technologies pills */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {exp.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="text-xs md:text-sm text-darkPink bg-darkPink/10 px-3 py-1 rounded-full font-medium shadow-sm"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                        
                        {/* View details button */}
                        {exp.description && (
                          <button
                            onClick={() => setSelectedExp(index)}
                            className="group relative inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-darkPink bg-darkPink/5 rounded-lg transition-all duration-300 hover:bg-darkPink/10 hover:shadow-md hover:-translate-y-0.5"
                          >
                            <span>View Details</span>
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" 
                              fill="none" 
                              viewBox="0 0 24 24" 
                              stroke="currentColor"
                            >
                              <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M9 5l7 7-7 7" 
                              />
                            </svg>
                          </button>
                        )}
                      </motion.div>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </motion.div>
      </div>
      <Modal
        isOpen={selectedExp !== null}
        onClose={() => setSelectedExp(null)}
        experience={selectedExp !== null ? experiences[selectedExp] : null}
      />
    </section>
  );
};

export default WorkExperience; 