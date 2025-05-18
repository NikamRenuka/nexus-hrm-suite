
import React from 'react';
import UnderConstruction from '@/components/common/UnderConstruction';
import { FileText } from 'lucide-react';

const PaySlips: React.FC = () => {
  return (
    <UnderConstruction 
      title="Pay Slips" 
      description="This page allows generation and distribution of employee pay slips."
      icon={FileText}
    />
  );
};

export default PaySlips;
