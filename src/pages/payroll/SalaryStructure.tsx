
import React from 'react';
import UnderConstruction from '@/components/common/UnderConstruction';
import { LayoutList } from 'lucide-react';

const SalaryStructure: React.FC = () => {
  return (
    <UnderConstruction 
      title="Salary Structure" 
      description="This page allows configuration of salary components and structures."
      icon={LayoutList}
    />
  );
};

export default SalaryStructure;
