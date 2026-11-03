import { Building2 } from 'lucide-react';
import MinistryLandingPage from '@/components/MinistryLandingPage';
import buildingProject from '@/content/images/building.webp';

export default function BuildingMinistry() {
  return (
    <MinistryLandingPage
      title="Building Ministry"
      headline="Building spaces for worship, fellowship, and service."
      summary="The Building Ministry supports the development and care of the physical spaces where the church gathers and serves."
      overview="Our buildings create a place for worship, fellowship, learning, and community life. The Building Ministry focuses on stewardship of those spaces and on supporting building work that serves the wider ministry."
      icon={Building2}
      image={buildingProject}
      imageAlt="A church building project shown during construction."
      focusAreas={[
        {
          title: 'Building and development',
          description: 'Supporting the development of spaces intended for worship and ministry.',
        },
        {
          title: 'Care and stewardship',
          description: 'Helping keep shared church spaces welcoming and useful for the people who gather there.',
        },
        {
          title: 'Serving together',
          description: 'Practical work and shared support help build a place for the whole community.',
        },
      ]}
    />
  );
}
