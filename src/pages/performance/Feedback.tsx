
import React from 'react';
import UnderConstruction from '@/components/common/UnderConstruction';
import { MessageSquare } from 'lucide-react';

const Feedback: React.FC = () => {
  return (
    <UnderConstruction 
      title="Employee Feedback" 
      description="This page allows collection and management of employee feedback."
      icon={MessageSquare}
    />
  );
};

export default Feedback;
