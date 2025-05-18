
import React from 'react';
import UnderConstruction from '@/components/common/UnderConstruction';
import { Calendar } from 'lucide-react';

const Interviews: React.FC = () => {
  return (
    <UnderConstruction 
      title="Interviews" 
      description="This page allows scheduling and tracking of candidate interviews."
      icon={Calendar}
    />
  );
};

export default Interviews;
