import { motion } from 'framer-motion';

const skills = [
  'JavaScript (ES6+)',
  'TypeScript',
  'React',
  'Node.js',
  'Python',
  'SQL',
  'Git',
  'AWS',
  'Docker',
  'REST APIs',
];

const About = () => {
  return (
    <section className="section-padding">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-textPrimary mb-8">
            <span className="text-secondary">01.</span> About Me
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <p className="text-textSecondary">
                Hello! My name is Abhiraj, and I enjoy creating things that live on the internet. My interest in web development started back in 2012 when I decided to try editing custom Tumblr themes — turns out hacking together a custom reblog button taught me a lot about HTML & CSS!
              </p>
              <p className="text-textSecondary">
                Fast-forward to today, and I've had the privilege of working at an advertising agency, a start-up, a huge corporation, and a student-led design studio. My main focus these days is building accessible, inclusive products and exceptional digital experiences.
              </p>
              <p className="text-textSecondary">
                Here are a few technologies I've been working with recently:
              </p>
            </div>
            
            <div className="relative">
              <div className="w-full h-full min-h-[300px] bg-secondary/10 rounded-lg"></div>
              {/* Add your image here */}
            </div>
          </div>

          <div className="mt-12">
            <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {skills.map((skill, index) => (
                <motion.li
                  key={skill}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-textSecondary flex items-center"
                >
                  <span className="text-secondary mr-2">▹</span>
                  {skill}
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About; 