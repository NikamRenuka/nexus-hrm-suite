
import React from 'react';
import UnderConstruction from '@/components/common/UnderConstruction';
import { BarChart3 } from 'lucide-react';

const HRReports: React.FC = () => {
  return (
    <UnderConstruction 
      title="HR Reports" 
      description="This page provides access to HR-related reports and analytics."
      icon={BarChart3}
    />
  );
};

export default HRReports;
