"use client";

import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Coffee, Plus, Check, Star, User, X } from "lucide-react";
import type { CapsuleWithStatus, Review } from "@/lib/types";

// Color mapping for categories
const categoryColors: Record<string, string> = {
  "Espresso": "from-amber-800 to-amber-950",
  "Café Negro": "from-stone-700 to-stone-900", 
  "Con Leche": "from-orange-200 to-orange-300",
  "Chocolate": "from-amber-600 to-amber-800",
  "Café Frío": "from-sky-200 to-sky-300",
  "Starbucks": "from-green-700 to-green-900",
  "Fríos": "from-sky-300 to-sky-400",
  "Clásicos": "from-amber-700 to-amber-900",
};

interface CapsuleCardProps {
  capsule: CapsuleWithStatus;
  onAddToList: (capsuleId: string) => void;
  onMarkTried: (capsuleId: string) => void;
  onOpenReview: (capsule: CapsuleWithStatus) => void;
  onRemoveFromList: (capsuleId: string) => void;
  isLoading?: boolean;
  isAdmin?: boolean;
  allReviews?: Review[];
}

export function CapsuleCard({ 
  capsule, 
  onAddToList, 
  onMarkTried, 
  onOpenReview,
  onRemoveFromList,
  isLoading,
  isAdmin,
  allReviews = []
}: CapsuleCardProps) {
  const [imageError, setImageError] = useState(false);
  const isInList = !!capsule.list_item;
  const isTried = capsule.list_item?.status === 'tried';
  const hasReview = !!capsule.review;
  
  // Para admin, mostrar todas las reseñas de esta cápsula
  const reviewsToShow = isAdmin 
    ? allReviews.filter(r => r.capsule_id === capsule.id)
    : capsule.review ? [capsule.review] : [];
  
  const gradientClass = categoryColors[capsule.category] || "from-secondary to-background";

  return (
    <Card className="flex flex-col h-full bg-card border-border hover:shadow-lg transition-shadow overflow-hidden">
      {/* Capsule Image */}
      <div className={`relative w-full h-44 bg-gradient-to-b ${gradientClass} flex items-center justify-center p-4`}>
        {capsule.image_url && !imageError ? (
          <img
            src={capsule.image_url || "/placeholder.svg"}
            alt={capsule.name}
            className="w-28 h-28 object-contain drop-shadow-lg"
            onError={() => setImageError(true)}
            loading="lazy"
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-background/20 backdrop-blur-sm flex items-center justify-center">
            <Coffee className="w-10 h-10 text-background" />
          </div>
        )}
        {capsule.intensity && (
          <div className="absolute top-2 right-2 bg-background text-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm shadow-md">
            {capsule.intensity}
          </div>
        )}
        {isInList && (
          <div className="absolute top-2 left-2">
            <Badge variant={isTried ? "default" : "secondary"} className="text-xs shadow-sm">
              {isTried ? "Probada" : "En lista"}
            </Badge>
          </div>
        )}
      </div>
      
      <CardHeader className="pb-2 pt-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold text-foreground leading-tight">{capsule.name}</h3>
            <Badge variant="outline" className="mt-1 text-xs bg-transparent">
              {capsule.category}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {capsule.description}
        </p>
        {reviewsToShow.length > 0 && (
          <div className="mt-3 space-y-2">
            {reviewsToShow.map((review) => (
              <div key={review.id} className="p-2 bg-accent rounded-md">
                {isAdmin && review.profiles && (
                  <div className="flex items-center gap-1 mb-1 text-xs text-muted-foreground">
                    <User className="w-3 h-3" />
                    <span className="font-medium">{review.profiles.name || review.profiles.email}</span>
                  </div>
                )}
                <div className="flex items-center gap-1 mb-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${
                        i < review.rating
                          ? "fill-primary text-primary"
                          : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                {review.comment && (
                  <p className="text-xs text-muted-foreground italic line-clamp-2">
                    "{review.comment}"
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex gap-2 pt-2">
        {!isInList && (
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 bg-transparent"
            onClick={() => onAddToList(capsule.id)}
            disabled={isLoading}
          >
            <Plus className="w-4 h-4 mr-1" />
            Agregar
          </Button>
        )}
        {isInList && !isTried && (
          <>
            <Button 
              variant="default" 
              size="sm" 
              className="flex-1"
              onClick={() => onMarkTried(capsule.id)}
              disabled={isLoading}
            >
              <Check className="w-4 h-4 mr-1" />
              Probada
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onRemoveFromList(capsule.id)}
              disabled={isLoading}
              title="Quitar de la lista"
            >
              <X className="w-4 h-4" />
            </Button>
          </>
        )}
        {isTried && (
          <>
            <Button 
              variant={hasReview ? "secondary" : "default"}
              size="sm" 
              className="flex-1"
              onClick={() => onOpenReview(capsule)}
              disabled={isLoading}
            >
              <Star className="w-4 h-4 mr-1" />
              {hasReview ? "Ver Reseña" : "Reseñar"}
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onRemoveFromList(capsule.id)}
              disabled={isLoading}
              title="Quitar de la lista"
            >
              <X className="w-4 h-4" />
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
}
