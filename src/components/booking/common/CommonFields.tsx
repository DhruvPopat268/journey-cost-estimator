import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface CommonFieldsProps {
  fromLocation: string;
  toLocation: string;
  selectedDate: string;
  selectedTime: string;
  carType: string;
  transmissionType: string;
  vehicleCategories: any[];
  transmissionOptions: string[];
  showToLocation: boolean;
  onFieldChange: (field: string, value: string) => void;
}

export const CommonFields: React.FC<CommonFieldsProps> = ({
  fromLocation,
  toLocation,
  selectedDate,
  selectedTime,
  carType,
  transmissionType,
  vehicleCategories,
  transmissionOptions,
  showToLocation,
  onFieldChange,
}) => {
  return (
    <Card className="bg-white shadow-lg">
      <CardHeader />
      <CardContent className="space-y-8">
        {/* Location Fields */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="from">From</Label>
            <div className="relative">
              <div className="absolute left-3 top-3 w-3 h-3 bg-green-500 rounded-full"></div>
              <Input
                id="from"
                placeholder="Enter pickup location"
                value={fromLocation}
                onChange={(e) => onFieldChange('fromLocation', e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {showToLocation && (
            <div>
              <Label htmlFor="to">To</Label>
              <div className="relative">
                <div className="absolute left-3 top-3 w-3 h-3 bg-red-500 rounded-full"></div>
                <Input
                  id="to"
                  placeholder="Enter destination"
                  value={toLocation}
                  onChange={(e) => onFieldChange('toLocation', e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          )}
        </div>

        <hr className="border-gray-200" />

        {/* Schedule Fields */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="selectedDate">Date</Label>
            <Input
              type="date"
              value={selectedDate}
              onChange={(e) => onFieldChange('selectedDate', e.target.value)}
              className="pr-2"
            />
          </div>
          <div>
            <Label htmlFor="selectedTime">Time</Label>
            <Input
              type="time"
              value={selectedTime}
              onChange={(e) => onFieldChange('selectedTime', e.target.value)}
              className="pr-2"
            />
          </div>
        </div>

        <hr className="border-gray-200" />

        {/* Vehicle Fields */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Car Type</Label>
            <Select value={carType} onValueChange={(value) => onFieldChange('carType', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {vehicleCategories.map((vehicle) => (
                  <SelectItem key={vehicle._id} value={vehicle.vehicleName.toLowerCase()}>
                    {vehicle.vehicleName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Transmission</Label>
            <Select value={transmissionType} onValueChange={(value) => onFieldChange('transmissionType', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {transmissionOptions.map((trans) => (
                  <SelectItem key={trans} value={trans.toLowerCase()}>{trans}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};