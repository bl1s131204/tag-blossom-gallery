
import React, { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight, Download, Info } from 'lucide-react';
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
  const [showInfo, setShowInfo] = useState(false);

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
    <div className="fixed inset-0 bg-black/98 backdrop-blur-lg z-50 flex items-center justify-center">
      {/* Background overlay */}
      <div className="absolute inset-0" onClick={onClose} />
      
      {/* Enhanced Controls */}
      <div className="absolute top-6 right-6 flex items-center gap-3 z-10">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowInfo(!showInfo)}
          className="text-white hover:bg-white/20 backdrop-blur-md bg-black/30 border border-white/20 rounded-full h-12 w-12 p-0 transition-all duration-200"
        >
          <Info className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={downloadImage}
          className="text-white hover:bg-white/20 backdrop-blur-md bg-black/30 border border-white/20 rounded-full h-12 w-12 p-0 transition-all duration-200"
        >
          <Download className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="text-white hover:bg-red-500/50 backdrop-blur-md bg-black/30 border border-white/20 rounded-full h-12 w-12 p-0 transition-all duration-200"
        >
          <X className="h-6 w-6" />
        </Button>
      </div>

      {/* Enhanced Navigation buttons */}
      <Button
        variant="ghost"
        size="lg"
        onClick={() => onNavigate('prev')}
        className="absolute left-6 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 backdrop-blur-md bg-black/30 border border-white/20 z-10 h-16 w-16 rounded-full p-0 transition-all duration-200"
      >
        <ChevronLeft className="h-8 w-8" />
      </Button>

      <Button
        variant="ghost"
        size="lg"
        onClick={() => onNavigate('next')}
        className="absolute right-6 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 backdrop-blur-md bg-black/30 border border-white/20 z-10 h-16 w-16 rounded-full p-0 transition-all duration-200"
      >
        <ChevronRight className="h-8 w-8" />
      </Button>

      {/* Main image with enhanced styling */}
      <div className="relative max-w-[85vw] max-h-[85vh] flex items-center justify-center">
        <img
          src={image.url}
          alt={image.title}
          className="max-w-full max-h-full object-contain shadow-2xl rounded-2xl border border-white/10"
          style={{ maxHeight: 'calc(100vh - 160px)' }}
        />
      </div>

      {/* Enhanced Image info panel */}
      <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/80 to-transparent backdrop-blur-xl text-white transition-transform duration-500 ${
        showInfo ? 'translate-y-0' : 'translate-y-full'
      }`}>
        <div className="max-w-6xl mx-auto p-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-3xl font-bold mb-3 leading-tight">{image.title}</h3>
              <p className="text-white/70 text-base">
                Use arrow keys or navigation buttons • Click tags to filter • ESC to close
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20 rounded-full h-10 w-10 p-0"
              onClick={() => setShowInfo(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          {image.tags.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {image.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="cursor-pointer bg-white/15 text-white hover:bg-white/25 transition-all duration-200 border-white/20 px-4 py-2 text-sm font-medium rounded-full hover:scale-105"
                  onClick={() => onTagClick(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Toggle info hint */}
      {!showInfo && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowInfo(true)}
            className="text-white/70 hover:text-white hover:bg-white/20 backdrop-blur-md bg-black/30 border border-white/20 rounded-full px-4 py-2 text-sm transition-all duration-200"
          >
            <Info className="h-4 w-4 mr-2" />
            Show Details
          </Button>
        </div>
      )}
    </div>
  );
};

export { FullscreenModal };
