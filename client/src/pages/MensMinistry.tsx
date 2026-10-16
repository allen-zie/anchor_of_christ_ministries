import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'wouter';
import Footer from '@/components/Footer';
import { Heart, Users, Target, Zap, ArrowRight } from 'lucide-react';
import backgroundImage from '@/content/images/mens.webp';

gsap.registerPlugin(ScrollTrigger);

export default function MensMinistry() {
  const pageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero animations
    if (heroRef.current) {
      const elements = heroRef.current.querySelectorAll('.hero-animate');
      gsap.fromTo(
        elements,
        { y: 30 },
        {
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
        { y: 30 },
        {
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
        { scale: 0.8 },
        {
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
      const pageRoot = pageRef.current;
      if (pageRoot) {
        ScrollTrigger.getAll().forEach((trigger) => {
          const triggerElement = trigger.trigger;
          if (triggerElement instanceof Element && pageRoot.contains(triggerElement)) {
            trigger.kill();
          }
        });
      }
    };
  }, []);

  return (
    <div ref={pageRef} className="min-h-screen bg-white">

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-deep-blue to-blue-700 text-white"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${backgroundImage})`,
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
        }}
      >
        <div className="max-w-7xl mx-auto">
          <Link href="/ministries">
            <button className="mb-6 flex items-center gap-2 text-gold hover:text-gold/80 transition-colors">
              ← Back to Ministries
            </button>
          </Link>

          <div className="hero-animate space-y-6">
            <div className="inline-block px-4 py-2 bg-gold/20 border border-gold rounded-full">
              <p className="text-sm font-semibold text-gold uppercase">Men's Ministry</p>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              Equipping Men to Lead<br />
              <span className="text-gold">With Faith & Integrity</span>
            </h1>

            <p className="text-lg text-gray-100 leading-relaxed max-w-3xl">
              A ministry dedicated to empowering men to become spiritual leaders, strong in faith, and committed to serving their families, churches, and communities.
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
              We envision a generation of men anchored in Christ, equipped with biblical knowledge, spiritual maturity, and a heart for service. Our mission is to build men of character who lead their families with love, serve their communities with compassion, and advance God's kingdom with boldness.
            </p>
          </div>

          {/* Core Focus Areas */}
          <div className="fade-in mb-16">
            <h2 className="text-4xl font-bold text-deep-blue mb-8">What We Do</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 bg-gradient-to-br from-deep-blue/10 to-gold/10 rounded-2xl border border-gold/20">
                <div className="w-12 h-12 bg-deep-blue rounded-full flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-gold" />
                </div>
                <h3 className="text-2xl font-bold text-deep-blue mb-3">Spiritual Growth</h3>
                <p className="text-gray-700">
                  Bible studies, prayer groups, and discipleship programs designed to deepen men's relationship with Christ and strengthen their faith.
                </p>
              </div>

              <div className="p-8 bg-gradient-to-br from-deep-blue/10 to-gold/10 rounded-2xl border border-gold/20">
                <div className="w-12 h-12 bg-deep-blue rounded-full flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-gold" />
                </div>
                <h3 className="text-2xl font-bold text-deep-blue mb-3">Leadership Development</h3>
                <p className="text-gray-700">
                  Training and mentoring programs to equip men to lead their families, workplaces, and communities with wisdom and integrity.
                </p>
              </div>

              <div className="p-8 bg-gradient-to-br from-deep-blue/10 to-gold/10 rounded-2xl border border-gold/20">
                <div className="w-12 h-12 bg-deep-blue rounded-full flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-gold" />
                </div>
                <h3 className="text-2xl font-bold text-deep-blue mb-3">Community Service</h3>
                <p className="text-gray-700">
                  Outreach programs and community projects that demonstrate Christ's love through practical action and service.
                </p>
              </div>

              <div className="p-8 bg-gradient-to-br from-deep-blue/10 to-gold/10 rounded-2xl border border-gold/20">
                <div className="w-12 h-12 bg-deep-blue rounded-full flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-gold" />
                </div>
                <h3 className="text-2xl font-bold text-deep-blue mb-3">Fellowship & Accountability</h3>
                <p className="text-gray-700">
                  Creating a supportive community where men can share, grow, and hold each other accountable in their spiritual journey.
                </p>
              </div>
            </div>
          </div>

          {/* Activities */}
          <div className="fade-in mb-16">
            <h2 className="text-4xl font-bold text-deep-blue mb-8">Our Activities</h2>
            <div className="space-y-4">
              <div className="p-6 bg-light-gray rounded-xl border-l-4 border-gold">
                <h3 className="text-xl font-bold text-deep-blue mb-2">Weekly Bible Study</h3>
                <p className="text-gray-700">In-depth study of Scripture to strengthen men's understanding of God's Word and its application to daily life.</p>
              </div>
              <div className="p-6 bg-light-gray rounded-xl border-l-4 border-gold">
                <h3 className="text-xl font-bold text-deep-blue mb-2">Monthly Men's Breakfast</h3>
                <p className="text-gray-700">Fellowship, networking, and inspirational talks to encourage men in their faith and relationships.</p>
              </div>
              <div className="p-6 bg-light-gray rounded-xl border-l-4 border-gold">
                <h3 className="text-xl font-bold text-deep-blue mb-2">Mentorship Program</h3>
                <p className="text-gray-700">One-on-one mentoring relationships that help younger men grow spiritually and navigate life challenges.</p>
              </div>
              <div className="p-6 bg-light-gray rounded-xl border-l-4 border-gold">
                <h3 className="text-xl font-bold text-deep-blue mb-2">Community Outreach</h3>
                <p className="text-gray-700">Service projects and community engagement that demonstrate Christ's love through action.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-deep-blue to-blue-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-2xl lg:text-3xl font-serif italic mb-6">
            "Be strong and courageous. Do not be afraid or terrified because of them, for the Lord your God goes with you."
          </p>
          <p className="text-lg text-gold font-semibold">Deuteronomy 31 vs 6</p>
        </div>
      </section>

      {/* Call to Action */}
      <section ref={statsRef} className="py-16 px-4 sm:px-6 lg:px-8 bg-light-gray">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-deep-blue mb-6">Join Us</h2>
          <p className="text-lg text-gray-700 mb-8">
            Whether you're a young man just starting your faith journey or an experienced believer, there's a place for you in our Men's Ministry. Come grow with us!
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
