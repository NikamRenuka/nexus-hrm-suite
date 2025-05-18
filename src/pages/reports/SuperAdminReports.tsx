
import React from 'react';
import UnderConstruction from '@/components/common/UnderConstruction';
import { BarChart3 } from 'lucide-react';

const SuperAdminReports: React.FC = () => {
  return (
    <UnderConstruction 
      title="Platform Reports" 
      description="This page provides access to platform-wide reports and analytics."
      icon={BarChart3}
    />
  );
};

export default SuperAdminReports;
