import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'wouter';
import Footer from '@/components/Footer';
import { Heart, Users, Globe, Zap, Building2, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Ministries() {
  const pageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const ministriesRef = useRef<HTMLDivElement>(null);
  const departmentsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [expandedDept, setExpandedDept] = useState<number | null>(null);

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

    // Ministries card animations
    if (ministriesRef.current) {
      gsap.fromTo(
        ministriesRef.current.querySelectorAll('.ministry-card'),
        { scale: 0.9 },
        {
          scale: 1,
          duration: 0.6,
          stagger: 0.15,
          scrollTrigger: {
            trigger: ministriesRef.current,
            start: 'top center',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    // Departments animations
    if (departmentsRef.current) {
      gsap.fromTo(
        departmentsRef.current.querySelectorAll('.dept-item'),
        { x: -30 },
        {
          x: 0,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: departmentsRef.current,
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

  const ministries = [
    {
      title: "Men's Ministry",
      description: 'Equipping men to lead with faith, strength, and integrity.',
      icon: '⚔️',
      color: 'from-deep-blue to-blue-700',
      link: '/men-ministry',
    },
    {
      title: "Women's Ministry",
      description: 'Empowering women to grow in grace, purpose, and godly fellowship.',
      icon: '🌸',
      color: 'from-pink-400 to-pink-500',
      link: '/women-ministry',
    },
    {
      title: 'Youth Ministry',
      description: 'Inspiring young hearts to live boldly for Christ in today\'s world.',
      icon: '⚡',
      color: 'from-gold to-yellow-600',
      link: '/youth-ministry',
    },
    {
      title: "Children's Ministry",
      description: 'Nurturing young minds with Biblical truths through fun and creativity.',
      icon: '🏰',
      color: 'from-red-500 to-red-600',
      link: '/children-ministry',
    },
    {
      title: 'Anna Group',
      description: 'A ministry dedicated to honoring and supporting our senior members.',
      icon: '👵',
      color: 'from-purple-500 to-purple-600',
      link: '/anna-group',
    },
  ];

  const departments = [
    {
      name: 'Finance',
      description: 'Managing resources with integrity and transparency to support our mission.',
      icon: '💰',
    },
    {
      name: 'Health Department',
      description: 'Providing healthcare support and wellness programs for our community.',
      icon: '🏥',
    },
    {
      name: 'Media and PR',
      description: 'Communicating our message and sharing our impact with the world.',
      icon: '📱',
    },
    {
      name: 'Cleaning',
      description: 'Maintaining a clean and welcoming environment for worship and fellowship.',
      icon: '🧹',
    },
    {
      name: 'Décor',
      description: 'Creating beautiful and inspiring spaces for our services and events.',
      icon: '🎨',
    },
    {
      name: 'Security',
      description: 'Ensuring the safety and security of our members and facilities.',
      icon: '🔒',
    },
    {
      name: 'Protocol',
      description: 'Coordinating events and ensuring smooth operations during services.',
      icon: '📋',
    },
    {
      name: "Pastor's Welfare",
      description: 'Supporting and caring for our pastoral leadership and their families.',
      icon: '🙏',
    },
    {
      name: 'Prayer Group',
      description: 'Interceding for our church, nation, and the world through fervent prayer.',
      icon: '🕯️',
    },
    {
      name: 'Evangelism',
      description: 'Reaching the lost and sharing the Gospel message with boldness and love.',
      icon: '📢',
    },
    {
      name: 'Praise and Worship',
      description: 'Leading our congregation in worship and creating an atmosphere of praise.',
      icon: '🎵',
    },
  ];

  return (
    <div ref={pageRef} className="min-h-screen bg-white">

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="pt-55 pb-35 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-light-gray to-white"
        style={{
          // backgroundImage: `url("${location}")`,
          backgroundImage: `url("https://thumbs.dreamstime.com/b/old-scroll-paper-background-old-scroll-paper-background-361158206.jpg?w=992")`,
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="hero-animate inline-block px-4 py-2 bg-gold/10 border border-gold rounded-full mb-6">
            <p className="text-sm font-semibold text-gold uppercase">Our Ministries</p>
          </div>

          <h1 className="hero-animate text-5xl lg:text-6xl font-bold text-deep-blue leading-tight mb-6">
            Our <span className="text-gold">Ministries</span>
          </h1>

          <p className="hero-animate text-lg text-gray-700 leading-relaxed max-w-3xl">
            At The Anchor of Christ, we serve every generation with purpose and love. Explore the different ministries making an eternal impact.
          </p>
        </div>
      </section>

      {/* Ministries Grid */}
      <section ref={ministriesRef} className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {ministries.map((ministry, index) => (
              <Link key={index} href={ministry.link}>
                <div className={`ministry-card p-8 bg-gradient-to-br ${ministry.color} rounded-2xl shadow-lg text-white hover:shadow-2xl transition-all transform hover:scale-105 cursor-pointer h-full flex flex-col justify-between`}>
                  <div>
                    <div className="text-6xl mb-4">{ministry.icon}</div>
                    <h3 className="text-xl font-bold mb-3">{ministry.title}</h3>
                    <p className="text-sm text-gray-100">{ministry.description}</p>
                  </div>
                  <div className="flex items-center gap-2 mt-6 text-sm font-semibold">
                    EXPLORE <ArrowRight size={16} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-deep-blue to-blue-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-2xl lg:text-3xl font-serif italic mb-6">
            "We have this hope as an anchor for the soul, firm and secure. It enters the inner sanctuary behind the curtain."
          </p>
          <p className="text-lg text-gold font-semibold">HEBREWS 6:19</p>
        </div>
      </section>

      {/* Departments Section */}
      <section ref={departmentsRef} className="py-16 px-4 sm:px-6 lg:px-8 bg-light-gray">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-deep-blue mb-4">Our Departments</h2>
            <p className="text-lg text-gray-600">Supporting our mission through specialized service and dedication</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((dept, index) => (
              <div
                key={index}
                className="dept-item p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all cursor-pointer"
                onClick={() => setExpandedDept(expandedDept === index ? null : index)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">{dept.icon}</div>
                  <div className={`w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center transform transition-transform ${expandedDept === index ? 'rotate-180' : ''}`}>
                    <ArrowRight size={16} className="text-gold" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-deep-blue mb-2">{dept.name}</h3>
                <p className="text-gray-700 text-sm">{dept.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section ref={statsRef} className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="stat-item">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Heart className="w-6 h-6 text-deep-blue" />
                <p className="text-3xl lg:text-4xl font-bold text-deep-blue">4</p>
              </div>
              <p className="text-sm text-gray-600">Active Ministries</p>
            </div>
            <div className="stat-item">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Building2 className="w-6 h-6 text-deep-blue" />
                <p className="text-3xl lg:text-4xl font-bold text-deep-blue">11</p>
              </div>
              <p className="text-sm text-gray-600">Departments</p>
            </div>
            <div className="stat-item">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Users className="w-6 h-6 text-deep-blue" />
                <p className="text-3xl lg:text-4xl font-bold text-deep-blue">500+</p>
              </div>
              <p className="text-sm text-gray-600">Lives Impacted</p>
            </div>
            <div className="stat-item">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Globe className="w-6 h-6 text-deep-blue" />
                <p className="text-3xl lg:text-4xl font-bold text-deep-blue">1</p>
              </div>
              <p className="text-sm text-gray-600">Mission: To Know Christ and Make Him Known</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-deep-blue to-blue-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Get Involved</h2>
          <p className="text-lg mb-8">
            Whether through volunteering, giving, or prayer support, you can be part of our mission to transform lives and advance God's kingdom.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <button className="px-8 py-3 bg-gold text-deep-blue font-bold rounded-full hover:bg-opacity-90 transition-all transform hover:scale-105">
                Volunteer Now
              </button>
            </Link>
            <Link href="/giving">
              <button className="px-8 py-3 bg-white text-deep-blue font-bold rounded-full hover:bg-opacity-90 transition-all transform hover:scale-105">
                Support Our Work
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
