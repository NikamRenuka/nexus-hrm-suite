
import React from 'react';
import UnderConstruction from '@/components/common/UnderConstruction';
import { Settings } from 'lucide-react';

const AdminSettings: React.FC = () => {
  return (
    <UnderConstruction 
      title="Company Settings" 
      description="This page allows configuration of company settings including statutory components, salary components, work locations, and taxes."
      icon={Settings}
    />
  );
};

export default AdminSettings;
