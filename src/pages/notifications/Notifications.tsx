
import React from 'react';
import UnderConstruction from '@/components/common/UnderConstruction';
import { Bell } from 'lucide-react';

const Notifications: React.FC = () => {
  return (
    <UnderConstruction 
      title="Notifications" 
      description="This page displays your notifications and alerts."
      icon={Bell}
    />
  );
};

export default Notifications;
