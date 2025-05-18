
import React from 'react';
import UnderConstruction from '@/components/common/UnderConstruction';
import { BarChart3 } from 'lucide-react';

const AdminReports: React.FC = () => {
  return (
    <UnderConstruction 
      title="Admin Reports" 
      description="This page provides access to company-wide reports and analytics."
      icon={BarChart3}
    />
  );
};

export default AdminReports;
