import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Clock } from 'lucide-react';

interface HourlyFormProps {
  selectedUsage: string;
  onUsageChange: (value: string) => void;
}

export const HourlyForm: React.FC<HourlyFormProps> = ({
  selectedUsage,
  onUsageChange,
}) => {
  const usageOptions = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

  return (
    <Card className="bg-white shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Clock className="w-5 h-5 mr-2 text-blue-600" />
          Estimated Duration
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex-1">
          <Label htmlFor="usage-select">Duration Options</Label>
          <Select value={selectedUsage} onValueChange={onUsageChange}>
            <SelectTrigger id="usage-select">
              <SelectValue placeholder="Select hours" />
            </SelectTrigger>
            <SelectContent>
              {usageOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option} Hr
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};