import React from 'react';
import { OneWayForm, HourlyForm, MonthlyForm, WeeklyForm } from './subcategory-forms';

interface FormRendererProps {
  subcategoryName: string;
  subSubcategoryName?: string;
  categoryName?: string;
  selectedUsage: string;
  customUsage: string;
  durationType?: string;
  durationValue?: string;
  durationOptions?: string[];
  durationError?: string;
  onUsageChange: (value: string) => void;
  onCustomUsageChange: (value: string) => void;
  onNumberOfMonthsChange?: (value: string) => void;
  onNumberOfWeeksChange?: (value: string) => void;
  onDurationTypeChange?: (value: string) => void;
  onDurationValueChange?: (value: string) => void;
}

export const FormRenderer: React.FC<FormRendererProps> = ({
  subcategoryName,
  categoryName = '',
  subSubcategoryName = '',
  selectedUsage,
  customUsage,
  durationType = 'Week',
  durationValue = '1',
  durationOptions = [],
  durationError = '',
  onUsageChange,
  onCustomUsageChange,
  onNumberOfMonthsChange,
  onNumberOfWeeksChange,
  onDurationTypeChange,
  onDurationValueChange,
}) => {
  const normalizedSubcategory = subcategoryName.toLowerCase();
  const normalizedCategory = categoryName.toLowerCase();
  const normalizedSubSubcategory = subSubcategoryName.toLowerCase();

  if (normalizedSubcategory.includes('one-way') || normalizedSubcategory.includes('oneway') || normalizedSubcategory.includes('one way')) {
    return (
      <OneWayForm
        selectedUsage={selectedUsage}
        customUsage={customUsage}
        onUsageChange={onUsageChange}
        onCustomUsageChange={onCustomUsageChange}
        durationOptions={durationOptions}
      />
    );
  }

  if (normalizedSubcategory.includes('hourly') || normalizedSubcategory.includes('hour')) {
    return (
      <HourlyForm
        selectedUsage={selectedUsage}
        durationOptions={durationOptions}
        onUsageChange={onUsageChange}
      />
    );
  }

  if (normalizedSubcategory.includes('weekly') || normalizedSubcategory.includes('week')) {
    return (
      <WeeklyForm
        selectedUsage={selectedUsage}
        durationType={durationType}
        durationValue={durationValue}
        durationOptions={durationOptions}
        durationError={durationError}
        onUsageChange={onUsageChange}
        onDurationTypeChange={onDurationTypeChange || (() => { })}
        onDurationValueChange={onDurationValueChange || (() => { })}
      />
    );
  }

  if (normalizedSubcategory.includes('monthly') || normalizedSubcategory.includes('month')) {
    return (
      <MonthlyForm
        selectedUsage={selectedUsage}
        durationType={durationType}
        durationValue={durationValue}
        durationOptions={durationOptions}
        durationError={durationError}
        onUsageChange={onUsageChange}
        onDurationTypeChange={onDurationTypeChange || (() => { })}
        onDurationValueChange={onDurationValueChange || (() => { })}
      />
    );
  }

  if (normalizedSubSubcategory.includes('one-way') || normalizedSubSubcategory.includes('oneway') || normalizedSubSubcategory.includes('one way')) {
    return (
      <OneWayForm
        selectedUsage={selectedUsage}
        customUsage={customUsage}
        onUsageChange={onUsageChange}
        onCustomUsageChange={onCustomUsageChange}
        durationOptions={durationOptions}
      />
    )
  }

  if (normalizedSubSubcategory.includes('roundtrip') || normalizedSubSubcategory.includes('round-trip') || normalizedSubSubcategory.includes('round trip')) {
    return (
      <HourlyForm
        selectedUsage={selectedUsage}
        durationOptions={durationOptions}
        onUsageChange={onUsageChange}
      />
    )
  }

  // Default fallback
  return (
    <HourlyForm
      selectedUsage={selectedUsage}
      durationOptions={durationOptions}
      onUsageChange={onUsageChange}
    />
  );
};