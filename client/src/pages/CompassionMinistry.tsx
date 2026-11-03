import { HeartHandshake } from 'lucide-react';
import MinistryLandingPage from '@/components/MinistryLandingPage';

export default function CompassionMinistry() {
  return (
    <MinistryLandingPage
      title="Compassion Ministry"
      headline="Sharing the love of Christ through practical care."
      summary="Compassion Ministry encourages care, kindness, and service to people in our community."
      overview="Compassion is expressed through listening, encouragement, and practical support offered with dignity. This ministry reflects Christ's love by meeting people with care and seeking ways to serve those who need support."
      icon={HeartHandshake}
      focusAreas={[
        {
          title: 'Care and encouragement',
          description: 'Offering a listening ear, kindness, and encouragement to people facing difficult moments.',
        },
        {
          title: 'Practical support',
          description: 'Responding to needs with thoughtful, practical help where it is available.',
        },
        {
          title: 'Community service',
          description: 'Serving others with compassion, respect, and the love of Christ.',
        },
      ]}
    />
  );
}
