
import React from 'react';
import UnderConstruction from '@/components/common/UnderConstruction';
import { History } from 'lucide-react';

const AttendanceHistory: React.FC = () => {
  return (
    <UnderConstruction 
      title="Attendance History" 
      description="This page displays your historical attendance records."
      icon={History}
    />
  );
};

export default AttendanceHistory;
