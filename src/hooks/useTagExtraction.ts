
import { useCallback } from 'react';
import { TAG_NORMALIZATION_MAP, NOISE_WORDS } from '@/constants/tagNormalization';

export const useTagExtraction = () => {
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

  return { extractTagsFromFilename };
};
