import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Clock } from 'lucide-react';

interface OneWayFormProps {
  selectedUsage: string;
  customUsage: string;
  onUsageChange: (value: string) => void;
  onCustomUsageChange: (value: string) => void;
  durationOptions?: string[];
}

export const OneWayForm: React.FC<OneWayFormProps> = ({
  selectedUsage,
  customUsage,
  onUsageChange,
  onCustomUsageChange,
  durationOptions = ['10', '25', '50', '100'],
}) => {
  const usageOptions = durationOptions;

  return (
    <Card className="bg-white shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Clock className="w-5 h-5 mr-2 text-blue-600" />
          Estimated Distance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-3 items-end">
          <div className="flex-1">
            <Label htmlFor="usage-select">Distance Options</Label>
            <Select value={selectedUsage} onValueChange={onUsageChange}>
              <SelectTrigger id="usage-select">
                <SelectValue placeholder="Select km" />
              </SelectTrigger>
              <SelectContent>
                {usageOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option} KM
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

        </div>
      </CardContent>
    </Card>
  );
};