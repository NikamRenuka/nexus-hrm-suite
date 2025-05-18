
import React from 'react';
import UnderConstruction from '@/components/common/UnderConstruction';
import { ReceiptText } from 'lucide-react';

const ApplyReimbursement: React.FC = () => {
  return (
    <UnderConstruction 
      title="Apply Reimbursement" 
      description="This page allows you to submit expense reimbursement claims."
      icon={ReceiptText}
    />
  );
};

export default ApplyReimbursement;
