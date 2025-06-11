
import React, { useState, useRef, useCallback, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { FolderOpen, Search, Menu, X, Image as ImageIcon } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

// Tag normalization map
const TAG_NORMALIZATION_MAP: Record<string, string> = {
  "femanized by girl friend": "feminized by girlfriend",
  "femanized by girlfriend": "feminized by girlfriend",
  "feminized by girlfreind": "feminized by girlfriend",
  "cheated into dress": "cheated into a dress",
  "cheated into dresses": "cheated into a dress",
  "dressed as girll": "dressed as a girl",
  "dressed as girl": "dressed as a girl",
  "dressed like girl": "dressed as a girl",
  "forced femanization": "forced feminization",
  "forced feminisation": "forced feminization",
  "forced fem": "forced feminization",
  "pretty girls lesson": "pretty girl lesson",
  "pretty girl lessons": "pretty girl lesson",
  "fuvked as women": "fucked as a woman",
  "fucked as woman": "fucked as a woman",
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

// Theme definitions
const THEMES = {
  light: {
    name: 'Light',
    styles: {
      background: 'bg-gray-50',
      cardBg: 'bg-white',
      text: 'text-gray-900',
      textSecondary: 'text-gray-600',
      border: 'border-gray-200',
      accent: 'bg-blue-500 text-white',
      accentHover: 'hover:bg-blue-600',
      sidebar: 'bg-white border-gray-200',
      tag: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
      tagSelected: 'bg-blue-500 text-white'
    }
  },
  dark: {
    name: 'Modern Dark',
    styles: {
      background: 'bg-gray-900',
      cardBg: 'bg-gray-800',
      text: 'text-white',
      textSecondary: 'text-gray-300',
      border: 'border-gray-700',
      accent: 'bg-cyan-500 text-white',
      accentHover: 'hover:bg-cyan-400',
      sidebar: 'bg-gray-800 border-gray-700',
      tag: 'bg-gray-700 text-gray-200 hover:bg-gray-600',
      tagSelected: 'bg-cyan-500 text-white'
    }
  },
  glass: {
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
      tag: 'bg-white/10 text-white hover:bg-white/20',
      tagSelected: 'bg-white/30 text-white'
    }
  },
  pastel: {
    name: 'Pastel Bloom',
    styles: {
      background: 'bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100',
      cardBg: 'bg-white/80',
      text: 'text-gray-800',
      textSecondary: 'text-gray-600',
      border: 'border-pink-200',
      accent: 'bg-pink-400 text-white',
      accentHover: 'hover:bg-pink-500',
      sidebar: 'bg-white/80 border-pink-200',
      tag: 'bg-pink-100 text-pink-700 hover:bg-pink-200',
      tagSelected: 'bg-pink-400 text-white'
    }
  },
  cyberpunk: {
    name: 'Cyberpunk',
    styles: {
      background: 'bg-black',
      cardBg: 'bg-gray-900 border-cyan-500/30',
      text: 'text-cyan-300',
      textSecondary: 'text-cyan-500/70',
      border: 'border-cyan-500/30',
      accent: 'bg-gradient-to-r from-pink-500 to-cyan-500 text-black',
      accentHover: 'hover:from-pink-600 hover:to-cyan-600',
      sidebar: 'bg-gray-900 border-cyan-500/30',
      tag: 'bg-gray-800 text-cyan-400 hover:bg-cyan-500/20 border border-cyan-500/20',
      tagSelected: 'bg-gradient-to-r from-pink-500 to-cyan-500 text-black'
    }
  }
};

interface ImageData {
  file: File;
  title: string;
  tags: string[];
  url: string;
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
  const [currentTheme, setCurrentTheme] = useState<keyof typeof THEMES>('light');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const theme = THEMES[currentTheme].styles;

  // Extract and normalize tags from filename
  const extractTagsFromFilename = useCallback((filename: string): { title: string; tags: string[] } => {
    console.log('Processing filename:', filename);
    
    // Remove file extension
    const nameWithoutExt = filename.replace(/\.(jpg|jpeg|png|webp|gif)$/i, '');
    
    // Split by various delimiters: --, |, and multiple commas/spaces
    const parts = nameWithoutExt.split(/\s*(?:--|[|]|,,+|\s{2,})\s*/);
    
    if (parts.length < 2) {
      // No clear separator found, treat entire name as title
      return { title: nameWithoutExt.trim(), tags: [] };
    }
    
    const title = parts[0].trim();
    const tagSection = parts.slice(1).join(' ');
    
    // Extract tags from the tag section
    const rawTags = tagSection
      .split(/[,;]+/)
      .map(tag => tag.trim().toLowerCase())
      .filter(tag => tag.length > 0);
    
    // Normalize tags
    const normalizedTags = rawTags.map(tag => {
      const normalized = TAG_NORMALIZATION_MAP[tag];
      return normalized || tag;
    });
    
    console.log('Extracted title:', title);
    console.log('Raw tags:', rawTags);
    console.log('Normalized tags:', normalizedTags);
    
    return { title, tags: normalizedTags };
  }, []);

  // Handle folder selection
  const handleFolderSelect = useCallback(async () => {
    try {
      if (!fileInputRef.current) return;
      
      // Trigger file input
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
        url
      });
    }

    setImages(processedImages);
    setSelectedTag(null);
    
    toast({
      title: "Images Loaded",
      description: `Successfully loaded ${processedImages.length} images.`
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

  return (
    <div className={`min-h-screen ${theme.background} ${theme.text} transition-colors duration-300`}>
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className={`${sidebarOpen ? 'w-80' : 'w-0'} transition-all duration-300 overflow-hidden border-r ${theme.sidebar} ${theme.border}`}>
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

            {/* Tags list */}
            <ScrollArea className="flex-1">
              <div className="space-y-1">
                {filteredTags.map(({ tag, count }) => (
                  <button
                    key={tag}
                    onClick={() => handleTagClick(tag)}
                    className={`w-full text-left p-2 rounded-md transition-colors ${
                      selectedTag === tag ? theme.tagSelected : theme.tag
                    }`}
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
          {/* Header */}
          <div className={`${theme.cardBg} ${theme.border} border-b p-4`}>
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
                <h1 className={`text-2xl font-bold ${theme.text}`}>Image Gallery</h1>
              </div>
              
              <div className="flex items-center gap-4">
                {/* Theme selector */}
                <Select value={currentTheme} onValueChange={(value: keyof typeof THEMES) => setCurrentTheme(value)}>
                  <SelectTrigger className={`w-40 ${theme.cardBg} ${theme.border}`}>
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
            
            {/* Results info */}
            {images.length > 0 && (
              <div className={`mt-4 ${theme.textSecondary}`}>
                {selectedTag ? (
                  <p>{filteredImages.length} images found for: "{selectedTag}"</p>
                ) : (
                  <p>{images.length} total images</p>
                )}
              </div>
            )}
          </div>

          {/* Gallery */}
          <ScrollArea className="flex-1">
            <div className="p-6">
              {images.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-96 text-center">
                  <ImageIcon className={`h-16 w-16 ${theme.textSecondary} mb-4`} />
                  <h3 className={`text-xl font-semibold ${theme.text} mb-2`}>No Images Selected</h3>
                  <p className={theme.textSecondary}>
                    Select a folder containing images to get started
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredImages.map((image, index) => (
                    <Card key={index} className={`${theme.cardBg} ${theme.border} overflow-hidden hover:shadow-lg transition-shadow`}>
                      <CardContent className="p-0">
                        <div className="aspect-video relative overflow-hidden">
                          <img
                            src={image.url}
                            alt={image.title}
                            className="w-full h-full object-contain bg-gray-100"
                            loading="lazy"
                          />
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
                                className={`cursor-pointer transition-colors ${
                                  selectedTag === tag ? theme.tagSelected : theme.tag
                                }`}
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
