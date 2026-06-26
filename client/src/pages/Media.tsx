import { useEffect, useRef } from 'react';
import { Link } from 'wouter';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Play, Tv, BookOpen, Users } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Media() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current.querySelectorAll('.media-card'),
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.15,
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
            Media & Resources
          </h1>
          <p className="text-xl text-gray-600">
            Access sermons, testimonies, and live services from Anchor of Christ International Ministries
          </p>
        </div>
      </section>

      {/* Media Categories */}
      <section ref={contentRef} className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Sermons */}
            <Link href="/sermons">
              <div className="media-card p-8 bg-gradient-to-br from-gold to-yellow-600 rounded-lg shadow-lg text-white hover:shadow-2xl transition-all transform hover:scale-105 cursor-pointer">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <BookOpen className="w-8 h-8" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-center">Sermons</h3>
                <p className="text-center text-sm text-gray-100 mb-4">
                  Listen to inspiring messages that strengthen your faith and guide your spiritual journey
                </p>
                <div className="text-center">
                  <span className="inline-block px-4 py-2 bg-white text-gold font-bold rounded-full text-sm">
                    Browse Sermons →
                  </span>
                </div>
              </div>
            </Link>

            {/* Live Services */}
            <Link href="/live-services">
              <div className="media-card p-8 bg-gradient-to-br from-red-500 to-red-600 rounded-lg shadow-lg text-white hover:shadow-2xl transition-all transform hover:scale-105 cursor-pointer">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <Tv className="w-8 h-8" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-center">Live Services</h3>
                <p className="text-center text-sm text-gray-100 mb-4">
                  Join us online for live worship, prayer, and ministry from anywhere in the world
                </p>
                <div className="text-center">
                  <span className="inline-block px-4 py-2 bg-white text-red-500 font-bold rounded-full text-sm">
                    Watch Live →
                  </span>
                </div>
              </div>
            </Link>

            {/* Testimonies */}
            <Link href="/testimonies">
              <div className="media-card p-8 bg-gradient-to-br from-pink-400 to-pink-500 rounded-lg shadow-lg text-white hover:shadow-2xl transition-all transform hover:scale-105 cursor-pointer">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <Users className="w-8 h-8" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-center">Testimonies</h3>
                <p className="text-center text-sm text-gray-100 mb-4">
                  Hear from those whose lives have been transformed by God's grace through our ministry
                </p>
                <div className="text-center">
                  <span className="inline-block px-4 py-2 bg-white text-pink-500 font-bold rounded-full text-sm">
                    Read Stories →
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-light-gray">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-deep-blue mb-8">Featured Content</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Featured Sermon */}
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <div className="aspect-video bg-gradient-to-br from-gold to-yellow-600 rounded-lg flex items-center justify-center mb-4">
                <Play size={48} fill="white" color="white" />
              </div>
              <h3 className="text-xl font-bold text-deep-blue mb-2">The Anchor of Your Soul</h3>
              <p className="text-gray-700 mb-4">
                Discover how faith in Christ becomes the anchor that holds us steady in life's storms.
              </p>
              <Link href="/sermons">
                <button className="px-6 py-2 bg-deep-blue text-white font-bold rounded-full hover:bg-opacity-90 transition-all">
                  Watch Now
                </button>
              </Link>
            </div>

            {/* Featured Testimony */}
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <div className="aspect-video bg-gradient-to-br from-pink-400 to-pink-500 rounded-lg flex items-center justify-center mb-4">
                <Users size={48} fill="white" color="white" />
              </div>
              <h3 className="text-xl font-bold text-deep-blue mb-2">Life Transformed</h3>
              <p className="text-gray-700 mb-4">
                A powerful testimony of how God's grace changed a life and restored hope.
              </p>
              <Link href="/testimonies">
                <button className="px-6 py-2 bg-deep-blue text-white font-bold rounded-full hover:bg-opacity-90 transition-all">
                  Read Story
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
