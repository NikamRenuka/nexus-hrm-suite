
import React from 'react';
import UnderConstruction from '@/components/common/UnderConstruction';
import { Briefcase } from 'lucide-react';

const JobPosts: React.FC = () => {
  return (
    <UnderConstruction 
      title="Job Posts" 
      description="This page allows creation and management of job postings."
      icon={Briefcase}
    />
  );
};

export default JobPosts;
