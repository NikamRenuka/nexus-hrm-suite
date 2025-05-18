
import React from 'react';
import UnderConstruction from '@/components/common/UnderConstruction';
import { Eye } from 'lucide-react';

const ViewStatus: React.FC = () => {
  return (
    <UnderConstruction 
      title="View Status" 
      description="This page allows you to view the status of your reimbursement claims."
      icon={Eye}
    />
  );
};

export default ViewStatus;
