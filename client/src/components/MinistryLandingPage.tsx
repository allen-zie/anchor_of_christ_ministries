import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import Footer from '@/components/Footer';

type FocusArea = {
  title: string;
  description: string;
};

type MinistryLandingPageProps = {
  title: string;
  headline: string;
  summary: string;
  overview: string;
  focusAreas: FocusArea[];
  icon: LucideIcon;
  image?: string;
  imageAlt?: string;
};

export default function MinistryLandingPage({
  title,
  headline,
  summary,
  overview,
  focusAreas,
  icon: Icon,
  image,
  imageAlt,
}: MinistryLandingPageProps) {
  return (
    <div className="min-h-screen bg-white">
      <section className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-deep-blue to-blue-700 text-white">
        <div className="max-w-7xl mx-auto grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <Link href="/ministries">
              <a className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-gold transition-colors">
                <span aria-hidden="true">←</span> Back to Ministries
              </a>
            </Link>
            <p className="mb-4 inline-flex rounded-full border border-gold/60 bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-wide text-gold">
              Our Ministries
            </p>
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">{title}</h1>
            <p className="mt-5 text-2xl font-semibold text-gold">{headline}</p>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/85">{summary}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/contact">
                <a className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 font-bold text-deep-blue transition hover:bg-yellow-400">
                  Get in touch <ArrowRight size={18} aria-hidden="true" />
                </a>
              </Link>
              <Link href="/gallery">
                <a className="inline-flex items-center gap-2 rounded-full border border-white/50 px-6 py-3 font-semibold text-white transition hover:border-gold hover:text-gold">
                  Visit the Gallery <ArrowRight size={18} aria-hidden="true" />
                </a>
              </Link>
            </div>
          </div>

          {image ? (
            <figure className="overflow-hidden rounded-2xl border border-white/20 shadow-2xl">
              <img src={image} alt={imageAlt ?? ''} className="h-full max-h-[460px] min-h-[280px] w-full object-cover" />
            </figure>
          ) : (
            <div className="flex min-h-[280px] items-center justify-center rounded-2xl border border-white/15 bg-white/10 p-10 shadow-xl sm:min-h-[360px]">
              <div className="text-center">
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gold text-deep-blue shadow-lg">
                  <Icon size={48} aria-hidden="true" />
                </div>
                <p className="mt-6 text-lg font-semibold text-white">Care, service, and faith in action</p>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <p className="text-sm font-bold uppercase tracking-wider text-gold">About the ministry</p>
            <h2 className="mt-3 text-3xl font-bold text-deep-blue sm:text-4xl">Our purpose</h2>
            <p className="mt-5 text-lg leading-relaxed text-gray-700">{overview}</p>
          </div>

          <div className="mt-12">
            <h2 className="text-3xl font-bold text-deep-blue">How we serve</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {focusAreas.map((area) => (
                <article key={area.title} className="rounded-2xl border border-gray-100 bg-light-gray p-7 shadow-sm">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-gold text-deep-blue">
                    <Icon size={24} aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-bold text-deep-blue">{area.title}</h3>
                  <p className="mt-3 leading-relaxed text-gray-700">{area.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-gold to-yellow-600 px-4 py-14 text-deep-blue sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">Would you like to know more?</h2>
            <p className="mt-2 text-deep-blue/85">Contact the ministry team to learn how you can connect or serve.</p>
          </div>
          <Link href="/contact">
            <a className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-deep-blue px-6 py-3 font-bold text-white transition hover:bg-blue-900">
              Contact us <ArrowRight size={18} aria-hidden="true" />
            </a>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
