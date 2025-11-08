import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Users, Star, MapPin, Smartphone, CheckCircle, Zap } from 'lucide-react';
import { GetYourGuideActivity } from '@/lib/api';

interface ActivityCardProps {
  activity: GetYourGuideActivity;
  onSelect?: (activity: GetYourGuideActivity) => void;
  onViewDetails?: (activity: GetYourGuideActivity) => void;
  isSelected?: boolean;
  showDescription?: boolean;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({ 
  activity, 
  onSelect, 
  onViewDetails,
  isSelected = false,
  showDescription = true 
}) => {
  const handleSelect = () => {
    onSelect?.(activity);
  };

  const handleViewDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    onViewDetails?.(activity);
  };

  const formatDuration = () => {
    const { min, max, unit } = activity.duration;
    if (max && max !== min) {
      return `${min}-${max} ${unit}`;
    }
    
    if (unit === 'minutes') {
      if (min >= 60) {
        const hours = Math.floor(min / 60);
        const remainingMinutes = min % 60;
        return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
      }
      return `${min} min`;
    }
    
    return `${min} ${unit}`;
  };

  const formatPrice = () => {
    const { min, max, currency } = activity.price;
    if (min === max) {
      return `${currency} ${min}`;
    }
    return `${currency} ${min} - ${max}`;
  };

  const getDiscountPercentage = () => {
    if (!activity.originalPrice) return null;
    
    const discount = ((activity.originalPrice.min - activity.price.min) / activity.originalPrice.min * 100);
    return Math.round(discount);
  };

  const discountPercent = getDiscountPercentage();

  return (
    <Card 
      className={`cursor-pointer transition-all hover:shadow-md ${
        isSelected ? 'ring-2 ring-emerald-500 bg-emerald-50' : ''
      }`}
      onClick={handleSelect}
    >
      <div className="relative">
        {activity.images.thumbnail && (
          <div className="h-48 w-full overflow-hidden rounded-t-lg">
            <img
              src={activity.images.thumbnail}
              alt={activity.title}
              className="h-full w-full object-cover transition-transform hover:scale-105"
            />
          </div>
        )}
        
        {/* Category Badge */}
        <div className="absolute top-2 left-2">
          <Badge variant="secondary" className="bg-white/90">
            {activity.category}
          </Badge>
        </div>

        {/* Discount Badge */}
        {discountPercent && discountPercent > 0 && (
          <div className="absolute top-2 right-2">
            <Badge className="bg-red-500 text-white">
              -{discountPercent}%
            </Badge>
          </div>
        )}

        {/* Feature Badges */}
        <div className="absolute bottom-2 left-2 flex gap-1">
          {activity.skipTheLine && (
            <Badge variant="outline" className="bg-white/90 text-xs">
              <Zap className="h-3 w-3 mr-1" />
              Skip the Line
            </Badge>
          )}
          {activity.instantConfirmation && (
            <Badge variant="outline" className="bg-white/90 text-xs">
              <CheckCircle className="h-3 w-3 mr-1" />
              Instant
            </Badge>
          )}
          {activity.mobileTicket && (
            <Badge variant="outline" className="bg-white/90 text-xs">
              <Smartphone className="h-3 w-3 mr-1" />
              Mobile
            </Badge>
          )}
        </div>
      </div>

      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Activity Title and Location */}
          <div>
            <h3 className="font-semibold text-lg text-gray-900 line-clamp-2">
              {activity.title}
            </h3>
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <MapPin className="h-3 w-3" />
              <span className="line-clamp-1">{activity.location.name}</span>
            </div>
          </div>

          {/* Duration and Group Info */}
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{formatDuration()}</span>
            </div>
            {activity.smallGroup && (
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                <span>Small group</span>
              </div>
            )}
            {activity.privateGroup && (
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                <span>Private</span>
              </div>
            )}
          </div>

          {/* Rating and Reviews */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium text-sm">
                {activity.rating.average.toFixed(1)}
              </span>
            </div>
            <span className="text-xs text-gray-500">
              ({activity.rating.count.toLocaleString()} reviews)
            </span>
          </div>

          {/* Languages */}
          <div className="flex flex-wrap gap-1">
            {activity.languages.slice(0, 3).map((language, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {language}
              </Badge>
            ))}
            {activity.languages.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{activity.languages.length - 3} more
              </Badge>
            )}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {activity.tags.slice(0, 3).map((tag, index) => (
              <div 
                key={index}
                className="text-xs bg-gray-100 rounded-full px-2 py-1"
              >
                {tag}
              </div>
            ))}
            {activity.tags.length > 3 && (
              <div className="text-xs bg-gray-100 rounded-full px-2 py-1">
                +{activity.tags.length - 3} more
              </div>
            )}
          </div>

          {/* Highlights */}
          {activity.highlights.length > 0 && (
            <div className="space-y-1">
              <h4 className="text-sm font-medium text-gray-700">Highlights:</h4>
              <ul className="text-xs text-gray-600 space-y-0.5">
                {activity.highlights.slice(0, 3).map((highlight, index) => (
                  <li key={index} className="flex items-start gap-1">
                    <CheckCircle className="h-3 w-3 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span className="line-clamp-1">{highlight}</span>
                  </li>
                ))}
                {activity.highlights.length > 3 && (
                  <li className="text-emerald-600 text-xs">
                    +{activity.highlights.length - 3} more highlights
                  </li>
                )}
              </ul>
            </div>
          )}

          {/* Description */}
          {showDescription && activity.shortDescription && (
            <p className="text-sm text-gray-600 line-clamp-2">
              {activity.shortDescription}
            </p>
          )}

          {/* Cancellation Policy */}
          <div className="flex items-center justify-between text-xs">
            <div className={`px-2 py-1 rounded-full ${
              activity.cancellationPolicy.type === 'free' ? 'bg-green-100 text-green-700' :
              activity.cancellationPolicy.type === 'partial' ? 'bg-yellow-100 text-yellow-700' :
              'bg-red-100 text-red-700'
            }`}>
              {activity.cancellationPolicy.type === 'free' && 'Free cancellation'}
              {activity.cancellationPolicy.type === 'partial' && 'Partial refund'}
              {activity.cancellationPolicy.type === 'non-refundable' && 'Non-refundable'}
            </div>
            {activity.cancellationPolicy.deadline && (
              <span className="text-gray-500">
                {activity.cancellationPolicy.deadline}
              </span>
            )}
          </div>

          {/* Price and Actions */}
          <div className="flex items-center justify-between pt-2 border-t">
            <div>
              {activity.originalPrice && discountPercent && discountPercent > 0 && (
                <div className="text-sm text-gray-500 line-through">
                  {activity.originalPrice.currency} {activity.originalPrice.min}
                </div>
              )}
              <div className="text-lg font-bold text-gray-900">
                {formatPrice()}
              </div>
              <div className="text-xs text-gray-500">per person</div>
            </div>
            
            <div className="flex gap-2">
              <Button 
                size="sm" 
                variant="outline"
                onClick={handleViewDetails}
              >
                Details
              </Button>
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
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityCard;