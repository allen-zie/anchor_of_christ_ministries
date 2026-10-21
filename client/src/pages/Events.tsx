import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Footer from '@/components/Footer';
import { Calendar, MapPin, Clock, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { formatEventDate, getCompletedEvents, getUpcomingEvents, type EventItem } from '@/lib/events';

gsap.registerPlugin(ScrollTrigger);

export default function Events() {
  const pageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current.querySelectorAll('.event-card'),
        { y: 30 },
        {
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

  const upcomingEvents = getUpcomingEvents();
  const completedEvents = getCompletedEvents();

  const renderEventCard = (event: EventItem, isCompleted = false) => (
    <div
      key={event.id}
      className={`event-card relative overflow-hidden rounded-2xl bg-gradient-to-br ${event.color} p-6 text-white shadow-lg transition-all hover:-translate-y-1 hover:shadow-2xl`}
    >
      <div className="absolute right-5 top-5 rounded-full bg-white/15 p-2">
        {isCompleted ? <CheckCircle2 size={18} aria-hidden="true" /> : <ArrowUpRight size={18} aria-hidden="true" />}
      </div>
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-white/75">
        {isCompleted ? 'Completed event' : 'Upcoming event'}
      </p>
      <h3 className="mb-4 pr-10 text-2xl font-bold text-white">{event.title}</h3>
      <div className="mb-4 space-y-3">
        <div className="flex items-center gap-3">
          <Calendar size={20} aria-hidden="true" />
          <span className="text-sm">{formatEventDate(event.startDate, event.endDate)}</span>
        </div>
        <div className="flex items-center gap-3">
          <Clock size={20} aria-hidden="true" />
          <span className="text-sm">{event.time}</span>
        </div>
        <div className="flex items-center gap-3">
          <MapPin size={20} aria-hidden="true" />
          <span className="text-sm">{event.location}</span>
        </div>
      </div>
      <p className="mb-4 text-sm leading-6 text-white/85">{event.description}</p>
      <button className="rounded-full bg-white px-4 py-2 text-sm font-bold text-deep-blue transition-all hover:bg-white/90">
        Learn More
      </button>
    </div>
  );

  return (
    <div ref={pageRef} className="min-h-screen bg-white">

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

      {/* Date-driven Events */}
      <section ref={contentRef} className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-14">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-gold">Priority schedule</p>
                <h2 className="text-3xl font-bold text-deep-blue">Upcoming Events</h2>
              </div>
              <span className="rounded-full bg-light-gray px-4 py-2 text-sm font-semibold text-deep-blue">
                {upcomingEvents.length} scheduled
              </span>
            </div>
            {upcomingEvents.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {upcomingEvents.map((event) => renderEventCard(event))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-blue-200 bg-light-gray p-8 text-center text-gray-600">
                No upcoming events are scheduled yet.
              </div>
            )}
          </div>

          <div>
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-gold">Ministry archive</p>
                <h2 className="text-3xl font-bold text-deep-blue">Completed Events</h2>
              </div>
              <span className="rounded-full bg-light-gray px-4 py-2 text-sm font-semibold text-deep-blue">
                {completedEvents.length} completed
              </span>
            </div>
            {completedEvents.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {completedEvents.map((event) => renderEventCard(event, true))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-blue-200 bg-light-gray p-8 text-center text-gray-600">
                Completed events will appear here after their end date.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-deep-blue to-blue-700 text-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="mb-4 text-3xl font-bold text-gold">Stay Updated</h2>
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
