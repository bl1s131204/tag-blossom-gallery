
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
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden" onClick={onClose} />
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-80 ${theme.sidebar} ${theme.border} border-r
        flex flex-col ${theme.shadow}
      `}>
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className={`p-3 ${theme.accent} rounded-xl shadow-lg`}>
                <Tag className="h-6 w-6" />
              </div>
              <h2 className={`text-xl font-bold ${theme.text}`}>Browse Tags</h2>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className={`lg:hidden ${theme.text} hover:bg-white/10 rounded-full h-10 w-10 p-0`}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="relative mb-6">
            <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 ${theme.textSecondary}`} />
            <Input
              placeholder="Search tags..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className={`pl-12 h-12 ${theme.cardBg} ${theme.border} ${theme.text} placeholder:text-gray-400 rounded-xl border-2 focus:border-primary/50 transition-all duration-200`}
            />
          </div>

          {selectedTag && (
            <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20 backdrop-blur-sm">
              <Filter className="h-5 w-5 text-blue-400" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-blue-300">Active Filter</p>
                <p className="text-xs text-blue-400/90 truncate">"{selectedTag}"</p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onExportList}
                  className="h-9 w-9 p-0 text-blue-400 hover:bg-blue-500/20 rounded-full"
                  title="Export filtered list"
                >
                  <Download className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClearFilter}
                  className="h-9 w-9 p-0 text-blue-400 hover:bg-blue-500/20 rounded-full"
                  title="Clear filter"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>

        <ScrollArea className="flex-1">
          <div className="p-4 space-y-3">
            {filteredTags.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 opacity-20 bg-gray-300 rounded-full flex items-center justify-center">
                  <Tag className="h-8 w-8" />
                </div>
                <p className={`text-base font-medium ${theme.textSecondary}`}>
                  {searchTerm ? 'No matching tags found' : 'No tags available'}
                </p>
                <p className={`text-sm ${theme.textSecondary} mt-2`}>
                  {searchTerm ? 'Try a different search term' : 'Load some images to see tags'}
                </p>
              </div>
            ) : (
              filteredTags.map(({ tag, count }) => (
                <button
                  key={tag}
                  onClick={() => onTagClick(tag)}
                  className={`
                    w-full text-left px-5 py-4 rounded-xl text-sm font-medium transition-all duration-200
                    flex items-center justify-between group hover:scale-[1.02] hover:-translate-y-0.5
                    ${selectedTag === tag 
                      ? `${theme.tagSelected} shadow-xl` 
                      : `${theme.tag} hover:shadow-lg`
                    }
                  `}
                >
                  <span className="truncate font-semibold">{tag}</span>
                  <Badge 
                    variant="secondary" 
                    className={`ml-3 text-xs font-bold px-2 py-1 ${
                      selectedTag === tag 
                        ? 'bg-white/25 text-white border-white/20' 
                        : 'bg-gray-500/20 border-gray-400/20'
                    }`}
                  >
                    {count}
                  </Badge>
                </button>
              ))
            )}
          </div>
        </ScrollArea>

        <div className="p-6 border-t border-white/10">
          <div className="text-center">
            <p className={`text-sm font-medium ${theme.textSecondary}`}>
              {filteredTags.length} {filteredTags.length === 1 ? 'tag' : 'tags'} available
            </p>
            {searchTerm && (
              <p className={`text-xs ${theme.textSecondary} mt-1`}>
                Filtered by: "{searchTerm}"
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export { Sidebar };
