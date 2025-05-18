
import React from 'react';
import UnderConstruction from '@/components/common/UnderConstruction';
import { Target } from 'lucide-react';

const TeamGoals: React.FC = () => {
  return (
    <UnderConstruction 
      title="Team Goals" 
      description="This page allows setting and tracking of team goals and objectives."
      icon={Target}
    />
  );
};

export default TeamGoals;
