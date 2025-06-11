
import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Menu, FolderOpen } from 'lucide-react';
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

export const Header: React.FC<HeaderProps> = ({
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
}) => {
  return (
    <div className={`${theme.cardBg} ${theme.border} border-b p-4 ${theme.shadow}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {!sidebarOpen && (
            <Button
              variant="ghost"
              onClick={onToggleSidebar}
              className={theme.text}
            >
              <Menu className="h-4 w-4" />
            </Button>
          )}
          <h1 className={`text-2xl font-bold ${theme.text}`}>ImageTag Pro</h1>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Theme selector */}
          <Select value={currentTheme} onValueChange={onThemeChange}>
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
            onClick={onFolderSelect}
            className={`${theme.accent} ${theme.accentHover}`}
          >
            <FolderOpen className="mr-2 h-4 w-4" />
            Select Folder
          </Button>
        </div>
      </div>
      
      {/* Results info */}
      {imageCount > 0 && (
        <div className={`mt-4 ${theme.textSecondary}`}>
          {selectedTag ? (
            <div className="flex justify-between items-center">
              <p>{filteredCount} images found for: "{selectedTag}"</p>
              <p>{favoriteCount} favorites total</p>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <p>{imageCount} total images • {tagCount} unique tags</p>
              <p>{favoriteCount} favorites</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
