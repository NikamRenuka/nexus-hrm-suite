
import React from 'react';
import UnderConstruction from '@/components/common/UnderConstruction';
import { Edit } from 'lucide-react';

const AttendanceOverrides: React.FC = () => {
  return (
    <UnderConstruction 
      title="Attendance Overrides" 
      description="This page allows you to make attendance corrections for your team members."
      icon={Edit}
    />
  );
};

export default AttendanceOverrides;
