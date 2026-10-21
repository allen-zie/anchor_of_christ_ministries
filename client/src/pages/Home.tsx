import { useEffect, useRef } from 'react';
import { Link } from 'wouter';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Footer from '@/components/Footer';
import ThreeDBoat from '@/components/ThreeDBoat';
import { ArrowRight, CalendarDays, Clock3, Heart, MapPin, Users, Globe, Hand } from 'lucide-react';
import { formatEventDate, getUpcomingEvents } from '@/lib/events';
import ProphetImage from '@/content/images/Prophet6.webp';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const pageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero text animations
    if (heroRef.current) {
      const headings = heroRef.current.querySelectorAll('h1, p');
      gsap.fromTo(
        headings,
        { y: 30 },
        {
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
        }
      );

      const buttons = heroRef.current.querySelectorAll('button');
      gsap.fromTo(
        buttons,
        { scale: 0.9 },
        {
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
        { scale: 0.8 },
        {
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
        { y: 50 },
        {
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

  const featuredEvents = getUpcomingEvents().slice(0, 2);

  return (
    <div ref={pageRef} className="min-h-screen bg-white">

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-light-gray to-white"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="inline-block px-4 py-2 bg-gold/10 border border-gold rounded-full">
              <p className="text-sm font-semibold text-gold uppercase">Welcome to TAOCIM</p>
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
      <section ref={statsRef} className="relative overflow-hidden bg-[#f4f8fd] px-4 py-20 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white to-transparent" />
        <div className="relative mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-[#d8b25b]">Our foundation</p>
            <h2 className="text-3xl font-bold text-[#123a82] sm:text-4xl">Ministry Pillars</h2>
            <div className="mx-auto mt-4 h-1 w-14 rounded-full bg-[#d8b25b]" />
          </div>

          <div className="stat-card overflow-hidden rounded-[2rem] border border-white/90 bg-white/80 shadow-[0_24px_70px_rgba(18,58,130,0.14)] backdrop-blur-xl">
            <div className="grid grid-cols-1 divide-y divide-[#dbe5f2] sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
              <div className="group px-6 py-9 text-center transition-transform duration-300 hover:-translate-y-1 lg:px-8">
                <div className="mx-auto mb-5 flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full bg-[#1756c6] text-white shadow-[0_12px_24px_rgba(23,86,198,0.3)] ring-8 ring-[#1756c6]/10 transition-transform duration-300 group-hover:scale-105">
                  <Heart className="h-8 w-8" fill="currentColor" aria-hidden="true" />
                </div>
                <h3 className="mb-2 text-base font-bold uppercase tracking-[0.08em] text-[#123a82]">Winning Souls</h3>
                <p className="text-sm leading-6 text-[#5c6d86]">Reaching the lost with the Gospel</p>
                <div className="mx-auto mt-5 h-1 w-8 rounded-full bg-[#d8b25b]" />
              </div>

              <div className="group px-6 py-9 text-center transition-transform duration-300 hover:-translate-y-1 lg:px-8">
                <div className="mx-auto mb-5 flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full bg-[#1756c6] text-white shadow-[0_12px_24px_rgba(23,86,198,0.3)] ring-8 ring-[#1756c6]/10 transition-transform duration-300 group-hover:scale-105">
                  <Users className="h-8 w-8" aria-hidden="true" />
                </div>
                <h3 className="mb-2 text-base font-bold uppercase tracking-[0.08em] text-[#123a82]">Building Believers</h3>
                <p className="text-sm leading-6 text-[#5c6d86]">Equipping saints for spiritual growth</p>
                <div className="mx-auto mt-5 h-1 w-8 rounded-full bg-[#e52d4f]" />
              </div>

              <div className="group px-6 py-9 text-center transition-transform duration-300 hover:-translate-y-1 lg:px-8">
                <div className="mx-auto mb-5 flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full bg-[#1756c6] text-white shadow-[0_12px_24px_rgba(23,86,198,0.3)] ring-8 ring-[#1756c6]/10 transition-transform duration-300 group-hover:scale-105">
                  <Globe className="h-8 w-8" aria-hidden="true" />
                </div>
                <h3 className="mb-2 text-base font-bold uppercase tracking-[0.08em] text-[#123a82]">Impacting Nations</h3>
                <p className="text-sm leading-6 text-[#5c6d86]">Taking the love of Christ to the world</p>
                <div className="mx-auto mt-5 h-1 w-8 rounded-full bg-[#d8b25b]" />
              </div>

              <div className="group px-6 py-9 text-center transition-transform duration-300 hover:-translate-y-1 lg:px-8">
                <div className="mx-auto mb-5 flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full bg-[#1756c6] text-white shadow-[0_12px_24px_rgba(23,86,198,0.3)] ring-8 ring-[#1756c6]/10 transition-transform duration-300 group-hover:scale-105">
                  <Hand className="h-8 w-8" aria-hidden="true" />
                </div>
                <h3 className="mb-2 text-base font-bold uppercase tracking-[0.08em] text-[#123a82]">Serving With Love</h3>
                <p className="text-sm leading-6 text-[#5c6d86]">Demonstrating Christ's love in action</p>
                <div className="mx-auto mt-5 h-1 w-8 rounded-full bg-[#f2a9c1]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events Preview */}
      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-gold">Be part of the gathering</p>
            <h2 className="text-3xl font-bold text-deep-blue sm:text-4xl">Upcoming at TAOCIM</h2>
            <p className="mt-4 max-w-lg text-lg leading-8 text-gray-600">
              Make room for worship, prayer, teaching, and fellowship. These are the next two scheduled events from our full ministry calendar.
            </p>
            <Link href="/events">
              <a className="mt-7 inline-flex items-center gap-2 rounded-full bg-deep-blue px-6 py-3 text-sm font-bold text-white transition-all hover:-translate-y-1 hover:bg-blue-700" aria-label="View all upcoming events">
                VIEW ALL EVENTS <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {featuredEvents.map((event) => (
              <Link key={event.id} href="/events">
                <a className={`group block overflow-hidden rounded-3xl bg-gradient-to-br ${event.color} p-6 text-white shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl`} aria-label={`View ${event.title} event details`}>
                  <div className="mb-6 flex items-start justify-between gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/20">
                      <CalendarDays className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                  </div>
                  <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-white/75">Upcoming event</p>
                  <h3 className="mb-5 text-2xl font-bold text-white">{event.title}</h3>
                  <div className="space-y-3 text-sm text-white/90">
                    <p className="flex items-center gap-2"><CalendarDays className="h-4 w-4" aria-hidden="true" />{formatEventDate(event.startDate, event.endDate)}</p>
                    <p className="flex items-center gap-2"><Clock3 className="h-4 w-4" aria-hidden="true" />{event.time}</p>
                    <p className="flex items-center gap-2"><MapPin className="h-4 w-4" aria-hidden="true" />{event.location}</p>
                  </div>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </section>
       {/* Prophet/Leader Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-750 to-blue-600 text-white">
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  {/* Left - Image Placeholder */}
                  <div className="flex justify-center">
                    <div className="w-80 h-96 ">
                      <div className="text-center">
                        <div className="text-6xl mb-4">
                          <img src={ProphetImage} alt="Prophet Dr D. Chauke" className="w-full h-full object-cover rounded-full" />
                        </div>
                        <p className="text-white font-semibold">Prophet Dr D. Chauke</p>
                      </div>
                    </div>
                  </div>
      
                  {/* Right - Content */}
                  <div className="space-y-6">
                    <div>
                      <p className="text-gold font-semibold uppercase mb-2">Leadership</p>
                      <h2 className="text-4xl font-bold mb-4">Meet Prophet Dr D. Chauke</h2>
                    </div>
      
                    <p className="text-lg text-gray-100 leading-relaxed">
                      Prophet Dr D. Chauke is a man of deep faith, vision, and unwavering commitment to God's Kingdom. With decades of experience in ministry, he has guided Anchor of Christ International Ministries with wisdom, integrity, and a passion for savouring Christ and bringing souls to Jesus.
                    </p>
      
                    <p className="text-lg text-gray-100 leading-relaxed">
                      Under God's guidance and spiritual leadership, the ministry has grown from a small congregation to an international movement impacting lives across multiple countries. With teachings emphasising the power of God's Word, the importance of discipleship, and the necessity of serving others with Christ's love.
                    </p>
      
                    <div className="space-y-4 pt-4">
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-blue-700 font-bold">✓</span>
                        </div>
                        <div>
                          <h3 className="font-bold mb-1">Visionary Leadership</h3>
                          <p className="text-gray-100">Guiding the ministry with clear vision and spiritual direction</p>
                        </div>
                      </div>
      
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-blue-700 font-bold">✓</span>
                        </div>
                        <div>
                          <h3 className="font-bold mb-1">Spiritual Mentorship</h3>
                          <p className="text-gray-100">Equipping leaders and believers for greater impact</p>
                        </div>
                      </div>
      
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-blue-700 font-bold">✓</span>
                        </div>
                        <div>
                          <h3 className="font-bold mb-1">Global Outreach</h3>
                          <p className="text-gray-100">Extending the Gospel's reach across nations and cultures</p>
                        </div>
                      </div>
                    </div>

                  <Link href="/the-prophet">
                    <a className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-bold text-deep-blue transition-transform hover:-translate-y-1">
                      READ HIS BIOGRAPHY <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </Link>

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
            <i>"We have this hope as an anchor for the soul, firm and secure. It enters the inner sanctuary behind the curtain."</i>
          </p>
          <p className="text-lg text-gold font-semibold"><b>HEBREWS 6 vs 19</b></p>
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
            <p className="text-3xl lg:text-4xl font-bold text-deep-blue">50+</p>
            <p className="text-sm text-gray-600 mt-2">Church Partners</p>
          </div>
          <div>
            <p className="text-3xl lg:text-4xl font-bold text-deep-blue">20+</p>
            <p className="text-sm text-gray-600 mt-2">Countries Reached</p>
          </div>
          <div>
            <p className="text-3xl lg:text-4xl font-bold text-deep-blue">14</p>
            <p className="text-sm text-gray-600 mt-2">Years of Ministry</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
