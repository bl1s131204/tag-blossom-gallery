
import React from 'react';
import { Palette } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { THEMES } from '@/constants/themes';

interface NavbarProps {
  currentTheme: keyof typeof THEMES;
  onThemeChange: (theme: keyof typeof THEMES) => void;
  theme: any;
}

const Navbar = ({ currentTheme, onThemeChange, theme }: NavbarProps) => {
  return (
    <nav className={`${theme.cardBg} ${theme.border} border-b p-4 ${theme.shadow}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 ${theme.accent} rounded-lg flex items-center justify-center`}>
            <Palette className="h-5 w-5" />
          </div>
          <h1 className={`text-xl font-bold ${theme.text}`}>Tag Blossom Gallery</h1>
        </div>

        <div className="flex items-center gap-4">
          <span className={`text-sm ${theme.textSecondary} hidden sm:block`}>Theme:</span>
          <Select value={currentTheme} onValueChange={onThemeChange}>
            <SelectTrigger className={`w-[180px] ${theme.cardBg} ${theme.border} ${theme.text}`}>
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
    </nav>
  );
};

export { Navbar };
