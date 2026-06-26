import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Play, Clock, Users } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function LiveServices() {
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
            Live Services
          </h1>
          <p className="text-xl text-gray-600">
            Join us online for live worship, prayer, and ministry from anywhere in the world
          </p>
        </div>
      </section>

      {/* Live Stream Section */}
      <section ref={contentRef} className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Current Live Stream */}
          <div className="fade-in mb-12">
            <div className="bg-gradient-to-br from-deep-blue to-blue-700 rounded-lg overflow-hidden shadow-2xl">
              <div className="aspect-video bg-black flex items-center justify-center relative">
                <button className="absolute w-24 h-24 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-all transform hover:scale-110 z-10">
                  <Play size={40} fill="white" color="white" />
                </button>
                <div className="absolute top-4 right-4 flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-full">
                  <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                  <span className="font-bold">LIVE</span>
                </div>
              </div>
              <div className="p-6 text-white">
                <h2 className="text-2xl font-bold mb-2">Sunday Morning Service</h2>
                <div className="flex flex-col sm:flex-row gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock size={18} />
                    <span>Every Sunday at 10:00 AM</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={18} />
                    <span>2,500+ viewers online</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Services */}
          <div className="fade-in">
            <h2 className="text-3xl font-bold text-deep-blue mb-6">Upcoming Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-gradient-to-br from-gold to-yellow-600 rounded-lg text-white shadow-lg">
                <h3 className="text-xl font-bold mb-3">Midweek Prayer Service</h3>
                <p className="mb-4">Join us for powerful prayer and intercession</p>
                <div className="flex items-center gap-2 mb-4">
                  <Clock size={18} />
                  <span>Wednesday at 7:00 PM</span>
                </div>
                <button className="px-6 py-2 bg-white text-gold font-bold rounded-full hover:bg-opacity-90 transition-all">
                  Set Reminder
                </button>
              </div>

              <div className="p-6 bg-gradient-to-br from-red-500 to-red-600 rounded-lg text-white shadow-lg">
                <h3 className="text-xl font-bold mb-3">Friday Youth Night</h3>
                <p className="mb-4">Dynamic worship and fellowship for young believers</p>
                <div className="flex items-center gap-2 mb-4">
                  <Clock size={18} />
                  <span>Friday at 6:00 PM</span>
                </div>
                <button className="px-6 py-2 bg-white text-red-500 font-bold rounded-full hover:bg-opacity-90 transition-all">
                  Set Reminder
                </button>
              </div>
            </div>
          </div>

          {/* Watch Anytime */}
          <div className="fade-in mt-12">
            <h2 className="text-3xl font-bold text-deep-blue mb-6">Watch Anytime</h2>
            <p className="text-gray-700 mb-6">
              Can't join us live? No problem. Watch past services on demand at any time that works for you.
            </p>
            <button className="px-8 py-3 bg-deep-blue text-white font-bold rounded-full hover:bg-opacity-90 transition-all transform hover:scale-105">
              Browse Archive
            </button>
          </div>
        </div>
      </section>

      {/* How to Join */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-light-gray">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-deep-blue mb-8 text-center">How to Join Live Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-deep-blue text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                1
              </div>
              <h3 className="text-lg font-bold text-deep-blue mb-2">Visit Our Website</h3>
              <p className="text-gray-700">Go to the Live Services page on our website</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gold text-deep-blue rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                2
              </div>
              <h3 className="text-lg font-bold text-deep-blue mb-2">Click Play</h3>
              <p className="text-gray-700">Click the play button to start watching live</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                3
              </div>
              <h3 className="text-lg font-bold text-deep-blue mb-2">Engage & Share</h3>
              <p className="text-gray-700">Participate in chat and share with friends</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
