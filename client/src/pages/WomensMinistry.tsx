import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'wouter';
import Footer from '@/components/Footer';
import { Heart, Users, Target, Zap, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function WomensMinistry() {
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
        className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-pink-400 to-pink-500 text-white"
      >
        <div className="max-w-7xl mx-auto">
          <Link href="/ministries">
            <button className="mb-6 flex items-center gap-2 text-gold hover:text-gold/80 transition-colors">
              ← Back to Ministries
            </button>
          </Link>

          <div className="hero-animate space-y-6">
            <div className="inline-block px-4 py-2 bg-gold/20 border border-gold rounded-full">
              <p className="text-sm font-semibold text-gold uppercase">Women's Ministry</p>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              Empowering Women to Grow<br />
              <span className="text-gold">In Grace & Purpose</span>
            </h1>

            <p className="text-lg text-gray-100 leading-relaxed max-w-3xl">
              A ministry dedicated to nurturing women in their faith, building strong relationships, and equipping them to impact their families and communities.
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
              We envision women who are rooted in Christ, confident in their identity, and empowered to fulfill God's purpose for their lives. Our mission is to create a supportive community where women can grow spiritually, develop meaningful friendships, and become agents of positive change in their spheres of influence.
            </p>
          </div>

          {/* Core Focus Areas */}
          <div className="fade-in mb-16">
            <h2 className="text-4xl font-bold text-deep-blue mb-8">What We Do</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 bg-gradient-to-br from-pink-400/10 to-gold/10 rounded-2xl border border-pink-400/20">
                <div className="w-12 h-12 bg-pink-400 rounded-full flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-deep-blue mb-3">Spiritual Nurturing</h3>
                <p className="text-gray-700">
                  Bible studies, prayer groups, and devotional sessions designed to deepen women's connection with God and strengthen their faith.
                </p>
              </div>

              <div className="p-8 bg-gradient-to-br from-pink-400/10 to-gold/10 rounded-2xl border border-pink-400/20">
                <div className="w-12 h-12 bg-pink-400 rounded-full flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-deep-blue mb-3">Sisterhood & Support</h3>
                <p className="text-gray-700">
                  Creating a safe space for women to share, support one another, and build lasting friendships rooted in faith.
                </p>
              </div>

              <div className="p-8 bg-gradient-to-br from-pink-400/10 to-gold/10 rounded-2xl border border-pink-400/20">
                <div className="w-12 h-12 bg-pink-400 rounded-full flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-deep-blue mb-3">Life Skills & Empowerment</h3>
                <p className="text-gray-700">
                  Workshops and seminars on marriage, motherhood, career, and personal development to equip women for success.
                </p>
              </div>

              <div className="p-8 bg-gradient-to-br from-pink-400/10 to-gold/10 rounded-2xl border border-pink-400/20">
                <div className="w-12 h-12 bg-pink-400 rounded-full flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-deep-blue mb-3">Community Impact</h3>
                <p className="text-gray-700">
                  Outreach programs and community projects that demonstrate Christ's love through compassion and service.
                </p>
              </div>
            </div>
          </div>

          {/* Activities */}
          <div className="fade-in mb-16">
            <h2 className="text-4xl font-bold text-deep-blue mb-8">Our Activities</h2>
            <div className="space-y-4">
              <div className="p-6 bg-light-gray rounded-xl border-l-4 border-pink-400">
                <h3 className="text-xl font-bold text-deep-blue mb-2">Weekly Women's Fellowship</h3>
                <p className="text-gray-700">Regular gatherings for prayer, Bible study, and meaningful conversation.</p>
              </div>
              <div className="p-6 bg-light-gray rounded-xl border-l-4 border-pink-400">
                <h3 className="text-xl font-bold text-deep-blue mb-2">Monthly Women's Brunch</h3>
                <p className="text-gray-700">Inspirational talks, networking, and celebration of sisterhood.</p>
              </div>
              <div className="p-6 bg-light-gray rounded-xl border-l-4 border-pink-400">
                <h3 className="text-xl font-bold text-deep-blue mb-2">Mentorship & Counseling</h3>
                <p className="text-gray-700">One-on-one support for women navigating life challenges and spiritual growth.</p>
              </div>
              <div className="p-6 bg-light-gray rounded-xl border-l-4 border-pink-400">
                <h3 className="text-xl font-bold text-deep-blue mb-2">Community Outreach</h3>
                <p className="text-gray-700">Service projects supporting vulnerable women and families in our community.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-pink-400 to-pink-500 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-2xl lg:text-3xl font-serif italic mb-6">
            "She is clothed with strength and dignity; she can laugh at the days to come."
          </p>
          <p className="text-lg text-gold font-semibold">PROVERBS 31:25</p>
        </div>
      </section>

      {/* Call to Action */}
      <section ref={statsRef} className="py-16 px-4 sm:px-6 lg:px-8 bg-light-gray">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-deep-blue mb-6">Join Our Community</h2>
          <p className="text-lg text-gray-700 mb-8">
            Whether you're seeking spiritual growth, meaningful friendships, or a supportive community, we welcome you to join our Women's Ministry.
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
