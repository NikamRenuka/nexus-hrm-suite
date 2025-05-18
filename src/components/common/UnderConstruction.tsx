
import React from 'react';
import { LucideIcon, Construction } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface UnderConstructionProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
}

const UnderConstruction: React.FC<UnderConstructionProps> = ({
  title,
  description = "This page is currently under development. Please check back later.",
  icon: Icon = Construction
}) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col items-center justify-center h-full py-24 px-4 text-center">
      <Icon className="h-24 w-24 mb-6 text-hrms-primary opacity-60" />
      <h2 className="text-2xl font-bold mb-3">{title}</h2>
      <p className="text-gray-500 max-w-md mb-8">{description}</p>
      <Button onClick={() => navigate('/dashboard')} variant="outline">
        Return to Dashboard
      </Button>
    </div>
  );
};

export default UnderConstruction;
