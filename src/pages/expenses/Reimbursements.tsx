
import React from 'react';
import UnderConstruction from '@/components/common/UnderConstruction';
import { Receipt } from 'lucide-react';

const Reimbursements: React.FC = () => {
  return (
    <UnderConstruction 
      title="Reimbursements" 
      description="This page allows management of employee expense reimbursements."
      icon={Receipt}
    />
  );
};

export default Reimbursements;
