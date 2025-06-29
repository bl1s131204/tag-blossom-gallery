
import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Heart, Download, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ImageData } from '@/types/gallery';

interface FullscreenModalProps {
  image: ImageData | null;
  onClose: () => void;
  onNavigate: (direction: 'prev' | 'next') => void;
  onTagClick: (tag: string) => void;
}

const FullscreenModal = ({ image, onClose, onNavigate, onTagClick }: FullscreenModalProps) => {
  const [showInfo, setShowInfo] = React.useState(false);

  useEffect(() => {
    if (image) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [image]);

  if (!image) return null;

  const downloadImage = () => {
    const link = document.createElement('a');
    link.href = image.url;
    link.download = image.title;
    link.click();
  };

  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center">
      {/* Background overlay */}
      <div className="absolute inset-0" onClick={onClose} />
      
      {/* Controls */}
      <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowInfo(!showInfo)}
          className="text-white hover:bg-white/20 backdrop-blur-sm"
        >
          <Info className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={downloadImage}
          className="text-white hover:bg-white/20 backdrop-blur-sm"
        >
          <Download className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="text-white hover:bg-white/20 backdrop-blur-sm"
        >
          <X className="h-6 w-6" />
        </Button>
      </div>

      {/* Navigation buttons */}
      <Button
        variant="ghost"
        size="lg"
        onClick={() => onNavigate('prev')}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 backdrop-blur-sm z-10 h-12 w-12"
      >
        <ChevronLeft className="h-8 w-8" />
      </Button>

      <Button
        variant="ghost"
        size="lg"
        onClick={() => onNavigate('next')}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 backdrop-blur-sm z-10 h-12 w-12"
      >
        <ChevronRight className="h-8 w-8" />
      </Button>

      {/* Main image */}
      <div className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center">
        <img
          src={image.url}
          alt={image.title}
          className="max-w-full max-h-full object-contain shadow-2xl rounded-lg"
          style={{ maxHeight: 'calc(100vh - 120px)' }}
        />
      </div>

      {/* Image info panel */}
      <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent backdrop-blur-sm text-white p-6 transform transition-transform duration-300 ${
        showInfo ? 'translate-y-0' : 'translate-y-full'
      }`}>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-semibold mb-2">{image.title}</h3>
              <p className="text-white/80 text-sm">
                Click on tags to filter • Use arrow keys to navigate
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20"
              onClick={() => setShowInfo(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          {image.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {image.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="cursor-pointer bg-white/20 text-white hover:bg-white/30 transition-colors border-white/30"
                  onClick={() => onTagClick(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Toggle info hint */}
      {!showInfo && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowInfo(true)}
            className="text-white/60 hover:text-white hover:bg-white/20 backdrop-blur-sm text-xs"
          >
            <Info className="h-3 w-3 mr-1" />
            Show Info
          </Button>
        </div>
      )}
    </div>
  );
};

export { FullscreenModal };
