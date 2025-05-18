
import React from 'react';
import UnderConstruction from '@/components/common/UnderConstruction';
import { ClipboardList } from 'lucide-react';

const AttendanceRules: React.FC = () => {
  return (
    <UnderConstruction 
      title="Attendance Rules" 
      description="This page allows configuration of attendance rules and policies."
      icon={ClipboardList}
    />
  );
};

export default AttendanceRules;
