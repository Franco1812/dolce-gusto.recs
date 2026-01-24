"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star, Coffee } from "lucide-react";
import type { CapsuleWithStatus } from "@/lib/types";

interface ReviewDialogProps {
  capsule: CapsuleWithStatus | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (capsuleId: string, rating: number, comment: string) => void;
  isLoading?: boolean;
}

export function ReviewDialog({
  capsule,
  open,
  onOpenChange,
  onSubmit,
  isLoading,
}: ReviewDialogProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (capsule?.review) {
      setRating(capsule.review.rating);
      setComment(capsule.review.comment || "");
    } else {
      setRating(0);
      setComment("");
    }
  }, [capsule]);

  const handleSubmit = () => {
    if (capsule && rating > 0) {
      onSubmit(capsule.id, rating, comment);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Coffee className="w-5 h-5 text-primary" />
            {capsule?.review ? "Editar Reseña" : "Nueva Reseña"}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div>
            <p className="text-sm font-medium mb-1 text-foreground">{capsule?.name}</p>
            <p className="text-xs text-muted-foreground">{capsule?.category}</p>
          </div>
          
          <div>
            <p className="text-sm font-medium mb-2 text-foreground">Calificación</p>
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setRating(i + 1)}
                  onMouseEnter={() => setHoveredRating(i + 1)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="p-1 transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-8 h-8 transition-colors ${
                      i < (hoveredRating || rating)
                        ? "fill-primary text-primary"
                        : "text-muted-foreground"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <p className="text-sm font-medium mb-2 text-foreground">Comentario (opcional)</p>
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Escribe tu opinión sobre esta cápsula..."
              className="min-h-[100px] resize-none"
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={rating === 0 || isLoading}
          >
            {isLoading ? "Guardando..." : "Guardar Reseña"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
