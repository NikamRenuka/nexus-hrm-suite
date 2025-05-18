
import React from 'react';
import UnderConstruction from '@/components/common/UnderConstruction';
import { CheckCircle2 } from 'lucide-react';

const LeaveAttendanceApprovals: React.FC = () => {
  return (
    <UnderConstruction 
      title="Leave & Attendance Approvals" 
      description="This page allows approval of leave requests and attendance records."
      icon={CheckCircle2}
    />
  );
};

export default LeaveAttendanceApprovals;
