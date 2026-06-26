import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Calendar, MapPin, Clock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Events() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current.querySelectorAll('.event-card'),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
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

  const events = [
    {
      title: 'Sunday Service',
      date: 'Every Sunday',
      time: '10:00 AM - 12:00 PM',
      location: 'Main Sanctuary',
      description: 'Join us for our weekly worship service featuring inspiring messages and corporate worship.',
      color: 'from-deep-blue to-blue-700',
    },
    {
      title: 'Midweek Prayer & Bible Study',
      date: 'Every Wednesday',
      time: '7:00 PM - 8:30 PM',
      location: 'Prayer Center',
      description: 'Deepen your faith through in-depth Bible study and powerful prayer sessions.',
      color: 'from-gold to-yellow-600',
    },
    {
      title: 'Youth Night',
      date: 'Every Friday',
      time: '6:00 PM - 9:00 PM',
      location: 'Youth Center',
      description: 'Dynamic worship, fellowship, and spiritual growth for young believers.',
      color: 'from-red-500 to-red-600',
    },
    {
      title: 'Annual Crusade',
      date: 'August 15-18, 2024',
      time: '7:00 PM - 10:00 PM',
      location: 'Convention Center',
      description: 'A three-day revival event featuring powerful preaching, healing, and miracles.',
      color: 'from-pink-400 to-pink-500',
    },
    {
      title: 'Leadership Summit',
      date: 'September 22-24, 2024',
      time: 'All Day',
      location: 'Conference Center',
      description: 'Equipping leaders with tools and insights for effective ministry and personal growth.',
      color: 'from-light-blue to-deep-blue',
    },
    {
      title: 'Missions Conference',
      date: 'October 5-7, 2024',
      time: 'Evening Sessions',
      location: 'Main Sanctuary',
      description: 'Inspiring stories from the mission field and opportunities to get involved in global outreach.',
      color: 'from-green-500 to-green-600',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-light-gray to-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl lg:text-6xl font-bold text-deep-blue mb-6">
            Events & Programs
          </h1>
          <p className="text-xl text-gray-600">
            Join us for inspiring events and programs designed to strengthen your faith
          </p>
        </div>
      </section>

      {/* Events Grid */}
      <section ref={contentRef} className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {events.map((event, index) => (
              <div
                key={index}
                className={`event-card p-6 bg-gradient-to-br ${event.color} rounded-lg shadow-lg text-white hover:shadow-2xl transition-all`}
              >
                <h3 className="text-2xl font-bold mb-4">{event.title}</h3>
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-3">
                    <Calendar size={20} />
                    <span className="text-sm">{event.date}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock size={20} />
                    <span className="text-sm">{event.time}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin size={20} />
                    <span className="text-sm">{event.location}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-100 mb-4">{event.description}</p>
                <button className="px-4 py-2 bg-white text-deep-blue font-bold rounded-full hover:bg-opacity-90 transition-all text-sm">
                  Learn More
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-deep-blue to-blue-700 text-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-lg mb-6">
            Subscribe to our newsletter to receive updates about upcoming events and programs.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-full text-deep-blue focus:outline-none"
            />
            <button className="px-8 py-3 bg-gold text-deep-blue font-bold rounded-full hover:bg-opacity-90 transition-all">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
