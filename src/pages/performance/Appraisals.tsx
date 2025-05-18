
import React from 'react';
import UnderConstruction from '@/components/common/UnderConstruction';
import { Award } from 'lucide-react';

const Appraisals: React.FC = () => {
  return (
    <UnderConstruction 
      title="Appraisals" 
      description="This page allows management of employee performance appraisals."
      icon={Award}
    />
  );
};

export default Appraisals;
