
import React from 'react';
import UnderConstruction from '@/components/common/UnderConstruction';
import { UserCog } from 'lucide-react';

const OrganizationUsers: React.FC = () => {
  return (
    <UnderConstruction 
      title="Organization Users" 
      description="This page will allow super admins to manage user accounts across all client organizations."
      icon={UserCog}
    />
  );
};

export default OrganizationUsers;
