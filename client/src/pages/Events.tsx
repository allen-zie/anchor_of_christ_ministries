import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Calendar, MapPin, Clock, CheckCircle2, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

type EventItem = {
  id: string;
  title: string;
  startDate: string;
  endDate?: string;
  time: string;
  location: string;
  description: string;
  color: string;
};

const parseDateOnly = (date: string) => {
  const [year, month, day] = date.split('-').map(Number);
  return new Date(year, month - 1, day);
};

const formatEventDate = (startDate: string, endDate?: string) => {
  const formatter = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  const start = formatter.format(parseDateOnly(startDate));

  if (!endDate || endDate === startDate) {
    return start;
  }

  return `${start} - ${formatter.format(parseDateOnly(endDate))}`;
};

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

  const events: EventItem[] = [
    {
      id: 'sunday-service-october-2026',
      title: 'Sunday Service',
      startDate: '2026-10-04',
      time: '10:00 AM - 12:00 PM',
      location: 'Main Sanctuary',
      description: 'Join us for our weekly worship service featuring inspiring messages and corporate worship.',
      color: 'from-deep-blue to-blue-700',
    },
    {
      id: 'midweek-prayer-october-2026',
      title: 'Midweek Prayer & Bible Study',
      startDate: '2026-10-07',
      time: '7:00 PM - 8:30 PM',
      location: 'Prayer Center',
      description: 'Deepen your faith through in-depth Bible study and powerful prayer sessions.',
      color: 'from-gold to-yellow-600',
    },
    {
      id: 'youth-night-october-2026',
      title: 'Youth Night',
      startDate: '2026-10-09',
      time: '6:00 PM - 9:00 PM',
      location: 'Youth Center',
      description: 'Dynamic worship, fellowship, and spiritual growth for young believers.',
      color: 'from-red-500 to-red-600',
    },
    {
      id: 'annual-crusade-august-2026',
      title: 'Annual Crusade',
      startDate: '2026-08-15',
      endDate: '2026-08-18',
      time: '7:00 PM - 10:00 PM',
      location: 'Convention Center',
      description: 'A three-day revival event featuring powerful preaching, healing, and miracles.',
      color: 'from-pink-400 to-pink-500',
    },
    {
      id: 'leadership-summit-december-2026',
      title: 'Leadership Summit',
      startDate: '2026-12-04',
      endDate: '2026-12-06',
      time: 'All Day',
      location: 'Conference Center',
      description: 'Equipping leaders with tools and insights for effective ministry and personal growth.',
      color: 'from-light-blue to-deep-blue',
    },
    {
      id: 'missions-conference-january-2027',
      title: 'Missions Conference',
      startDate: '2027-01-15',
      endDate: '2027-01-17',
      time: 'Evening Sessions',
      location: 'Main Sanctuary',
      description: 'Inspiring stories from the mission field and opportunities to get involved in global outreach.',
      color: 'from-green-500 to-green-600',
    },
  ];

  const today = new Date();
  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const upcomingEvents = events
    .filter((event) => parseDateOnly(event.endDate ?? event.startDate) >= todayStart)
    .sort((a, b) => parseDateOnly(a.startDate).getTime() - parseDateOnly(b.startDate).getTime());
  const completedEvents = events
    .filter((event) => parseDateOnly(event.endDate ?? event.startDate) < todayStart)
    .sort((a, b) => parseDateOnly(b.endDate ?? b.startDate).getTime() - parseDateOnly(a.endDate ?? a.startDate).getTime());

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
          <h2 className="mb-4 text-3xl font-bold text-white">Stay Updated</h2>
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
