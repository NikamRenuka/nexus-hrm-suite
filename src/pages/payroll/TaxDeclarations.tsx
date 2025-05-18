
import React from 'react';
import UnderConstruction from '@/components/common/UnderConstruction';
import { FileStack } from 'lucide-react';

const TaxDeclarations: React.FC = () => {
  return (
    <UnderConstruction 
      title="Tax Declarations" 
      description="This page allows you to submit your tax declarations and proof of investments."
      icon={FileStack}
    />
  );
};

export default TaxDeclarations;
