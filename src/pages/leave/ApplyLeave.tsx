
import React from 'react';
import UnderConstruction from '@/components/common/UnderConstruction';
import { CalendarPlus } from 'lucide-react';

const ApplyLeave: React.FC = () => {
  return (
    <UnderConstruction 
      title="Apply Leave" 
      description="This page allows you to apply for leave and view your leave balance."
      icon={CalendarPlus}
    />
  );
};

export default ApplyLeave;
