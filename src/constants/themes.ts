
// Enhanced themes with better color harmony and visual appeal
export const THEMES = {
  light: {
    name: 'Light',
    styles: {
      background: 'bg-gradient-to-br from-gray-50 to-gray-100',
      cardBg: 'bg-white/80 backdrop-blur-sm border-gray-200/60',
      text: 'text-gray-900',
      textSecondary: 'text-gray-600',
      border: 'border-gray-200/60',
      accent: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white',
      accentHover: 'hover:from-blue-700 hover:to-purple-700',
      sidebar: 'bg-white/90 backdrop-blur-sm border-gray-200/60',
      tag: 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200',
      tagSelected: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white',
      shadow: 'shadow-lg shadow-gray-200/50'
    }
  },
  dark: {
    name: 'Dark',
    styles: {
      background: 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900',
      cardBg: 'bg-gray-800/80 backdrop-blur-sm border-gray-700/50',
      text: 'text-gray-100',
      textSecondary: 'text-gray-300',
      border: 'border-gray-700/50',
      accent: 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white',
      accentHover: 'hover:from-blue-600 hover:to-indigo-700',
      sidebar: 'bg-gray-800/90 backdrop-blur-sm border-gray-700/50',
      tag: 'bg-gray-700/60 text-gray-200 hover:bg-gray-600/80 border border-gray-600/50',
      tagSelected: 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white',
      shadow: 'shadow-xl shadow-black/25'
    }
  },
  cyberpunk: {
    name: 'Cyberpunk',
    styles: {
      background: 'bg-gradient-to-br from-gray-900 via-purple-900/50 to-blue-900/50',
      cardBg: 'bg-gray-800/70 backdrop-blur-md border-purple-500/30 shadow-purple-500/10',
      text: 'text-cyan-300',
      textSecondary: 'text-purple-300/80',
      border: 'border-purple-500/30',
      accent: 'bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 text-gray-900',
      accentHover: 'hover:from-purple-600 hover:via-pink-600 hover:to-cyan-500',
      sidebar: 'bg-gray-800/80 backdrop-blur-md border-purple-500/30',
      tag: 'bg-gray-700/50 text-cyan-300 hover:bg-purple-500/20 border border-purple-500/30',
      tagSelected: 'bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 text-gray-900',
      shadow: 'shadow-xl shadow-purple-500/20'
    }
  },
  luxuryGold: {
    name: 'Luxury Gold',
    styles: {
      background: 'bg-gradient-to-br from-slate-900 via-amber-900/20 to-slate-800',
      cardBg: 'bg-slate-800/80 backdrop-blur-sm border-yellow-600/30',
      text: 'text-yellow-100',
      textSecondary: 'text-yellow-200/70',
      border: 'border-yellow-600/30',
      accent: 'bg-gradient-to-r from-yellow-500 via-amber-400 to-orange-500 text-slate-900',
      accentHover: 'hover:from-yellow-400 hover:via-amber-300 hover:to-orange-400',
      sidebar: 'bg-slate-800/90 backdrop-blur-sm border-yellow-600/30',
      tag: 'bg-slate-700/60 text-yellow-200 hover:bg-yellow-600/20 border border-yellow-600/30',
      tagSelected: 'bg-gradient-to-r from-yellow-500 via-amber-400 to-orange-500 text-slate-900',
      shadow: 'shadow-xl shadow-yellow-600/15'
    }
  },
  glassmorphismDark: {
    name: 'Glassmorphism Dark',
    styles: {
      background: 'bg-gradient-to-br from-purple-900/80 via-blue-900/60 to-indigo-900/80',
      cardBg: 'bg-white/10 backdrop-blur-xl border-white/20',
      text: 'text-white',
      textSecondary: 'text-white/70',
      border: 'border-white/20',
      accent: 'bg-white/20 backdrop-blur-sm text-white border border-white/30',
      accentHover: 'hover:bg-white/30',
      sidebar: 'bg-white/10 backdrop-blur-xl border-white/20',
      tag: 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm border border-white/20',
      tagSelected: 'bg-white/30 backdrop-blur-sm text-white',
      shadow: 'shadow-2xl shadow-black/20'
    }
  },
  neonVibe: {
    name: 'Neon Vibe',
    styles: {
      background: 'bg-gradient-to-br from-black via-gray-900 to-black',
      cardBg: 'bg-gray-900/80 backdrop-blur-sm border-cyan-400/30 shadow-cyan-400/5',
      text: 'text-cyan-300',
      textSecondary: 'text-purple-300/80',
      border: 'border-cyan-400/30',
      accent: 'bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 text-gray-900',
      accentHover: 'hover:from-purple-600 hover:via-pink-600 hover:to-cyan-500',
      sidebar: 'bg-gray-900/90 backdrop-blur-sm border-cyan-400/30',
      tag: 'bg-gray-800/60 text-cyan-300 hover:bg-cyan-400/20 border border-cyan-400/30',
      tagSelected: 'bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 text-gray-900',
      shadow: 'shadow-xl shadow-cyan-400/10'
    }
  }
};
