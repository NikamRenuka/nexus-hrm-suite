
import React from 'react';
import UnderConstruction from '@/components/common/UnderConstruction';
import { BookOpen } from 'lucide-react';

const LeavePolicies: React.FC = () => {
  return (
    <UnderConstruction 
      title="Leave Policies" 
      description="This page allows configuration of leave types and policies."
      icon={BookOpen}
    />
  );
};

export default LeavePolicies;
