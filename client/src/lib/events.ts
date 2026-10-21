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
    startDate: '2026-10-25',
    time: '0900 HRS - 1530 HRS',
    location: 'Main Sanctuary',
    description: 'Join us for our weekly worship service featuring inspiring messages and corporate worship.',
    color: 'from-deep-blue to-blue-700',
  },
  {
    id: 'midweek-prayer-lunchhour-wednesday',
    title: 'Midweek Wednesday Lunch-hour Prayers',
    startDate: '2026-10-21',
    time: '1300hrs - 1400hrs',
    location: 'Prayer Center',
    description: 'Deepen your faith through in-depth Bible study and powerful prayer sessions.',
    color: 'from-gold to-yellow-600',
  },
  {
    id: 'midweek-prayer-lunchhour-friday',
    title: 'Midweek Friday Lunch-hour Prayers',
    startDate: '2026-10-23',
    time: '1300hrs - 1400hrs',
    location: 'Prayer Center',
    description: 'Deepen your faith through in-depth Bible study and powerful prayer sessions.',
    color: 'from-gold to-yellow-600',
  },
  {
    id: 'all-night-october-2026',
    title: 'All Night',
    startDate: '2026-10-10',
    time: '1800hrs - 0700hrs',
    location: 'Main Auditorium',
    description: 'Dynamic worship, fellowship, and spiritual growth for young believers.',
    color: 'from-gold to-yellow-600',
  },
  {
    id: 'annual-conference-2026',
    title: 'Annual Conference',
    startDate: '2026-10-01',
    endDate: '2026-10-04',
    time: '1500hrs - 1800hrs',
    location: 'Main Auditorium',
    description: 'A three-day revival event featuring powerful preaching, healing, and miracles.',
    color: 'from-deep-blue to-blue-700',
  },
  {
    id: 'sunday-school-december-2026',
    title: 'Sunday School Outing',
    startDate: '2026-12-04',
    time: 'Day Visit',
    location: 'Conference Center',
    description: 'A special outing for our Sunday School students to learn and grow in their faith.',
    color: 'from-gold to-yellow-600',
  },
  {
    id: 'youth-retreat-april-2027',
    title: 'Youth Inyanga Retreat',
    startDate: '2027-04-15',
    endDate: '2027-04-19',
    time: 'All Days',
    location: 'Inyanga Mountains',
    description: 'Inspiring refreshed minds of the leaders of tomorrow.',
    color: 'from-gold to-yellow-600',
  },
  {
    id: 'youth-matopo-retreat-2026',
    title: 'Youth Matopo Retreat',
    startDate: '2026-12-29',
    endDate: '2026-12-31',
    time: 'All Days',
    location: 'Matopo Hills',
    description: 'A spiritual retreat for youth to connect with God and nature, fostering personal growth and community.',
    color: 'from-deep-blue to-blue-700',
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
