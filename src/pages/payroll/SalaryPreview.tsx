
import React from 'react';
import UnderConstruction from '@/components/common/UnderConstruction';
import { Eye } from 'lucide-react';

const SalaryPreview: React.FC = () => {
  return (
    <UnderConstruction 
      title="Salary Preview" 
      description="This page allows preview of salary calculations before processing."
      icon={Eye}
    />
  );
};

export default SalaryPreview;
