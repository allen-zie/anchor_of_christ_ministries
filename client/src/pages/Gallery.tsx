import { useState } from 'react';
import Footer from '@/components/Footer';
import buildingProject from '@/content/images/building.webp';
import gatheringWide from '@/content/images/WhatsApp Image 2026-10-19 at 15.48.03.webp';
import gatheringPrayer from '@/content/images/WhatsApp Image 2026-10-19 at 15.48.01.webp';
import congregationSeated from '@/content/images/prayer.webp';

type GalleryCategory = 'Building' | 'Worship gatherings' | 'Outings' | 'Compassion';
type GalleryFilter = 'All' | GalleryCategory;
type GalleryItem = {
  title: string;
  category: GalleryCategory;
  mediaType: 'image' | 'video';
  src: string;
  alt: string;
};

const galleryItems: GalleryItem[] = [
  {
    title: 'Building project',
    category: 'Building',
    mediaType: 'image',
    src: buildingProject,
    alt: 'A church building project photographed during construction.',
  },
  {
    title: 'Worship gathering',
    category: 'Worship gatherings',
    mediaType: 'image',
    src: gatheringWide,
    alt: 'A congregation gathered inside the church building for worship and prayer.',
  },
  {
    title: 'A moment of prayer',
    category: 'Worship gatherings',
    mediaType: 'image',
    src: gatheringPrayer,
    alt: 'Church members gathered in prayer.',
  },
  {
    title: 'Church gathering',
    category: 'Worship gatherings',
    mediaType: 'image',
    src: congregationSeated,
    alt: 'Congregants seated together during a church gathering.',
  },
];

const filters: GalleryFilter[] = ['All', 'Building', 'Worship gatherings', 'Outings', 'Compassion'];

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState<GalleryFilter>('All');
  const visibleItems = activeFilter === 'All'
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeFilter);

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-b from-light-gray to-white px-4 pb-14 pt-32 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="inline-block rounded-full border border-gold bg-gold/10 px-4 py-2 text-sm font-semibold uppercase tracking-wide text-deep-blue">
            Media &amp; Resources
          </p>
          <h1 className="mt-6 text-5xl font-bold text-deep-blue lg:text-6xl">Gallery</h1>
          <p className="mt-5 max-w-3xl text-xl leading-relaxed text-gray-600">
            A growing collection of images and footage from the life and work of Anchor of Christ International Ministries.
          </p>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8" aria-label="Gallery content">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-wrap gap-3" aria-label="Filter gallery by category">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                aria-pressed={activeFilter === filter}
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 ${
                  activeFilter === filter
                    ? 'border-deep-blue bg-deep-blue text-white'
                    : 'border-gray-200 bg-white text-deep-blue hover:border-gold hover:bg-gold/10'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {visibleItems.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visibleItems.map((item) => (
                <article key={item.title} className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg">
                  {item.mediaType === 'video' ? (
                    <video controls playsInline preload="metadata" className="aspect-[4/3] w-full bg-deep-blue object-cover">
                      <source src={item.src} />
                      Your browser does not support embedded video.
                    </video>
                  ) : (
                    <img src={item.src} alt={item.alt} loading="lazy" className="aspect-[4/3] w-full object-cover" />
                  )}
                  <div className="p-5">
                    <p className="text-xs font-bold uppercase tracking-wider text-gold">{item.category}</p>
                    <h2 className="mt-2 text-xl font-bold text-deep-blue">{item.title}</h2>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-light-gray px-6 py-14 text-center">
              <h2 className="text-2xl font-bold text-deep-blue">{activeFilter} media coming soon</h2>
              <p className="mx-auto mt-3 max-w-xl text-gray-600">
                Photos or video for this gallery category have not been added yet. When the ministry's media is provided, it can be added here.
              </p>
            </div>
          )}

          <p className="mt-10 border-l-4 border-gold bg-light-gray px-5 py-4 text-sm leading-relaxed text-gray-600">
            This gallery currently includes the building-project and worship-gathering images available in the website. Outing and compassion photos or footage can be added when those files are supplied.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
