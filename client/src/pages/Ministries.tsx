import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function Ministries() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current.querySelectorAll('.ministry-card'),
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

  const ministries = [
    {
      title: 'Evangelism & Outreach',
      description: 'Reaching the lost with the Gospel through crusades, street evangelism, and community engagement programs.',
      color: 'from-red-500 to-red-600',
      icon: '📢',
    },
    {
      title: 'Discipleship & Training',
      description: 'Building believers through comprehensive Bible studies, mentorship programs, and leadership development initiatives.',
      color: 'from-deep-blue to-blue-700',
      icon: '📚',
    },
    {
      title: 'Missionary Work',
      description: 'Establishing churches and ministries in unreached areas, providing humanitarian aid and spiritual support.',
      color: 'from-gold to-yellow-600',
      icon: '🌍',
    },
    {
      title: 'Healing & Deliverance',
      description: 'Ministering to the broken, oppressed, and afflicted through prayer, counseling, and spiritual healing.',
      color: 'from-pink-400 to-pink-500',
      icon: '💚',
    },
    {
      title: 'Youth Ministry',
      description: 'Empowering young believers to discover their purpose, develop spiritual maturity, and become agents of change.',
      color: 'from-light-blue to-deep-blue',
      icon: '👥',
    },
    {
      title: 'Community Service',
      description: 'Demonstrating Christ\'s love through feeding programs, educational initiatives, and social welfare projects.',
      color: 'from-green-500 to-green-600',
      icon: '🤝',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-light-gray to-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl lg:text-6xl font-bold text-deep-blue mb-6">
            Our Ministries
          </h1>
          <p className="text-xl text-gray-600">
            Discover the diverse ways we serve and impact communities worldwide
          </p>
        </div>
      </section>

      {/* Ministries Grid */}
      <section ref={contentRef} className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ministries.map((ministry, index) => (
              <div
                key={index}
                className={`ministry-card p-6 bg-gradient-to-br ${ministry.color} rounded-lg shadow-lg text-white hover:shadow-2xl transition-all transform hover:scale-105 cursor-pointer`}
              >
                <div className="text-5xl mb-4">{ministry.icon}</div>
                <h3 className="text-xl font-bold mb-3">{ministry.title}</h3>
                <p className="text-sm text-gray-100">{ministry.description}</p>
              </div>
            ))}
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
            <button className="px-8 py-3 bg-gold text-deep-blue font-bold rounded-full hover:bg-opacity-90 transition-all transform hover:scale-105">
              Volunteer Now
            </button>
            <button className="px-8 py-3 bg-white text-deep-blue font-bold rounded-full hover:bg-opacity-90 transition-all transform hover:scale-105">
              Support Our Work
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
