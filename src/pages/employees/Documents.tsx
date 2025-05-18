
import React from 'react';
import UnderConstruction from '@/components/common/UnderConstruction';
import { FileText } from 'lucide-react';

const Documents: React.FC = () => {
  return (
    <UnderConstruction 
      title="Document Verification" 
      description="This page allows verification and management of employee documents."
      icon={FileText}
    />
  );
};

export default Documents;
