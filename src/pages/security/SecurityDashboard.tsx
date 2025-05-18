
import React from 'react';
import UnderConstruction from '@/components/common/UnderConstruction';
import { Shield } from 'lucide-react';

const SecurityDashboard: React.FC = () => {
  return (
    <UnderConstruction 
      title="Security Dashboard" 
      description="This page provides an overview of security settings, logs, and audit trails."
      icon={Shield}
    />
  );
};

export default SecurityDashboard;
