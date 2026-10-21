import { useEffect, useRef } from 'react';
import { Link } from 'wouter';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Footer from '@/components/Footer';
import { Anchor, ArrowRight, BookOpen, Heart, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function TheProphet() {
  const pageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current.querySelectorAll('.fade-in'),
        { y: 30 },
        {
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 78%',
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

  return (
    <div ref={pageRef} className="min-h-screen bg-white">
      <section className="bg-gradient-to-b from-light-gray to-white px-4 pb-16 pt-32 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold bg-gold/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-gold">
              <Sparkles className="h-4 w-4" aria-hidden="true" /> The Church
            </p>
            <h1 className="text-5xl font-bold leading-tight text-deep-blue lg:text-6xl">
              Prophet Dr D. Chauke
            </h1>
            <p className="mt-6 max-w-xl text-xl leading-8 text-gray-600">
              The faith, calling, and leadership behind The Anchor of Christ International Ministries.
            </p>
          </div>
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-deep-blue via-blue-700 to-gold p-1 shadow-2xl">
            <div className="flex min-h-[20rem] items-center justify-center rounded-[1.8rem] bg-gradient-to-br from-deep-blue/80 to-gold/25 p-8 text-center text-white">
              <div>
                <div className="mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-full bg-white/15 ring-8 ring-white/10">
                  <Anchor className="h-12 w-12 text-gold" aria-hidden="true" />
                </div>
                <p className="text-2xl font-bold">Anchored in Christ</p>
                <p className="mt-2 text-white/80">A ministry founded on prayer, faith, and a burden for souls.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section ref={contentRef} className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-8">
          <article className="fade-in grid gap-8 rounded-3xl border border-gold/20 bg-gradient-to-br from-deep-blue/5 to-gold/10 p-8 shadow-lg md:grid-cols-[0.8fr_1.2fr] md:p-12">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-gold">A calling to serve</p>
              <h2 className="text-3xl font-bold text-deep-blue">The burden that became a church</h2>
            </div>
            <div className="space-y-5 text-lg leading-8 text-gray-700">
              <p>
                Prophet Dr D. Chauke carries a ministry shaped by a deep desire to see people anchored in Christ, rooted in the Word, and restored to hope. The vision for The Anchor of Christ International Ministries grew from that burden: to reach souls, build believers, and bring the love of Jesus into communities.
              </p>
              <p>
                As the calling became clearer through prayer and obedience, believers began gathering around the message. What started as a step of faith in 2012 developed into a ministry family with a prophetic, healing, and deliverance focus.
              </p>
            </div>
          </article>

          <div className="grid gap-6 md:grid-cols-3">
            <article className="fade-in rounded-3xl border border-gray-100 bg-white p-7 shadow-lg">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/15 text-gold"><BookOpen className="h-7 w-7" aria-hidden="true" /></div>
              <h2 className="mb-3 text-xl font-bold text-deep-blue">Formed in faith</h2>
              <p className="leading-7 text-gray-600">The church was formed through prayer, biblical conviction, and a commitment to honour Jesus Christ, the living Word.</p>
            </article>
            <article className="fade-in rounded-3xl border border-gray-100 bg-white p-7 shadow-lg">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/15 text-red-500"><Heart className="h-7 w-7" aria-hidden="true" /></div>
              <h2 className="mb-3 text-xl font-bold text-deep-blue">Built for people</h2>
              <p className="leading-7 text-gray-600">Prophet Dr D. Chauke leads with a pastoral heart, making space for healing, discipleship, prayer, and practical care.</p>
            </article>
            <article className="fade-in rounded-3xl border border-gray-100 bg-white p-7 shadow-lg">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-700/15 text-blue-700"><Anchor className="h-7 w-7" aria-hidden="true" /></div>
              <h2 className="mb-3 text-xl font-bold text-deep-blue">Sent to nations</h2>
              <p className="leading-7 text-gray-600">The ministry’s vision reaches beyond one congregation: equipping believers and impacting communities with the Gospel.</p>
            </article>
          </div>

          <article className="fade-in overflow-hidden rounded-3xl bg-gradient-to-r from-deep-blue to-blue-700 p-8 text-white shadow-2xl md:p-12">
            <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-gold">The continuing vision</p>
                <h2 className="mb-4 text-3xl font-bold">Winning souls. Building believers. Impacting nations.</h2>
                <p className="max-w-3xl text-lg leading-8 text-white/85">
                  Today, the church continues to pursue the vision that shaped its beginning: to serve Christ, touch lives, win souls to Jesus, and help believers live with purpose and spiritual maturity.
                </p>
              </div>
              <Link href="/contact">
                <a className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-bold text-deep-blue transition-transform hover:-translate-y-1">
                  CONNECT WITH US <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </Link>
            </div>
          </article>
        </div>
      </section>

      <Footer />
    </div>
  );
}
