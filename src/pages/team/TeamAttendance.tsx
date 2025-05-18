
import React from 'react';
import UnderConstruction from '@/components/common/UnderConstruction';
import { ClipboardCheck } from 'lucide-react';

const TeamAttendance: React.FC = () => {
  return (
    <UnderConstruction 
      title="Team Attendance" 
      description="This page displays attendance records for your team members."
      icon={ClipboardCheck}
    />
  );
};

export default TeamAttendance;
