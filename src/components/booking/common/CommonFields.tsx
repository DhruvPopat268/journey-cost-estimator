import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LocationInput } from './LocationInput';

interface LocationData {
  address: string;
  place_id: string;
  lat: number;
  lng: number;
  address_components: any[];
}

interface CommonFieldsProps {
  fromLocation: string;
  toLocation: string;
  fromLocationData?: LocationData;
  toLocationData?: LocationData;
  selectedCityName?: string;
  selectedDate: string;
  selectedTime: string;
  startTime?: string;
  endTime?: string;
  carType: string;
  transmissionType: string;
  receiverName?: string;
  receiverPhone?: string;
  vehicleCategories: any[];
  transmissionOptions: string[];
  showToLocation: boolean;
  showTimeDuration?: boolean;
  showVehicleFields?: boolean;
  showReceiverFields?: boolean;
  dateLabel?: string;
  onFieldChange: (field: string, value: string) => void;
  onLocationChange?: (field: 'fromLocation' | 'toLocation', locationData: LocationData) => void;
}

export const CommonFields: React.FC<CommonFieldsProps> = ({
  fromLocation,
  toLocation,
  fromLocationData,
  toLocationData,
  selectedCityName,
  selectedDate,
  selectedTime,
  startTime = '',
  endTime = '',
  carType,
  transmissionType,
  receiverName = '',
  receiverPhone = '',
  vehicleCategories,
  transmissionOptions,
  showToLocation,
  showTimeDuration = false,
  showVehicleFields = true,
  showReceiverFields = false,
  dateLabel = 'Date',
  onFieldChange,
  onLocationChange,
}) => {
  return (
    <Card className="bg-white shadow-lg">
      <CardHeader />
      <CardContent className="space-y-8">
        {/* Location Fields */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="from">Pickup Location</Label>
            <div className="relative">
              <div className="absolute left-3 top-3 w-3 h-3 bg-green-500 rounded-full z-10"></div>
              <LocationInput
                id="from"
                placeholder="Enter pickup location"
                value={fromLocation}
                onChange={(locationData) => {
                  onFieldChange('fromLocation', locationData.address);
                  onLocationChange?.('fromLocation', locationData);
                }}
                className="pl-10"
                selectedCityName={selectedCityName}
              />
            </div>
          </div>

          {showToLocation && (
            <div>
              <Label htmlFor="to">Drop Location</Label>
              <div className="relative">
                <div className="absolute left-3 top-3 w-3 h-3 bg-red-500 rounded-full z-10"></div>
                <LocationInput
                  id="to"
                  placeholder="Enter destination"
                  value={toLocation}
                  onChange={(locationData) => {
                    onFieldChange('toLocation', locationData.address);
                    onLocationChange?.('toLocation', locationData);
                  }}
                  className="pl-10"
                  selectedCityName={selectedCityName}
                />
              </div>
            </div>
          )}
        </div>

        {/* <hr className="border-gray-200" /> */}

        {/* Schedule Fields */}
        {showTimeDuration ? (
          // Layout for Time Duration (Driver/Cab Weekly/Monthly)
          <div className="space-y-4">
            <div>
              <Label htmlFor="selectedDate">{dateLabel}</Label>
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => onFieldChange('selectedDate', e.target.value)}
                className="pr-2"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startTime">Start Time</Label>
                <Input
                  type="time"
                  value={startTime}
                  onChange={(e) => onFieldChange('startTime', e.target.value)}
                  className="pr-2"
                />
              </div>
            </div>
          </div>
        ) : (
          // Layout for Regular Services
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="selectedDate">{dateLabel}</Label>
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
        )}

        {/* <hr className="border-gray-200" /> */}

        {/* Vehicle Fields - Show only if showVehicleFields is true */}
        {showVehicleFields && (
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
        )}

        {/* Receiver Fields - Show only if showReceiverFields is true */}
        {showReceiverFields && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="receiverName">Receiver Name</Label>
              <Input
                id="receiverName"
                placeholder="Enter receiver name"
                value={receiverName}
                onChange={(e) => onFieldChange('receiverName', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="receiverPhone">Receiver's Phone No</Label>
              <Input
                id="receiverPhone"
                placeholder="Enter receiver phone number"
                value={receiverPhone}
                onChange={(e) => onFieldChange('receiverPhone', e.target.value)}
                type="tel"
              />
            </div>
          </div>
        )}

        {/* Add separator only if both vehicle and receiver fields are shown */}
        {/* {showVehicleFields && showReceiverFields && <hr className="border-gray-200" />} */}
      </CardContent>
    </Card>
  );
};