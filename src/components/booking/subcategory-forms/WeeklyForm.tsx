import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Clock } from 'lucide-react';

interface WeeklyFormProps {
  selectedUsage: string;
  durationType?: string;
  durationValue?: string;
  durationOptions?: string[];
  onUsageChange: (value: string) => void;
  onDurationTypeChange?: (value: string) => void;
  onDurationValueChange?: (value: string) => void;
}

export const WeeklyForm: React.FC<WeeklyFormProps> = ({
  selectedUsage,
  durationType = 'Day',
  durationValue = '1',
  durationOptions = [],
  onUsageChange,
  onDurationTypeChange,
  onDurationValueChange,
}) => {
  const usageOptions = durationOptions.length > 0 ? durationOptions : ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  
  const convertMinutesToHours = (minutes: string) => {
    const mins = parseInt(minutes);
    return (mins / 60).toString();
  };
  
  const getDisplayText = (option: string) => {
    if (durationOptions.length > 0) {
      const hours = parseInt(option) / 60;
      return hours === 1 ? '1 Hour' : `${hours} Hours`;
    }
    return `${option} Hr`;
  };

  return (
    <Card className="bg-white shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Clock className="w-5 h-5 mr-2 text-blue-600" />
          Estimated Duration
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4">
          <div className="flex-1">
            <Label htmlFor="usage-select">Duration Options</Label>
            <Select value={selectedUsage} onValueChange={onUsageChange}>
              <SelectTrigger id="usage-select">
                <SelectValue placeholder="Select hours" />
              </SelectTrigger>
              <SelectContent>
                {usageOptions.map((option) => (
                  <SelectItem key={option} value={durationOptions.length > 0 ? convertMinutesToHours(option) : option}>
                    {getDisplayText(option)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1">
            <Label htmlFor="duration-input">Days / Weeks</Label>
            <div className="flex gap-2">
              <Input
                id="duration-input"
                type="number"
                min="1"
                placeholder="Enter value"
                value={durationValue}
                onChange={(e) => {
                  const newValue = e.target.value;
                  if (onDurationValueChange) {
                    onDurationValueChange(newValue);
                  }
                }}
                className="flex-1"
              />
              <Select value={durationType} onValueChange={(value) => {
                if (onDurationTypeChange) {
                  onDurationTypeChange(value);
                }
              }}>
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Day">Day</SelectItem>
                  <SelectItem value="Week">Week</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};