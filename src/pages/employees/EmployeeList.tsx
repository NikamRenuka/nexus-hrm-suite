
import React from 'react';
import UnderConstruction from '@/components/common/UnderConstruction';
import { Users } from 'lucide-react';

const EmployeeList: React.FC = () => {
  return (
    <UnderConstruction 
      title="Employee List" 
      description="This page will display all employees with options to view, add, and edit their details."
      icon={Users}
    />
  );
};

export default EmployeeList;
