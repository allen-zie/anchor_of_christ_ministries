import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Footer from '@/components/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function TheProphet() {
  const pageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-light-gray to-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl lg:text-6xl font-bold text-deep-blue mb-6">
            The Prophet
          </h1>
          <p className="text-xl text-gray-600">
            Meet the visionary leader guiding Anchor of Christ International Ministries
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section ref={contentRef} className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Profile */}
          <div className="fade-in grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            <div className="md:col-span-1">
              <div className="w-full aspect-square bg-gradient-to-br from-deep-blue to-gold rounded-lg shadow-xl overflow-hidden">
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-deep-blue/20 to-gold/20">
                  <span className="text-6xl">👨‍🔬</span>
                </div>
              </div>
            </div>
            <div className="md:col-span-2">
              <h2 className="text-3xl font-bold text-deep-blue mb-4">Prophet [Name]</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                With over 15 years of dedicated service to God's kingdom, Prophet [Name] has been instrumental in establishing Anchor of Christ International Ministries as a beacon of hope and spiritual transformation across the globe.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                His unwavering commitment to biblical truth, prophetic insight, and pastoral care has touched thousands of lives and established partnerships with churches and ministries worldwide.
              </p>
            </div>
          </div>

          {/* Ministry Focus */}
          <div className="fade-in">
            <h2 className="text-3xl font-bold text-deep-blue mb-6">Ministry Focus</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-gradient-to-br from-deep-blue/10 to-gold/10 rounded-lg border border-gold/20">
                <h3 className="text-xl font-bold text-deep-blue mb-3">Prophetic Ministry</h3>
                <p className="text-gray-700">
                  Delivering God's message with clarity, compassion, and conviction to guide believers toward spiritual maturity and kingdom purpose.
                </p>
              </div>
              <div className="p-6 bg-gradient-to-br from-red-500/10 to-pink-400/10 rounded-lg border border-red-500/20">
                <h3 className="text-xl font-bold text-deep-blue mb-3">Pastoral Care</h3>
                <p className="text-gray-700">
                  Shepherding believers with genuine concern, providing counsel, encouragement, and spiritual direction for their journey with Christ.
                </p>
              </div>
              <div className="p-6 bg-gradient-to-br from-gold/10 to-yellow-600/10 rounded-lg border border-gold/20">
                <h3 className="text-xl font-bold text-deep-blue mb-3">Global Outreach</h3>
                <p className="text-gray-700">
                  Traveling internationally to spread the Gospel, establish church partnerships, and minister to communities in need of spiritual transformation.
                </p>
              </div>
              <div className="p-6 bg-gradient-to-br from-light-blue/10 to-deep-blue/10 rounded-lg border border-deep-blue/20">
                <h3 className="text-xl font-bold text-deep-blue mb-3">Leadership Development</h3>
                <p className="text-gray-700">
                  Mentoring and equipping emerging leaders to carry forward the vision of advancing God's kingdom with excellence and integrity.
                </p>
              </div>
            </div>
          </div>

          {/* Testimony */}
          <div className="fade-in bg-gradient-to-r from-deep-blue to-blue-700 text-white p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">A Word from the Prophet</h2>
            <p className="text-lg leading-relaxed italic">
              "My heart's desire is to see believers anchored firmly in Christ, rooted in His Word, and empowered by His Spirit to impact their world. The journey of faith is not always easy, but it is always rewarding. As we continue to grow and reach new frontiers, I am convinced that God's purposes will be fulfilled through our collective dedication and obedience to His call."
            </p>
          </div>

          {/* Contact */}
          <div className="fade-in text-center">
            <h2 className="text-2xl font-bold text-deep-blue mb-4">Connect with the Ministry</h2>
            <p className="text-gray-700 mb-6">
              For speaking engagements, ministry partnerships, or to learn more about our work, please contact us.
            </p>
            <button className="px-8 py-3 bg-deep-blue text-white font-bold rounded-full hover:bg-opacity-90 transition-all transform hover:scale-105">
              Get in Touch
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
