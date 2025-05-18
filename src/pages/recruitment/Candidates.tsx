
import React from 'react';
import UnderConstruction from '@/components/common/UnderConstruction';
import { Users } from 'lucide-react';

const Candidates: React.FC = () => {
  return (
    <UnderConstruction 
      title="Candidates" 
      description="This page displays and allows management of job applicants."
      icon={Users}
    />
  );
};

export default Candidates;
