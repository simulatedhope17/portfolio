import { Mail, Phone, MapPin } from "lucide-react"
import { FaWhatsapp, FaWeixin } from "react-icons/fa"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import emailjs from '@emailjs/browser'
import Image from 'next/image'

interface ContactContentProps {
  windowId: string
}

export default function ContactContent({ windowId }: ContactContentProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [showWechatQR, setShowWechatQR] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [copyMessage, setCopyMessage] = useState<string | null>(null);
  const [wechatTimeout, setWechatTimeout] = useState<number | null>(null);
  const [mapTimeout, setMapTimeout] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopyMessage("Copied!");
    setTimeout(() => setCopyMessage(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const serviceId = 'service_ol7rqzi';
    const templateId = 'template_vgo814j';
    const publicKey = 'kgjkoomyH9SkfdI9o'; // Directly using the provided Public Key

    if (!publicKey) {
      alert("EmailJS Public Key is not defined. Please set NEXT_PUBLIC_EMAILJS_PUBLIC_KEY in your environment variables.");
      return;
    }

    emailjs.send(serviceId, templateId, {
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
      time: new Date().toLocaleString()
    }, publicKey)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        alert('Message sent successfully! I will reply as soon as possible!');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      })
      .catch((err) => {
        console.log('FAILED...', err);
        alert('Failed to send message. Please try again later.');
      });
  };

  return (
    <div className="relative p-4">
      {/* Minimal Background Pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-white"></div>
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #64748b 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }}></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-6"
      >
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Get In Touch</h2>
        <p className="text-slate-600">Let's build something cool together.</p>
      </motion.div>

      {/* Contact Info - Playful Layout */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-wrap gap-3 justify-center mb-6 relative z-20"
      >
        {/* Phone Card with WhatsApp and WeChat icons on the left */}
        <div className="flex items-center gap-3">
          {/* WhatsApp and WeChat icons container */}
          <div className="flex flex-col gap-2">
            {/* WhatsApp Icon */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center justify-center"
            >
              <a
                href="https://wa.me/85294632126"
                target="_blank"
                rel="noopener noreferrer"
                className="w-6 h-6 rounded-full flex items-center justify-center text-green-600 hover:text-green-500 transition-colors"
              >
                <FaWhatsapp className="w-4 h-4" />
              </a>
            </motion.div>

            {/* WeChat Icon */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="relative flex items-center justify-center"
              onMouseEnter={() => {
                if (wechatTimeout) clearTimeout(wechatTimeout);
                setShowWechatQR(true);
              }}
              onMouseLeave={() => {
                const timeout = setTimeout(() => setShowWechatQR(false), 200) as unknown as number;
                setWechatTimeout(timeout);
              }}
            >
              <button
                className="w-6 h-6 rounded-full flex items-center justify-center text-green-600 hover:text-green-500 transition-colors"
              >
                <FaWeixin className="w-4 h-4" />
              </button>
              {showWechatQR && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute left-1/2 -translate-x-1/2 top-full mt-2 p-2 bg-white rounded-lg shadow-lg border border-slate-100 z-50"
                  onMouseEnter={() => {
                    if (wechatTimeout) clearTimeout(wechatTimeout);
                    setShowWechatQR(true);
                  }}
                  onMouseLeave={() => {
                    const timeout = setTimeout(() => setShowWechatQR(false), 200) as unknown as number;
                    setWechatTimeout(timeout);
                  }}
                >
                  <div className="w-28 h-28 bg-slate-50 rounded overflow-hidden">
                    <Image
                      src="/qr-wc.jpeg"
                      alt="WeChat QR Code"
                      width={112}
                      height={112}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-xs text-slate-600 text-center mt-1">Scan to connect</p>
                </motion.div>
              )}
            </motion.div>
          </div>
          
          {/* Phone */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="flex items-center p-2.5 bg-white/50 backdrop-blur-sm rounded-xl hover:bg-white/80 transition-colors border border-slate-100 shadow-sm cursor-pointer"
          >
            <a
              href="tel:+85294632126"
              className="flex items-center w-full"
            >
              <div
                className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center shrink-0 text-slate-700 hover:bg-slate-200 transition-colors"
              >
                <Phone className="w-4 h-4" />
              </div>
              <div 
                className="ml-2.5 min-w-0"
                onClick={(e) => {
                  e.preventDefault();
                  handleCopy('+85294632126');
                }}
              >
                <p className="text-xs text-slate-600">(852) 94632126</p>
              </div>
            </a>
          </motion.div>
        </div>

        {/* Email */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="flex items-center p-2.5 bg-white/50 backdrop-blur-sm rounded-xl hover:bg-white/80 transition-colors border border-slate-100 shadow-sm cursor-pointer"
        >
          <a
            href="mailto:aarifeen2-c@my.cityu.edu.hk"
            className="flex items-center w-full"
          >
            <div
              className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center shrink-0 text-slate-700 hover:bg-slate-200 transition-colors"
            >
              <Mail className="w-4 h-4" />
            </div>
            <div 
              className="ml-2.5 min-w-0"
              onClick={(e) => {
                e.preventDefault();
                handleCopy('aarifeen2-c@my.cityu.edu.hk');
              }}
            >
              <p className="text-xs text-slate-600">aarifeen2-c@my.cityu.edu.hk</p>
            </div>
          </a>
        </motion.div>

        {/* Location */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="flex items-center p-2.5 bg-white/50 backdrop-blur-sm rounded-xl hover:bg-white/80 transition-colors border border-slate-100 shadow-sm cursor-pointer"
          onMouseEnter={() => {
            if (mapTimeout) clearTimeout(mapTimeout);
            setShowMap(true);
          }}
          onMouseLeave={() => {
            const timeout = setTimeout(() => setShowMap(false), 200) as unknown as number;
            setMapTimeout(timeout);
          }}
        >
          <div className="relative">
            <a
              href="https://www.google.com/maps/search/?api=1&query=22+Cornwall+St+Kowloon"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center shrink-0 text-slate-700 hover:bg-slate-200 transition-colors"
            >
              <MapPin className="w-4 h-4" />
            </a>
            {showMap && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute left-1/2 -translate-x-1/2 top-full mt-2 p-2 bg-white rounded-lg shadow-lg border border-slate-100 z-50"
                onMouseEnter={() => {
                  if (mapTimeout) clearTimeout(mapTimeout);
                  setShowMap(true);
                }}
                onMouseLeave={() => {
                  const timeout = setTimeout(() => setShowMap(false), 200) as unknown as number;
                  setMapTimeout(timeout);
                }}
              >
                <div className="w-64 h-48 bg-slate-50 rounded overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.077209355609!2d114.1706859149028!3d22.316824985324395!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3404005b8a5d3f23%3A0xb3e6a9786a4f6d!2s22%20Cornwall%20St%2C%20Kowloon%2C%20Hong%20Kong!5e0!3m2!1sen!2sus!4v1678297495914!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
                <p className="text-xs text-slate-600 text-center mt-1">22 Cornwall St., Kowloon</p>
              </motion.div>
            )}
          </div>
          <div
            className="ml-2.5 min-w-0"
          >
            <p className="text-xs text-slate-600">22 Cornwall St., Kowloon</p>
          </div>
        </motion.div>
      </motion.div>

      <div className="space-y-6">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white/50 backdrop-blur-sm rounded-xl border border-slate-100 p-5 shadow-sm relative z-10"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg bg-white/50 border border-slate-200 focus:border-slate-400 focus:ring-1 focus:ring-slate-400 focus:outline-none transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg bg-white/50 border border-slate-200 focus:border-slate-400 focus:ring-1 focus:ring-slate-400 focus:outline-none transition-colors"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg bg-white/50 border border-slate-200 focus:border-slate-400 focus:ring-1 focus:ring-slate-400 focus:outline-none transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 rounded-lg bg-white/50 border border-slate-200 focus:border-slate-400 focus:ring-1 focus:ring-slate-400 focus:outline-none transition-colors"
                required
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-slate-800 hover:bg-slate-700 text-white py-2.5 px-6 rounded-lg font-medium transition-colors"
              type="submit"
            >
              Send Message
            </motion.button>
          </form>
        </motion.div>
      </div>

      <AnimatePresence>
        {copyMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-5 left-1/2 -translate-x-1/2 bg-slate-800 text-white px-4 py-2 rounded-lg shadow-lg z-50"
          >
            {copyMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
