
import React from 'react';
import { Heart, Eye } from 'lucide-react';
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
          <div className="w-24 h-24 mx-auto mb-6 opacity-20 bg-gray-300 rounded-lg flex items-center justify-center">
            <Eye className="h-12 w-12" />
          </div>
          <h3 className="text-2xl font-semibold mb-4">No Images Found</h3>
          <p className="text-base max-w-md">
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
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 p-2">
      {images.map((image, index) => (
        <div
          key={`${image.url}-${index}`}
          className={`group ${theme.cardBg} ${theme.border} border rounded-2xl overflow-hidden ${theme.shadow} hover:shadow-2xl transition-all duration-300 hover:scale-[1.03] hover:-translate-y-1`}
        >
          {/* Image Title at Top */}
          <div className="p-4 pb-2">
            <h3 className={`font-bold text-lg ${theme.text} line-clamp-2 leading-tight`} title={image.title}>
              {image.title}
            </h3>
          </div>

          {/* Image Container */}
          <div className="relative overflow-hidden mx-4 mb-4 rounded-xl">
            <img
              src={image.url}
              alt={image.title}
              className="w-full h-64 object-cover bg-gray-100 transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            
            {/* Overlay with actions */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <Button
                variant="secondary"
                size="lg"
                onClick={() => onImageClick(image)}
                className="transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 bg-white/95 hover:bg-white text-gray-900 backdrop-blur-sm shadow-lg border-0 px-6 py-3"
              >
                <Eye className="h-5 w-5 mr-2" />
                View Full Size
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
              className={`absolute top-3 right-3 ${
                favorites.has(image.url)
                  ? 'text-red-500 hover:text-red-600 bg-white/95 shadow-lg'
                  : 'text-white hover:text-red-500 bg-black/50 hover:bg-white/95'
              } backdrop-blur-sm transition-all duration-200 rounded-full h-10 w-10 p-0`}
            >
              <Heart className={`h-5 w-5 ${favorites.has(image.url) ? 'fill-current' : ''}`} />
            </Button>
          </div>

          {/* Tags at Bottom */}
          {image.tags.length > 0 && (
            <div className="px-4 pb-4">
              <div className="flex flex-wrap gap-2">
                {image.tags.slice(0, 4).map((tag) => (
                  <Badge
                    key={tag}
                    variant={selectedTag === tag ? "default" : "secondary"}
                    className={`text-xs cursor-pointer transition-all duration-200 hover:scale-105 ${
                      selectedTag === tag 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md border-0' 
                        : 'hover:bg-primary/10 hover:border-primary/20'
                    }`}
                    onClick={() => onTagClick(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
                {image.tags.length > 4 && (
                  <Badge variant="outline" className="text-xs opacity-60">
                    +{image.tags.length - 4} more
                  </Badge>
                )}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export { ImageGrid };
