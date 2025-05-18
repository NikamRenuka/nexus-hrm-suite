
import React from 'react';
import UnderConstruction from '@/components/common/UnderConstruction';
import { User } from 'lucide-react';

const MyProfile: React.FC = () => {
  return (
    <UnderConstruction 
      title="My Profile" 
      description="This page displays and allows you to edit your profile information."
      icon={User}
    />
  );
};

export default MyProfile;
