
import React from 'react';
import UnderConstruction from '@/components/common/UnderConstruction';
import { FolderTree } from 'lucide-react';

const ExpenseCategories: React.FC = () => {
  return (
    <UnderConstruction 
      title="Expense Categories" 
      description="This page allows configuration of expense categories and approval limits."
      icon={FolderTree}
    />
  );
};

export default ExpenseCategories;
