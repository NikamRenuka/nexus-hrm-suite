
import React from 'react';
import UnderConstruction from '@/components/common/UnderConstruction';
import { Calculator } from 'lucide-react';

const LeaveBalance: React.FC = () => {
  return (
    <UnderConstruction 
      title="Leave Balance" 
      description="This page displays your current leave balance across different leave types."
      icon={Calculator}
    />
  );
};

export default LeaveBalance;
