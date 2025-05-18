
import React from 'react';
import UnderConstruction from '@/components/common/UnderConstruction';
import { Receipt } from 'lucide-react';

const TeamExpenses: React.FC = () => {
  return (
    <UnderConstruction 
      title="Team Expenses" 
      description="This page displays expense claims from your team members."
      icon={Receipt}
    />
  );
};

export default TeamExpenses;
