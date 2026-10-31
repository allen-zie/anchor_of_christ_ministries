import { useEffect, useRef, type FormEvent } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Footer from '@/components/Footer';
import { Star } from 'lucide-react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

gsap.registerPlugin(ScrollTrigger);

export default function Testimonies() {
  const pageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleTestimonySubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get('name') ?? '');
    const surname = String(formData.get('surname') ?? '');
    const subject = encodeURIComponent(`Testimony submission from ${name} ${surname}`);
    const body = [
      `Name: ${name}`,
      `Surname: ${surname}`,
      `Country: ${formData.get('country') ?? ''}`,
      `City: ${formData.get('city') ?? ''}`,
      `Phone number: ${formData.get('phone') ?? ''}`,
      '',
      'Testimony:',
      String(formData.get('testimony') ?? ''),
    ].join('\n');

    window.location.href = `mailto:info@anchorofchrist.org?subject=${subject}&body=${encodeURIComponent(body)}`;
  };

  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current.querySelectorAll('.testimony-card'),
        { scale: 0.9 },
        {
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
    <div ref={pageRef} className="min-h-screen bg-white">

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
          <Dialog>
            <DialogTrigger asChild>
              <button className="px-8 py-3 bg-gold text-deep-blue font-bold rounded-full hover:bg-opacity-90 transition-all transform hover:scale-105">
                Submit Your Testimony
              </button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] overflow-y-auto border-gold/30 bg-white p-6 sm:max-w-2xl sm:rounded-2xl sm:p-8">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-deep-blue">Share Your Testimony</DialogTitle>
                <DialogDescription className="text-gray-600">
                  Fill in the details below. Submitting opens your email app with your testimony addressed to the ministry, so you can review and send it.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleTestimonySubmit} className="space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="testimony-name" className="text-sm font-semibold text-deep-blue">Name</label>
                    <input id="testimony-name" name="name" type="text" autoComplete="given-name" required className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 shadow-sm transition placeholder:text-gray-400 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="testimony-surname" className="text-sm font-semibold text-deep-blue">Surname</label>
                    <input id="testimony-surname" name="surname" type="text" autoComplete="family-name" required className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 shadow-sm transition placeholder:text-gray-400 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="testimony-country" className="text-sm font-semibold text-deep-blue">Country</label>
                    <input id="testimony-country" name="country" type="text" autoComplete="country-name" required className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 shadow-sm transition placeholder:text-gray-400 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="testimony-city" className="text-sm font-semibold text-deep-blue">City</label>
                    <input id="testimony-city" name="city" type="text" autoComplete="address-level2" required className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 shadow-sm transition placeholder:text-gray-400 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30" />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <label htmlFor="testimony-phone" className="text-sm font-semibold text-deep-blue">Phone number</label>
                    <input id="testimony-phone" name="phone" type="tel" autoComplete="tel" required className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 shadow-sm transition placeholder:text-gray-400 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30" />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <label htmlFor="testimony-text" className="text-sm font-semibold text-deep-blue">Testimony</label>
                    <textarea id="testimony-text" name="testimony" rows={5} required className="w-full resize-y rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 shadow-sm transition placeholder:text-gray-400 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30" />
                  </div>
                </div>

                <DialogFooter className="gap-3 sm:gap-3">
                  <DialogClose asChild>
                    <button type="button" className="rounded-full border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-50">Cancel</button>
                  </DialogClose>
                  <button type="submit" className="rounded-full bg-deep-blue px-6 py-3 font-bold text-white transition hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2">Continue to Email</button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </section>

      <Footer />
    </div>
  );
}
