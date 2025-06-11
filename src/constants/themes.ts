
// Enhanced theme definitions including cyberpunk variants
export const THEMES = {
  glassmorphism: {
    name: 'Glassmorphism',
    styles: {
      background: 'bg-gradient-to-br from-purple-400 via-pink-500 to-red-500',
      cardBg: 'bg-white/10 backdrop-blur-lg border-white/20',
      text: 'text-white',
      textSecondary: 'text-white/80',
      border: 'border-white/20',
      accent: 'bg-white/20 text-white backdrop-blur-sm',
      accentHover: 'hover:bg-white/30',
      sidebar: 'bg-white/10 backdrop-blur-lg border-white/20',
      tag: 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm',
      tagSelected: 'bg-white/30 text-white',
      shadow: 'shadow-xl shadow-black/20'
    }
  },
  cyberpunkLight: {
    name: 'Cyberpunk Light',
    styles: {
      background: 'bg-gradient-to-br from-cyan-50 via-blue-50 to-purple-50',
      cardBg: 'bg-white/90 border-cyan-200 shadow-cyan-200/50',
      text: 'text-gray-900',
      textSecondary: 'text-gray-700',
      border: 'border-cyan-200',
      accent: 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white',
      accentHover: 'hover:from-cyan-600 hover:to-blue-600',
      sidebar: 'bg-white/90 border-cyan-200',
      tag: 'bg-cyan-50 text-cyan-700 hover:bg-cyan-100 border border-cyan-200',
      tagSelected: 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white',
      shadow: 'shadow-lg shadow-cyan-200/30'
    }
  },
  cyberpunkDark: {
    name: 'Cyberpunk Dark',
    styles: {
      background: 'bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900',
      cardBg: 'bg-gray-800/80 border-purple-500/30 shadow-purple-500/20',
      text: 'text-cyan-300',
      textSecondary: 'text-purple-300',
      border: 'border-purple-500/30',
      accent: 'bg-gradient-to-r from-purple-500 to-cyan-400 text-gray-900',
      accentHover: 'hover:from-purple-600 hover:to-cyan-500',
      sidebar: 'bg-gray-800/80 border-purple-500/30',
      tag: 'bg-gray-700/60 text-cyan-300 hover:bg-purple-500/20 border border-purple-500/30',
      tagSelected: 'bg-gradient-to-r from-purple-500 to-cyan-400 text-gray-900',
      shadow: 'shadow-lg shadow-purple-500/20'
    }
  },
  pastelParadise: {
    name: 'Pastel Paradise',
    styles: {
      background: 'bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100',
      cardBg: 'bg-white/80 border-pink-200',
      text: 'text-gray-800',
      textSecondary: 'text-gray-600',
      border: 'border-pink-200',
      accent: 'bg-pink-400 text-white',
      accentHover: 'hover:bg-pink-500',
      sidebar: 'bg-white/80 border-pink-200',
      tag: 'bg-pink-100 text-pink-700 hover:bg-pink-200 border border-pink-200',
      tagSelected: 'bg-pink-400 text-white',
      shadow: 'shadow-lg shadow-pink-200/50'
    }
  },
  retroTerminal: {
    name: 'Retro Terminal',
    styles: {
      background: 'bg-black',
      cardBg: 'bg-gray-900 border-green-500/30',
      text: 'text-green-400 font-mono',
      textSecondary: 'text-green-500/70 font-mono',
      border: 'border-green-500/30',
      accent: 'bg-green-500 text-black font-mono',
      accentHover: 'hover:bg-green-400',
      sidebar: 'bg-gray-900 border-green-500/30',
      tag: 'bg-gray-800 text-green-400 hover:bg-green-500/20 border border-green-500/30 font-mono',
      tagSelected: 'bg-green-500 text-black font-mono',
      shadow: 'shadow-lg shadow-green-500/20'
    }
  },
  minimalGray: {
    name: 'Minimal Gray',
    styles: {
      background: 'bg-gray-50',
      cardBg: 'bg-white border-gray-200',
      text: 'text-gray-900',
      textSecondary: 'text-gray-600',
      border: 'border-gray-200',
      accent: 'bg-gray-900 text-white',
      accentHover: 'hover:bg-gray-800',
      sidebar: 'bg-white border-gray-200',
      tag: 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200',
      tagSelected: 'bg-gray-900 text-white',
      shadow: 'shadow-sm'
    }
  },
  sepiaStorybook: {
    name: 'Sepia Storybook',
    styles: {
      background: 'bg-amber-50',
      cardBg: 'bg-amber-25 border-amber-200',
      text: 'text-amber-900 font-serif',
      textSecondary: 'text-amber-700 font-serif',
      border: 'border-amber-200',
      accent: 'bg-amber-700 text-amber-50 font-serif',
      accentHover: 'hover:bg-amber-800',
      sidebar: 'bg-amber-25 border-amber-200',
      tag: 'bg-amber-100 text-amber-800 hover:bg-amber-200 border border-amber-200 font-serif',
      tagSelected: 'bg-amber-700 text-amber-50 font-serif',
      shadow: 'shadow-lg shadow-amber-200/50'
    }
  },
  highContrastA11y: {
    name: 'High Contrast A11y',
    styles: {
      background: 'bg-black',
      cardBg: 'bg-yellow-400 border-black border-2',
      text: 'text-black font-bold',
      textSecondary: 'text-black font-semibold',
      border: 'border-black border-2',
      accent: 'bg-black text-yellow-400 font-bold border-2 border-yellow-400',
      accentHover: 'hover:bg-gray-900',
      sidebar: 'bg-yellow-400 border-black border-2',
      tag: 'bg-black text-yellow-400 hover:bg-gray-900 border-2 border-yellow-400 font-bold',
      tagSelected: 'bg-yellow-400 text-black border-2 border-black font-bold',
      shadow: 'shadow-xl shadow-yellow-400/30'
    }
  },
  typographyShowcase: {
    name: 'Typography Showcase',
    styles: {
      background: 'bg-white',
      cardBg: 'bg-gray-50 border-gray-300',
      text: 'text-gray-900 font-serif',
      textSecondary: 'text-gray-700 font-sans',
      border: 'border-gray-300',
      accent: 'bg-gray-900 text-white font-serif',
      accentHover: 'hover:bg-gray-800',
      sidebar: 'bg-gray-50 border-gray-300',
      tag: 'bg-white text-gray-800 hover:bg-gray-100 border border-gray-300 font-sans',
      tagSelected: 'bg-gray-900 text-white font-serif',
      shadow: 'shadow-md'
    }
  },
  luxuryGold: {
    name: 'Luxury Gold',
    styles: {
      background: 'bg-slate-900',
      cardBg: 'bg-slate-800 border-yellow-600/30',
      text: 'text-yellow-200',
      textSecondary: 'text-yellow-300/70',
      border: 'border-yellow-600/30',
      accent: 'bg-gradient-to-r from-yellow-600 to-yellow-500 text-slate-900',
      accentHover: 'hover:from-yellow-500 hover:to-yellow-400',
      sidebar: 'bg-slate-800 border-yellow-600/30',
      tag: 'bg-slate-700 text-yellow-300 hover:bg-yellow-600/20 border border-yellow-600/30',
      tagSelected: 'bg-gradient-to-r from-yellow-600 to-yellow-500 text-slate-900',
      shadow: 'shadow-lg shadow-yellow-600/20'
    }
  },
  neonVibe: {
    name: 'Neon Vibe',
    styles: {
      background: 'bg-gray-900',
      cardBg: 'bg-gray-800 border-cyan-400/30',
      text: 'text-cyan-300',
      textSecondary: 'text-purple-300',
      border: 'border-cyan-400/30',
      accent: 'bg-gradient-to-r from-purple-500 to-cyan-400 text-gray-900',
      accentHover: 'hover:from-purple-600 hover:to-cyan-500',
      sidebar: 'bg-gray-800 border-purple-400/30',
      tag: 'bg-gray-700 text-cyan-300 hover:bg-cyan-400/20 border border-cyan-400/30',
      tagSelected: 'bg-gradient-to-r from-purple-500 to-cyan-400 text-gray-900',
      shadow: 'shadow-lg shadow-cyan-400/20'
    }
  },
  inkPaper: {
    name: 'Ink & Paper',
    styles: {
      background: 'bg-white bg-grid-pattern',
      cardBg: 'bg-white border-gray-400',
      text: 'text-gray-900',
      textSecondary: 'text-gray-700',
      border: 'border-gray-400',
      accent: 'bg-gray-900 text-white',
      accentHover: 'hover:bg-gray-800',
      sidebar: 'bg-white border-gray-400',
      tag: 'bg-gray-50 text-gray-800 hover:bg-gray-100 border border-gray-400',
      tagSelected: 'bg-gray-900 text-white',
      shadow: 'shadow-lg shadow-gray-400/30'
    }
  },
  oceanBreeze: {
    name: 'Ocean Breeze',
    styles: {
      background: 'bg-gradient-to-br from-blue-100 via-cyan-50 to-teal-100',
      cardBg: 'bg-white/90 border-blue-200',
      text: 'text-blue-900',
      textSecondary: 'text-blue-700',
      border: 'border-blue-200',
      accent: 'bg-blue-600 text-white',
      accentHover: 'hover:bg-blue-700',
      sidebar: 'bg-white/90 border-blue-200',
      tag: 'bg-blue-50 text-blue-800 hover:bg-blue-100 border border-blue-200',
      tagSelected: 'bg-blue-600 text-white',
      shadow: 'shadow-lg shadow-blue-200/50'
    }
  },
  forestNight: {
    name: 'Forest Night',
    styles: {
      background: 'bg-gradient-to-br from-green-900 via-emerald-800 to-teal-900',
      cardBg: 'bg-green-800/80 border-green-600/30',
      text: 'text-green-100',
      textSecondary: 'text-green-200/80',
      border: 'border-green-600/30',
      accent: 'bg-emerald-500 text-green-900',
      accentHover: 'hover:bg-emerald-400',
      sidebar: 'bg-green-800/80 border-green-600/30',
      tag: 'bg-green-700/60 text-green-200 hover:bg-green-600/60 border border-green-600/30',
      tagSelected: 'bg-emerald-500 text-green-900',
      shadow: 'shadow-lg shadow-green-900/30'
    }
  }
};
