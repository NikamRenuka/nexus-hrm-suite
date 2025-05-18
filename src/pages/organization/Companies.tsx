
import React from 'react';
import UnderConstruction from '@/components/common/UnderConstruction';
import { Building } from 'lucide-react';

const Companies: React.FC = () => {
  return (
    <UnderConstruction 
      title="Companies Management" 
      description="This page will allow super admins to manage client companies across the platform."
      icon={Building}
    />
  );
};

export default Companies;
