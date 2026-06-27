import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'wouter';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Heart, Users, Target, Zap, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function AnnaGroup() {
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
        className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-500 to-purple-600 text-white"
      >
        <div className="max-w-7xl mx-auto">
          <Link href="/ministries">
            <button className="mb-6 flex items-center gap-2 text-gold hover:text-gold/80 transition-colors">
              ← Back to Ministries
            </button>
          </Link>

          <div className="hero-animate space-y-6">
            <div className="inline-block px-4 py-2 bg-gold/20 border border-gold rounded-full">
              <p className="text-sm font-semibold text-gold uppercase">Anna Group</p>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              Honoring Our Elders<br />
              <span className="text-gold">With Love & Respect</span>
            </h1>

            <p className="text-lg text-gray-100 leading-relaxed max-w-3xl">
              A ministry dedicated to celebrating and supporting our senior members, ensuring they feel valued, cared for, and connected to our church community.
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
              Named after Anna, the prophetess who served faithfully in the temple, our Anna Group honors the wisdom, experience, and spiritual legacy of our senior members. We believe our elders are treasures who deserve honor, care, and meaningful engagement in our church community.
            </p>
          </div>

          {/* Core Focus Areas */}
          <div className="fade-in mb-16">
            <h2 className="text-4xl font-bold text-deep-blue mb-8">What We Do</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 bg-gradient-to-br from-purple-500/10 to-gold/10 rounded-2xl border border-purple-500/20">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-deep-blue mb-3">Pastoral Care</h3>
                <p className="text-gray-700">
                  Regular visits, prayer support, and spiritual encouragement for our senior members.
                </p>
              </div>

              <div className="p-8 bg-gradient-to-br from-purple-500/10 to-gold/10 rounded-2xl border border-purple-500/20">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-deep-blue mb-3">Community & Fellowship</h3>
                <p className="text-gray-700">
                  Social gatherings, meals, and activities that foster connection and friendship among seniors.
                </p>
              </div>

              <div className="p-8 bg-gradient-to-br from-purple-500/10 to-gold/10 rounded-2xl border border-purple-500/20">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-deep-blue mb-3">Practical Support</h3>
                <p className="text-gray-700">
                  Assistance with transportation, healthcare, household needs, and other practical matters.
                </p>
              </div>

              <div className="p-8 bg-gradient-to-br from-purple-500/10 to-gold/10 rounded-2xl border border-purple-500/20">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-deep-blue mb-3">Legacy & Wisdom Sharing</h3>
                <p className="text-gray-700">
                  Opportunities for seniors to share their faith journey and spiritual wisdom with younger generations.
                </p>
              </div>
            </div>
          </div>

          {/* Activities */}
          <div className="fade-in mb-16">
            <h2 className="text-4xl font-bold text-deep-blue mb-8">Our Activities</h2>
            <div className="space-y-4">
              <div className="p-6 bg-light-gray rounded-xl border-l-4 border-purple-500">
                <h3 className="text-xl font-bold text-deep-blue mb-2">Monthly Senior Luncheon</h3>
                <p className="text-gray-700">Special meals and fellowship gatherings with entertainment and meaningful conversation.</p>
              </div>
              <div className="p-6 bg-light-gray rounded-xl border-l-4 border-purple-500">
                <h3 className="text-xl font-bold text-deep-blue mb-2">Prayer & Intercession Meetings</h3>
                <p className="text-gray-700">Regular prayer sessions where seniors intercede for the church and community.</p>
              </div>
              <div className="p-6 bg-light-gray rounded-xl border-l-4 border-purple-500">
                <h3 className="text-xl font-bold text-deep-blue mb-2">Visitation Program</h3>
                <p className="text-gray-700">Regular visits to homebound and hospitalized seniors to provide encouragement and support.</p>
              </div>
              <div className="p-6 bg-light-gray rounded-xl border-l-4 border-purple-500">
                <h3 className="text-xl font-bold text-deep-blue mb-2">Wisdom Sharing Sessions</h3>
                <p className="text-gray-700">Intergenerational programs where seniors share their faith stories and life lessons.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-500 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-2xl lg:text-3xl font-serif italic mb-6">
            "Even to your old age and gray hairs I am he, I am he who will sustain you. I have made you and I will carry you."
          </p>
          <p className="text-lg text-gold font-semibold">ISAIAH 46:4</p>
        </div>
      </section>

      {/* Call to Action */}
      <section ref={statsRef} className="py-16 px-4 sm:px-6 lg:px-8 bg-light-gray">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-deep-blue mb-6">Join Our Mission</h2>
          <p className="text-lg text-gray-700 mb-8">
            Whether you're a senior looking for community or someone wanting to serve our elders, we invite you to be part of the Anna Group. Together, we honor those who have gone before us.
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
