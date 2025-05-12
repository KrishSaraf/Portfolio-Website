import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

/*
 * EMAILJS SETUP INSTRUCTIONS:
 * 
 * 1. Create a free account at https://www.emailjs.com/
 * 2. Add an email service (Gmail, Outlook, etc.) and note down the Service ID
 * 3. Create an email template with these parameters:
 *    - To Name: Your name
 *    - To Email: krishsarav05@gmail.com (or your preferred email)
 *    - From Name: {{from_name}} (this will be the visitor's name)
 *    - From Email: {{from_email}} (this will be the visitor's email)
 *    - Message: {{message}} (this will be the visitor's message)
 *    - Note down the Template ID
 * 4. Get your Public Key from the Integration tab
 * 5. Replace the placeholder values below:
 *    - serviceId: Your EmailJS Service ID
 *    - templateId: Your EmailJS Template ID
 *    - publicKey: Your EmailJS Public Key
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
    const serviceId = 'YOUR_SERVICE_ID';
    const templateId = 'YOUR_TEMPLATE_ID';
    const publicKey = 'YOUR_PUBLIC_KEY';

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      to_email: 'krishsarav05@gmail.com',
      message: formData.message,
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
    <section className="section-padding">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-textPrimary mb-8">
            <span className="text-secondary">03.</span> Get In Touch
          </h2>

          <p className="text-textSecondary text-lg mb-8">
            Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>

          <form ref={form} onSubmit={handleSubmit} className="space-y-6">
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

          <div className="mt-12">
            <h3 className="text-xl font-bold text-textPrimary mb-4">
              Connect with me
            </h3>
            <div className="flex gap-4">
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="text-textSecondary hover:text-secondary transition-colors duration-300"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="text-textSecondary hover:text-secondary transition-colors duration-300"
              >
                LinkedIn
              </a>
              <a
                href="https://twitter.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="text-textSecondary hover:text-secondary transition-colors duration-300"
              >
                Twitter
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact; 