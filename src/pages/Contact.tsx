import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { FaGithub, FaLinkedin, FaEnvelope, FaMapMarkerAlt, FaCalendarAlt, FaClock } from 'react-icons/fa';

/*
 * EMAILJS SETUP INSTRUCTIONS:
 * 
 * You need to complete these quick steps to make the contact form work:
 * 
 * 1. Go to https://dashboard.emailjs.com/sign-up and log in with your account
 * 2. Click on "Add New Service" and select Gmail or another provider
 *    - Follow the steps to connect your email
 *    - Note down the Service ID (e.g., "service_xyz123")
 * 
 * 3. Click on "Email Templates" in the sidebar and "Create New Template"
 *    - Give it a name like "Contact Form"
 *    - Set the content however you want, but include these variables:
 *      - {{from_name}} - The visitor's name
 *      - {{from_email}} - The visitor's email
 *      - {{message}} - The visitor's message
 *    - Note down the Template ID (e.g., "template_abc456")
 * 
 * 4. Replace the placeholders below with your actual IDs:
 *    - const serviceId = 'service_xyz123'; // replace with your Service ID
 *    - const templateId = 'template_abc456'; // replace with your Template ID
 */

const Contact = () => {
  const form = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 24 
      }
    },
  };

  const socialButtonVariants = {
    hover: (id: string) => ({
      scale: 1.05, 
      boxShadow: "0 10px 25px -5px rgba(157, 23, 77, 0.2)",
      backgroundColor: id === "github" ? "#24292e" : id === "linkedin" ? "#0077b5" : "#d1336f",
      color: "#ffffff",
      transition: { 
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }),
    tap: {
      scale: 0.98,
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Replace these with your actual EmailJS credentials
    const serviceId = 'service_1z2d5oi'; // Service ID from the image
    const templateId = 'template_wudk5qt'; // Template ID from the image
    const publicKey = 'PebOVHyDqnOcUyBxw'; // Your public key from the previous image

    const templateParams = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
      time: new Date().toLocaleString(),
    };

    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        console.log('Email sent successfully!', response);
        setSubmitStatus({
          success: true,
          message: 'Thank you! Your message has been sent.',
        });
        // Reset the form after successful submission
        setFormData({
          name: '',
          email: '',
          message: '',
        });
      })
      .catch((error) => {
        console.error('Error sending email:', error);
        setSubmitStatus({
          success: false,
          message: 'Failed to send message. Please try again later.',
        });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFocus = (fieldName: string) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  return (
    <section className="py-16 md:py-24 relative overflow-hidden bg-gradient-to-b from-white via-pink-50 to-pink-100">
      {/* Enhanced Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-gradient-to-br from-pink-200/20 to-purple-300/20 blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-gradient-to-tr from-darkPink/10 to-amber-200/20 blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-48 h-48 rounded-full bg-yellow-200/20 blur-3xl"></div>
        <div className="absolute -bottom-10 -left-10 w-72 h-72 rounded-full bg-darkPink/5 blur-3xl"></div>
        
        {/* Decorative Shapes */}
        <svg className="absolute top-20 right-[5%] w-16 h-16 text-darkPink/10 rotate-12" viewBox="0 0 100 100" fill="currentColor">
          <circle cx="50" cy="50" r="40" />
        </svg>
        <svg className="absolute bottom-20 left-[10%] w-24 h-24 text-darkPink/5 -rotate-12" viewBox="0 0 100 100" fill="currentColor">
          <rect x="10" y="10" width="80" height="80" rx="10" />
        </svg>
        <svg className="absolute top-1/2 left-[80%] w-12 h-12 text-darkPink/10" viewBox="0 0 100 100" fill="currentColor">
          <polygon points="50,10 90,90 10,90" />
        </svg>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="relative"
        >
          {/* Enhanced Page Title */}
          <motion.div 
            className="text-center mb-12 md:mb-20"
            variants={itemVariants}
          >
            <h2 className="text-5xl md:text-6xl font-extrabold text-darkPink tracking-tight mb-6 relative inline-block">
              <span className="relative z-10">Get In Touch</span>
              <div className="absolute -bottom-3 left-0 w-full h-5 bg-gradient-to-r from-pink-200 to-pink-300/50 -z-10 skew-x-3 rounded-md"></div>
            </h2>

            <p className="text-darkPink/70 text-xl max-w-3xl mx-auto">
              Whether you have a question or just want to say hi, I'm happy to connect!
            </p>
          </motion.div>

          {/* Quick Info Banner */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl shadow-lg border-2 border-pink-100 p-4 md:p-6 mb-16 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
          >
            <div className="flex items-center p-4 bg-gradient-to-br from-pink-50 to-pink-100/50 rounded-xl">
              <div className="rounded-full bg-darkPink/10 p-3 mr-4">
                <FaMapMarkerAlt className="text-darkPink text-xl" />
              </div>
              <div>
                <h3 className="text-darkPink font-medium">Location</h3>
                <p className="text-gray-600">Singapore & Kolkata, India</p>
              </div>
            </div>
            
            <div className="flex items-center p-4 bg-gradient-to-br from-pink-50 to-pink-100/50 rounded-xl">
              <div className="rounded-full bg-darkPink/10 p-3 mr-4">
                <FaCalendarAlt className="text-darkPink text-xl" />
              </div>
              <div>
                <h3 className="text-darkPink font-medium">Availability</h3>
                <p className="text-gray-600">Open to Opportunities</p>
              </div>
            </div>
            
            <div className="flex items-center p-4 bg-gradient-to-br from-pink-50 to-pink-100/50 rounded-xl">
              <div className="rounded-full bg-darkPink/10 p-3 mr-4">
                <FaClock className="text-darkPink text-xl" />
              </div>
              <div>
                <h3 className="text-darkPink font-medium">Response Time</h3>
                <p className="text-gray-600">Usually within 24 hours</p>
              </div>
            </div>
          </motion.div>

          {/* Main Content Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Enhanced Social Links Column */}
            <motion.div 
              className="lg:col-span-5 xl:col-span-4 order-2 lg:order-1"
              variants={itemVariants}
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl border-2 border-pink-100 mb-8">
                <h3 className="text-2xl md:text-3xl font-bold text-darkPink mb-8 relative inline-block">
                  <span className="relative z-10">Connect with me</span>
                  <div className="absolute -bottom-2 left-0 w-full h-3 bg-pink-200/50 -z-10 rounded"></div>
                </h3>

                <div className="space-y-5">
                  <motion.a
                    href="https://github.com/KrishSaraf/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-5 text-gray-800 p-5 md:p-6 rounded-xl border-2 border-transparent bg-gradient-to-br from-gray-50 to-gray-100 shadow-md transition-all duration-300"
                    whileHover="hover"
                    whileTap="tap"
                    variants={socialButtonVariants}
                    custom="github"
                    onMouseEnter={() => setHoveredLink('github')}
                    onMouseLeave={() => setHoveredLink(null)}
                    aria-label="GitHub Profile"
                  >
                    <span className={`bg-gray-100 text-gray-800 p-4 rounded-full transition-all duration-300 ${hoveredLink === 'github' ? 'bg-white text-black' : ''}`}>
                      <FaGithub size={32} />
                    </span>
                    <div className="flex-1">
                      <span className="font-semibold text-xl block">GitHub</span>
                      <span className="text-gray-500 text-sm block transition-all duration-300">Check out my code repositories</span>
                    </div>
                    <span className="text-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-300">→</span>
                  </motion.a>
                  
                  <motion.a
                    href="https://www.linkedin.com/in/krishsaraf/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-5 text-gray-800 p-5 md:p-6 rounded-xl border-2 border-transparent bg-gradient-to-br from-blue-50 to-blue-100/50 shadow-md transition-all duration-300"
                    whileHover="hover"
                    whileTap="tap"
                    variants={socialButtonVariants}
                    custom="linkedin"
                    onMouseEnter={() => setHoveredLink('linkedin')}
                    onMouseLeave={() => setHoveredLink(null)}
                    aria-label="LinkedIn Profile"
                  >
                    <span className={`bg-blue-100 text-blue-800 p-4 rounded-full transition-all duration-300 ${hoveredLink === 'linkedin' ? 'bg-white text-blue-700' : ''}`}>
                      <FaLinkedin size={32} />
                    </span>
                    <div className="flex-1">
                      <span className="font-semibold text-xl block">LinkedIn</span>
                      <span className="text-gray-500 text-sm block transition-all duration-300">Connect professionally</span>
                    </div>
                    <span className="text-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-300">→</span>
                  </motion.a>
                  
                  <motion.a
                    href="mailto:krishsaraf05@gmail.com"
                    className="flex items-center gap-5 text-gray-800 p-5 md:p-6 rounded-xl border-2 border-transparent bg-gradient-to-br from-pink-50 to-pink-100/50 shadow-md transition-all duration-300"
                    whileHover="hover"
                    whileTap="tap"
                    variants={socialButtonVariants}
                    custom="email"
                    onMouseEnter={() => setHoveredLink('email')}
                    onMouseLeave={() => setHoveredLink(null)}
                    aria-label="Email Me"
                  >
                    <span className={`bg-pink-100 text-darkPink p-4 rounded-full transition-all duration-300 ${hoveredLink === 'email' ? 'bg-white' : ''}`}>
                      <FaEnvelope size={32} />
                    </span>
                    <div className="flex-1">
                      <span className="font-semibold text-xl block">Email</span>
                      <span className="text-gray-500 text-sm block transition-all duration-300">krishsaraf05@gmail.com</span>
                    </div>
                    <span className="text-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-300">→</span>
                  </motion.a>
                </div>
              </div>

              {/* Added About Me Summary */}
              <motion.div
                variants={itemVariants}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl border-2 border-pink-100"
              >
                <h3 className="text-xl font-bold text-darkPink mb-4">About Me</h3>
                <p className="text-gray-700 mb-3">
                  I'm a passionate student of Economics & Data Science at Nanyang Technological University with a deep interest in AI, economics, and cutting-edge technology.
                </p>
                <p className="text-gray-700 mb-3">
                  With a CGPA of 4.84/5.00 and a consistent track record of excellence throughout my academic journey, I bring a unique combination of analytical skills and creative problem-solving to any challenge.
                </p>
                <p className="text-gray-700">
                  Feel free to reach out if you'd like to collaborate on projects, discuss opportunities, or just have a conversation about tech and economics!
                </p>
              </motion.div>
            </motion.div>

            {/* Enhanced Contact Form Column */}
            <motion.div 
              className="lg:col-span-7 xl:col-span-8 order-1 lg:order-2"
              variants={itemVariants}
            >
              <form 
                ref={form} 
                onSubmit={handleSubmit} 
                className="space-y-7 bg-white p-6 sm:p-8 md:p-10 rounded-2xl shadow-xl border-2 border-pink-100 relative overflow-hidden"
              >
                {/* Decorative elements for the form */}
                <div className="absolute -top-10 -right-10 w-80 h-80 bg-gradient-to-bl from-pink-100/30 to-transparent rounded-full -z-10"></div>
                <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-gradient-to-tr from-pink-100/30 to-transparent rounded-full -z-10"></div>
                
                <h3 className="text-2xl md:text-3xl font-bold text-darkPink mb-6">Send Me a Message</h3>
                <p className="text-gray-600 mb-8">Have a question or want to work together? I'd love to hear from you!</p>
                
                <div className="relative">
                  <label
                    htmlFor="name"
                    className={`block text-lg font-medium mb-2 transition-all duration-200 ${
                      focusedField === 'name' ? 'text-darkPink' : 'text-darkPink/70'
                    }`}
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => handleFocus('name')}
                    onBlur={handleBlur}
                    className="w-full px-4 py-4 bg-white border-2 rounded-lg text-darkPink/90 text-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-darkPink/50 focus:border-darkPink"
                    required
                    placeholder="Your name"
                  />
                  <div className={`h-0.5 bg-darkPink scale-x-0 transition-transform duration-300 origin-left ${
                    focusedField === 'name' ? 'scale-x-100' : ''
                  }`}></div>
                </div>

                <div className="relative">
                  <label
                    htmlFor="email"
                    className={`block text-lg font-medium mb-2 transition-all duration-200 ${
                      focusedField === 'email' ? 'text-darkPink' : 'text-darkPink/70'
                    }`}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => handleFocus('email')}
                    onBlur={handleBlur}
                    className="w-full px-4 py-4 bg-white border-2 rounded-lg text-darkPink/90 text-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-darkPink/50 focus:border-darkPink"
                    required
                    placeholder="your.email@example.com"
                  />
                  <div className={`h-0.5 bg-darkPink scale-x-0 transition-transform duration-300 origin-left ${
                    focusedField === 'email' ? 'scale-x-100' : ''
                  }`}></div>
                </div>

                <div className="relative">
                  <label
                    htmlFor="message"
                    className={`block text-lg font-medium mb-2 transition-all duration-200 ${
                      focusedField === 'message' ? 'text-darkPink' : 'text-darkPink/70'
                    }`}
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => handleFocus('message')}
                    onBlur={handleBlur}
                    rows={6}
                    className="w-full px-4 py-4 bg-white border-2 rounded-lg text-darkPink/90 text-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-darkPink/50 focus:border-darkPink resize-none"
                    required
                    placeholder="Tell me about your project, question, or just say hi!"
                  />
                  <div className={`h-0.5 bg-darkPink scale-x-0 transition-transform duration-300 origin-left ${
                    focusedField === 'message' ? 'scale-x-100' : ''
                  }`}></div>
                </div>

                {submitStatus && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-lg font-medium text-lg ${
                      submitStatus.success 
                        ? 'bg-green-50 text-green-700 border border-green-200' 
                        : 'bg-red-50 text-red-700 border border-red-200'
                    }`}
                  >
                    {submitStatus.success && (
                      <span className="inline-block mr-2">✓</span>
                    )}
                    {!submitStatus.success && (
                      <span className="inline-block mr-2">⚠</span>
                    )}
                    {submitStatus.message}
                  </motion.div>
                )}

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-darkPink text-white font-semibold py-4 px-6 text-xl rounded-lg hover:bg-darkPink/90 focus:outline-none focus:ring-2 focus:ring-darkPink/50 focus:ring-offset-2 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  variants={itemVariants}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact; 