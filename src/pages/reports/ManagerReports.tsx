
import React from 'react';
import UnderConstruction from '@/components/common/UnderConstruction';
import { BarChart3 } from 'lucide-react';

const ManagerReports: React.FC = () => {
  return (
    <UnderConstruction 
      title="Manager Reports" 
      description="This page provides access to team-related reports and analytics."
      icon={BarChart3}
    />
  );
};

export default ManagerReports;
