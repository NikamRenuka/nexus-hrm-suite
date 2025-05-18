
import React from 'react';
import UnderConstruction from '@/components/common/UnderConstruction';
import { CalendarDays } from 'lucide-react';

const TeamLeaves: React.FC = () => {
  return (
    <UnderConstruction 
      title="Team Leaves" 
      description="This page displays leave records and requests for your team members."
      icon={CalendarDays}
    />
  );
};

export default TeamLeaves;
