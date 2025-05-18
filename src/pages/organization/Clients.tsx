
import React from 'react';
import UnderConstruction from '@/components/common/UnderConstruction';
import { Users } from 'lucide-react';

const Clients: React.FC = () => {
  return (
    <UnderConstruction 
      title="Client Management" 
      description="This page will allow super admins to manage client accounts and their settings."
      icon={Users}
    />
  );
};

export default Clients;
