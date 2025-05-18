
import React from 'react';
import UnderConstruction from '@/components/common/UnderConstruction';
import { Network } from 'lucide-react';

const Departments: React.FC = () => {
  return (
    <UnderConstruction 
      title="Departments & Designations" 
      description="This page allows management of company departments and job designations."
      icon={Network}
    />
  );
};

export default Departments;
