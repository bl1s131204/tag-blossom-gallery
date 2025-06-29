
import React from 'react';
import { X, ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ImageData } from '@/types/gallery';

interface FullscreenModalProps {
  image: ImageData | null;
  onClose: () => void;
  onNavigate: (direction: 'prev' | 'next') => void;
  onTagClick: (tag: string) => void;
}

const FullscreenModal = ({ image, onClose, onNavigate, onTagClick }: FullscreenModalProps) => {
  if (!image) return null;

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
      <div className="relative w-full h-full flex items-center justify-center p-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:bg-white/20 z-10"
        >
          <X className="h-6 w-6" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => onNavigate('prev')}
          className="absolute left-4 text-white hover:bg-white/20 z-10"
        >
          <ChevronLeft className="h-8 w-8" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => onNavigate('next')}
          className="absolute right-4 text-white hover:bg-white/20 z-10"
        >
          <ChevronRight className="h-8 w-8" />
        </Button>

        <img
          src={image.url}
          alt={image.title}
          className="max-w-full max-h-full object-contain"
        />

        <div className="absolute bottom-4 left-4 right-4 bg-black/70 text-white p-4 rounded-lg">
          <h3 className="font-medium mb-2">{image.title}</h3>
          {image.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {image.tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => onTagClick(tag)}
                  className="px-2 py-1 text-xs bg-white/20 hover:bg-white/30 rounded-md transition-all"
                >
                  {tag}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export { FullscreenModal };
