import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'wouter';
import Footer from '@/components/Footer';
import { Heart, Users, Target, Zap, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function YouthMinistry() {
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

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gold to-yellow-600 text-white"
      >
        <div className="max-w-7xl mx-auto">
          <Link href="/ministries">
            <button className="mb-6 flex items-center gap-2 text-deep-blue hover:text-deep-blue/80 transition-colors">
              ← Back to Ministries
            </button>
          </Link>

          <div className="hero-animate space-y-6">
            <div className="inline-block px-4 py-2 bg-deep-blue/20 border border-deep-blue rounded-full">
              <p className="text-sm font-semibold text-deep-blue uppercase">Youth Ministry</p>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              Inspiring Young Hearts<br />
              <span className="text-deep-blue">To Live Boldly for Christ</span>
            </h1>

            <p className="text-lg text-gray-100 leading-relaxed max-w-3xl">
              A dynamic ministry dedicated to empowering young people to discover their purpose, develop spiritual maturity, and become agents of positive change in their generation.
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
              We envision young people who are passionate about Christ, confident in their identity, and equipped to impact their generation. Our mission is to create a vibrant community where youth can grow spiritually, develop leadership skills, and discover their unique calling.
            </p>
          </div>

          {/* Core Focus Areas */}
          <div className="fade-in mb-16">
            <h2 className="text-4xl font-bold text-deep-blue mb-8">What We Do</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 bg-gradient-to-br from-gold/10 to-deep-blue/10 rounded-2xl border border-gold/20">
                <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-deep-blue mb-3">Spiritual Foundation</h3>
                <p className="text-gray-700">
                  Dynamic Bible studies and worship experiences that help young people build a strong foundation in Christ.
                </p>
              </div>

              <div className="p-8 bg-gradient-to-br from-gold/10 to-deep-blue/10 rounded-2xl border border-gold/20">
                <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-deep-blue mb-3">Community & Friendship</h3>
                <p className="text-gray-700">
                  Building a supportive community where young people can develop meaningful friendships and feel valued.
                </p>
              </div>

              <div className="p-8 bg-gradient-to-br from-gold/10 to-deep-blue/10 rounded-2xl border border-gold/20">
                <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-deep-blue mb-3">Leadership Development</h3>
                <p className="text-gray-700">
                  Training programs to equip young leaders with skills to influence their peers and communities.
                </p>
              </div>

              <div className="p-8 bg-gradient-to-br from-gold/10 to-deep-blue/10 rounded-2xl border border-gold/20">
                <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-deep-blue mb-3">Mission & Outreach</h3>
                <p className="text-gray-700">
                  Engaging young people in service projects and mission work to demonstrate Christ's love in action.
                </p>
              </div>
            </div>
          </div>

          {/* Activities */}
          <div className="fade-in mb-16">
            <h2 className="text-4xl font-bold text-deep-blue mb-8">Our Activities</h2>
            <div className="space-y-4">
              <div className="p-6 bg-light-gray rounded-xl border-l-4 border-gold">
                <h3 className="text-xl font-bold text-deep-blue mb-2">Weekly Youth Meetings</h3>
                <p className="text-gray-700">Interactive sessions with worship, teaching, and small group discussions.</p>
              </div>
              <div className="p-6 bg-light-gray rounded-xl border-l-4 border-gold">
                <h3 className="text-xl font-bold text-deep-blue mb-2">Youth Camps & Retreats</h3>
                <p className="text-gray-700">Seasonal events for spiritual renewal, bonding, and leadership development.</p>
              </div>
              <div className="p-6 bg-light-gray rounded-xl border-l-4 border-gold">
                <h3 className="text-xl font-bold text-deep-blue mb-2">Mentorship Program</h3>
                <p className="text-gray-700">One-on-one guidance from mature believers to help navigate life challenges.</p>
              </div>
              <div className="p-6 bg-light-gray rounded-xl border-l-4 border-gold">
                <h3 className="text-xl font-bold text-deep-blue mb-2">Community Service Projects</h3>
                <p className="text-gray-700">Hands-on opportunities to serve and make a difference in our community.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gold to-yellow-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-2xl lg:text-3xl font-serif italic mb-6">
            "Don't let anyone look down on you because you are young, but be an example for the believers."
          </p>
          <p className="text-lg text-deep-blue font-semibold">1 TIMOTHY 4:12</p>
        </div>
      </section>

      {/* Call to Action */}
      <section ref={statsRef} className="py-16 px-4 sm:px-6 lg:px-8 bg-light-gray">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-deep-blue mb-6">Join the Movement</h2>
          <p className="text-lg text-gray-700 mb-8">
            Be part of a generation that's making a difference for Christ. Join our Youth Ministry and discover your purpose!
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
