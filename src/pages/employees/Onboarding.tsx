
import React from 'react';
import UnderConstruction from '@/components/common/UnderConstruction';
import { UserPlus } from 'lucide-react';

const Onboarding: React.FC = () => {
  return (
    <UnderConstruction 
      title="Employee Onboarding" 
      description="This page facilitates the employee onboarding process."
      icon={UserPlus}
    />
  );
};

export default Onboarding;
