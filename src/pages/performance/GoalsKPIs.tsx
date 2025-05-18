
import React from 'react';
import UnderConstruction from '@/components/common/UnderConstruction';
import { Target } from 'lucide-react';

const GoalsKPIs: React.FC = () => {
  return (
    <UnderConstruction 
      title="Goals & KPIs" 
      description="This page allows setting and tracking of employee goals and key performance indicators."
      icon={Target}
    />
  );
};

export default GoalsKPIs;
