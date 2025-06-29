
import React from 'react';
import { X, Search, Download, Tag, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
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
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden" onClick={onClose} />
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-80 ${theme.sidebar} ${theme.border} border-r
        flex flex-col ${theme.shadow}
      `}>
        <div className="p-6 border-b border-gray-200/10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className={`p-2 ${theme.accent} rounded-lg`}>
                <Tag className="h-5 w-5" />
              </div>
              <h2 className={`text-lg font-bold ${theme.text}`}>Tags</h2>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className={`lg:hidden ${theme.text} hover:bg-white/10`}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="relative mb-4">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${theme.textSecondary}`} />
            <Input
              placeholder="Search tags..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className={`pl-10 ${theme.cardBg} ${theme.border} ${theme.text} placeholder:text-gray-400`}
            />
          </div>

          {selectedTag && (
            <div className="flex items-center gap-2 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <Filter className="h-4 w-4 text-blue-400" />
              <div className="flex-1">
                <p className="text-sm font-medium text-blue-300">Active Filter</p>
                <p className="text-xs text-blue-400/80">"{selectedTag}"</p>
              </div>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onExportList}
                  className="h-8 w-8 p-0 text-blue-400 hover:bg-blue-500/20"
                >
                  <Download className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClearFilter}
                  className="h-8 w-8 p-0 text-blue-400 hover:bg-blue-500/20"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>
          )}
        </div>

        <ScrollArea className="flex-1">
          <div className="p-4 space-y-2">
            {filteredTags.length === 0 ? (
              <div className="text-center py-8">
                <Tag className={`h-12 w-12 mx-auto mb-3 opacity-30 ${theme.textSecondary}`} />
                <p className={`text-sm ${theme.textSecondary}`}>
                  {searchTerm ? 'No matching tags found' : 'No tags available'}
                </p>
              </div>
            ) : (
              filteredTags.map(({ tag, count }) => (
                <button
                  key={tag}
                  onClick={() => onTagClick(tag)}
                  className={`
                    w-full text-left px-4 py-3 rounded-lg text-sm transition-all duration-200
                    flex items-center justify-between group hover:scale-[1.02]
                    ${selectedTag === tag 
                      ? `${theme.tagSelected} shadow-lg` 
                      : `${theme.tag} hover:shadow-md`
                    }
                  `}
                >
                  <span className="truncate font-medium">{tag}</span>
                  <Badge 
                    variant="secondary" 
                    className={`ml-2 text-xs ${
                      selectedTag === tag 
                        ? 'bg-white/20 text-white' 
                        : 'bg-gray-500/20'
                    }`}
                  >
                    {count}
                  </Badge>
                </button>
              ))
            )}
          </div>
        </ScrollArea>

        <div className="p-4 border-t border-gray-200/10">
          <p className={`text-xs ${theme.textSecondary} text-center`}>
            {filteredTags.length} {filteredTags.length === 1 ? 'tag' : 'tags'} available
          </p>
        </div>
      </div>
    </>
  );
};

export { Sidebar };
