
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Image as ImageIcon } from 'lucide-react';
import { ImageData } from '@/types/gallery';

interface ImageGridProps {
  images: ImageData[];
  favorites: Set<string>;
  onImageClick: (image: ImageData) => void;
  onFavoriteToggle: (imageUrl: string) => void;
  onTagClick: (tag: string) => void;
  selectedTag: string | null;
  theme: any;
}

export const ImageGrid: React.FC<ImageGridProps> = ({
  images,
  favorites,
  onImageClick,
  onFavoriteToggle,
  onTagClick,
  selectedTag,
  theme
}) => {
  if (images.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-center">
        <ImageIcon className={`h-16 w-16 ${theme.textSecondary} mb-4`} />
        <h3 className={`text-xl font-semibold ${theme.text} mb-2`}>No Images Selected</h3>
        <p className={theme.textSecondary}>
          Select a folder containing images to get started with enhanced tag extraction
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {images.map((image, index) => (
        <Card 
          key={index} 
          className={`${theme.cardBg} ${theme.border} overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] ${theme.shadow}`}
        >
          <CardContent className="p-0">
            <div className="relative">
              <div className="aspect-video relative overflow-hidden cursor-pointer" onClick={() => onImageClick(image)}>
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-contain bg-gray-100 hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onFavoriteToggle(image.url);
                }}
                className={`absolute top-2 right-2 p-2 rounded-full backdrop-blur-sm transition-colors ${
                  favorites.has(image.url) 
                    ? 'bg-red-500/80 text-white' 
                    : 'bg-black/20 text-white hover:bg-red-500/80'
                }`}
              >
                <Heart className={`h-4 w-4 ${favorites.has(image.url) ? 'fill-current' : ''}`} />
              </button>
            </div>
            <div className="p-4">
              <h3 className={`text-lg font-semibold mb-2 ${theme.text}`}>
                {image.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {image.tags.map((tag, tagIndex) => (
                  <Badge
                    key={tagIndex}
                    variant="secondary"
                    className={`cursor-pointer transition-all duration-200 ${
                      selectedTag === tag ? theme.tagSelected : theme.tag
                    } ${theme.shadow} hover:scale-105`}
                    onClick={() => onTagClick(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
