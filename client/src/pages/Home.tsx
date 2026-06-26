import { useEffect, useRef } from 'react';
import { Link } from 'wouter';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ThreeDBoat from '@/components/ThreeDBoat';
import { Heart, Users, Globe, Hand } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero text animations
    if (heroRef.current) {
      const headings = heroRef.current.querySelectorAll('h1, p');
      gsap.fromTo(
        headings,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
        }
      );

      const buttons = heroRef.current.querySelectorAll('button');
      gsap.fromTo(
        buttons,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          delay: 0.5,
          ease: 'back.out',
        }
      );
    }

    // Stats section scroll animation
    if (statsRef.current) {
      gsap.fromTo(
        statsRef.current.querySelectorAll('.stat-card'),
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top center',
            end: 'bottom center',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    // Quote section animation
    if (quoteRef.current) {
      gsap.fromTo(
        quoteRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: quoteRef.current,
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

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-light-gray to-white"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="inline-block px-4 py-2 bg-gold/10 border border-gold rounded-full">
              <p className="text-sm font-semibold text-gold uppercase">Welcome to AOCIM</p>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold text-deep-blue leading-tight">
              Serving Christ,<br />
              <span className="text-gold">Touching Lives,</span><br />
              Souls to Jesus
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed">
              We are an international ministry anchored on the love of Christ, committed to winning souls, building believers, and impacting nations.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/about">
                <button className="px-8 py-3 bg-deep-blue text-white font-bold rounded-full hover:bg-opacity-90 transition-all transform hover:scale-105">
                  LEARN MORE →
                </button>
              </Link>
              <button className="px-8 py-3 bg-white border-2 border-deep-blue text-deep-blue font-bold rounded-full hover:bg-deep-blue hover:text-white transition-all">
                WATCH VIDEO ▶
              </button>
            </div>
          </div>

          {/* Right 3D Content */}
          <div className="h-96 lg:h-full">
            <ThreeDBoat />
          </div>
        </div>
      </section>

      {/* Ministry Pillars */}
      <section ref={statsRef} className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Pillar 1 */}
            <div className="stat-card p-6 bg-gradient-to-br from-deep-blue to-blue-700 rounded-lg shadow-lg text-white text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <Heart className="w-8 h-8" fill="currentColor" />
                </div>
              </div>
              <h3 className="text-lg font-bold mb-2">WINNING SOULS</h3>
              <p className="text-sm text-gray-200">Reaching the lost with the Gospel</p>
            </div>

            {/* Pillar 2 */}
            <div className="stat-card p-6 bg-gradient-to-br from-red-500 to-red-600 rounded-lg shadow-lg text-white text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <Users className="w-8 h-8" />
                </div>
              </div>
              <h3 className="text-lg font-bold mb-2">BUILDING BELIEVERS</h3>
              <p className="text-sm text-gray-100">Equipping saints for spiritual growth</p>
            </div>

            {/* Pillar 3 */}
            <div className="stat-card p-6 bg-gradient-to-br from-gold to-yellow-600 rounded-lg shadow-lg text-white text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <Globe className="w-8 h-8" />
                </div>
              </div>
              <h3 className="text-lg font-bold mb-2">IMPACTING NATIONS</h3>
              <p className="text-sm text-gray-100">Taking the love of Christ to the world</p>
            </div>

            {/* Pillar 4 */}
            <div className="stat-card p-6 bg-gradient-to-br from-pink-400 to-pink-500 rounded-lg shadow-lg text-white text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <Hand className="w-8 h-8" />
                </div>
              </div>
              <h3 className="text-lg font-bold mb-2">SERVING WITH LOVE</h3>
              <p className="text-sm text-gray-100">Demonstrating Christ's love in action</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section
        ref={quoteRef}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-deep-blue to-blue-700 text-white"
      >
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-2xl lg:text-3xl font-serif italic mb-6">
            "We have this hope as an anchor for the soul, firm and secure. It enters the inner sanctuary behind the curtain."
          </p>
          <p className="text-lg text-gold font-semibold">HEBREWS 6:19</p>
        </div>
      </section>

      {/* Statistics Bar */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-light-gray">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-3xl lg:text-4xl font-bold text-deep-blue">25K+</p>
            <p className="text-sm text-gray-600 mt-2">Souls Reached</p>
          </div>
          <div>
            <p className="text-3xl lg:text-4xl font-bold text-deep-blue">120+</p>
            <p className="text-sm text-gray-600 mt-2">Church Partners</p>
          </div>
          <div>
            <p className="text-3xl lg:text-4xl font-bold text-deep-blue">50+</p>
            <p className="text-sm text-gray-600 mt-2">Countries Reached</p>
          </div>
          <div>
            <p className="text-3xl lg:text-4xl font-bold text-deep-blue">15+</p>
            <p className="text-sm text-gray-600 mt-2">Years of Ministry</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
