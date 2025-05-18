
import React from 'react';
import UnderConstruction from '@/components/common/UnderConstruction';
import { Calendar } from 'lucide-react';

const CalendarView: React.FC = () => {
  return (
    <UnderConstruction 
      title="Leave Calendar" 
      description="This page displays a calendar view of team leaves."
      icon={Calendar}
    />
  );
};

export default CalendarView;
