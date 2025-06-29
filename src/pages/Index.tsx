import React, { useState, useRef, useCallback, useMemo } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from '@/hooks/use-toast';
import { ImageData, TagCount } from '@/types/gallery';
import { THEMES } from '@/constants/themes';
import { useTagExtraction } from '@/hooks/useTagExtraction';
import { Sidebar } from '@/components/gallery/Sidebar';
import { Header } from '@/components/gallery/Header';
import { ImageGrid } from '@/components/gallery/ImageGrid';
import { FullscreenModal } from '@/components/gallery/FullscreenModal';
import { FolderSelection } from '@/components/gallery/FolderSelection';

const Index = () => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentTheme, setCurrentTheme] = useState<keyof typeof THEMES>('cyberpunk');
  const [fullscreenImage, setFullscreenImage] = useState<ImageData | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const fileInputRef = useRef<HTMLInputElement>(null);

  const theme = THEMES[currentTheme].styles;
  const { extractTagsFromFilename } = useTagExtraction();

  // Handle folder selection
  const handleFolderSelect = useCallback(async () => {
    try {
      if (!fileInputRef.current) return;
      
      // Reset the input value to ensure change event fires even for same folder
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    } catch (error) {
      console.error('Error selecting folder:', error);
      toast({
        title: "Error",
        description: "Failed to select folder. Please try again.",
        variant: "destructive"
      });
    }
  }, []);

  // Handle file input change
  const handleFileInput = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    console.log('Processing files:', files.length);
    
    const imageFiles = Array.from(files).filter(file => 
      /\.(jpg|jpeg|png|webp|gif)$/i.test(file.name)
    );

    if (imageFiles.length === 0) {
      toast({
        title: "No Images Found",
        description: "No valid image files found in the selected folder.",
        variant: "destructive"
      });
      return;
    }

    const processedImages: ImageData[] = [];

    for (const file of imageFiles) {
      const { title, tags } = extractTagsFromFilename(file.name);
      const url = URL.createObjectURL(file);
      
      processedImages.push({
        file,
        title,
        tags,
        url,
        favorite: false
      });
    }

    setImages(processedImages);
    setSelectedTag(null);
    
    toast({
      title: "Images Loaded",
      description: `Successfully loaded ${processedImages.length} images with enhanced tag extraction.`
    });
  }, [extractTagsFromFilename]);

  // Get all unique tags with counts
  const tagCounts = useMemo((): TagCount[] => {
    const tagMap = new Map<string, number>();
    
    images.forEach(image => {
      image.tags.forEach(tag => {
        tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
      });
    });
    
    return Array.from(tagMap.entries())
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => a.tag.localeCompare(b.tag));
  }, [images]);

  // Filter tags based on search
  const filteredTags = useMemo(() => {
    if (!searchTerm) return tagCounts;
    return tagCounts.filter(({ tag }) => 
      tag.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [tagCounts, searchTerm]);

  // Filter images based on selected tag
  const filteredImages = useMemo(() => {
    if (!selectedTag) return images;
    return images.filter(image => image.tags.includes(selectedTag));
  }, [images, selectedTag]);

  const handleTagClick = useCallback((tag: string) => {
    setSelectedTag(selectedTag === tag ? null : tag);
  }, [selectedTag]);

  const toggleFavorite = useCallback((imageUrl: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(imageUrl)) {
        newFavorites.delete(imageUrl);
      } else {
        newFavorites.add(imageUrl);
      }
      return newFavorites;
    });
  }, []);

  const openFullscreen = useCallback((image: ImageData) => {
    setFullscreenImage(image);
  }, []);

  const closeFullscreen = useCallback(() => {
    setFullscreenImage(null);
  }, []);

  const navigateFullscreen = useCallback((direction: 'prev' | 'next') => {
    if (!fullscreenImage) return;
    
    const currentIndex = filteredImages.findIndex(img => img.url === fullscreenImage.url);
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1;
    } else {
      newIndex = currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0;
    }
    
    setFullscreenImage(filteredImages[newIndex]);
  }, [fullscreenImage, filteredImages]);

  const exportFilteredList = useCallback(() => {
    if (!selectedTag) return;
    
    const filteredFilenames = filteredImages.map(img => img.file.name).join('\n');
    const blob = new Blob([filteredFilenames], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedTag}_images.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }, [selectedTag, filteredImages]);

  // Keyboard navigation for fullscreen
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!fullscreenImage) return;
      
      if (e.key === 'Escape') {
        closeFullscreen();
      } else if (e.key === 'ArrowLeft') {
        navigateFullscreen('prev');
      } else if (e.key === 'ArrowRight') {
        navigateFullscreen('next');
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [fullscreenImage, closeFullscreen, navigateFullscreen]);

  // Show folder selection screen if no images loaded
  if (images.length === 0) {
    return (
      <>
        <FolderSelection
          onFolderSelect={handleFolderSelect}
          currentTheme={currentTheme}
          onThemeChange={setCurrentTheme}
          theme={theme}
        />
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleFileInput}
          webkitdirectory=""
          directory=""
        />
      </>
    );
  }

  return (
    <div className={`min-h-screen ${theme.background} ${theme.text} transition-all duration-300`}>
      <div className="flex h-screen">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedTag={selectedTag}
          onTagClick={handleTagClick}
          onClearFilter={() => setSelectedTag(null)}
          onExportList={exportFilteredList}
          filteredTags={filteredTags}
          theme={theme}
        />

        <div className="flex-1 flex flex-col overflow-hidden">
          <Header
            sidebarOpen={sidebarOpen}
            onToggleSidebar={() => setSidebarOpen(true)}
            currentTheme={currentTheme}
            onThemeChange={setCurrentTheme}
            onFolderSelect={handleFolderSelect}
            imageCount={images.length}
            filteredCount={filteredImages.length}
            selectedTag={selectedTag}
            tagCount={tagCounts.length}
            favoriteCount={favorites.size}
            theme={theme}
          />

          <ScrollArea className="flex-1">
            <div className="p-6">
              <ImageGrid
                images={filteredImages}
                favorites={favorites}
                onImageClick={openFullscreen}
                onFavoriteToggle={toggleFavorite}
                onTagClick={handleTagClick}
                selectedTag={selectedTag}
                theme={theme}
              />
            </div>
          </ScrollArea>
        </div>
      </div>

      <FullscreenModal
        image={fullscreenImage}
        onClose={closeFullscreen}
        onNavigate={navigateFullscreen}
        onTagClick={handleTagClick}
      />

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleFileInput}
        {...({ webkitdirectory: "", directory: "" } as any)}
      />
    </div>
  );
};

export default Index;
