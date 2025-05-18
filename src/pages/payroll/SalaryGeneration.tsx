
import React from 'react';
import UnderConstruction from '@/components/common/UnderConstruction';
import { Calculator } from 'lucide-react';

const SalaryGeneration: React.FC = () => {
  return (
    <UnderConstruction 
      title="Salary Generation" 
      description="This page allows generation and processing of monthly payroll."
      icon={Calculator}
    />
  );
};

export default SalaryGeneration;
