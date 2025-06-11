
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageData } from '@/types/gallery';

interface FullscreenModalProps {
  image: ImageData | null;
  onClose: () => void;
  onNavigate: (direction: 'prev' | 'next') => void;
  onTagClick: (tag: string) => void;
}

export const FullscreenModal: React.FC<FullscreenModalProps> = ({
  image,
  onClose,
  onNavigate,
  onTagClick
}) => {
  if (!image) return null;

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 text-white hover:bg-white/20 rounded-full transition-colors"
      >
        <X className="h-6 w-6" />
      </button>
      
      <button
        onClick={() => onNavigate('prev')}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 text-white hover:bg-white/20 rounded-full transition-colors"
      >
        <ChevronLeft className="h-8 w-8" />
      </button>
      
      <button
        onClick={() => onNavigate('next')}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 text-white hover:bg-white/20 rounded-full transition-colors"
      >
        <ChevronRight className="h-8 w-8" />
      </button>

      <div className="max-w-[90vw] max-h-[90vh] flex flex-col items-center">
        <img
          src={image.url}
          alt={image.title}
          className="max-w-full max-h-[80vh] object-contain"
        />
        <div className="mt-4 text-center text-white">
          <h3 className="text-xl font-semibold mb-2">{image.title}</h3>
          <div className="flex flex-wrap gap-2 justify-center">
            {image.tags.map((tag, tagIndex) => (
              <Badge
                key={tagIndex}
                variant="secondary"
                className="bg-white/20 text-white hover:bg-white/30 cursor-pointer"
                onClick={() => {
                  onTagClick(tag);
                  onClose();
                }}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
