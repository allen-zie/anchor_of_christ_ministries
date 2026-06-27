import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'wouter';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Heart, Users, Target, Zap, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ChildrensMinistry() {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero animations
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

    // Content animations
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

    // Stats animations
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

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-red-500 to-red-600 text-white"
      >
        <div className="max-w-7xl mx-auto">
          <Link href="/ministries">
            <button className="mb-6 flex items-center gap-2 text-gold hover:text-gold/80 transition-colors">
              ← Back to Ministries
            </button>
          </Link>

          <div className="hero-animate space-y-6">
            <div className="inline-block px-4 py-2 bg-gold/20 border border-gold rounded-full">
              <p className="text-sm font-semibold text-gold uppercase">Children's Ministry</p>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              Nurturing Young Minds<br />
              <span className="text-gold">With Biblical Truths</span>
            </h1>

            <p className="text-lg text-gray-100 leading-relaxed max-w-3xl">
              A joyful and engaging ministry dedicated to teaching children about Jesus, building their faith foundation, and creating a safe, fun environment for spiritual growth.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section ref={contentRef} className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Overview */}
          <div className="fade-in mb-16">
            <h2 className="text-4xl font-bold text-deep-blue mb-6">Our Vision</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              We envision children who love Jesus, understand His Word, and grow in faith with joy and confidence. Our mission is to create a nurturing environment where children can learn about God's love, develop healthy relationships, and discover their unique gifts.
            </p>
          </div>

          {/* Core Focus Areas */}
          <div className="fade-in mb-16">
            <h2 className="text-4xl font-bold text-deep-blue mb-8">What We Do</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 bg-gradient-to-br from-red-500/10 to-gold/10 rounded-2xl border border-red-500/20">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-deep-blue mb-3">Bible Teaching</h3>
                <p className="text-gray-700">
                  Age-appropriate Bible stories and lessons that help children understand God's love and truth.
                </p>
              </div>

              <div className="p-8 bg-gradient-to-br from-red-500/10 to-gold/10 rounded-2xl border border-red-500/20">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-deep-blue mb-3">Creative Activities</h3>
                <p className="text-gray-700">
                  Fun and engaging activities including crafts, games, music, and drama that reinforce biblical lessons.
                </p>
              </div>

              <div className="p-8 bg-gradient-to-br from-red-500/10 to-gold/10 rounded-2xl border border-red-500/20">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-deep-blue mb-3">Safe Environment</h3>
                <p className="text-gray-700">
                  A secure, welcoming space where children feel loved, valued, and free to explore their faith.
                </p>
              </div>

              <div className="p-8 bg-gradient-to-br from-red-500/10 to-gold/10 rounded-2xl border border-red-500/20">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-deep-blue mb-3">Character Development</h3>
                <p className="text-gray-700">
                  Building values like kindness, honesty, and compassion through biblical principles and modeling.
                </p>
              </div>
            </div>
          </div>

          {/* Activities */}
          <div className="fade-in mb-16">
            <h2 className="text-4xl font-bold text-deep-blue mb-8">Our Activities</h2>
            <div className="space-y-4">
              <div className="p-6 bg-light-gray rounded-xl border-l-4 border-red-500">
                <h3 className="text-xl font-bold text-deep-blue mb-2">Sunday School Classes</h3>
                <p className="text-gray-700">Age-grouped Bible lessons with interactive teaching and activities.</p>
              </div>
              <div className="p-6 bg-light-gray rounded-xl border-l-4 border-red-500">
                <h3 className="text-xl font-bold text-deep-blue mb-2">Vacation Bible School</h3>
                <p className="text-gray-700">Summer program with daily lessons, crafts, games, and memorable experiences.</p>
              </div>
              <div className="p-6 bg-light-gray rounded-xl border-l-4 border-red-500">
                <h3 className="text-xl font-bold text-deep-blue mb-2">Children's Worship</h3>
                <p className="text-gray-700">Special worship services designed for children with music, drama, and storytelling.</p>
              </div>
              <div className="p-6 bg-light-gray rounded-xl border-l-4 border-red-500">
                <h3 className="text-xl font-bold text-deep-blue mb-2">Special Events & Outings</h3>
                <p className="text-gray-700">Fun activities and field trips that combine learning with enjoyment.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-red-500 to-red-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-2xl lg:text-3xl font-serif italic mb-6">
            "Let the little children come to me, and do not hinder them, for the kingdom of heaven belongs to such as these."
          </p>
          <p className="text-lg text-gold font-semibold">MATTHEW 19:14</p>
        </div>
      </section>

      {/* Call to Action */}
      <section ref={statsRef} className="py-16 px-4 sm:px-6 lg:px-8 bg-light-gray">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-deep-blue mb-6">Bring Your Children</h2>
          <p className="text-lg text-gray-700 mb-8">
            Give your children a strong foundation in faith. Join our Children's Ministry for a fun, safe, and spiritually enriching experience!
          </p>
          <Link href="/contact">
            <button className="stat-item px-8 py-3 bg-deep-blue text-white font-bold rounded-full hover:bg-opacity-90 transition-all transform hover:scale-105 flex items-center justify-center gap-2 mx-auto">
              Get Involved <ArrowRight size={18} />
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
