import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Replace these with your actual EmailJS credentials
    const serviceId = 'service_1z2d5oi';
    const templateId = 'template_wudk5qt';
    const publicKey = 'PebOVHyDqnOcUyBxw';

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
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-white via-pink-50 to-white overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-gradient-to-b from-pink-100 to-pink-200/30 blur-2xl opacity-50"></div>
      <div className="absolute bottom-20 left-20 w-64 h-64 rounded-full bg-gradient-to-t from-pink-100 to-pink-200/30 blur-2xl opacity-50"></div>
      
      <div className="w-full max-w-6xl mx-auto px-4 py-6 md:py-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="relative"
        >
          {/* Centered Title */}
          <motion.div 
            className="text-center mb-6"
            variants={itemVariants}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-darkPink tracking-tight mb-2 inline-block relative">
              Get In Touch
              <div className="absolute -bottom-2 left-0 right-0 h-3 bg-pink-200/50 -z-10 rounded"></div>
            </h2>
            <p className="text-darkPink/70 text-base max-w-2xl mx-auto">
              Whether you have a question or just want to say hi, I'm happy to connect!
            </p>
          </motion.div>

          <div className="flex flex-col md:flex-row md:gap-6 lg:gap-10">
            {/* Social Links Section - Enhanced with vibrant colors and animations */}
            <motion.div 
              className="w-full md:w-1/2 mb-6 md:mb-0"
              variants={itemVariants}
            >
              <div className="grid grid-cols-1 gap-3 md:gap-4">
                <motion.a
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  href="https://github.com/KrishSaraf/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 bg-white shadow-md hover:shadow-lg group transition-all duration-300 overflow-hidden relative"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gray-800 group-hover:w-full opacity-10 group-hover:opacity-5 transition-all duration-500"></div>
                  <div className="bg-gray-900 text-white p-3 rounded-xl z-10">
                    <FaGithub size={30} />
                  </div>
                  <div className="flex-1 z-10">
                    <div className="font-semibold text-lg text-gray-800">GitHub</div>
                    <div className="text-sm text-gray-600">Check out my code repositories</div>
                  </div>
                  <div className="text-gray-400 group-hover:text-gray-700 transform group-hover:translate-x-1 transition-all z-10">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </motion.a>

                <motion.a
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  href="https://www.linkedin.com/in/krishsaraf/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 bg-white shadow-md hover:shadow-lg group transition-all duration-300 overflow-hidden relative"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 group-hover:w-full opacity-10 group-hover:opacity-5 transition-all duration-500"></div>
                  <div className="bg-blue-600 text-white p-3 rounded-xl z-10">
                    <FaLinkedin size={30} />
                  </div>
                  <div className="flex-1 z-10">
                    <div className="font-semibold text-lg text-gray-800">LinkedIn</div>
                    <div className="text-sm text-gray-600">Connect with me professionally</div>
                  </div>
                  <div className="text-gray-400 group-hover:text-blue-600 transform group-hover:translate-x-1 transition-all z-10">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </motion.a>

                <motion.a
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  href="mailto:krishsaraf05@gmail.com"
                  className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 bg-white shadow-md hover:shadow-lg group transition-all duration-300 overflow-hidden relative"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-darkPink group-hover:w-full opacity-10 group-hover:opacity-5 transition-all duration-500"></div>
                  <div className="bg-darkPink text-white p-3 rounded-xl z-10">
                    <FaEnvelope size={30} />
                  </div>
                  <div className="flex-1 z-10">
                    <div className="font-semibold text-lg text-gray-800">Email Me</div>
                    <div className="text-sm text-gray-600">Send me a direct message</div>
                  </div>
                  <div className="text-gray-400 group-hover:text-darkPink transform group-hover:translate-x-1 transition-all z-10">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </motion.a>
              </div>
            </motion.div>

            {/* Contact Form - More compact and visually balanced */}
            <motion.div 
              className="w-full md:w-1/2"
              variants={itemVariants}
            >
              <form 
                ref={form} 
                onSubmit={handleSubmit} 
                className="bg-white p-5 rounded-xl shadow-lg border border-pink-200/80 relative overflow-hidden"
              >
                {/* Form background subtle decoration */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-pink-100/40 to-transparent rounded-bl-full -z-10"></div>
                
                <div className="grid grid-cols-1 gap-4">
                  <div className="relative">
                    <label htmlFor="name" className="block text-sm font-medium mb-1 text-gray-700">
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
                      className="w-full px-3 py-2 bg-gray-50 border rounded-lg text-gray-800 text-sm transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-darkPink/40 focus:border-darkPink/60"
                      required
                    />
                  </div>

                  <div className="relative">
                    <label htmlFor="email" className="block text-sm font-medium mb-1 text-gray-700">
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
                      className="w-full px-3 py-2 bg-gray-50 border rounded-lg text-gray-800 text-sm transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-darkPink/40 focus:border-darkPink/60"
                      required
                    />
                  </div>

                  <div className="relative">
                    <label htmlFor="message" className="block text-sm font-medium mb-1 text-gray-700">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => handleFocus('message')}
                      onBlur={handleBlur}
                      rows={3}
                      className="w-full px-3 py-2 bg-gray-50 border rounded-lg text-gray-800 text-sm transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-darkPink/40 focus:border-darkPink/60 resize-none"
                      required
                    />
                  </div>

                  {submitStatus && (
                    <motion.div 
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-2 rounded-lg text-sm ${
                        submitStatus.success 
                          ? 'bg-green-50 text-green-700 border border-green-200' 
                          : 'bg-red-50 text-red-700 border border-red-200'
                      }`}
                    >
                      {submitStatus.success && <span className="inline-block mr-1">✓</span>}
                      {!submitStatus.success && <span className="inline-block mr-1">⚠</span>}
                      {submitStatus.message}
                    </motion.div>
                  )}

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="bg-darkPink text-white font-medium py-2.5 px-4 text-sm rounded-lg hover:bg-darkPink/90 focus:outline-none focus:ring-2 focus:ring-darkPink/50 transition-all duration-300 shadow-sm hover:shadow-md disabled:opacity-70 flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact; 