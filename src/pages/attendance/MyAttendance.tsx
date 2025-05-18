
import React from 'react';
import UnderConstruction from '@/components/common/UnderConstruction';
import { ClipboardCheck } from 'lucide-react';

const MyAttendance: React.FC = () => {
  return (
    <UnderConstruction 
      title="My Attendance" 
      description="This page displays your attendance records and allows you to mark your attendance."
      icon={ClipboardCheck}
    />
  );
};

export default MyAttendance;
