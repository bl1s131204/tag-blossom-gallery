
import React from 'react';
import { Folder, Upload, Palette, Images, Tag, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { THEMES } from '@/constants/themes';

interface FolderSelectionProps {
  onFolderSelect: () => void;
  currentTheme: keyof typeof THEMES;
  onThemeChange: (theme: keyof typeof THEMES) => void;
  theme: any;
}

const FolderSelection = ({ 
  onFolderSelect, 
  currentTheme, 
  onThemeChange, 
  theme 
}: FolderSelectionProps) => {
  return (
    <div className={`min-h-screen ${theme.background} ${theme.text} flex items-center justify-center p-6`}>
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className={`inline-flex items-center justify-center w-20 h-20 ${theme.accent} rounded-full mb-6`}>
            <Images className="h-10 w-10" />
          </div>
          <h1 className={`text-4xl font-bold ${theme.text} mb-4`}>
            AI Image Gallery
          </h1>
          <p className={`text-lg ${theme.textSecondary} max-w-lg mx-auto`}>
            Organize and browse your images with intelligent tag extraction and advanced filtering
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className={`${theme.cardBg} ${theme.border} border rounded-lg p-6 text-center ${theme.shadow}`}>
            <Tag className={`h-8 w-8 ${theme.text} mx-auto mb-3`} />
            <h3 className={`font-semibold ${theme.text} mb-2`}>Smart Tagging</h3>
            <p className={`text-sm ${theme.textSecondary}`}>
              Automatic tag extraction from filenames with intelligent normalization
            </p>
          </div>
          
          <div className={`${theme.cardBg} ${theme.border} border rounded-lg p-6 text-center ${theme.shadow}`}>
            <Heart className={`h-8 w-8 ${theme.text} mx-auto mb-3`} />
            <h3 className={`font-semibold ${theme.text} mb-2`}>Favorites</h3>
            <p className={`text-sm ${theme.textSecondary}`}>
              Mark and organize your favorite images for quick access
            </p>
          </div>

          <div className={`${theme.cardBg} ${theme.border} border rounded-lg p-6 text-center ${theme.shadow}`}>
            <Palette className={`h-8 w-8 ${theme.text} mx-auto mb-3`} />
            <h3 className={`font-semibold ${theme.text} mb-2`}>Beautiful Themes</h3>
            <p className={`text-sm ${theme.textSecondary}`}>
              Choose from multiple stunning themes to match your style
            </p>
          </div>
        </div>

        {/* Main Action Card */}
        <div className={`${theme.cardBg} ${theme.border} border rounded-xl p-8 text-center ${theme.shadow}`}>
          <div className={`inline-flex items-center justify-center w-16 h-16 ${theme.accent} rounded-full mb-6`}>
            <Folder className="h-8 w-8" />
          </div>
          
          <h2 className={`text-2xl font-bold ${theme.text} mb-4`}>
            Get Started
          </h2>
          <p className={`${theme.textSecondary} mb-8 max-w-md mx-auto`}>
            Select a folder containing your images to begin organizing and browsing with intelligent tag extraction
          </p>

          <Button
            onClick={onFolderSelect}
            size="lg"
            className={`${theme.accent} ${theme.accentHover} text-lg px-8 py-3 h-auto mb-6`}
          >
            <Upload className="h-5 w-5 mr-2" />
            Select Image Folder
          </Button>

          <div className="flex items-center justify-center gap-4">
            <span className={`text-sm ${theme.textSecondary}`}>Theme:</span>
            <Select value={currentTheme} onValueChange={onThemeChange}>
              <SelectTrigger className={`w-[160px] ${theme.cardBg} ${theme.border} ${theme.text}`}>
                <div className="flex items-center gap-2">
                  <Palette className="h-4 w-4" />
                  <SelectValue />
                </div>
              </SelectTrigger>
              <SelectContent>
                {Object.entries(THEMES).map(([key, themeOption]) => (
                  <SelectItem key={key} value={key}>
                    {themeOption.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Help Text */}
        <div className="text-center mt-8">
          <p className={`text-sm ${theme.textSecondary}`}>
            Supports JPG, PNG, WebP, and GIF images • 
            <span className="ml-1">Privacy-first: All processing happens locally in your browser</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export { FolderSelection };
