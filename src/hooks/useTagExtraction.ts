
import { useCallback } from 'react';

// Noise words to filter out
const NOISE_WORDS = new Set([
  "by", "but", "as", "to", "and", "of", "the", "with", "for", "a", "in", "on", "at", "is", "are", "was", "were"
]);

// Enhanced normalization map with fuzzy matching
const TAG_NORMALIZATION_MAP: Record<string, string> = {
  "femanized": "feminization",
  "femanizaed": "feminization",
  "femanizartion": "feminization",
  "femanized by girlfriend": "feminized by girlfriend",
  "femanized by girlfreind": "feminized by girlfriend",
  "feminized by girl friend": "feminized by girlfriend",
  "cheated into dress": "cheated into a dress",
  "cheated into dresses": "cheated into a dress",
  "chated into a dress": "cheated into a dress",
  "cheated into the dress": "cheated into a dress",
  "dressed as girll": "dressed as a girl",
  "dressed as girl": "dressed as a girl",
  "dressed like girl": "dressed as a girl",
  "dreesed ass a women": "dressed as a girl",
  "dresssed as girl": "dressed as a girl",
  "dressed as girls": "dressed as a girl",
  "fucked as women": "fucked as a woman",
  "fuvked as women": "fucked as a woman",
  "fucked as woman": "fucked as a woman",
  "forced femanization": "forced feminization",
  "forced feminisation": "forced feminization",
  "forced fem": "forced feminization",
  "permanent femanization": "permanent feminization",
  "permanent feminisation": "permanent feminization",
  "permanent fem": "permanent feminization",
  "crossdressed": "crossdressing",
  "crossdresser": "crossdressing",
  "sissified": "sissification",
  "sissy training": "sissy training",
  "sissy lessons": "sissy training",
  "maid training": "maid training",
  "makeup lessons": "makeup lesson",
  "makeup tutorial": "makeup lesson",
  "high heels": "high heels",
  "nail polish": "nail polish",
  "stockings": "stockings",
  "pantyhose": "pantyhose",
  "lingerie": "lingerie",
  "corset": "corset",
  "frilly dress": "frilly dress",
  "pink dress": "pink dress",
  "wedding dress": "wedding dress"
};

// Levenshtein distance for fuzzy matching
function levenshteinDistance(str1: string, str2: string): number {
  const matrix = [];
  
  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }
  
  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }
  
  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  
  return matrix[str2.length][str1.length];
}

export const useTagExtraction = () => {
  const extractTagsFromFilename = useCallback((filename: string): { title: string; tags: string[] } => {
    console.log('Processing filename:', filename);
    
    // Remove file extension
    const nameWithoutExt = filename.replace(/\.(jpg|jpeg|png|webp|gif)$/i, '');
    
    // Enhanced regex pattern for flexible tag separation as specified
    const separatorPattern = /(?:,,|, ,|,,,| ,| ,,, | +|--|\.\.,|\|)+/;
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
      .filter(tag => !/^\d+$/.test(tag)) // Remove pure numbers
      .map(tag => tag.replace(/^[^\w]+|[^\w]+$/g, '')); // Remove leading/trailing punctuation
    
    // Normalize tags using the normalization map and fuzzy matching
    const normalizedTags = rawTags.map(tag => {
      // Direct match in normalization map
      if (TAG_NORMALIZATION_MAP[tag]) {
        return TAG_NORMALIZATION_MAP[tag];
      }
      
      // Fuzzy matching for close variants
      let bestMatch = tag;
      let bestDistance = Infinity;
      
      Object.keys(TAG_NORMALIZATION_MAP).forEach(key => {
        const distance = levenshteinDistance(tag, key);
        if (distance <= 2 && distance < bestDistance) { // Allow up to 2 character differences
          bestDistance = distance;
          bestMatch = TAG_NORMALIZATION_MAP[key];
        }
      });
      
      return bestMatch;
    });
    
    // Remove duplicates
    const uniqueTags = [...new Set(normalizedTags)];
    
    console.log('Extracted title:', title);
    console.log('Normalized tags:', uniqueTags);
    
    return { title, tags: uniqueTags };
  }, []);

  return { extractTagsFromFilename };
};
