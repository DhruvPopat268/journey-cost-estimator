import React from 'react';
import { OneWayForm, HourlyForm } from './subcategory-forms';

interface FormRendererProps {
  subcategoryName: string;
  categoryName?: string;
  selectedUsage: string;
  customUsage: string;
  onUsageChange: (value: string) => void;
  onCustomUsageChange: (value: string) => void;
}

export const FormRenderer: React.FC<FormRendererProps> = ({
  subcategoryName,
  categoryName = '',
  selectedUsage,
  customUsage,
  onUsageChange,
  onCustomUsageChange,
}) => {
  const normalizedSubcategory = subcategoryName.toLowerCase();
  const normalizedCategory = categoryName.toLowerCase();

  if (normalizedSubcategory.includes('one-way') || normalizedSubcategory.includes('oneway') || normalizedSubcategory.includes('one way')) {
    return (
      <OneWayForm
        selectedUsage={selectedUsage}
        customUsage={customUsage}
        onUsageChange={onUsageChange}
        onCustomUsageChange={onCustomUsageChange}
      />
    );
  }

  if (normalizedSubcategory.includes('hourly') || normalizedSubcategory.includes('hour')) {
    return (
      <HourlyForm
        selectedUsage={selectedUsage}
        onUsageChange={onUsageChange}
      />
    );
  }

  // Default fallback
  return (
    <HourlyForm
      selectedUsage={selectedUsage}
      onUsageChange={onUsageChange}
    />
  );
};