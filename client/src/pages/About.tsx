import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { BookOpen, Anchor, Target, Heart, Play, Youtube } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
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

    // Timeline animations
    if (timelineRef.current) {
      gsap.fromTo(
        timelineRef.current.querySelectorAll('.timeline-item'),
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: timelineRef.current,
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
        className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-light-gray to-white"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="hero-animate inline-block px-4 py-2 bg-gold/10 border border-gold rounded-full">
              <p className="text-sm font-semibold text-gold uppercase">About Us</p>
            </div>

            <h1 className="hero-animate text-5xl lg:text-6xl font-bold text-deep-blue leading-tight">
              Anchored in Christ,<br />
              <span className="text-gold">Building His House</span>
            </h1>

            <p className="hero-animate text-lg text-gray-700 leading-relaxed">
              Since 2012, The Anchor of Christ International Ministries has been reaching souls, building believers, and impacting nations with the love of Christ.
            </p>
          </div>

          {/* Right - YouTube Video */}
          <a
            className="hero-animate group relative block aspect-video overflow-hidden rounded-3xl bg-gradient-to-br from-deep-blue via-blue-800 to-blue-950 shadow-2xl"
            href="https://www.youtube.com/@taocim_TV7/videos"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Watch Anchor of Christ International Ministries on YouTube"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(212,175,55,0.45),transparent_35%),linear-gradient(135deg,transparent,rgba(0,0,0,0.35))]" />
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full border border-gold/40" />
            <div className="absolute -bottom-16 -left-8 h-48 w-48 rounded-full border border-white/15" />
            <div className="relative flex h-full flex-col items-center justify-center px-8 text-center text-white">
              <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-red-600 shadow-lg shadow-red-950/40 transition-transform duration-300 group-hover:scale-110">
                <Play className="ml-1 h-9 w-9 fill-white text-white" aria-hidden="true" />
              </div>
              <Youtube className="mb-3 h-7 w-7 text-gold" aria-hidden="true" />
              <h2 className="text-2xl font-bold sm:text-3xl">Watch Our Ministry</h2>
              <p className="mt-2 max-w-sm text-sm leading-6 text-blue-100">Messages, worship, prayer, and ministry moments from Anchor of Christ International Ministries.</p>
              <span className="mt-5 rounded-full border border-white/30 px-5 py-2 text-sm font-semibold transition-colors group-hover:border-gold group-hover:text-gold">Play on YouTube</span>
            </div>
          </a>
        </div>
      </section>

      {/* Ministry Information Cards */}
      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-gold">Who we are</p>
            <h2 className="mb-4 text-4xl font-bold text-deep-blue">Our Ministry Foundations</h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">The history, vision, and mission that keep our ministry anchored in Christ.</p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="p-6 rounded-2xl border border-gray-100 bg-white shadow-lg">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center flex-shrink-0"><BookOpen className="w-6 h-6 text-gold" aria-hidden="true" /></div>
                <div><h3 className="mb-2 font-bold text-deep-blue">OUR HISTORY</h3><p className="text-sm leading-6 text-gray-700">What began in faith and prayer in 2012 has grown into an international ministry touching lives across nations. We have remained rooted in God&apos;s Word, trusting His guidance every step of the way.</p></div>
              </div>
            </div>

            <div className="p-6 rounded-2xl border border-gray-100 bg-white shadow-lg">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center flex-shrink-0"><Anchor className="w-6 h-6 text-gold" aria-hidden="true" /></div>
                <div><h3 className="mb-2 font-bold text-deep-blue">OUR VISION</h3><p className="text-sm leading-6 text-gray-700">To serve Christ, touch lives, win souls to Jesus, and bring transformation to communities in Bulawayo and the world.</p><p className="mt-3 text-sm leading-6 text-gray-700">The fruit of the righteous is a tree of life, and whoever captures souls is wise. ~ Proverbs 11:30</p></div>
              </div>
            </div>

            <div className="p-6 rounded-2xl border border-gray-100 bg-white shadow-lg">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center flex-shrink-0"><Target className="w-6 h-6 text-gold" aria-hidden="true" /></div>
                <div><h3 className="mb-2 font-bold text-deep-blue">OUR MISSION STATEMENT</h3><ol className="space-y-2 text-sm leading-6 text-gray-700"><li>1. To honour Jesus Christ, the living Word.</li><li>2. To make a positive impact on lives and lead people to a personal relationship with Jesus Christ with love, hope, and prayer.</li><li>3. To reach nations through preaching God&apos;s revelations, setting people free, and touching lives through giving.</li></ol></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statement and Prayer of Faith */}
      <section className="bg-gradient-to-b from-light-gray to-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-2">
          <article className="rounded-3xl border border-gold/30 bg-white p-8 shadow-lg sm:p-10">
            <div className="mb-5 flex items-center gap-3"><div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold text-white"><Anchor className="h-6 w-6" aria-hidden="true" /></div><h2 className="text-3xl font-bold text-deep-blue">Statement of Faith</h2></div>
            <div className="space-y-4 text-gray-700 leading-7"><p>Our church logo represents our statement of faith.</p><p>If you look at our church logo, there is a boat and an anchor.</p><p>We are anchored in Christ Jesus. The Angel of God said, we are in this unstable, turbulent world (the boat) but it is balance by the Anchor (Jesus Christ).</p><p>We are a prophetic, healing and deliverance ministry which believe that Jesus Christ is the Son of Christ and that he was crucified, died and was buried. On the third day He rose and later ascended to heaven where He remains at the right hand of the Father (the almighty God).</p><p>We believe in the Trinity (God the Father, Jesus Christ and the Holy Spirit) and the Fivefold ministries.</p></div>
          </article>

          <article className="rounded-3xl border border-deep-blue/20 bg-deep-blue p-8 text-white shadow-lg sm:p-10">
            <div className="mb-5 flex items-center gap-3"><div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold text-white"><Heart className="h-6 w-6" aria-hidden="true" /></div><h2 className="text-3xl font-bold text-gold">The Prayer of Faith</h2></div>
            <blockquote className="border-l-4 border-gold pl-5 text-lg leading-8 text-blue-50"><p>Is anyone among you suffering? Let him Pray.</p><p>Is anyone cheerful? Let him sing Praise.</p><p>Is anyone among you sick? Let him call for the elders of the church, and let them pray over him, anointing him with oil in the name of the Lord.</p><p>And the prayer of faith will save the one who is sick, and the Lord will raise him up.</p><p>And if he has committed sins, he will be forgiven.</p><footer className="mt-5 font-bold not-italic text-gold">James 5: 13 – 15</footer></blockquote>
          </article>
        </div>
      </section>

      {/* Content Section - Core Values */}
      <section ref={contentRef} className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-deep-blue mb-4">Our Core Values</h2>
            <p className="text-lg text-gray-600">The principles that guide everything we do</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="fade-in p-8 bg-gradient-to-br from-deep-blue/10 to-gold/10 rounded-2xl border border-gold/20">
              <div className="w-12 h-12 bg-deep-blue rounded-full flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-gold" />
              </div>
              <h3 className="text-xl font-bold text-deep-blue mb-3">Faith in Christ</h3>
              <p className="text-gray-700">
                Jesus Christ is the foundation of all we do. We believe in His resurrection, redemption, and return.
              </p>
            </div>

            <div className="fade-in p-8 bg-gradient-to-br from-red-500/10 to-pink-400/10 rounded-2xl border border-red-500/20">
              <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-deep-blue mb-3">Compassion & Service</h3>
              <p className="text-gray-700">
                We serve others with genuine love, meeting both spiritual and physical needs of those we encounter.
              </p>
            </div>

            <div className="fade-in p-8 bg-gradient-to-br from-gold/10 to-yellow-600/10 rounded-2xl border border-gold/20">
              <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-deep-blue mb-3">Integrity & Truth</h3>
              <p className="text-gray-700">
                We uphold biblical truth and operate with transparency, honesty, and accountability in all endeavors.
              </p>
            </div>

            <div className="fade-in p-8 bg-gradient-to-br from-light-blue/10 to-deep-blue/10 rounded-2xl border border-deep-blue/20">
              <div className="w-12 h-12 bg-deep-blue rounded-full flex items-center justify-center mb-4">
                <Anchor className="w-6 h-6 text-gold" />
              </div>
              <h3 className="text-xl font-bold text-deep-blue mb-3">Global Impact</h3>
              <p className="text-gray-700">
                We are committed to reaching across borders, cultures, and communities to spread the Gospel worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section ref={timelineRef} className="py-16 px-4 sm:px-6 lg:px-8 bg-light-gray">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-deep-blue mb-4">Our Journey</h2>
            <p className="text-lg text-gray-600">A timeline of faith and growth</p>
          </div>

          <div className="space-y-8">
            {/* 2012 */}
            <div className="timeline-item flex gap-6">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-deep-blue rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  2012
                </div>
                <div className="w-1 h-24 bg-gradient-to-b from-deep-blue to-transparent mt-4"></div>
              </div>
              <div className="p-6 bg-white rounded-2xl shadow-lg flex-1 border-l-4 border-deep-blue">
                <h3 className="text-xl font-bold text-deep-blue mb-2">The Beginning of Our Journey in Faith</h3>
                <p className="text-gray-700">
                  The Anchor of Christ International Ministries was founded with a vision to reach souls and build believers. What started as a small group of faithful believers has become a beacon of hope.
                </p>
              </div>
            </div>

            {/* 2015 */}
            <div className="timeline-item flex gap-6">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  2015
                </div>
                <div className="w-1 h-24 bg-gradient-to-b from-gold to-transparent mt-4"></div>
              </div>
              <div className="p-6 bg-white rounded-2xl shadow-lg flex-1 border-l-4 border-gold">
                <h3 className="text-xl font-bold text-deep-blue mb-2">Establishing Foundations, Building the Vision</h3>
                <p className="text-gray-700">
                  We established our foundational structures and launched our first international outreach programs. This period marked the expansion of our ministry across multiple regions.
                </p>
              </div>
            </div>

            {/* 2018 */}
            <div className="timeline-item flex gap-6">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  2018
                </div>
                <div className="w-1 h-24 bg-gradient-to-b from-red-500 to-transparent mt-4"></div>
              </div>
              <div className="p-6 bg-white rounded-2xl shadow-lg flex-1 border-l-4 border-red-500">
                <h3 className="text-xl font-bold text-deep-blue mb-2">Growing in Faith, Launching Ministries, Teaching More Lives</h3>
                <p className="text-gray-700">
                  Our ministry expanded significantly with new discipleship programs and leadership training initiatives. We reached thousands of lives across multiple nations.
                </p>
              </div>
            </div>

            {/* 2024 */}
            <div className="timeline-item flex gap-6">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  2024+
                </div>
              </div>
              <div className="p-6 bg-white rounded-2xl shadow-lg flex-1 border-l-4 border-pink-500">
                <h3 className="text-xl font-bold text-deep-blue mb-2">Expanding Our Reach, Equipping Leaders, Impacting Nations</h3>
                <p className="text-gray-700">
                  We continue to expand our global footprint, equipping leaders and impacting nations. Our vision remains clear: to see the Gospel transform lives across the world.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prophet/Leader Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-deep-blue to-blue-700 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Image Placeholder */}
            <div className="flex justify-center">
              <div className="w-80 h-96 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/20">
                <div className="text-center">
                  <div className="text-6xl mb-4">👨‍🙏</div>
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
                    <span className="text-deep-blue font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Visionary Leadership</h3>
                    <p className="text-gray-100">Guiding the ministry with clear vision and spiritual direction</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-deep-blue font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Spiritual Mentorship</h3>
                    <p className="text-gray-100">Equipping leaders and believers for greater impact</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-deep-blue font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Global Outreach</h3>
                    <p className="text-gray-100">Extending the Gospel's reach across nations and cultures</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Building More Than Ministries Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-light-gray">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Content */}
            <div className="space-y-6">
              <div>
                <p className="text-gold font-semibold uppercase mb-2">Our Impact</p>
                <h2 className="text-4xl font-bold text-deep-blue mb-4">Building More Than Ministries</h2>
              </div>

              <p className="text-lg text-gray-700 leading-relaxed">
                One of our first acts of love was building a house for Gogo Ndebele. This act of kindness reflects our heart to serve both spiritually and physically, demonstrating Christ's love in action.
              </p>

              <p className="text-lg text-gray-700 leading-relaxed">
                We believe that true ministry goes beyond preaching the Gospel—it means meeting people's practical needs, showing compassion, and building communities where Christ's love is tangible and transformative.
              </p>

              <button className="px-8 py-3 bg-gold text-deep-blue font-bold rounded-full hover:bg-opacity-90 transition-all transform hover:scale-105">
                OUR IMPACT IN ACTION →
              </button>
            </div>

            {/* Right - Image Placeholder */}
            <div className="flex justify-center">
              <div className="w-full h-96 bg-gradient-to-br from-deep-blue/10 to-gold/10 rounded-2xl flex items-center justify-center border border-gold/20">
                <div className="text-center">
                  <div className="text-6xl mb-4">🏠</div>
                  <p className="text-deep-blue font-semibold">Community Impact</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-deep-blue to-blue-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-2xl lg:text-3xl font-serif italic mb-6">
            "So we, being many, are one body in Christ, and individually members of one another."
          </p>
          <p className="text-lg text-gold font-semibold">ROMANS 12:5</p>
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
