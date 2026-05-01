// Shared design tokens for Global Signal exploration
// Repo's actual palette: warm cocoa night + terracotta (Claude.ai-style)
// Plus alt vibes per the user's selections

window.GS_TOKENS = {
  // Repo-true: warm editorial dark
  cocoa: {
    bg0: '#1F1E1C',
    bg1: '#25241F',
    bg2: '#2C2B26',
    card: 'rgba(45, 42, 36, 0.85)',
    cardHover: 'rgba(58, 54, 46, 0.65)',
    border: 'rgba(245,240,232,0.09)',
    borderHover: 'rgba(245,240,232,0.18)',
    text: '#F5F0E8',
    text2: '#D9D3C4',
    text3: '#A39E92',
    textMuted: '#6B6760',
    accent: '#D97757',      // terracotta
    accent2: '#C96442',
    cyan: '#D9A574',         // warm gold (repo calls it cyan but warmified)
    blue: '#B8A88A',
    purple: '#C49C8A',
    pink: '#B87B6A',
    green: '#7FB069',        // added for status
    red: '#D45A5A',
    amber: '#E0A458',
  },
  // Newspaper Atlas (paper)
  paper: {
    bg0: '#F4F1EA',
    bg1: '#FAF9F5',
    card: '#FFFFFF',
    border: 'rgba(60,45,30,0.10)',
    text: '#1A1614',
    text2: '#4A4842',
    text3: '#75726A',
    accent: '#C53D17',       // newspaper red
    rule: '#1A1614',
  },
  // Hacker terminal
  terminal: {
    bg0: '#000000',
    bg1: '#080A07',
    card: '#0A0E0A',
    border: 'rgba(0,255,102,0.18)',
    text: '#C8FFC8',
    text2: '#7FBF7F',
    text3: '#3F6F3F',
    accent: '#00FF66',
    amber: '#FFB000',
    red: '#FF3366',
  },
  // Aurora glowy
  aurora: {
    bg0: '#0A0612',
    bg1: '#150826',
    card: 'rgba(30,15,55,0.6)',
    border: 'rgba(168,85,247,0.18)',
    text: '#F0E5FF',
    text2: '#C8B5E8',
    text3: '#8770A8',
    accent: '#A855F7',
    pink: '#EC4899',
    cyan: '#22D3EE',
  },
  // Bloomberg-ish (cyan dense)
  terminal2: {
    bg0: '#05080F',
    bg1: '#0A0E1A',
    card: 'rgba(15,22,40,0.75)',
    border: 'rgba(0,212,255,0.16)',
    text: '#E8F4FF',
    text2: '#A8C8E8',
    text3: '#5878A0',
    accent: '#00D4FF',
    amber: '#FFB800',
    green: '#00E676',
    red: '#FF3D5A',
  },
  // Clean linear-style
  clean: {
    bg0: '#FFFFFF',
    bg1: '#FAFAFA',
    card: '#FFFFFF',
    border: '#E8E8E8',
    text: '#0E0E10',
    text2: '#3D3D42',
    text3: '#7A7A82',
    accent: '#5E6AD2',
    green: '#10B981',
    amber: '#F59E0B',
    red: '#EF4444',
  }
};

// Shared font stacks
window.GS_FONTS = {
  serif: '"Source Serif 4", "Source Serif Pro", "GT Sectra", Georgia, serif',
  sans: '"Inter Tight", "Inter", -apple-system, system-ui, sans-serif',
  mono: '"JetBrains Mono", "DM Mono", ui-monospace, monospace',
  display: '"Fraunces", "Source Serif 4", Georgia, serif',
  newspaper: '"Playfair Display", "GT Sectra", Georgia, serif',
};

// Tab catalog (matches repo)
window.GS_TABS = [
  { id: 'overview',   label: 'Overview',     icon: '◐', group: 'core' },
  { id: 'briefing',   label: 'AI Briefing',  icon: '✦', group: 'core', novel: true },
  { id: 'globe',      label: 'Live Globe',   icon: '◉', group: 'core' },
  { id: 'weather',    label: 'Weather',      icon: '☁', group: 'earth' },
  { id: 'quakes',     label: 'Earthquakes',  icon: '◬', group: 'earth' },
  { id: 'air',        label: 'Air Quality',  icon: '⌬', group: 'earth' },
  { id: 'energy',     label: 'Energy',       icon: '⚡', group: 'earth' },
  { id: 'markets',    label: 'Markets',      icon: '$', group: 'economy' },
  { id: 'forex',      label: 'Forex',        icon: '⇄', group: 'economy' },
  { id: 'economy',    label: 'Economy',      icon: '◴', group: 'economy' },
  { id: 'countries',  label: 'Countries',    icon: '⌖', group: 'economy' },
  { id: 'health',     label: 'Health',       icon: '+', group: 'society' },
  { id: 'space',      label: 'Space',        icon: '◌', group: 'society' },
  { id: 'tech',       label: 'Tech Pulse',   icon: '⌘', group: 'society' },
  { id: 'news',       label: 'News',         icon: '☰', group: 'society' },
  { id: 'correlate',  label: 'Correlator',   icon: '∞', group: 'tools', novel: true },
  { id: 'timeline',   label: 'Time Machine', icon: '◷', group: 'tools', novel: true },
  { id: 'alerts',     label: 'Alerts',       icon: '◊', group: 'tools', novel: true },
  { id: 'compare',    label: 'Comparator',   icon: '⇆', group: 'tools', novel: true },
  { id: 'ai',         label: 'AI Query',     icon: '◆', group: 'tools' },
  { id: 'datasources',label: 'Data Sources', icon: '▦', group: 'system' },
  { id: 'system',     label: 'System Health',icon: '◎', group: 'system' },
];
