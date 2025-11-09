import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Users, Car, MapPin, TrendingUp, Zap } from 'lucide-react';
import { UberPriceEstimate, UberTimeEstimate, UberProduct } from '@/lib/api/uber';

interface UberRideCardProps {
  price: UberPriceEstimate;
  timeEstimate?: UberTimeEstimate;
  product?: UberProduct;
  onSelect?: (price: UberPriceEstimate) => void;
  isSelected?: boolean;
  showDetails?: boolean;
}

export const UberRideCard: React.FC<UberRideCardProps> = ({
  price,
  timeEstimate,
  product,
  onSelect,
  isSelected = false,
  showDetails = true
}) => {
  const handleSelect = () => {
    onSelect?.(price);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.round(seconds / 60);
    if (minutes < 60) {
      return `${minutes} min`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
  };

  const formatDistance = (distance: number) => {
    return `${distance.toFixed(1)} mi`;
  };

  const isSurge = price.surge_multiplier && price.surge_multiplier > 1;

  return (
    <Card 
      className={`cursor-pointer transition-all hover:shadow-md ${
        isSelected ? 'ring-2 ring-emerald-500 bg-emerald-50' : ''
      }`}
      onClick={handleSelect}
    >
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Header - Service Name and Image */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {product?.image && (
                <div className="w-12 h-8 relative">
                  <img
                    src={product.image}
                    alt={price.display_name}
                    className="w-full h-full object-contain"
                  />
                </div>
              )}
              <div>
                <h3 className="font-semibold text-lg text-gray-900">
                  {price.display_name}
                </h3>
                {product?.short_description && (
                  <p className="text-xs text-gray-500">
                    {product.short_description}
                  </p>
                )}
              </div>
            </div>

            {/* Surge Pricing Badge */}
            {isSurge && (
              <Badge variant="outline" className="bg-orange-100 text-orange-700 border-orange-300">
                <TrendingUp className="h-3 w-3 mr-1" />
                {price.surge_multiplier}x
              </Badge>
            )}
          </div>

          {/* Key Info Row */}
          <div className="flex items-center gap-4 text-sm text-gray-600">
            {/* Capacity */}
            {product?.capacity && (
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                <span>{product.capacity} seats</span>
              </div>
            )}

            {/* Pickup Time */}
            {timeEstimate && (
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{formatTime(timeEstimate.estimate)} pickup</span>
              </div>
            )}

            {/* Trip Duration */}
            {price.duration && (
              <div className="flex items-center gap-1">
                <Car className="h-3 w-3" />
                <span>{formatTime(price.duration)} trip</span>
              </div>
            )}

            {/* Distance */}
            {price.distance && (
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                <span>{formatDistance(price.distance)}</span>
              </div>
            )}
          </div>

          {/* Features */}
          {product && showDetails && (
            <div className="flex flex-wrap gap-2">
              {product.cash_enabled && (
                <Badge variant="outline" className="text-xs">
                  Cash Enabled
                </Badge>
              )}
              {product.shared && (
                <Badge variant="outline" className="text-xs">
                  Shared Ride
                </Badge>
              )}
              {!product.shared && product.capacity <= 4 && (
                <Badge variant="outline" className="text-xs">
                  Private Ride
                </Badge>
              )}
              {price.display_name.includes('Comfort') && (
                <Badge variant="outline" className="text-xs">
                  Extra Space
                </Badge>
              )}
            </div>
          )}

          {/* Price and Action */}
          <div className="flex items-center justify-between pt-2 border-t">
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {price.estimate}
              </div>
              {price.low_estimate && price.high_estimate && (
                <div className="text-xs text-gray-500">
                  {price.currency_code} {price.low_estimate} - {price.high_estimate}
                </div>
              )}
              {isSurge && (
                <div className="text-xs text-orange-600">
                  Surge pricing active
                </div>
              )}
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

          {/* Detailed Pricing Breakdown */}
          {product?.price_details && showDetails && (
            <div className="pt-2 border-t">
              <details className="group">
                <summary className="text-xs text-gray-500 cursor-pointer hover:text-gray-700">
                  Price breakdown
                </summary>
                <div className="mt-2 space-y-1 text-xs text-gray-600">
                  <div className="flex justify-between">
                    <span>Base fare</span>
                    <span>{product.price_details.currency_code} {product.price_details.base}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Per {product.price_details.distance_unit}</span>
                    <span>{product.price_details.currency_code} {product.price_details.cost_per_distance}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Per minute</span>
                    <span>{product.price_details.currency_code} {product.price_details.cost_per_minute}</span>
                  </div>
                  {product.price_details.minimum > 0 && (
                    <div className="flex justify-between font-medium">
                      <span>Minimum fare</span>
                      <span>{product.price_details.currency_code} {product.price_details.minimum}</span>
                    </div>
                  )}
                </div>
              </details>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

interface UberOptionsListProps {
  prices: UberPriceEstimate[];
  timeEstimates?: UberTimeEstimate[];
  products?: UberProduct[];
  onSelectRide?: (price: UberPriceEstimate) => void;
  selectedRideId?: string;
  isLoading?: boolean;
  error?: string;
}

export const UberOptionsList: React.FC<UberOptionsListProps> = ({
  prices,
  timeEstimates = [],
  products = [],
  onSelectRide,
  selectedRideId,
  isLoading,
  error
}) => {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                  <div className="h-3 bg-gray-200 rounded w-32"></div>
                </div>
                <div className="h-6 bg-gray-200 rounded w-16"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-4">
          <div className="text-center text-red-600">
            <Car className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Unable to load ride options</p>
            <p className="text-xs text-gray-500 mt-1">{error}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (prices.length === 0) {
    return (
      <Card>
        <CardContent className="p-4">
          <div className="text-center text-gray-500">
            <Car className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No rides available for this location</p>
            <p className="text-xs text-gray-500 mt-1">Try a different pickup or destination</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {prices.map((price) => {
        const timeEstimate = timeEstimates.find(t => t.product_id === price.product_id);
        const product = products.find(p => p.product_id === price.product_id);
        const isSelected = selectedRideId === price.product_id;

        return (
          <UberRideCard
            key={price.product_id}
            price={price}
            timeEstimate={timeEstimate}
            product={product}
            onSelect={onSelectRide}
            isSelected={isSelected}
          />
        );
      })}
    </div>
  );
};

export default UberRideCard;