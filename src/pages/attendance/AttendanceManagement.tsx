
import React from 'react';
import UnderConstruction from '@/components/common/UnderConstruction';
import { ClipboardCheck } from 'lucide-react';

const AttendanceManagement: React.FC = () => {
  return (
    <UnderConstruction 
      title="Attendance Management" 
      description="This page allows viewing and management of employee attendance records."
      icon={ClipboardCheck}
    />
  );
};

export default AttendanceManagement;
