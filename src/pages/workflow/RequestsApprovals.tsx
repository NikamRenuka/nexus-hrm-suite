
import React from 'react';
import UnderConstruction from '@/components/common/UnderConstruction';
import { ClipboardList } from 'lucide-react';

const RequestsApprovals: React.FC = () => {
  return (
    <UnderConstruction 
      title="Requests & Approvals" 
      description="This page displays your pending requests and approvals."
      icon={ClipboardList}
    />
  );
};

export default RequestsApprovals;
