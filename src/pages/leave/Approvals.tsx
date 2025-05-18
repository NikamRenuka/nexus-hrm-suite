
import React from 'react';
import UnderConstruction from '@/components/common/UnderConstruction';
import { CheckSquare } from 'lucide-react';

const Approvals: React.FC = () => {
  return (
    <UnderConstruction 
      title="Leave Approvals" 
      description="This page displays leave requests that require your approval."
      icon={CheckSquare}
    />
  );
};

export default Approvals;
