
import React from 'react';
import UnderConstruction from '@/components/common/UnderConstruction';
import { ClipboardCheck } from 'lucide-react';

const Reviews: React.FC = () => {
  return (
    <UnderConstruction 
      title="Employee Reviews" 
      description="This page facilitates the performance review process."
      icon={ClipboardCheck}
    />
  );
};

export default Reviews;
