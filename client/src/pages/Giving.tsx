import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Heart, TrendingUp, Users, Globe } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Giving() {
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
            Support The Ministry
          </h1>
          <p className="text-xl text-gray-600">
            Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver. 2 Corinthians 9:7
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section ref={contentRef} className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Why Give */}
          <div className="fade-in">
            <h2 className="text-3xl font-bold text-deep-blue mb-6">Why Give?</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
            In everything I did, I showed you that by this kind of hard work we must help the weak, remembering the words the Lord Jesus himself said: "It is more blessed to give than to receive.” Acts 20:35 
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 bg-gradient-to-br from-deep-blue/10 to-gold/10 rounded-lg border border-gold/20">
                <Heart className="w-8 h-8 text-red-500 mb-3" />
                <h3 className="text-lg font-bold text-deep-blue mb-2">Winning Souls</h3>
                <p className="text-sm text-gray-700">Fund evangelism crusades and outreach programs</p>
              </div>
              <div className="p-6 bg-gradient-to-br from-red-500/10 to-pink-400/10 rounded-lg border border-red-500/20">
                <Users className="w-8 h-8 text-red-500 mb-3" />
                <h3 className="text-lg font-bold text-deep-blue mb-2">Building</h3>
                <p className="text-sm text-gray-700">We are building the santuary of God.</p>
              </div>
              <div className="p-6 bg-gradient-to-br from-gold/10 to-yellow-600/10 rounded-lg border border-gold/20">
                <Globe className="w-8 h-8 text-gold mb-3" />
                <h3 className="text-lg font-bold text-deep-blue mb-2">Impacting Nations</h3>
                <p className="text-sm text-gray-700">Enable missionary work in unreached areas.</p>
              </div>
              <div className="p-6 bg-gradient-to-br from-light-blue/10 to-deep-blue/10 rounded-lg border border-deep-blue/20">
                <TrendingUp className="w-8 h-8 text-deep-blue mb-3" />
                <h3 className="text-lg font-bold text-deep-blue mb-2">Growing Impact</h3>
                <p className="text-sm text-gray-700">Expand our reach and strengthen our work.</p>
              </div>
            </div>
          </div>

          {/* Ways to Give */}
          <div className="fade-in">
            <h2 className="text-3xl font-bold text-deep-blue mb-6">Ways to Give</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-8 bg-white border-2 border-gold rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-deep-blue mb-4">Online Giving</h3>
                <p className="text-gray-700 mb-6">
                  Give securely online using your credit card, debit card, or bank account. Your donation is processed safely and you'll receive a receipt immediately.
                </p>
                <button className="w-full px-6 py-3 bg-deep-blue text-white font-bold rounded-full hover:bg-opacity-90 transition-all">
                  Give Online
                </button>
              </div>

              <div className="p-8 bg-white border-2 border-gold rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-deep-blue mb-4">Bank Transfer</h3>
                <p className="text-gray-700 mb-6">
                  You can transfer funds directly to our ministry account. Contact us for banking details and to discuss your giving.
                </p>
                <button className="w-full px-6 py-3 bg-deep-blue text-white font-bold rounded-full hover:bg-opacity-90 transition-all">
                  Get Bank Details
                </button>
              </div>

              <div className="p-8 bg-white border-2 border-gold rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-deep-blue mb-4">Mobile Money</h3>
                <p className="text-gray-700 mb-6">
                  Send your contribution via mobile money services. Quick, easy, and secure. Available in multiple countries.
                </p>
                <button className="w-full px-6 py-3 bg-deep-blue text-white font-bold rounded-full hover:bg-opacity-90 transition-all">
                  Mobile Money Options
                </button>
              </div>

              <div className="p-8 bg-white border-2 border-gold rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-deep-blue mb-4">In-Person Giving</h3>
                <p className="text-gray-700 mb-6">
                  Give during our services or events. Speak with our team members for more information about giving in person.
                </p>
                <button className="w-full px-6 py-3 bg-deep-blue text-white font-bold rounded-full hover:bg-opacity-90 transition-all">
                  Find a Service
                </button>
              </div>
            </div>
          </div>

          {/* Impact */}
          <div className="fade-in bg-gradient-to-r from-deep-blue to-blue-700 text-white p-12 rounded-lg">
            <h2 className="text-3xl font-bold mb-6">Your Impact</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <p className="text-4xl font-bold text-gold mb-2">$50</p>
                <p className="text-lg">Provides Bibles for new believers</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-gold mb-2">$100</p>
                <p className="text-lg">Supports a week of discipleship training</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-gold mb-2">$500</p>
                <p className="text-lg">Enables a missionary outreach event</p>
              </div>
            </div>
          </div>

          {/* FAQ */}
         {/* <div className="fade-in">
            <h2 className="text-3xl font-bold text-deep-blue mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div className="p-4 bg-light-gray rounded-lg">
                <h3 className="font-bold text-deep-blue mb-2">Is my donation tax-deductible?</h3>
                <p className="text-gray-700">
                  Yes, TAOCIM is a registered non-profit organization. Donations are tax-deductible in accordance with local laws. You will receive a receipt for your records.
                </p>
              </div>
              <div className="p-4 bg-light-gray rounded-lg">
                <h3 className="font-bold text-deep-blue mb-2">How are funds used?</h3>
                <p className="text-gray-700">
                  All funds are used directly to support our ministry programs, including evangelism, discipleship, missionary work, and community service. We maintain transparency and accountability in all financial matters.
                </p>
              </div>
              <div className="p-4 bg-light-gray rounded-lg">
                <h3 className="font-bold text-deep-blue mb-2">Can I set up recurring giving?</h3>
                <p className="text-gray-700">
                  Yes, you can set up monthly or weekly giving through our online platform. This helps us plan and expand our ministry programs effectively.
                </p>
              </div>
            </div>
          </div>*/}
        </div>
      </section>

      <Footer />
    </div>
  );
}
