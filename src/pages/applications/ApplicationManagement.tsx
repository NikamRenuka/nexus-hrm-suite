
import React from 'react';
import UnderConstruction from '@/components/common/UnderConstruction';
import { AppWindow } from 'lucide-react';

const ApplicationManagement: React.FC = () => {
  return (
    <UnderConstruction 
      title="Application Management" 
      description="This page allows super admins to manage web, Android, and iOS applications."
      icon={AppWindow}
    />
  );
};

export default ApplicationManagement;
