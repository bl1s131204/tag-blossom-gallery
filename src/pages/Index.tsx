
import React, { useState, useRef, useCallback, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { FolderOpen, Search, Menu, X, Image as ImageIcon, Star, Download, ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

// Enhanced tag normalization map with more comprehensive coverage
const TAG_NORMALIZATION_MAP: Record<string, string> = {
  "femanized by girl friend": "feminized by girlfriend",
  "femanized by girlfriend": "feminized by girlfriend",
  "feminized by girlfreind": "feminized by girlfriend",
  "femanizaed": "feminization",
  "femanized": "feminization",
  "femanizartion": "feminization",
  "cheated into dress": "cheated into a dress",
  "cheated into dresses": "cheated into a dress",
  "chated into a dress": "cheated into a dress",
  "cheated into the dress": "cheated into a dress",
  "dressed as girll": "dressed as a girl",
  "dressed as girl": "dressed as a girl",
  "dressed like girl": "dressed as a girl",
  "dreesed ass a women": "dressed as a girl",
  "dresssed as girl": "dressed as a girl",
  "dressed as girls": "dressed as a girl",
  "forced femanization": "forced feminization",
  "forced feminisation": "forced feminization",
  "forced fem": "forced feminization",
  "pretty girls lesson": "pretty girl lesson",
  "pretty girl lessons": "pretty girl lesson",
  "fuvked as women": "fucked as a woman",
  "fucked as woman": "fucked as a woman",
  "fucked as women": "fucked as a woman",
  "permanent femanization": "permanent feminization",
  "permanent feminisation": "permanent feminization",
  "permanent fem": "permanent feminization",
  "feminized by sister": "feminized by sister",
  "feminized by mom": "feminized by mother",
  "feminized by mother": "feminized by mother",
  "crossdressed": "crossdressing",
  "crossdresser": "crossdressing",
  "sissified": "sissification",
  "sissy training": "sissy training",
  "sissy lessons": "sissy training",
  "maid training": "maid training",
  "maid outfit": "maid outfit",
  "french maid": "french maid",
  "makeup lessons": "makeup lesson",
  "makeup tutorial": "makeup lesson",
  "nail polish": "nail polish",
  "high heels": "high heels",
  "stockings": "stockings",
  "pantyhose": "pantyhose",
  "lingerie": "lingerie",
  "corset": "corset",
  "frilly dress": "frilly dress",
  "pink dress": "pink dress",
  "wedding dress": "wedding dress"
};

// Noise words to filter out
const NOISE_WORDS = new Set([
  "by", "but", "as", "to", "and", "of", "the", "with", "for", "a", "in", "on", "at", "is", "are", "was", "were"
]);

// 10+ Enhanced theme definitions
const THEMES = {
  glassmorphism: {
    name: 'Glassmorphism',
    styles: {
      background: 'bg-gradient-to-br from-purple-400 via-pink-500 to-red-500',
      cardBg: 'bg-white/10 backdrop-blur-lg border-white/20',
      text: 'text-white',
      textSecondary: 'text-white/80',
      border: 'border-white/20',
      accent: 'bg-white/20 text-white backdrop-blur-sm',
      accentHover: 'hover:bg-white/30',
      sidebar: 'bg-white/10 backdrop-blur-lg border-white/20',
      tag: 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm',
      tagSelected: 'bg-white/30 text-white',
      shadow: 'shadow-xl shadow-black/20'
    }
  },
  pastelParadise: {
    name: 'Pastel Paradise',
    styles: {
      background: 'bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100',
      cardBg: 'bg-white/80 border-pink-200',
      text: 'text-gray-800',
      textSecondary: 'text-gray-600',
      border: 'border-pink-200',
      accent: 'bg-pink-400 text-white',
      accentHover: 'hover:bg-pink-500',
      sidebar: 'bg-white/80 border-pink-200',
      tag: 'bg-pink-100 text-pink-700 hover:bg-pink-200 border border-pink-200',
      tagSelected: 'bg-pink-400 text-white',
      shadow: 'shadow-lg shadow-pink-200/50'
    }
  },
  retroTerminal: {
    name: 'Retro Terminal',
    styles: {
      background: 'bg-black',
      cardBg: 'bg-gray-900 border-green-500/30',
      text: 'text-green-400 font-mono',
      textSecondary: 'text-green-500/70 font-mono',
      border: 'border-green-500/30',
      accent: 'bg-green-500 text-black font-mono',
      accentHover: 'hover:bg-green-400',
      sidebar: 'bg-gray-900 border-green-500/30',
      tag: 'bg-gray-800 text-green-400 hover:bg-green-500/20 border border-green-500/30 font-mono',
      tagSelected: 'bg-green-500 text-black font-mono',
      shadow: 'shadow-lg shadow-green-500/20'
    }
  },
  minimalGray: {
    name: 'Minimal Gray',
    styles: {
      background: 'bg-gray-50',
      cardBg: 'bg-white border-gray-200',
      text: 'text-gray-900',
      textSecondary: 'text-gray-600',
      border: 'border-gray-200',
      accent: 'bg-gray-900 text-white',
      accentHover: 'hover:bg-gray-800',
      sidebar: 'bg-white border-gray-200',
      tag: 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200',
      tagSelected: 'bg-gray-900 text-white',
      shadow: 'shadow-sm'
    }
  },
  sepiaStorybook: {
    name: 'Sepia Storybook',
    styles: {
      background: 'bg-amber-50',
      cardBg: 'bg-amber-25 border-amber-200',
      text: 'text-amber-900 font-serif',
      textSecondary: 'text-amber-700 font-serif',
      border: 'border-amber-200',
      accent: 'bg-amber-700 text-amber-50 font-serif',
      accentHover: 'hover:bg-amber-800',
      sidebar: 'bg-amber-25 border-amber-200',
      tag: 'bg-amber-100 text-amber-800 hover:bg-amber-200 border border-amber-200 font-serif',
      tagSelected: 'bg-amber-700 text-amber-50 font-serif',
      shadow: 'shadow-lg shadow-amber-200/50'
    }
  },
  highContrastA11y: {
    name: 'High Contrast A11y',
    styles: {
      background: 'bg-black',
      cardBg: 'bg-yellow-400 border-black border-2',
      text: 'text-black font-bold',
      textSecondary: 'text-black font-semibold',
      border: 'border-black border-2',
      accent: 'bg-black text-yellow-400 font-bold border-2 border-yellow-400',
      accentHover: 'hover:bg-gray-900',
      sidebar: 'bg-yellow-400 border-black border-2',
      tag: 'bg-black text-yellow-400 hover:bg-gray-900 border-2 border-yellow-400 font-bold',
      tagSelected: 'bg-yellow-400 text-black border-2 border-black font-bold',
      shadow: 'shadow-xl shadow-yellow-400/30'
    }
  },
  typographyShowcase: {
    name: 'Typography Showcase',
    styles: {
      background: 'bg-white',
      cardBg: 'bg-gray-50 border-gray-300',
      text: 'text-gray-900 font-serif',
      textSecondary: 'text-gray-700 font-sans',
      border: 'border-gray-300',
      accent: 'bg-gray-900 text-white font-serif',
      accentHover: 'hover:bg-gray-800',
      sidebar: 'bg-gray-50 border-gray-300',
      tag: 'bg-white text-gray-800 hover:bg-gray-100 border border-gray-300 font-sans',
      tagSelected: 'bg-gray-900 text-white font-serif',
      shadow: 'shadow-md'
    }
  },
  luxuryGold: {
    name: 'Luxury Gold',
    styles: {
      background: 'bg-slate-900',
      cardBg: 'bg-slate-800 border-yellow-600/30',
      text: 'text-yellow-200',
      textSecondary: 'text-yellow-300/70',
      border: 'border-yellow-600/30',
      accent: 'bg-gradient-to-r from-yellow-600 to-yellow-500 text-slate-900',
      accentHover: 'hover:from-yellow-500 hover:to-yellow-400',
      sidebar: 'bg-slate-800 border-yellow-600/30',
      tag: 'bg-slate-700 text-yellow-300 hover:bg-yellow-600/20 border border-yellow-600/30',
      tagSelected: 'bg-gradient-to-r from-yellow-600 to-yellow-500 text-slate-900',
      shadow: 'shadow-lg shadow-yellow-600/20'
    }
  },
  neonVibe: {
    name: 'Neon Vibe',
    styles: {
      background: 'bg-gray-900',
      cardBg: 'bg-gray-800 border-cyan-400/30',
      text: 'text-cyan-300',
      textSecondary: 'text-purple-300',
      border: 'border-cyan-400/30',
      accent: 'bg-gradient-to-r from-purple-500 to-cyan-400 text-gray-900',
      accentHover: 'hover:from-purple-600 hover:to-cyan-500',
      sidebar: 'bg-gray-800 border-purple-400/30',
      tag: 'bg-gray-700 text-cyan-300 hover:bg-cyan-400/20 border border-cyan-400/30',
      tagSelected: 'bg-gradient-to-r from-purple-500 to-cyan-400 text-gray-900',
      shadow: 'shadow-lg shadow-cyan-400/20'
    }
  },
  inkPaper: {
    name: 'Ink & Paper',
    styles: {
      background: 'bg-white bg-grid-pattern',
      cardBg: 'bg-white border-gray-400',
      text: 'text-gray-900',
      textSecondary: 'text-gray-700',
      border: 'border-gray-400',
      accent: 'bg-gray-900 text-white',
      accentHover: 'hover:bg-gray-800',
      sidebar: 'bg-white border-gray-400',
      tag: 'bg-gray-50 text-gray-800 hover:bg-gray-100 border border-gray-400',
      tagSelected: 'bg-gray-900 text-white',
      shadow: 'shadow-lg shadow-gray-400/30'
    }
  },
  oceanBreeze: {
    name: 'Ocean Breeze',
    styles: {
      background: 'bg-gradient-to-br from-blue-100 via-cyan-50 to-teal-100',
      cardBg: 'bg-white/90 border-blue-200',
      text: 'text-blue-900',
      textSecondary: 'text-blue-700',
      border: 'border-blue-200',
      accent: 'bg-blue-600 text-white',
      accentHover: 'hover:bg-blue-700',
      sidebar: 'bg-white/90 border-blue-200',
      tag: 'bg-blue-50 text-blue-800 hover:bg-blue-100 border border-blue-200',
      tagSelected: 'bg-blue-600 text-white',
      shadow: 'shadow-lg shadow-blue-200/50'
    }
  },
  forestNight: {
    name: 'Forest Night',
    styles: {
      background: 'bg-gradient-to-br from-green-900 via-emerald-800 to-teal-900',
      cardBg: 'bg-green-800/80 border-green-600/30',
      text: 'text-green-100',
      textSecondary: 'text-green-200/80',
      border: 'border-green-600/30',
      accent: 'bg-emerald-500 text-green-900',
      accentHover: 'hover:bg-emerald-400',
      sidebar: 'bg-green-800/80 border-green-600/30',
      tag: 'bg-green-700/60 text-green-200 hover:bg-green-600/60 border border-green-600/30',
      tagSelected: 'bg-emerald-500 text-green-900',
      shadow: 'shadow-lg shadow-green-900/30'
    }
  }
};

interface ImageData {
  file: File;
  title: string;
  tags: string[];
  url: string;
  favorite?: boolean;
}

interface TagCount {
  tag: string;
  count: number;
}

const Index = () => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentTheme, setCurrentTheme] = useState<keyof typeof THEMES>('glassmorphism');
  const [fullscreenImage, setFullscreenImage] = useState<ImageData | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const fileInputRef = useRef<HTMLInputElement>(null);

  const theme = THEMES[currentTheme].styles;

  // Enhanced tag extraction with fuzzy logic and noise word filtering
  const extractTagsFromFilename = useCallback((filename: string): { title: string; tags: string[] } => {
    console.log('Processing filename:', filename);
    
    // Remove file extension
    const nameWithoutExt = filename.replace(/\.(jpg|jpeg|png|webp|gif)$/i, '');
    
    // Enhanced regex pattern for flexible tag separation
    const separatorPattern = /(?:,{1,3}|\s{2,}|--|\.{2,}|\|)+/;
    const parts = nameWithoutExt.split(separatorPattern);
    
    if (parts.length < 2) {
      return { title: nameWithoutExt.trim(), tags: [] };
    }
    
    const title = parts[0].trim();
    const tagSection = parts.slice(1).join(' ');
    
    // Extract and clean tags
    const rawTags = tagSection
      .split(/[,;]+/)
      .map(tag => tag.trim().toLowerCase())
      .filter(tag => tag.length > 2) // Minimum length filter
      .filter(tag => !NOISE_WORDS.has(tag)) // Remove noise words
      .filter(tag => !/^\d+$/.test(tag)); // Remove pure numbers
    
    // Normalize tags using the normalization map
    const normalizedTags = rawTags.map(tag => {
      const normalized = TAG_NORMALIZATION_MAP[tag];
      return normalized || tag;
    });
    
    // Remove duplicates
    const uniqueTags = [...new Set(normalizedTags)];
    
    console.log('Extracted title:', title);
    console.log('Normalized tags:', uniqueTags);
    
    return { title, tags: uniqueTags };
  }, []);

  // Handle folder selection
  const handleFolderSelect = useCallback(async () => {
    try {
      if (!fileInputRef.current) return;
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

  return (
    <div className={`min-h-screen ${theme.background} ${theme.text} transition-all duration-300`}>
      <div className="flex h-screen">
        {/* Enhanced Sidebar */}
        <div className={`${sidebarOpen ? 'w-80' : 'w-0'} transition-all duration-300 overflow-hidden border-r ${theme.sidebar} ${theme.border} ${theme.shadow}`}>
          <div className="p-4 h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-lg font-semibold ${theme.text}`}>Tags</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(false)}
                className={theme.text}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`pl-10 ${theme.cardBg} ${theme.border} ${theme.text}`}
              />
            </div>

            {/* Clear filter button */}
            {selectedTag && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedTag(null)}
                className={`mb-4 ${theme.tag}`}
              >
                Clear Filter
              </Button>
            )}

            {/* Export button */}
            {selectedTag && (
              <Button
                variant="outline"
                size="sm"
                onClick={exportFilteredList}
                className={`mb-4 ${theme.tag}`}
              >
                <Download className="h-4 w-4 mr-2" />
                Export List
              </Button>
            )}

            {/* Tags list */}
            <ScrollArea className="flex-1">
              <div className="space-y-1">
                {filteredTags.map(({ tag, count }) => (
                  <button
                    key={tag}
                    onClick={() => handleTagClick(tag)}
                    className={`w-full text-left p-2 rounded-md transition-all duration-200 ${
                      selectedTag === tag ? theme.tagSelected : theme.tag
                    } ${theme.shadow}`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-sm truncate">{tag}</span>
                      <Badge variant="secondary" className="ml-2 text-xs">
                        {count}
                      </Badge>
                    </div>
                  </button>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Enhanced Header */}
          <div className={`${theme.cardBg} ${theme.border} border-b p-4 ${theme.shadow}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {!sidebarOpen && (
                  <Button
                    variant="ghost"
                    onClick={() => setSidebarOpen(true)}
                    className={theme.text}
                  >
                    <Menu className="h-4 w-4" />
                  </Button>
                )}
                <h1 className={`text-2xl font-bold ${theme.text}`}>Enhanced Image Gallery</h1>
              </div>
              
              <div className="flex items-center gap-4">
                {/* Theme selector */}
                <Select value={currentTheme} onValueChange={(value: keyof typeof THEMES) => setCurrentTheme(value)}>
                  <SelectTrigger className={`w-48 ${theme.cardBg} ${theme.border}`}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(THEMES).map(([key, theme]) => (
                      <SelectItem key={key} value={key}>
                        {theme.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button
                  onClick={handleFolderSelect}
                  className={`${theme.accent} ${theme.accentHover}`}
                >
                  <FolderOpen className="mr-2 h-4 w-4" />
                  Select Folder
                </Button>
              </div>
            </div>
            
            {/* Enhanced Results info */}
            {images.length > 0 && (
              <div className={`mt-4 ${theme.textSecondary}`}>
                {selectedTag ? (
                  <div className="flex justify-between items-center">
                    <p>{filteredImages.length} images found for: "{selectedTag}"</p>
                    <p>{favorites.size} favorites total</p>
                  </div>
                ) : (
                  <div className="flex justify-between items-center">
                    <p>{images.length} total images • {tagCounts.length} unique tags</p>
                    <p>{favorites.size} favorites</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Enhanced Gallery */}
          <ScrollArea className="flex-1">
            <div className="p-6">
              {images.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-96 text-center">
                  <ImageIcon className={`h-16 w-16 ${theme.textSecondary} mb-4`} />
                  <h3 className={`text-xl font-semibold ${theme.text} mb-2`}>No Images Selected</h3>
                  <p className={theme.textSecondary}>
                    Select a folder containing images to get started with enhanced tag extraction
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredImages.map((image, index) => (
                    <Card 
                      key={index} 
                      className={`${theme.cardBg} ${theme.border} overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] ${theme.shadow}`}
                    >
                      <CardContent className="p-0">
                        <div className="relative">
                          <div className="aspect-video relative overflow-hidden cursor-pointer" onClick={() => openFullscreen(image)}>
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
                              toggleFavorite(image.url);
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
                                onClick={() => handleTagClick(tag)}
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
              )}
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Fullscreen Modal */}
      {fullscreenImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
          <button
            onClick={closeFullscreen}
            className="absolute top-4 right-4 p-2 text-white hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
          
          <button
            onClick={() => navigateFullscreen('prev')}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 text-white hover:bg-white/20 rounded-full transition-colors"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>
          
          <button
            onClick={() => navigateFullscreen('next')}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 text-white hover:bg-white/20 rounded-full transition-colors"
          >
            <ChevronRight className="h-8 w-8" />
          </button>

          <div className="max-w-[90vw] max-h-[90vh] flex flex-col items-center">
            <img
              src={fullscreenImage.url}
              alt={fullscreenImage.title}
              className="max-w-full max-h-[80vh] object-contain"
            />
            <div className="mt-4 text-center text-white">
              <h3 className="text-xl font-semibold mb-2">{fullscreenImage.title}</h3>
              <div className="flex flex-wrap gap-2 justify-center">
                {fullscreenImage.tags.map((tag, tagIndex) => (
                  <Badge
                    key={tagIndex}
                    variant="secondary"
                    className="bg-white/20 text-white hover:bg-white/30 cursor-pointer"
                    onClick={() => {
                      handleTagClick(tag);
                      closeFullscreen();
                    }}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hidden file input */}
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
    </div>
  );
};

export default Index;
