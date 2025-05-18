
import React from 'react';
import UnderConstruction from '@/components/common/UnderConstruction';
import { Target } from 'lucide-react';

const MyGoals: React.FC = () => {
  return (
    <UnderConstruction 
      title="My Goals & Feedback" 
      description="This page displays your performance goals and feedback received."
      icon={Target}
    />
  );
};

export default MyGoals;
