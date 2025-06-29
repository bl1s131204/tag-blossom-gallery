
import React from 'react';
import { X, Search, Download, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
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

const Sidebar = ({
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
}: SidebarProps) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-80 ${theme.sidebar} ${theme.border} border-r
        flex flex-col ${theme.shadow}
      `}>
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Tag className={`h-5 w-5 ${theme.text}`} />
              <h2 className={`font-semibold ${theme.text}`}>Tags</h2>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className={`lg:hidden ${theme.text}`}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="relative">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${theme.textSecondary}`} />
            <Input
              placeholder="Search tags..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className={`pl-10 ${theme.cardBg} ${theme.border} ${theme.text}`}
            />
          </div>

          {selectedTag && (
            <div className="mt-3 flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={onClearFilter}
                className={`${theme.border} ${theme.text} hover:${theme.accentHover}`}
              >
                Clear Filter
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={onExportList}
                className={`${theme.border} ${theme.text} hover:${theme.accentHover} flex items-center gap-1`}
              >
                <Download className="h-3 w-3" />
                Export
              </Button>
            </div>
          )}
        </div>

        <ScrollArea className="flex-1">
          <div className="p-4 space-y-2">
            {filteredTags.length === 0 ? (
              <p className={`text-sm ${theme.textSecondary} text-center py-4`}>
                {searchTerm ? 'No tags found' : 'No tags available'}
              </p>
            ) : (
              filteredTags.map(({ tag, count }) => (
                <button
                  key={tag}
                  onClick={() => onTagClick(tag)}
                  className={`
                    w-full text-left px-3 py-2 rounded-lg text-sm transition-all
                    flex items-center justify-between
                    ${selectedTag === tag 
                      ? theme.tagSelected 
                      : theme.tag
                    }
                  `}
                >
                  <span className="truncate">{tag}</span>
                  <span className="ml-2 text-xs opacity-70">({count})</span>
                </button>
              ))
            )}
          </div>
        </ScrollArea>
      </div>
    </>
  );
};

export { Sidebar };
