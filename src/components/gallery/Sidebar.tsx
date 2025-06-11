
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, X, Download } from 'lucide-react';
import { TagCount } from '@/types/gallery';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedTag: string | null;
  onTagClick: (tag: string) => void;
  onClearFilter: () => void;
  onExportList: () => void;
  filteredTags: TagCount[];
  theme: any;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  searchTerm,
  onSearchChange,
  selectedTag,
  onTagClick,
  onClearFilter,
  onExportList,
  filteredTags,
  theme
}) => {
  return (
    <div className={`${isOpen ? 'w-80' : 'w-0'} transition-all duration-300 overflow-hidden border-r ${theme.sidebar} ${theme.border} ${theme.shadow}`}>
      <div className="p-4 h-full flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h2 className={`text-lg font-semibold ${theme.text}`}>Tags</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
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
            onChange={(e) => onSearchChange(e.target.value)}
            className={`pl-10 ${theme.cardBg} ${theme.border} ${theme.text}`}
          />
        </div>

        {/* Clear filter button */}
        {selectedTag && (
          <Button
            variant="outline"
            size="sm"
            onClick={onClearFilter}
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
            onClick={onExportList}
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
                onClick={() => onTagClick(tag)}
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
  );
};
