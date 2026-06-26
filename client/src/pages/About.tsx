import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-light-gray to-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl lg:text-6xl font-bold text-deep-blue mb-6">
            About Our Ministry
          </h1>
          <p className="text-xl text-gray-600">
            Discover the mission, vision, and values that drive Anchor of Christ International Ministries
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section ref={contentRef} className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Mission */}
          <div className="fade-in">
            <h2 className="text-3xl font-bold text-deep-blue mb-4">Our Mission</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Anchor of Christ International Ministries is dedicated to winning souls for Christ, building believers in spiritual maturity, and impacting nations with the transformative power of the Gospel. We believe in the power of God's Word and the necessity of spreading Christ's love to every corner of the world.
            </p>
          </div>

          {/* Vision */}
          <div className="fade-in">
            <h2 className="text-3xl font-bold text-deep-blue mb-4">Our Vision</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              To establish a global network of believers united in faith, committed to advancing God's kingdom, and dedicated to serving humanity with compassion and truth. We envision a world where the Gospel transforms lives, heals communities, and brings hope to the hopeless.
            </p>
          </div>

          {/* Core Values */}
          <div className="fade-in">
            <h2 className="text-3xl font-bold text-deep-blue mb-6">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-gradient-to-br from-deep-blue/10 to-gold/10 rounded-lg border border-gold/20">
                <h3 className="text-xl font-bold text-deep-blue mb-3">Faith in Christ</h3>
                <p className="text-gray-700">
                  Jesus Christ is the foundation of all we do. We believe in His resurrection, redemption, and return.
                </p>
              </div>
              <div className="p-6 bg-gradient-to-br from-red-500/10 to-pink-400/10 rounded-lg border border-red-500/20">
                <h3 className="text-xl font-bold text-deep-blue mb-3">Compassion & Service</h3>
                <p className="text-gray-700">
                  We serve others with genuine love, meeting both spiritual and physical needs of those we encounter.
                </p>
              </div>
              <div className="p-6 bg-gradient-to-br from-gold/10 to-yellow-600/10 rounded-lg border border-gold/20">
                <h3 className="text-xl font-bold text-deep-blue mb-3">Integrity & Truth</h3>
                <p className="text-gray-700">
                  We uphold biblical truth and operate with transparency, honesty, and accountability in all endeavors.
                </p>
              </div>
              <div className="p-6 bg-gradient-to-br from-light-blue/10 to-deep-blue/10 rounded-lg border border-deep-blue/20">
                <h3 className="text-xl font-bold text-deep-blue mb-3">Global Impact</h3>
                <p className="text-gray-700">
                  We are committed to reaching across borders, cultures, and communities to spread the Gospel worldwide.
                </p>
              </div>
            </div>
          </div>

          {/* History */}
          <div className="fade-in">
            <h2 className="text-3xl font-bold text-deep-blue mb-4">Our Story</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Founded on the principles of faith, dedication, and service, Anchor of Christ International Ministries has grown from a small group of believers into a thriving global ministry. Over the past 15 years, we have touched the lives of thousands, established partnerships with churches worldwide, and reached communities across 50+ countries.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mt-4">
              Our journey is marked by God's faithfulness, the dedication of our team, and the support of our partners and donors. Every milestone represents lives changed, souls won, and believers strengthened in their faith.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
