import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

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

  return (
    <section className="section-padding py-16">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-textPrimary mb-8">
            <span className="text-secondary"></span> Get In Touch
          </h2>

          <p className="text-textSecondary text-lg mb-12">
            Whether you have a question or just want to say hi, I'm happy to connect!
          </p>

          <div className="flex flex-col md:flex-row gap-12 items-start">
            {/* Contact Information and Social Links */}
            <div className="md:w-1/3">
              <div className="mb-12">
                <h3 className="text-xl font-bold text-textPrimary mb-6">
                  Connect with me
                </h3>
                <div className="flex gap-6 mt-4">
                  <a
                    href="https://github.com/KrishSaraf/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-textSecondary hover:text-secondary transition-colors duration-300"
                    aria-label="GitHub Profile"
                  >
                    <FaGithub size={32} />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/krishsaraf/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-textSecondary hover:text-secondary transition-colors duration-300"
                    aria-label="LinkedIn Profile"
                  >
                    <FaLinkedin size={32} />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="md:w-2/3">
              <form ref={form} onSubmit={handleSubmit} className="space-y-6 bg-white/50 p-8 rounded-lg shadow-sm border border-gray-100">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-textPrimary mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-primary/50 border border-textSecondary/20 rounded-md text-textPrimary focus:outline-none focus:border-secondary"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-textPrimary mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-primary/50 border border-textSecondary/20 rounded-md text-textPrimary focus:outline-none focus:border-secondary"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-textPrimary mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-2 bg-primary/50 border border-textSecondary/20 rounded-md text-textPrimary focus:outline-none focus:border-secondary"
                    required
                  />
                </div>

                {submitStatus && (
                  <div className={`p-3 rounded ${submitStatus.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {submitStatus.message}
                  </div>
                )}

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={isSubmitting}
                  className={`bg-secondary text-primary px-8 py-3 rounded-md font-medium transition-colors duration-300 ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-opacity-90'
                  }`}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </motion.button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact; 