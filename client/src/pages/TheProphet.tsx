import { useEffect, useRef } from 'react';
import { Link } from 'wouter';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Footer from '@/components/Footer';
import { Anchor, ArrowRight, BookOpen, Heart, Sparkles } from 'lucide-react';
import ProphetMainImage from '@/content/images/Prophet4.webp';

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
              <Sparkles className="h-4 w-4" aria-hidden="true" /> The Prophet
            </p>
            <h1 className="text-5xl font-bold leading-tight text-deep-blue lg:text-6xl">
              Prophet Dr D. Chauke
            </h1>
            <p className="mt-6 max-w-xl text-xl leading-8 text-gray-600">
              The faith, calling, and leadership behind The Anchor of Christ International Ministries.
            </p>
          </div>
          <div className="relative overflow-hidden rounded-[2rem] ">
            <div className="flex min-h-[20rem] items-center justify-center rounded-[1.8rem] p-8 text-center text-white">
              <div>
                <img src={ProphetMainImage} alt="Prophet Dr D. Chauke" className="h-100 w-full object-cover" />
                <h2 className="mt-4 text-2xl font-bold">Prophet Dr D. Chauke</h2>
                <p className="mt-2 text-lg text-gray-600">Founder & Visionary</p>
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
                Prophet Dr Decide Chauke was born on August 14, 1974, in the Ndanga district of Zaka, Masvingo 
                province, and he currently resides in Bulawayo. His life story is marked by a profound encounter 
                with God that occurred in April 2006, during a Sunday morning at 2 am. It was at this moment that 
                he experienced a divine visitation from an angel of God, a pivotal event that forever changed the 
                course of his life.
              </p>
              <p>
                The divine visitation took place during a conference where Rev Sibanda was preaching, and it was 
                during this gathering that Prophet Dr Decide Chauke made a deeply personal commitment to Jesus Christ. 
                It was a moment of complete surrender and dedication, where he wholeheartedly offered his life to the 
                service of Jesus. In this encounter, the angel conveyed to him a specific task, a divine calling 
                that was to be fulfilled when He heads back to Zimbabwe.
              </p>
              <p>
                Following his personal commitment to Jesus Christ in April 2006, Prophet Dr Decide Chauke has been guided 
                and mentored by the renowned Prophet TB Joshua. This mentoring relationship aligns with the biblical 
                concept of discipleship, where seasoned believers impart their wisdom and guidance to those called to 
                ministry. Just as Elijah mentored Elisha and Jesus mentored His disciples, Prophet Dr Decide Chauke has 
                received valuable guidance and spiritual nurturing from Prophet TB Joshua, shaping his ministry and 
                mission.
              </p>
              <p>
                Throughout his ministry, Prophet Dr Decide Chauke's work is rooted in scriptural principles and teachings. 
                One relevant scripture is James 5:14-15, which states, "Is anyone among you sick? Let them call the elders 
                of the church to pray over them and anoint them with oil in the name of the Lord. And the prayer offered in 
                faith will make the sick person well; the Lord will raise them up." In his prophetic healing ministry, Prophet 
                Dr Decide Chauke follows this biblical model, praying for the sick and trusting in the power of God to bring 
                about healing and restoration.
              </p>
              <p>
                Prophet Dr Decide Chauke's commitment to bringing people closer to Jesus resonates with Jesus' own words in 
                John 14 vs 6, where He declares, "I am the way and the truth and the life. No one comes to the Father except 
                through me." Guided by this truth, Prophet Dr Decide Chauke's ministry focuses on leading individuals to Jesus, 
                helping them find salvation, and nurturing their relationship with the Father.
              </p>
              <p>
                In addition to his prophetic healing and deliverance ministry, Prophet Dr Decide Chauke is actively involved 
                in philanthropic endeavors. Inspired by Jesus' teachings on caring for the marginalized and needy, he has 
                initiated programs for prison evangelism, providing spiritual support to those incarcerated. He is also 
                involved in fending, which involves assisting vulnerable individuals and families with basic needs. 
                Furthermore, Prophet Dr Decide Chauke engages in home and work visits, offering guidance, prayer, and support 
                to those in need. His commitment to schooling children and empowering homes reflects the biblical mandate 
                to care for the orphaned and widowed, as seen in James 1 vs 27.
              </p>
              <p>
                In summary, Prophet Dr Decide Chauke's journey encompasses divine encounters, mentorship, and a multifaceted 
                ministry rooted in scriptural principles. Mentored by Prophet TB Joshua, he embraces the guidance and 
                wisdom imparted to him. His ministry focuses on prophetic healing, deliverance, and philanthropy, aligning 
                with biblical principles of faith, discipleship, and compassion. Through his work, he seeks to bring people 
                closer to Jesus, following the example of Jesus Himself and embodying the teachings of Scripture
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
                <h2 className="mb-4 text-3xl font-bold text-gold">Winning souls. Building believers. Impacting nations.</h2>
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
