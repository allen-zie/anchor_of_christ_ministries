import { ArrowUpRight, Calendar, Camera, Clock, Mail, MapPin, Phone } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { formatEventDate, formatEventTime, type EventItem, type EventVenuePhoto } from '@/lib/events';

type EventDetailsDialogProps = {
  event: EventItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function PhotoCredit({ photo }: { photo: EventVenuePhoto }) {
  if (!photo.credit) return null;

  return (
    <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-500">
      {photo.sourceUrl ? (
        <a href={photo.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline decoration-gray-300 underline-offset-2 hover:text-deep-blue">
          Photo: {photo.credit}
        </a>
      ) : (
        <span>Photo: {photo.credit}</span>
      )}
      {photo.licenseUrl && (
        <a href={photo.licenseUrl} target="_blank" rel="noopener noreferrer" className="underline decoration-gray-300 underline-offset-2 hover:text-deep-blue">
          License details
        </a>
      )}
    </div>
  );
}

export default function EventDetailsDialog({ event, open, onOpenChange }: EventDetailsDialogProps) {
  if (!event) return null;

  const facts = [
    { label: 'Occasion', value: event.occasion, Icon: Calendar },
    { label: 'Date', value: formatEventDate(event.startDate, event.endDate), Icon: Calendar },
    { label: 'Time', value: formatEventTime(event.time), Icon: Clock },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] w-[calc(100%-1.5rem)] max-w-4xl gap-0 overflow-y-auto border-0 bg-white p-0 shadow-2xl sm:w-[calc(100%-3rem)]">
        <div className={`bg-gradient-to-br ${event.color} px-6 py-7 pr-14 text-white sm:px-8 sm:py-9 sm:pr-16`}>
          <DialogHeader className="text-left">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-white/75">Event details</p>
            <DialogTitle className="text-2xl font-bold leading-tight text-white sm:text-3xl">{event.title}</DialogTitle>
            <DialogDescription className="mt-3 max-w-3xl text-sm leading-6 text-white/85 sm:text-base">
              {event.description}
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="space-y-7 p-5 sm:p-8">
          <section aria-label="Occasion, date and time" className="grid gap-3 sm:grid-cols-3">
            {facts.map(({ label, value, Icon }) => (
              <div key={label} className="flex min-h-24 items-start gap-3 rounded-xl border border-blue-100 bg-blue-50/60 p-4">
                <Icon size={19} aria-hidden="true" className="mt-0.5 shrink-0 text-deep-blue" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-500">{label}</p>
                  <p className="mt-1 font-semibold text-deep-blue">{value}</p>
                </div>
              </div>
            ))}
          </section>

          <section aria-labelledby="event-venue-heading" className="rounded-2xl border border-gray-200 p-5 sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-gold">Where to go</p>
                <h3 id="event-venue-heading" className="text-xl font-bold text-deep-blue">{event.location}</h3>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600">
                  {event.venueAddress ?? 'The exact venue address has not been provided in the current event listing.'}
                </p>
              </div>
              {event.venueMapUrl && (
                <a
                  href={event.venueMapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-deep-blue px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2"
                >
                  <MapPin size={17} aria-hidden="true" />
                  Open map
                  <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              )}
            </div>

            {(event.venueContact?.phone || event.venueContact?.email) && (
              <div className="mt-5 flex flex-wrap gap-3 border-t border-gray-100 pt-4">
                {event.venueContact.phone && (
                  <a href={`tel:${event.venueContact.phone.replace(/\s/g, '')}`} className="inline-flex items-center gap-2 text-sm font-medium text-deep-blue underline decoration-blue-200 underline-offset-4 hover:decoration-deep-blue">
                    <Phone size={15} aria-hidden="true" />
                    {event.venueContact.phone}
                  </a>
                )}
                {event.venueContact.email && (
                  <a href={`mailto:${event.venueContact.email}`} className="inline-flex items-center gap-2 text-sm font-medium text-deep-blue underline decoration-blue-200 underline-offset-4 hover:decoration-deep-blue">
                    <Mail size={15} aria-hidden="true" />
                    {event.venueContact.email}
                  </a>
                )}
              </div>
            )}
          </section>

          <section aria-labelledby="event-more-info-heading">
            <div className="mb-3 flex items-center gap-2">
              <div className="rounded-full bg-gold/15 p-2 text-deep-blue"><Calendar size={17} aria-hidden="true" /></div>
              <h3 id="event-more-info-heading" className="text-lg font-bold text-deep-blue">More information</h3>
            </div>
            <ul className="space-y-2 pl-1">
              {event.moreInfo.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-6 text-gray-700">
                  <span aria-hidden="true" className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <a href="/contact" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-deep-blue underline decoration-gold underline-offset-4 hover:text-blue-700">
              Contact the ministry for updates
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </section>

          <section aria-labelledby="event-photos-heading">
            <div className="mb-3 flex items-center gap-2">
              <div className="rounded-full bg-gold/15 p-2 text-deep-blue"><Camera size={17} aria-hidden="true" /></div>
              <h3 id="event-photos-heading" className="text-lg font-bold text-deep-blue">Venue & destination photos</h3>
            </div>

            {event.venuePhotos.length > 0 ? (
              <>
                <div className={`grid gap-4 ${event.venuePhotos.length === 1 ? 'grid-cols-1 sm:max-w-xl' : 'grid-cols-1 sm:grid-cols-2'}`}>
                  {event.venuePhotos.map((photo) => (
                    <figure key={photo.src} className="overflow-hidden rounded-xl border border-gray-200 bg-white">
                      <img src={photo.src} alt={photo.alt} loading="lazy" decoding="async" className="h-52 w-full object-cover sm:h-56" />
                      <figcaption className="p-3">
                        <p className="text-sm font-semibold text-gray-700">{photo.caption}</p>
                        <PhotoCredit photo={photo} />
                      </figcaption>
                    </figure>
                  ))}
                </div>
                <p className="mt-3 text-xs leading-5 text-gray-500">{event.venuePhotoNote}</p>
              </>
            ) : (
              <div className="rounded-xl border border-dashed border-blue-200 bg-blue-50/50 p-5">
                <p className="text-sm leading-6 text-gray-700">{event.venuePhotoNote}</p>
                {event.venuePhotoLink && (
                  <a href={event.venuePhotoLink.href} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-deep-blue underline decoration-gold underline-offset-4 hover:text-blue-700">
                    {event.venuePhotoLink.label}
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </a>
                )}
              </div>
            )}
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}
