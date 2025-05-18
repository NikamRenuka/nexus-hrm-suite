
import React from 'react';
import UnderConstruction from '@/components/common/UnderConstruction';
import { CreditCard } from 'lucide-react';

const BankAdvice: React.FC = () => {
  return (
    <UnderConstruction 
      title="Bank Advice" 
      description="This page allows generation of bank advice for salary transfers."
      icon={CreditCard}
    />
  );
};

export default BankAdvice;
