
import React from 'react';
import { Menu, Folder, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { THEMES } from '@/constants/themes';

interface HeaderProps {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
  currentTheme: keyof typeof THEMES;
  onThemeChange: (theme: keyof typeof THEMES) => void;
  onFolderSelect: () => void;
  imageCount: number;
  filteredCount: number;
  selectedTag: string | null;
  tagCount: number;
  favoriteCount: number;
  theme: any;
}

const Header = ({
  sidebarOpen,
  onToggleSidebar,
  currentTheme,
  onThemeChange,
  onFolderSelect,
  imageCount,
  filteredCount,
  selectedTag,
  tagCount,
  favoriteCount,
  theme
}: HeaderProps) => {
  return (
    <header className={`${theme.cardBg} ${theme.border} border-b p-4 flex items-center justify-between ${theme.shadow}`}>
      <div className="flex items-center gap-4">
        {!sidebarOpen && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleSidebar}
            className={`${theme.text} hover:${theme.accentHover}`}
          >
            <Menu className="h-4 w-4" />
          </Button>
        )}
        
        <div className="flex items-center gap-2">
          <h1 className={`text-xl font-bold ${theme.text}`}>Image Gallery</h1>
          {selectedTag && (
            <span className={`text-sm ${theme.textSecondary}`}>
              • Filtered by "{selectedTag}"
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className={`text-sm ${theme.textSecondary} hidden md:block`}>
          {imageCount > 0 ? (
            <>
              {filteredCount === imageCount 
                ? `${imageCount} images` 
                : `${filteredCount} of ${imageCount} images`
              } • {tagCount} tags • {favoriteCount} favorites
            </>
          ) : (
            'No images loaded'
          )}
        </div>

        <Select value={currentTheme} onValueChange={onThemeChange}>
          <SelectTrigger className={`w-[180px] ${theme.cardBg} ${theme.border} ${theme.text}`}>
            <div className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              <SelectValue />
            </div>
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
          onClick={onFolderSelect}
          className={`${theme.accent} ${theme.accentHover} flex items-center gap-2`}
        >
          <Folder className="h-4 w-4" />
          Select Folder
        </Button>
      </div>
    </header>
  );
};

export { Header };
