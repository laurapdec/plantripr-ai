import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Star, Wifi, Car, Users, Coffee, Waves, Utensils } from 'lucide-react';
import { BookingHotel } from '@/lib/api';

interface HotelCardProps {
  hotel: BookingHotel;
  onSelect?: (hotel: BookingHotel) => void;
  isSelected?: boolean;
}

const amenityIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  'WiFi': Wifi,
  'Wi-Fi': Wifi,
  'Free WiFi': Wifi,
  'Parking': Car,
  'Free Parking': Car,
  'Pool': Waves,
  'Swimming Pool': Waves,
  'Restaurant': Utensils,
  'Bar': Coffee,
  'Gym': Users,
  'Fitness Center': Users,
  'Spa': Waves,
};

export const HotelCard: React.FC<HotelCardProps> = ({ hotel, onSelect, isSelected = false }) => {
  const handleSelect = () => {
    onSelect?.(hotel);
  };

  const getAmenityIcon = (amenity: string) => {
    const IconComponent = amenityIcons[amenity] || MapPin;
    return <IconComponent className="h-3 w-3" />;
  };

  const formatPrice = (min: number, max: number, currency: string) => {
    if (min === max) {
      return `${currency} ${min}`;
    }
    return `${currency} ${min} - ${max}`;
  };

  const getCancellationColor = (policy: string) => {
    switch (policy) {
      case 'free': return 'bg-green-100 text-green-700';
      case 'partial': return 'bg-yellow-100 text-yellow-700';
      case 'non-refundable': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <Card 
      className={`cursor-pointer transition-all hover:shadow-md ${
        isSelected ? 'ring-2 ring-emerald-500 bg-emerald-50' : ''
      }`}
      onClick={handleSelect}
    >
      <div className="relative">
        {hotel.mainPhotoUrl && (
          <div className="h-48 w-full overflow-hidden rounded-t-lg">
            <img
              src={hotel.mainPhotoUrl}
              alt={hotel.name}
              className="h-full w-full object-cover transition-transform hover:scale-105"
            />
          </div>
        )}
        
        {/* Star Rating Badge */}
        <div className="absolute top-2 left-2">
          <Badge variant="secondary" className="bg-white/90">
            {Array.from({ length: hotel.starRating }).map((_, i) => (
              <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            ))}
          </Badge>
        </div>

        {/* Breakfast Included Badge */}
        {hotel.breakfastIncluded && (
          <div className="absolute top-2 right-2">
            <Badge className="bg-emerald-500 text-white">
              <Coffee className="h-3 w-3 mr-1" />
              Breakfast
            </Badge>
          </div>
        )}
      </div>

      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Hotel Name and Location */}
          <div>
            <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">
              {hotel.name}
            </h3>
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <MapPin className="h-3 w-3" />
              <span className="line-clamp-1">{hotel.address}, {hotel.city}</span>
            </div>
            {hotel.distanceFromCenter && (
              <p className="text-xs text-gray-500">
                {hotel.distanceFromCenter.toFixed(1)} km from center
              </p>
            )}
          </div>

          {/* Rating and Reviews */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium text-sm">
                  {hotel.reviewScore.toFixed(1)}
                </span>
              </div>
              <span className="text-xs text-gray-500">
                ({hotel.reviewCount.toLocaleString()} reviews)
              </span>
            </div>

            {/* Cancellation Policy */}
            <Badge variant="outline" className={getCancellationColor(hotel.cancellationPolicy)}>
              {hotel.cancellationPolicy === 'free' && 'Free cancellation'}
              {hotel.cancellationPolicy === 'partial' && 'Partial refund'}
              {hotel.cancellationPolicy === 'non-refundable' && 'Non-refundable'}
            </Badge>
          </div>

          {/* Amenities */}
          <div className="flex flex-wrap gap-2">
            {hotel.amenities.slice(0, 4).map((amenity, index) => (
              <div 
                key={index}
                className="flex items-center gap-1 text-xs bg-gray-100 rounded-full px-2 py-1"
              >
                {getAmenityIcon(amenity)}
                <span>{amenity}</span>
              </div>
            ))}
            {hotel.amenities.length > 4 && (
              <div className="text-xs bg-gray-100 rounded-full px-2 py-1">
                +{hotel.amenities.length - 4} more
              </div>
            )}
          </div>

          {/* Description */}
          {hotel.description && (
            <p className="text-sm text-gray-600 line-clamp-2">
              {hotel.description}
            </p>
          )}

          {/* Price */}
          <div className="flex items-center justify-between pt-2 border-t">
            <div>
              <div className="text-lg font-bold text-gray-900">
                {formatPrice(hotel.pricePerNight.min, hotel.pricePerNight.max, hotel.pricePerNight.currency)}
              </div>
              <div className="text-xs text-gray-500">per night</div>
            </div>
            
            <Button 
              size="sm" 
              variant={isSelected ? "default" : "outline"}
              onClick={(e) => {
                e.stopPropagation();
                handleSelect();
              }}
            >
              {isSelected ? 'Selected' : 'Select'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HotelCard;