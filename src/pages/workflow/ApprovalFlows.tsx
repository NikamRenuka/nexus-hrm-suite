
import React from 'react';
import UnderConstruction from '@/components/common/UnderConstruction';
import { GitMerge } from 'lucide-react';

const ApprovalFlows: React.FC = () => {
  return (
    <UnderConstruction 
      title="Approval Flows" 
      description="This page allows configuration of approval workflows for various processes."
      icon={GitMerge}
    />
  );
};

export default ApprovalFlows;
