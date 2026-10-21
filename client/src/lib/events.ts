export type EventItem = {
  id: string;
  title: string;
  startDate: string;
  endDate?: string;
  time: string;
  location: string;
  description: string;
  color: string;
};

export const events: EventItem[] = [
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
    id: 'all-night-october-2026',
    title: 'All Night',
    startDate: '2026-10-10',
    time: '6:00 PM - 9:00 PM',
    location: 'The Anchor of Christ Auditorium',
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
    id: 'youth-retreat-december-2026',
    title: 'Youth Inyanga Retreat',
    startDate: '2026-12-14',
    endDate: '2026-12-18',
    time: 'All Days',
    location: 'Inyanga Mountains',
    description: 'Inspiring refreshed minds of the leaders of tomorrow.',
    color: 'from-gold to-yellow-600',
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

export const parseDateOnly = (date: string) => {
  const [year, month, day] = date.split('-').map(Number);
  return new Date(year, month - 1, day);
};

export const formatEventDate = (startDate: string, endDate?: string) => {
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

export const getUpcomingEvents = (referenceDate = new Date()) => {
  const todayStart = new Date(referenceDate.getFullYear(), referenceDate.getMonth(), referenceDate.getDate());

  return events
    .filter((event) => parseDateOnly(event.endDate ?? event.startDate) >= todayStart)
    .sort((a, b) => parseDateOnly(a.startDate).getTime() - parseDateOnly(b.startDate).getTime());
};

export const getCompletedEvents = (referenceDate = new Date()) => {
  const todayStart = new Date(referenceDate.getFullYear(), referenceDate.getMonth(), referenceDate.getDate());

  return events
    .filter((event) => parseDateOnly(event.endDate ?? event.startDate) < todayStart)
    .sort((a, b) => parseDateOnly(b.endDate ?? b.startDate).getTime() - parseDateOnly(a.endDate ?? a.startDate).getTime());
};
