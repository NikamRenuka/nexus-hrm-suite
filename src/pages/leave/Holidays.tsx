
import React from 'react';
import UnderConstruction from '@/components/common/UnderConstruction';
import { Calendar } from 'lucide-react';

const Holidays: React.FC = () => {
  return (
    <UnderConstruction 
      title="Holidays" 
      description="This page displays and allows configuration of company holidays."
      icon={Calendar}
    />
  );
};

export default Holidays;
