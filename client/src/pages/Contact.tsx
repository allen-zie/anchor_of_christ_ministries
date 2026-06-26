import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Mail, Phone, Globe, Clock, MapPin, Facebook, Instagram, Youtube, Twitter, Send } from 'lucide-react';
import { toast } from 'sonner';

gsap.registerPlugin(ScrollTrigger);

/**
 * Contact Page - Redesigned with map background, location pin, and contact form
 * Design Philosophy: Spiritual Maritime Elegance
 * - Map background with golden location pin
 * - Contact information cards with icons
 * - Message form on the right
 * - Social media links and statistics at bottom
 */
export default function Contact() {
  const contentRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  useEffect(() => {
    // Hero animations
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current.querySelectorAll('.fade-in-hero'),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          delay: 0.2,
        }
      );
    }

    // Content animations
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current.querySelectorAll('.fade-in'),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          scrollTrigger: {
            trigger: contentRef.current,
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
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields');
      return;
    }
    toast.success('Message sent! We will get back to you soon.');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section with Map Background */}
      <section ref={heroRef} className="relative w-full min-h-screen overflow-hidden pt-24">
        {/* Map Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1400&h=900&fit=crop')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 via-blue-800/50 to-transparent" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 h-full flex items-center px-4 md:px-8 lg:px-16 py-12">
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Section - Heading and Contact Cards */}
            <div className="flex flex-col justify-center space-y-8">
              {/* Heading */}
              <div className="space-y-4 fade-in-hero">
                <div className="inline-block bg-yellow-500/20 text-yellow-600 px-4 py-2 rounded-full text-sm font-semibold tracking-widest w-fit">
                  GET IN TOUCH
                </div>
                <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
                  We'd Love to <br />
                  <span className="text-yellow-400">Hear From You</span>
                </h1>
                <p className="text-lg text-gray-100 max-w-md">
                  Whether you have a question, need prayer, or want to partner with us, we are here for you.
                </p>
              </div>

              {/* Location Card */}
              <div className="fade-in-hero bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-lg max-w-sm">
                <div className="text-sm font-semibold text-gray-600 mb-2">VISIT US</div>
                <h3 className="text-2xl font-bold text-blue-900 mb-4">
                  Anchor of Christ <br /> International Ministries
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-1" />
                    <p className="text-gray-700">
                      123 Anchor Road, Nkulumane, <br /> Bulawayo, Zimbabwe
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-1" />
                    <div className="text-gray-700 text-sm">
                      <p className="font-semibold">Sunday Services: 09:00 AM</p>
                      <p className="font-semibold">Wednesday Bible Study: 06:00 PM</p>
                    </div>
                  </div>
                </div>
                <button className="w-full mt-6 bg-blue-900 hover:bg-blue-800 text-white py-2 rounded-full font-semibold flex items-center justify-center gap-2 transition-all transform hover:scale-105">
                  <MapPin className="w-4 h-4" />
                  GET DIRECTIONS
                </button>
              </div>

              {/* Contact Methods - 4 Cards */}
              <div className="grid grid-cols-2 gap-4">
                {/* Email */}
                <div className="fade-in-hero bg-white/90 backdrop-blur-md rounded-xl p-4 text-center shadow-md hover:shadow-lg transition-all">
                  <div className="bg-blue-900/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Mail className="w-6 h-6 text-blue-900" />
                  </div>
                  <p className="text-xs font-semibold text-gray-600 mb-1">EMAIL US</p>
                  <p className="text-sm font-semibold text-blue-900">info@aocim.org</p>
                </div>

                {/* Phone */}
                <div className="fade-in-hero bg-white/90 backdrop-blur-md rounded-xl p-4 text-center shadow-md hover:shadow-lg transition-all">
                  <div className="bg-red-500/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Phone className="w-6 h-6 text-red-500" />
                  </div>
                  <p className="text-xs font-semibold text-gray-600 mb-1">CALL US</p>
                  <p className="text-sm font-semibold text-blue-900">+263 77 123 4567</p>
                </div>

                {/* Website */}
                <div className="fade-in-hero bg-white/90 backdrop-blur-md rounded-xl p-4 text-center shadow-md hover:shadow-lg transition-all">
                  <div className="bg-yellow-500/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Globe className="w-6 h-6 text-yellow-500" />
                  </div>
                  <p className="text-xs font-semibold text-gray-600 mb-1">WEBSITE</p>
                  <p className="text-sm font-semibold text-blue-900">www.aocim.org</p>
                </div>

                {/* Hours */}
                <div className="fade-in-hero bg-white/90 backdrop-blur-md rounded-xl p-4 text-center shadow-md hover:shadow-lg transition-all">
                  <div className="bg-pink-500/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Clock className="w-6 h-6 text-pink-500" />
                  </div>
                  <p className="text-xs font-semibold text-gray-600 mb-1">OFFICE HOURS</p>
                  <p className="text-sm font-semibold text-blue-900">Mon - Fri: 8AM - 5PM</p>
                </div>
              </div>
            </div>

            {/* Right Section - Contact Form */}
            <div className="flex items-center justify-center lg:justify-end fade-in-hero">
              <div className="bg-white/95 backdrop-blur-md rounded-3xl p-8 shadow-2xl max-w-md w-full">
                <div className="space-y-2 mb-8">
                  <h2 className="text-3xl font-bold text-blue-900">
                    Send Us a <span className="text-yellow-500">Message</span>
                  </h2>
                  <p className="text-gray-600 text-sm">We will get back to you as soon as possible.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name */}
                  <div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Full Name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 bg-gray-50 transition-all placeholder-gray-400"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email Address"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 bg-gray-50 transition-all placeholder-gray-400"
                      required
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 bg-gray-50 transition-all placeholder-gray-400"
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <input
                      type="text"
                      name="subject"
                      placeholder="Subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 bg-gray-50 transition-all placeholder-gray-400"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <textarea
                      name="message"
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 bg-gray-50 transition-all resize-none placeholder-gray-400"
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-blue-900 hover:bg-blue-800 text-white py-3 rounded-full font-semibold text-lg transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    SEND MESSAGE
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Golden Location Pin - Decorative */}
          <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none hidden lg:block">
            <div className="relative w-24 h-32 fade-in-hero">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-yellow-400/30 rounded-full blur-3xl animate-pulse" />
              {/* Pin */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-20 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-full shadow-2xl flex items-center justify-center border-4 border-yellow-300">
                  <div className="text-white text-2xl font-bold">+</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Connect With Us Section */}
      <section ref={contentRef} className="bg-gradient-to-r from-blue-900/95 to-blue-800/95 backdrop-blur-sm py-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Social Links */}
          <div className="text-white fade-in">
            <h3 className="text-2xl font-bold mb-4">
              <span className="text-yellow-400">Connect</span> With Us
            </h3>
            <p className="text-blue-100 mb-6">
              Follow our journey and stay updated on our mission.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="bg-white/20 hover:bg-white/30 p-3 rounded-full transition-all transform hover:scale-110"
              >
                <Facebook className="w-6 h-6 text-white" />
              </a>
              <a
                href="#"
                className="bg-white/20 hover:bg-white/30 p-3 rounded-full transition-all transform hover:scale-110"
              >
                <Instagram className="w-6 h-6 text-white" />
              </a>
              <a
                href="#"
                className="bg-white/20 hover:bg-white/30 p-3 rounded-full transition-all transform hover:scale-110"
              >
                <Youtube className="w-6 h-6 text-white" />
              </a>
              <a
                href="#"
                className="bg-white/20 hover:bg-white/30 p-3 rounded-full transition-all transform hover:scale-110"
              >
                <Twitter className="w-6 h-6 text-white" />
              </a>
            </div>
          </div>

          {/* Testimonial Quote */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 fade-in">
            <p className="text-white text-lg italic mb-4">
              "Let us hold unswervingly to the hope we profess, for he who promised is faithful."
            </p>
            <p className="text-yellow-400 font-semibold">HEBREWS 10:23</p>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Souls Reached */}
          <div className="text-center fade-in">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-blue-900/20 flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-blue-900" />
              </div>
              <p className="text-3xl font-bold text-blue-900">25K+</p>
            </div>
            <p className="text-gray-700 font-semibold">Souls Reached</p>
          </div>

          {/* Church Partners */}
          <div className="text-center fade-in">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-red-500" />
              </div>
              <p className="text-3xl font-bold text-blue-900">120+</p>
            </div>
            <p className="text-gray-700 font-semibold">Church Partners</p>
          </div>

          {/* Countries Reached */}
          <div className="text-center fade-in">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-yellow-500" />
              </div>
              <p className="text-3xl font-bold text-blue-900">50+</p>
            </div>
            <p className="text-gray-700 font-semibold">Countries Reached</p>
          </div>

          {/* Years of Ministry */}
          <div className="text-center fade-in">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-pink-500/20 flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-pink-500" />
              </div>
              <p className="text-3xl font-bold text-blue-900">15+</p>
            </div>
            <p className="text-gray-700 font-semibold">Years of Ministry</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
