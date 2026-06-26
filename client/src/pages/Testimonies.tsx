import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Testimonies() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current.querySelectorAll('.testimony-card'),
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

  const testimonies = [
    {
      name: 'John Okafor',
      location: 'Lagos, Nigeria',
      text: 'My life was transformed when I encountered the Gospel through AOCIM. I was lost in sin and despair, but through the ministry of the Prophet, I found Jesus and now I am a new creation.',
      rating: 5,
    },
    {
      name: 'Mary Adeyemi',
      location: 'Accra, Ghana',
      text: 'The discipleship program at AOCIM has helped me grow spiritually. I went from being a nominal Christian to being fully committed to serving God with all my heart.',
      rating: 5,
    },
    {
      name: 'David Mensah',
      location: 'Kumasi, Ghana',
      text: 'I was healed of a chronic illness through prayer at one of AOCIM\'s crusades. God is real and His power is still available to those who believe.',
      rating: 5,
    },
    {
      name: 'Grace Eze',
      location: 'Port Harcourt, Nigeria',
      text: 'The youth program changed my perspective on faith and purpose. I now understand my calling and I am excited about my future in Christ.',
      rating: 5,
    },
    {
      name: 'Samuel Kwame',
      location: 'Tema, Ghana',
      text: 'AOCIM\'s community service initiatives have shown me what it means to love your neighbor. I have been blessed to be a blessing to others.',
      rating: 5,
    },
    {
      name: 'Blessing Nnamdi',
      location: 'Enugu, Nigeria',
      text: 'Through the mentorship I received at AOCIM, I have become a leader in my church. The ministry equipped me with the tools I needed to serve effectively.',
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-light-gray to-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl lg:text-6xl font-bold text-deep-blue mb-6">
            Testimonies
          </h1>
          <p className="text-xl text-gray-600">
            Hear from those whose lives have been transformed by God's grace through our ministry
          </p>
        </div>
      </section>

      {/* Testimonies Grid */}
      <section ref={contentRef} className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonies.map((testimony, index) => (
              <div
                key={index}
                className="testimony-card p-6 bg-white border-2 border-gold rounded-lg shadow-lg hover:shadow-2xl transition-all"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimony.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="#D4AF37" color="#D4AF37" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimony.text}"</p>
                <div className="border-t border-gray-200 pt-4">
                  <p className="font-bold text-deep-blue">{testimony.name}</p>
                  <p className="text-sm text-gray-600">{testimony.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-deep-blue to-blue-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Share Your Story</h2>
          <p className="text-lg mb-8">
            Has God transformed your life through our ministry? We would love to hear your testimony and share it with our community.
          </p>
          <button className="px-8 py-3 bg-gold text-deep-blue font-bold rounded-full hover:bg-opacity-90 transition-all transform hover:scale-105">
            Submit Your Testimony
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
