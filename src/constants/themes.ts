
// Refined themes with enhanced visual appeal and better color harmony
export const THEMES = {
  light: {
    name: 'Light Mode',
    styles: {
      background: 'bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50',
      cardBg: 'bg-white/90 backdrop-blur-xl',
      text: 'text-slate-900',
      textSecondary: 'text-slate-600',
      border: 'border-slate-200/80',
      accent: 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white',
      accentHover: 'hover:from-blue-700 hover:to-indigo-700',
      sidebar: 'bg-white/95 backdrop-blur-xl',
      tag: 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200',
      tagSelected: 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white',
      shadow: 'shadow-xl shadow-blue-100/50'
    }
  },
  dark: {
    name: 'Dark Mode',
    styles: {
      background: 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900',
      cardBg: 'bg-slate-800/90 backdrop-blur-xl',
      text: 'text-slate-100',
      textSecondary: 'text-slate-300',
      border: 'border-slate-700/60',
      accent: 'bg-gradient-to-r from-blue-500 to-purple-600 text-white',
      accentHover: 'hover:from-blue-600 hover:to-purple-700',
      sidebar: 'bg-slate-800/95 backdrop-blur-xl',
      tag: 'bg-slate-700/80 text-slate-200 hover:bg-slate-600/80 border border-slate-600/50',
      tagSelected: 'bg-gradient-to-r from-blue-500 to-purple-600 text-white',
      shadow: 'shadow-2xl shadow-black/30'
    }
  },
  cyberpunk: {
    name: 'Cyberpunk Neon',
    styles: {
      background: 'bg-gradient-to-br from-black via-purple-900/30 to-cyan-900/20',
      cardBg: 'bg-slate-900/90 backdrop-blur-xl border-purple-500/20',
      text: 'text-cyan-300',
      textSecondary: 'text-purple-300/90',
      border: 'border-purple-500/30',
      accent: 'bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 text-black',
      accentHover: 'hover:from-purple-600 hover:via-pink-600 hover:to-cyan-500',
      sidebar: 'bg-slate-900/95 backdrop-blur-xl border-purple-500/20',
      tag: 'bg-slate-800/70 text-cyan-300 hover:bg-purple-500/20 border border-purple-500/30',
      tagSelected: 'bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 text-black',
      shadow: 'shadow-2xl shadow-purple-500/20'
    }
  },
  luxuryGold: {
    name: 'Luxury Gold',
    styles: {
      background: 'bg-gradient-to-br from-amber-950 via-yellow-900/40 to-orange-950/60',
      cardBg: 'bg-amber-900/80 backdrop-blur-xl',
      text: 'text-amber-100',
      textSecondary: 'text-amber-200/80',
      border: 'border-amber-600/40',
      accent: 'bg-gradient-to-r from-amber-500 via-yellow-400 to-orange-400 text-amber-950',
      accentHover: 'hover:from-amber-400 hover:via-yellow-300 hover:to-orange-300',
      sidebar: 'bg-amber-900/95 backdrop-blur-xl',
      tag: 'bg-amber-800/70 text-amber-200 hover:bg-amber-600/30 border border-amber-600/40',
      tagSelected: 'bg-gradient-to-r from-amber-500 via-yellow-400 to-orange-400 text-amber-950',
      shadow: 'shadow-2xl shadow-amber-600/20'
    }
  },
  glassmorphismDark: {
    name: 'Glass Dark',
    styles: {
      background: 'bg-gradient-to-br from-indigo-900/80 via-purple-900/60 to-blue-900/70',
      cardBg: 'bg-white/10 backdrop-blur-2xl border-white/20',
      text: 'text-white',
      textSecondary: 'text-white/80',
      border: 'border-white/20',
      accent: 'bg-white/20 backdrop-blur-xl text-white border border-white/30',
      accentHover: 'hover:bg-white/30',
      sidebar: 'bg-white/10 backdrop-blur-2xl border-white/20',
      tag: 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-xl border border-white/20',
      tagSelected: 'bg-white/30 backdrop-blur-xl text-white',
      shadow: 'shadow-2xl shadow-black/40'
    }
  },
  neonVibe: {
    name: 'Neon Vibes',
    styles: {
      background: 'bg-gradient-to-br from-black via-slate-900 to-black',
      cardBg: 'bg-slate-900/90 backdrop-blur-xl border-cyan-400/20',
      text: 'text-cyan-300',
      textSecondary: 'text-purple-300/90',
      border: 'border-cyan-400/30',
      accent: 'bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-black',
      accentHover: 'hover:from-cyan-600 hover:via-purple-600 hover:to-pink-600',
      sidebar: 'bg-slate-900/95 backdrop-blur-xl border-cyan-400/20',
      tag: 'bg-slate-800/80 text-cyan-300 hover:bg-cyan-400/20 border border-cyan-400/30',
      tagSelected: 'bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-black',
      shadow: 'shadow-2xl shadow-cyan-400/15'
    }
  }
};
