
import React from 'react';
import { Heart, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
      <div className="flex flex-col items-center justify-center py-12">
        <div className={`text-center ${theme.textSecondary}`}>
          <Tag className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-medium mb-2">No Images Found</h3>
          <p className="text-sm">
            {selectedTag 
              ? `No images found with the tag "${selectedTag}"`
              : 'Select a folder to load images'
            }
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {images.map((image, index) => (
        <div
          key={`${image.url}-${index}`}
          className={`${theme.cardBg} ${theme.border} border rounded-lg overflow-hidden ${theme.shadow} hover:shadow-lg transition-all`}
        >
          <div className="relative">
            <img
              src={image.url}
              alt={image.title}
              className="w-full h-auto max-h-96 object-contain bg-gray-50 cursor-pointer"
              onClick={() => onImageClick(image)}
              loading="lazy"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onFavoriteToggle(image.url);
              }}
              className={`absolute top-2 right-2 ${
                favorites.has(image.url)
                  ? 'text-red-500 hover:text-red-600'
                  : 'text-gray-400 hover:text-red-500'
              }`}
            >
              <Heart className={`h-4 w-4 ${favorites.has(image.url) ? 'fill-current' : ''}`} />
            </Button>
          </div>

          <div className="p-4">
            <h3 className={`font-medium mb-2 ${theme.text}`}>{image.title}</h3>
            
            {image.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {image.tags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => onTagClick(tag)}
                    className={`
                      px-2 py-1 text-xs rounded-md transition-all
                      ${selectedTag === tag 
                        ? theme.tagSelected 
                        : theme.tag
                      }
                    `}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export { ImageGrid };
