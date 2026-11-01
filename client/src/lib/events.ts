import ministryPhotoOne from '@/content/images/WhatsApp Image 2026-10-19 at 15.48.01.webp';
import ministryPhotoTwo from '@/content/images/WhatsApp Image 2026-10-19 at 15.48.03.webp';
import ministryPhotoThree from '@/content/images/WhatsApp Image 2026-10-19 at 15.48.04.webp';
import ministryPhotoFour from '@/content/images/WhatsApp Image 2026-10-19 at 15.48.07.webp';
import ministryPhotoFive from '@/content/images/WhatsApp Image 2026-10-19 at 15.48.09.webp';

export type EventVenuePhoto = {
  src: string;
  alt: string;
  caption: string;
  credit?: string;
  sourceUrl?: string;
  licenseUrl?: string;
};

export type EventItem = {
  id: string;
  title: string;
  occasion: string;
  startDate: string;
  endDate?: string;
  time: string;
  location: string;
  venueAddress?: string;
  venueMapUrl?: string;
  venueContact?: {
    phone?: string;
    email?: string;
  };
  description: string;
  moreInfo: string[];
  venuePhotos: EventVenuePhoto[];
  venuePhotoNote: string;
  venuePhotoLink?: {
    label: string;
    href: string;
  };
  color: string;
};

const ministryVenuePhotos: EventVenuePhoto[] = [
  {
    src: ministryPhotoFour,
    alt: 'Wide view of worshippers gathered inside the ministry hall, showing the large roof and seating area.',
    caption: 'Main hall during a worship service',
    credit: 'Ministry photo',
  },
  {
    src: ministryPhotoFive,
    alt: 'Wide interior view of the ministry hall during a congregation worship service.',
    caption: 'Interior and congregation at worship',
    credit: 'Ministry photo',
  },
  {
    src: ministryPhotoTwo,
    alt: 'Congregants gathered in prayer inside a large ministry worship hall.',
    caption: 'Worship gathering at the ministry hall',
    credit: 'Ministry photo',
  },
  {
    src: ministryPhotoThree,
    alt: 'A congregation praying together inside the ministry worship hall.',
    caption: 'Congregation in prayer',
    credit: 'Ministry photo',
  },
  {
    src: ministryPhotoOne,
    alt: 'People worshipping together inside the ministry hall.',
    caption: 'A moment of worship',
    credit: 'Ministry photo',
  },
];

const nyangaPhotos: EventVenuePhoto[] = [
  {
    src: '/manus-storage/nyanga-landscape_da7bb40d.jpg',
    alt: 'Nyanga highland landscape with rolling moorland and Mount Nyangani on the skyline.',
    caption: 'Nyanga landscape and Mount Nyangani',
    credit: 'Babakathy — public domain',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Nyanga_landscape.jpg',
  },
  {
    src: '/manus-storage/mt-nyangani_7e020440.jpg',
    alt: 'Mount Nyangani, the highest peak in Zimbabwe.',
    caption: 'Mount Nyangani, Manicaland',
    credit: 'Seabifar — CC BY-SA 4.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Mt._Nyangani.jpg',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
  },
];

const matoboPhotos: EventVenuePhoto[] = [
  {
    src: '/manus-storage/matobo-hills-view_c1372e12.jpg',
    alt: 'A wide view across the granite hills and wooded valleys of Matobo National Park.',
    caption: 'View across Matobo Hills National Park',
    credit: 'WT-shared Digr — CC BY-SA 3.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:ZW_Matobo_NPview.JPG',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
  },
  {
    src: '/manus-storage/matobo-balancing-rocks_3fb8b346.jpg',
    alt: 'The Mother and Child balancing rocks in Matopos National Park, Zimbabwe.',
    caption: 'Mother and Child Rock, Matopos National Park',
    credit: 'Susan Adams — CC BY-SA 2.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Balancing_Rocks_in_Matopos_National_Park.jpg',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/2.0/',
  },
];

const ministryAddress = '18759 Andrea Dr, Romney Park, Bulawayo, Zimbabwe';
const ministryMapUrl = 'https://maps.app.goo.gl/mMyeeke8ZWYJvqa66';

export const events: EventItem[] = [
  {
    id: 'sunday-service-november-2026',
    title: 'Sunday Service',
    occasion: 'Weekly worship service',
    startDate: '2026-11-01',
    time: '0900 hrs - 1530 hrs',
    location: 'Main Sanctuary',
    venueAddress: ministryAddress,
    venueMapUrl: ministryMapUrl,
    description: 'Join us for our weekly worship service featuring inspiring messages and corporate worship.',
    moreInfo: [
      'A weekly gathering for worship and an inspiring message.',
      'The event listing gives the service time as 09:00–15:30.',
    ],
    venuePhotos: ministryVenuePhotos,
    venuePhotoNote: 'Ministry-provided photographs show worship gatherings inside the ministry hall.',
    color: 'from-deep-blue to-blue-700',
  },
  {
    id: 'midweek-prayer-lunchhour-wednesday',
    title: 'Midweek Wednesday Lunch-hour Prayers',
    occasion: 'Midweek prayer and Bible study',
    startDate: '2026-11-04',
    time: '1300hrs - 1400hrs',
    location: 'Hope City Church',
    venueAddress: '69 Alwyne House, Fife Street, near Takawira, Bulawayo, Zimbabwe',
    venueMapUrl: 'https://www.google.com/maps/search/?api=1&query=69+Alwyne+House+Fife+Street+Takawira+Bulawayo+Zimbabwe',
    venueContact: {
      phone: '+263 77 230 9333',
      email: 'hopecitychurchzim@gmail.com',
    },
    description: 'Deepen your faith through in-depth Bible study and powerful prayer sessions.',
    moreInfo: [
      'A lunch-hour gathering for Bible study and prayer.',
      'Contact Hope City Church if you need help finding the venue.',
    ],
    venuePhotos: [],
    venuePhotoNote: 'The event listing does not include a venue photograph. Use the church’s public photo page for current imagery.',
    venuePhotoLink: {
      label: 'View Hope City Church photos',
      href: 'https://www.facebook.com/HopeCityChurchByo/photos',
    },
    color: 'from-gold to-yellow-600',
  },
  {
    id: 'midweek-prayer-lunchhour-friday',
    title: 'Midweek Friday Lunch-hour Prayers',
    occasion: 'Midweek prayer and Bible study',
    startDate: '2026-11-06',
    time: '1300hrs - 1400hrs',
    location: 'Hope City Church',
    venueAddress: '69 Alwyne House, Fife Street, near Takawira, Bulawayo, Zimbabwe',
    venueMapUrl: 'https://www.google.com/maps/search/?api=1&query=69+Alwyne+House+Fife+Street+Takawira+Bulawayo+Zimbabwe',
    venueContact: {
      phone: '+263 77 230 9333',
      email: 'hopecitychurchzim@gmail.com',
    },
    description: 'Deepen your faith through in-depth Bible study and powerful prayer sessions.',
    moreInfo: [
      'A lunch-hour gathering for Bible study and prayer.',
      'Contact Hope City Church if you need help finding the venue.',
    ],
    venuePhotos: [],
    venuePhotoNote: 'The event listing does not include a venue photograph. Use the church’s public photo page for current imagery.',
    venuePhotoLink: {
      label: 'View Hope City Church photos',
      href: 'https://www.facebook.com/HopeCityChurchByo/photos',
    },
    color: 'from-gold to-yellow-600',
  },
  {
    id: 'all-night-october-2026',
    title: 'All Night',
    occasion: 'Overnight worship service',
    startDate: '2026-10-10',
    time: '1800hrs - 0700hrs',
    location: 'Main Auditorium',
    venueAddress: ministryAddress,
    venueMapUrl: ministryMapUrl,
    description: 'Dynamic worship, fellowship, and spiritual growth for young believers.',
    moreInfo: [
      'An overnight gathering running from 18:00 to 07:00.',
      'The published description highlights worship, fellowship and spiritual growth for young believers.',
    ],
    venuePhotos: ministryVenuePhotos,
    venuePhotoNote: 'Ministry-provided photographs show worship gatherings inside the ministry hall.',
    color: 'from-gold to-yellow-600',
  },
  {
    id: 'annual-conference-2026',
    title: 'Annual Conference',
    occasion: 'Ministry revival conference',
    startDate: '2026-10-01',
    endDate: '2026-10-04',
    time: '1500hrs - 1800hrs',
    location: 'Main Auditorium',
    venueAddress: ministryAddress,
    venueMapUrl: ministryMapUrl,
    description: 'A three-day revival event featuring powerful preaching, healing, and miracles.',
    moreInfo: [
      'The ministry describes this as a revival conference featuring preaching, healing and miracles.',
      'The listing gives the time window as 15:00–18:00; a session-by-session programme is not provided.',
    ],
    venuePhotos: ministryVenuePhotos,
    venuePhotoNote: 'Ministry-provided photographs show worship gatherings inside the ministry hall.',
    color: 'from-deep-blue to-blue-700',
  },
  {
    id: 'sunday-school-december-2026',
    title: 'Sunday School Outing',
    occasion: 'Sunday School outing',
    startDate: '2026-12-04',
    time: 'Day Visit',
    location: 'Conference Center',
    description: 'A special outing for our Sunday School students to learn and grow in their faith.',
    moreInfo: [
      'A faith-centered outing for Sunday School students.',
      'The exact venue address, programme, travel arrangements and registration details are not included in the current listing.',
    ],
    venuePhotos: [],
    venuePhotoNote: 'The event listing says “Conference Center” but does not identify a specific property or provide a venue photograph.',
    color: 'from-deep-blue to-blue-700',
  },
  {
    id: 'youth-retreat-april-2027',
    title: 'Youth Inyanga Retreat',
    occasion: 'Youth retreat',
    startDate: '2027-04-15',
    endDate: '2027-04-19',
    time: 'All Days',
    location: 'Inyanga Mountains',
    venueAddress: 'Nyanga, Manicaland, Zimbabwe; exact retreat property to be confirmed.',
    venueMapUrl: 'https://www.google.com/maps/search/?api=1&query=Nyanga+Manicaland+Zimbabwe',
    description: 'Inspiring refreshed minds of the leaders of tomorrow.',
    moreInfo: [
      'A multi-day youth retreat in the Nyanga highlands.',
      'The current listing does not specify the accommodation, travel arrangements, cost or registration details.',
    ],
    venuePhotos: nyangaPhotos,
    venuePhotoNote: 'These photographs show the Nyanga destination region; the specific retreat accommodation has not been identified in the event listing.',
    color: 'from-gold to-yellow-600',
  },
  {
    id: 'youth-matopo-retreat-2026',
    title: 'Youth Matopo Retreat',
    occasion: 'Youth retreat',
    startDate: '2026-12-29',
    endDate: '2026-12-31',
    time: 'All Days',
    location: 'Matopo Hills',
    venueAddress: 'Matobo Hills (Matopos), Zimbabwe; exact retreat property to be confirmed.',
    venueMapUrl: 'https://www.google.com/maps/search/?api=1&query=Matobo+Hills+Zimbabwe',
    description: 'A spiritual retreat for youth to connect with God and nature, fostering personal growth and community.',
    moreInfo: [
      'A multi-day youth retreat focused on spiritual connection, nature, personal growth and community.',
      'The current listing does not specify the accommodation, travel arrangements, cost or registration details.',
    ],
    venuePhotos: matoboPhotos,
    venuePhotoNote: 'These photographs show Matobo Hills; the specific retreat accommodation has not been identified in the event listing.',
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

export const formatEventTime = (time: string) =>
  time
    .replace(/\b(\d{2})(\d{2})\s*hrs?\b/gi, '$1:$2')
    .replace(/\s*-\s*/g, ' – ')
    .trim();

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
