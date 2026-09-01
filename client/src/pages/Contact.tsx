import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Mail, Phone, Globe, Clock, MapPin, Send, Facebook, Instagram, Youtube, Twitter } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  useEffect(() => {
    // Hero text animations
    if (heroRef.current) {
      const elements = heroRef.current.querySelectorAll('.hero-animate');
      gsap.fromTo(
        elements,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
        }
      );
    }

    // Content section animations
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current.querySelectorAll('.fade-in'),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top center',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    // Stats animation
    if (statsRef.current) {
      gsap.fromTo(
        statsRef.current.querySelectorAll('.stat-item'),
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top center',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section with Map Background */}
      <section
        ref={heroRef}
        className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 1200 600%22%3E%3Cdefs%3E%3ClinearGradient id=%22grad%22 x1=%220%25%22 y1=%220%25%22 x2=%22100%25%22 y2=%22100%25%22%3E%3Cstop offset=%220%25%22 style=%22stop-color:%23e8f1f8;stop-opacity:1%22 /%3E%3Cstop offset=%22100%25%22 style=%22stop-color:%23d0e8f2;stop-opacity:1%22 /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width=%221200%22 height=%22600%22 fill=%22url(%23grad)%22/%3E%3C/svg%3E")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 z-10">
            <div className="hero-animate inline-block px-4 py-2 bg-gold/10 border border-gold rounded-full">
              <p className="text-sm font-semibold text-gold uppercase">Get in Touch</p>
            </div>

            <h1 className="hero-animate text-5xl lg:text-6xl font-bold text-deep-blue leading-tight">
              We'd Love to<br />
              <span className="text-gold">Hear From You</span>
            </h1>

            <p className="hero-animate text-lg text-gray-700 leading-relaxed">
              Whether you have a question, need prayer, or want to partner with us, we are here for you.
            </p>
          </div>

          {/* Right - Location Pin Visualization */}
          <div className="hero-animate relative h-96 lg:h-full flex items-center justify-center">
            <div className="relative w-64 h-64">
              {/* Map Pin Circle */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 bg-gradient-to-br from-gold to-yellow-500 rounded-full shadow-2xl flex items-center justify-center transform hover:scale-110 transition-transform">
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                    <div className="text-4xl">📍</div>
                  </div>
                </div>
              </div>
              {/* Decorative circles */}
              <div className="absolute inset-0 border-4 border-gold/20 rounded-full"></div>
              <div className="absolute inset-8 border-2 border-gold/10 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section ref={contentRef} className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Visit Us & Connect */}
            <div className="space-y-8">
              {/* Visit Us Card */}
              <div className="fade-in p-8 bg-white rounded-2xl shadow-lg border border-gray-100">
                <div className="text-sm font-semibold text-gray-500 uppercase mb-4">Visit Us</div>
                <h3 className="text-2xl font-bold text-deep-blue mb-6">
                  Anchor of Christ<br />
                  International Ministries
                </h3>
                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gold flex-shrink-0 mt-1" />
                    <p className="text-gray-700">
                      123 Anchor Road, Nkulumane,<br />
                      Bulawayo, Zimbabwe
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-gold flex-shrink-0 mt-1" />
                    <div className="text-gray-700">
                      <p className="font-semibold">Sunday Services: 09:00 AM</p>
                      <p>Wednesday Bible Study: 06:00 PM</p>
                    </div>
                  </div>
                </div>
                <a 
                  href="https://www.google.com/maps/search/123+Anchor+Road,+Nkulumane,+Bulawayo,+Zimbabwe" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full px-6 py-3 bg-deep-blue text-white font-bold rounded-full hover:bg-opacity-90 transition-all flex items-center justify-center gap-2"
                >
                  <Send size={16} />
                  GET DIRECTIONS
                </a>
              </div>

              {/* Connect With Us Card */}
              <div className="fade-in p-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl">
                <h3 className="text-xl font-bold text-deep-blue mb-3">Connect With Us</h3>
                <p className="text-gray-700 mb-6">
                  Follow our journey and stay updated on our mission.
                </p>
                <div className="flex gap-4">
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-deep-blue text-white rounded-full flex items-center justify-center hover:bg-opacity-90 transition-all transform hover:scale-110">
                    <Facebook size={20} />
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-deep-blue text-white rounded-full flex items-center justify-center hover:bg-opacity-90 transition-all transform hover:scale-110">
                    <Instagram size={20} />
                  </a>
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-deep-blue text-white rounded-full flex items-center justify-center hover:bg-opacity-90 transition-all transform hover:scale-110">
                    <Youtube size={20} />
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-deep-blue text-white rounded-full flex items-center justify-center hover:bg-opacity-90 transition-all transform hover:scale-110">
                    <Twitter size={20} />
                  </a>
                </div>
              </div>
            </div>

            {/* Middle Column - Contact Methods */}
            <div className="space-y-6">
              <a 
                href="mailto:info@aocim.org" 
                className="fade-in p-6 bg-gradient-to-br from-deep-blue to-blue-700 text-white rounded-2xl shadow-lg text-center hover:shadow-xl transition-all transform hover:scale-105 cursor-pointer"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <Mail className="w-8 h-8" />
                  </div>
                </div>
                <h3 className="font-bold mb-2 text-lg">EMAIL US</h3>
                <p className="text-sm text-gray-100">info@aocim.org</p>
              </a>

              <a 
                href="tel:+263771234567" 
                className="fade-in p-6 bg-gradient-to-br from-red-500 to-red-600 text-white rounded-2xl shadow-lg text-center hover:shadow-xl transition-all transform hover:scale-105 cursor-pointer"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <Phone className="w-8 h-8" />
                  </div>
                </div>
                <h3 className="font-bold mb-2 text-lg">CALL US</h3>
                <p className="text-sm text-gray-100">+263 77 123 4567</p>
              </a>

              <a 
                href="https://www.aocim.org" 
                target="_blank" 
                rel="noopener noreferrer"
                className="fade-in p-6 bg-gradient-to-br from-gold to-yellow-600 text-white rounded-2xl shadow-lg text-center hover:shadow-xl transition-all transform hover:scale-105 cursor-pointer"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <Globe className="w-8 h-8" />
                  </div>
                </div>
                <h3 className="font-bold mb-2 text-lg">WEBSITE</h3>
                <p className="text-sm text-gray-100">www.aocim.org</p>
              </a>

              <div className="fade-in p-6 bg-gradient-to-br from-pink-400 to-pink-500 text-white rounded-2xl shadow-lg text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <Clock className="w-8 h-8" />
                  </div>
                </div>
                <h3 className="font-bold mb-2 text-lg">OFFICE HOURS</h3>
                <p className="text-sm text-gray-100">Mon - Fri: 8AM - 5PM</p>
                <p className="text-sm text-gray-100">Sat: 9AM - 1PM</p>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="fade-in">
              <div className="p-8 bg-light-gray rounded-2xl shadow-lg">
                <h2 className="text-2xl font-bold text-deep-blue mb-2">Send Us a</h2>
                <h2 className="text-2xl font-bold mb-6">
                  <span className="text-gold">Message</span>
                </h2>
                <p className="text-gray-600 mb-6">We will get back to you as soon as possible.</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <div className="relative">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your Full Name"
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-gold placeholder-gray-400"
                        required
                      />
                      <div className="absolute right-4 top-3.5 text-gray-400">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Your Email Address"
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-gold placeholder-gray-400"
                        required
                      />
                      <div className="absolute right-4 top-3.5 text-gray-400">
                        <Mail size={18} />
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="relative">
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Phone Number"
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-gold placeholder-gray-400"
                      />
                      <div className="absolute right-4 top-3.5 text-gray-400">
                        <Phone size={18} />
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="relative">
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Subject"
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-gold placeholder-gray-400"
                        required
                      />
                      <div className="absolute right-4 top-3.5 text-gray-400">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Your Message"
                      rows={4}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-gold placeholder-gray-400 resize-none"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-deep-blue text-white font-bold rounded-full hover:bg-opacity-90 transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <Send size={18} />
                    SEND MESSAGE
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-light-gray">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-deep-blue mb-4">Find Us on the Map</h2>
            <p className="text-lg text-gray-600">Visit our church location in Bulawayo, Zimbabwe</p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg h-96 lg:h-[500px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.0989891234567!2d28.5833!3d20.1500!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1940c5e5e5e5e5e5%3A0x1234567890abcdef!2s123%20Anchor%20Road%2C%20Nkulumane%2C%20Bulawayo%2C%20Zimbabwe!5e0!3m2!1sen!2szw!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-deep-blue to-blue-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-2xl lg:text-3xl font-serif italic mb-6">
            "Let us hold unswervingly to the hope we profess, for he who promised is faithful."
          </p>
          <p className="text-lg text-gold font-semibold">HEBREWS 10:23</p>
        </div>
      </section>

      {/* Statistics Bar */}
      <section ref={statsRef} className="py-12 px-4 sm:px-6 lg:px-8 bg-light-gray">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div className="stat-item">
            <div className="flex items-center justify-center gap-2 mb-2">
              <svg className="w-6 h-6 text-deep-blue" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v2h8v-2zM2 8a2 2 0 11-4 0 2 2 0 014 0zM5 15a4 4 0 00-8 0v2h8v-2z" />
              </svg>
              <p className="text-3xl lg:text-4xl font-bold text-deep-blue">25K+</p>
            </div>
            <p className="text-sm text-gray-600">Souls Reached</p>
          </div>
          <div className="stat-item">
            <div className="flex items-center justify-center gap-2 mb-2">
              <svg className="w-6 h-6 text-deep-blue" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 11a6 6 0 00-11.86 0v2h11.86v-2zM18 19a6 6 0 00-9-5.5V9a6 6 0 0112 0v4.5A5.972 5.972 0 0118 19z" />
              </svg>
              <p className="text-3xl lg:text-4xl font-bold text-deep-blue">120+</p>
            </div>
            <p className="text-sm text-gray-600">Church Partners</p>
          </div>
          <div className="stat-item">
            <div className="flex items-center justify-center gap-2 mb-2">
              <svg className="w-6 h-6 text-deep-blue" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
              <p className="text-3xl lg:text-4xl font-bold text-deep-blue">50+</p>
            </div>
            <p className="text-sm text-gray-600">Countries Reached</p>
          </div>
          <div className="stat-item">
            <div className="flex items-center justify-center gap-2 mb-2">
              <svg className="w-6 h-6 text-deep-blue" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              <p className="text-3xl lg:text-4xl font-bold text-deep-blue">15+</p>
            </div>
            <p className="text-sm text-gray-600">Years of Ministry</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
