
import React from 'react';
import UnderConstruction from '@/components/common/UnderConstruction';
import { Users } from 'lucide-react';

const TeamOverview: React.FC = () => {
  return (
    <UnderConstruction 
      title="Team Overview" 
      description="This page provides an overview of your team members and their status."
      icon={Users}
    />
  );
};

export default TeamOverview;
