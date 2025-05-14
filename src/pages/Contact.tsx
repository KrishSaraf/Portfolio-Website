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
    <section className="section-padding py-12 relative overflow-hidden bg-gradient-to-b from-white to-pink-50">
      {/* Background decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-darkPink/5 blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-64 h-64 rounded-full bg-darkPink/5 blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-darkPink/3 blur-3xl"></div>
      
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="relative"
        >
          {/* Centered Title with decorative elements */}
          <motion.div 
            className="text-center mb-16 mt-12"
            variants={itemVariants}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-darkPink tracking-tight mb-6 relative inline-block">
              <span className="relative z-10">Get In Touch</span>
              <div className="absolute -bottom-4 left-0 w-full h-4 bg-darkPink/20 -z-10 skew-x-3 rounded"></div>
            </h2>

            <p className="text-darkPink/70 text-lg mb-2 max-w-2xl mx-auto">
              Whether you have a question or just want to say hi, I'm happy to connect!
            </p>
          </motion.div>

          <div className="flex flex-col md:flex-row gap-12 items-start">
            {/* Contact Form - Left Side */}
            <motion.div 
              className="md:w-2/3 order-2 md:order-1"
              variants={itemVariants}
            >
              <form 
                ref={form} 
                onSubmit={handleSubmit} 
                className="space-y-8 bg-white p-8 rounded-xl shadow-lg border border-darkPink/10 relative overflow-hidden"
              >
                {/* Form background decoration */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-darkPink/5 to-transparent rounded-bl-full -z-10"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-darkPink/5 to-transparent rounded-tr-full -z-10"></div>
                
                <div className="relative">
                  <label
                    htmlFor="name"
                    className={`block text-sm font-medium mb-2 transition-all duration-200 ${
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
                    className="w-full px-4 py-3 bg-white border rounded-lg text-darkPink/90 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-darkPink/50 focus:border-darkPink"
                    required
                  />
                  <div className={`h-0.5 bg-darkPink scale-x-0 transition-transform duration-300 origin-left ${
                    focusedField === 'name' ? 'scale-x-100' : ''
                  }`}></div>
                </div>

                <div className="relative">
                  <label
                    htmlFor="email"
                    className={`block text-sm font-medium mb-2 transition-all duration-200 ${
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
                    className="w-full px-4 py-3 bg-white border rounded-lg text-darkPink/90 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-darkPink/50 focus:border-darkPink"
                    required
                  />
                  <div className={`h-0.5 bg-darkPink scale-x-0 transition-transform duration-300 origin-left ${
                    focusedField === 'email' ? 'scale-x-100' : ''
                  }`}></div>
                </div>

                <div className="relative">
                  <label
                    htmlFor="message"
                    className={`block text-sm font-medium mb-2 transition-all duration-200 ${
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
                    rows={2.5}
                    className="w-full px-4 py-3 bg-white border rounded-lg text-darkPink/90 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-darkPink/50 focus:border-darkPink resize-none"
                    required
                  />
                  <div className={`h-0.5 bg-darkPink scale-x-0 transition-transform duration-300 origin-left ${
                    focusedField === 'message' ? 'scale-x-100' : ''
                  }`}></div>
                </div>

                {submitStatus && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-lg font-medium ${
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
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full md:w-auto px-8 py-3 rounded-lg font-semibold text-white transition-all duration-300 relative overflow-hidden group ${
                    isSubmitting ? 'bg-darkPink/60 cursor-not-allowed' : 'bg-darkPink hover:bg-darkPink/90'
                  }`}
                >
                  <span className="relative z-10">
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </span>
                  <span className="absolute inset-0 w-full h-full bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                </motion.button>
              </form>
            </motion.div>

            {/* Social Links - Right Side */}
            <motion.div 
              className="md:w-1/3 order-1 md:order-2 flex flex-col items-center md:items-start"
              variants={itemVariants}
            >
              <div className="mb-12 w-full">
                <h3 className="text-xl font-bold text-darkPink mb-8 relative inline-block">
                  <span className="relative z-10">Connect with me</span>
                  <div className="absolute -bottom-1 left-0 w-full h-2 bg-darkPink/20 -z-10 rounded"></div>
                </h3>
                <div className="flex flex-col gap-4 mt-6">
                  <motion.a
                    whileHover={{ scale: 1.03, x: 5 }}
                    href="https://github.com/KrishSaraf/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 text-darkPink/80 hover:text-darkPink transition-all duration-300 p-4 rounded-lg border border-darkPink/10 bg-white shadow-sm hover:shadow-md group"
                    aria-label="GitHub Profile"
                  >
                    <span className="bg-darkPink/10 text-darkPink p-2 rounded-full transition-all duration-300 group-hover:bg-darkPink group-hover:text-white">
                      <FaGithub size={26} />
                    </span>
                    <span className="font-medium">GitHub</span>
                    <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
                  </motion.a>
                  
                  <motion.a
                    whileHover={{ scale: 1.03, x: 5 }}
                    href="https://www.linkedin.com/in/krishsaraf/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 text-darkPink/80 hover:text-darkPink transition-all duration-300 p-4 rounded-lg border border-darkPink/10 bg-white shadow-sm hover:shadow-md group"
                    aria-label="LinkedIn Profile"
                  >
                    <span className="bg-darkPink/10 text-darkPink p-2 rounded-full transition-all duration-300 group-hover:bg-darkPink group-hover:text-white">
                      <FaLinkedin size={26} />
                    </span>
                    <span className="font-medium">LinkedIn</span>
                    <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
                  </motion.a>
                  
                  <motion.a
                    whileHover={{ scale: 1.03, x: 5 }}
                    href="mailto:krishsaraf05@gmail.com"
                    className="flex items-center gap-4 text-darkPink/80 hover:text-darkPink transition-all duration-300 p-4 rounded-lg border border-darkPink/10 bg-white shadow-sm hover:shadow-md group"
                    aria-label="Email Me"
                  >
                    <span className="bg-darkPink/10 text-darkPink p-2 rounded-full transition-all duration-300 group-hover:bg-darkPink group-hover:text-white">
                      <FaEnvelope size={26} />
                    </span>
                    <span className="font-medium">Email Me</span>
                    <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact; 