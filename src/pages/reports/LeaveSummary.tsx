
import React from 'react';
import UnderConstruction from '@/components/common/UnderConstruction';
import { FileBarChart } from 'lucide-react';

const LeaveSummary: React.FC = () => {
  return (
    <UnderConstruction 
      title="Leave Summary" 
      description="This page displays a summary of your leave usage and balance."
      icon={FileBarChart}
    />
  );
};

export default LeaveSummary;
