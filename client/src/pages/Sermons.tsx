import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Play, Calendar, User } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Sermons() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current.querySelectorAll('.sermon-card'),
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

  const sermons = [
    {
      title: 'The Anchor of Your Soul',
      speaker: 'Prophet [Name]',
      date: 'June 23, 2024',
      description: 'Discover how faith in Christ becomes the anchor that holds us steady in life\'s storms.',
      duration: '45 min',
    },
    {
      title: 'Winning Souls for Christ',
      speaker: 'Prophet [Name]',
      date: 'June 16, 2024',
      description: 'Understanding our responsibility and privilege to share the Gospel with the lost.',
      duration: '52 min',
    },
    {
      title: 'Building Believers',
      speaker: 'Pastor James',
      date: 'June 9, 2024',
      description: 'The importance of discipleship and spiritual growth in the life of a believer.',
      duration: '48 min',
    },
    {
      title: 'Impacting Nations',
      speaker: 'Prophet [Name]',
      date: 'June 2, 2024',
      description: 'How God uses ordinary people to accomplish extraordinary things for His kingdom.',
      duration: '55 min',
    },
    {
      title: 'The Power of Prayer',
      speaker: 'Pastor Mary',
      date: 'May 26, 2024',
      description: 'Unlocking the transformative power of prayer in your personal and corporate worship.',
      duration: '43 min',
    },
    {
      title: 'Walking in Faith',
      speaker: 'Prophet [Name]',
      date: 'May 19, 2024',
      description: 'Practical steps to strengthen your faith and trust in God\'s promises.',
      duration: '50 min',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-light-gray to-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl lg:text-6xl font-bold text-deep-blue mb-6">
            Sermons
          </h1>
          <p className="text-xl text-gray-600">
            Listen to inspiring messages that will strengthen your faith and guide your spiritual journey
          </p>
        </div>
      </section>

      {/* Sermons List */}
      <section ref={contentRef} className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {sermons.map((sermon, index) => (
            <div
              key={index}
              className="sermon-card p-6 bg-white border-l-4 border-gold rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-deep-blue mb-3">{sermon.title}</h3>
                  <div className="space-y-2 text-gray-600 mb-4">
                    <div className="flex items-center gap-2">
                      <User size={16} />
                      <span className="text-sm">{sermon.speaker}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      <span className="text-sm">{sermon.date}</span>
                    </div>
                  </div>
                  <p className="text-gray-700">{sermon.description}</p>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <button className="w-16 h-16 bg-gradient-to-br from-gold to-yellow-600 rounded-full flex items-center justify-center hover:shadow-lg transition-all transform hover:scale-110">
                    <Play size={24} fill="white" color="white" />
                  </button>
                  <span className="text-sm text-gray-600">{sermon.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Podcast Subscribe */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-deep-blue to-blue-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Subscribe to Our Podcast</h2>
          <p className="text-lg mb-8">
            Never miss a sermon. Subscribe to our podcast on your favorite platform and get new messages delivered to you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
            <button className="px-6 py-3 bg-white text-deep-blue font-bold rounded-full hover:bg-opacity-90 transition-all">
              Apple Podcasts
            </button>
            <button className="px-6 py-3 bg-white text-deep-blue font-bold rounded-full hover:bg-opacity-90 transition-all">
              Spotify
            </button>
            <button className="px-6 py-3 bg-white text-deep-blue font-bold rounded-full hover:bg-opacity-90 transition-all">
              Google Podcasts
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
