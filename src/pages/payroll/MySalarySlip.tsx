
import React from 'react';
import UnderConstruction from '@/components/common/UnderConstruction';
import { FileText } from 'lucide-react';

const MySalarySlip: React.FC = () => {
  return (
    <UnderConstruction 
      title="My Salary Slip" 
      description="This page allows you to view and download your salary slips."
      icon={FileText}
    />
  );
};

export default MySalarySlip;
