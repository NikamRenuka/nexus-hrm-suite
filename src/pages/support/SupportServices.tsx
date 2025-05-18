
import React from 'react';
import UnderConstruction from '@/components/common/UnderConstruction';
import { HeadphonesIcon } from 'lucide-react';

const SupportServices: React.FC = () => {
  return (
    <UnderConstruction 
      title="Support Services" 
      description="This page provides access to technical and sales team support services."
      icon={HeadphonesIcon}
    />
  );
};

export default SupportServices;
