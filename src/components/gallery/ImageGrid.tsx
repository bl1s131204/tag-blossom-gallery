
import React from 'react';
import { Heart, Tag, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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

const ImageGrid = ({
  images,
  favorites,
  onImageClick,
  onFavoriteToggle,
  onTagClick,
  selectedTag,
  theme
}: ImageGridProps) => {
  if (images.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className={`text-center ${theme.textSecondary}`}>
          <Tag className="h-16 w-16 mx-auto mb-6 opacity-40" />
          <h3 className="text-xl font-semibold mb-3">No Images Found</h3>
          <p className="text-sm max-w-md">
            {selectedTag 
              ? `No images found with the tag "${selectedTag}". Try selecting a different tag or clearing the filter.`
              : 'Select a folder to load images and start exploring your collection.'
            }
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {images.map((image, index) => (
        <div
          key={`${image.url}-${index}`}
          className={`group ${theme.cardBg} ${theme.border} border rounded-xl overflow-hidden ${theme.shadow} hover:shadow-xl transition-all duration-300 hover:scale-[1.02]`}
        >
          <div className="relative overflow-hidden">
            <img
              src={image.url}
              alt={image.title}
              className="w-full h-48 object-cover bg-gray-100 transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
            
            {/* Overlay with actions */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => onImageClick(image)}
                className="opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 bg-white/90 hover:bg-white text-gray-900 backdrop-blur-sm"
              >
                <Eye className="h-4 w-4 mr-2" />
                View
              </Button>
            </div>

            {/* Favorite button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onFavoriteToggle(image.url);
              }}
              className={`absolute top-2 right-2 ${
                favorites.has(image.url)
                  ? 'text-red-500 hover:text-red-600 bg-white/90'
                  : 'text-white hover:text-red-500 bg-black/40 hover:bg-white/90'
              } backdrop-blur-sm transition-all duration-200`}
            >
              <Heart className={`h-4 w-4 ${favorites.has(image.url) ? 'fill-current' : ''}`} />
            </Button>
          </div>

          <div className="p-4">
            <h3 className={`font-semibold mb-3 ${theme.text} line-clamp-1`} title={image.title}>
              {image.title}
            </h3>
            
            {image.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {image.tags.slice(0, 4).map((tag) => (
                  <Badge
                    key={tag}
                    variant={selectedTag === tag ? "default" : "secondary"}
                    className={`text-xs cursor-pointer transition-all duration-200 hover:scale-105 ${
                      selectedTag === tag 
                        ? 'bg-primary text-primary-foreground shadow-sm' 
                        : 'hover:bg-primary/10'
                    }`}
                    onClick={() => onTagClick(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
                {image.tags.length > 4 && (
                  <Badge variant="outline" className="text-xs">
                    +{image.tags.length - 4}
                  </Badge>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export { ImageGrid };
