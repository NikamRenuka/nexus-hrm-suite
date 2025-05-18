
import React from 'react';
import UnderConstruction from '@/components/common/UnderConstruction';
import { CalendarDays } from 'lucide-react';

const LeaveRequests: React.FC = () => {
  return (
    <UnderConstruction 
      title="Leave Requests" 
      description="This page displays and allows management of employee leave requests."
      icon={CalendarDays}
    />
  );
};

export default LeaveRequests;
