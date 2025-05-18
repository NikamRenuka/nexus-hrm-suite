
import React from 'react';
import UnderConstruction from '@/components/common/UnderConstruction';
import { Settings } from 'lucide-react';

const SuperAdminSettings: React.FC = () => {
  return (
    <UnderConstruction 
      title="Platform Settings" 
      description="This page allows super admins to configure global platform settings."
      icon={Settings}
    />
  );
};

export default SuperAdminSettings;
