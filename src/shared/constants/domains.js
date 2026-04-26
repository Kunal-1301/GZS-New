export const DOMAINS = {
  dev:      { label:'Game Dev',    colour:'#00B4A6', icon:'Code',     route:'dev'      },
  esports:  { label:'Esports',     colour:'#EF4444', icon:'Trophy',   route:'esports'  },
  content:  { label:'Content',     colour:'#F59E0B', icon:'Camera',   route:'content'  },
  business: { label:'Business',    colour:'#3B82F6', icon:'Briefcase',route:'business' },
  art:      { label:'Art',         colour:'#EC4899', icon:'Brush',    route:'art'      },
  writing:  { label:'Writing',     colour:'#22C55E', icon:'Edit',     route:'writing'  },
  audio:    { label:'Audio',       colour:'#6B7280', icon:'Music',    route:'audio'    },
};

export const COMMUNITY_BRANCHES = [
  ...Object.entries(DOMAINS).map(([key, v]) => ({ slug: key, ...v })),
  { slug:'general',   label:'General',   colour:'#8B5CF6', icon:'Globe'  },
  { slug:'newcomers', label:'Newcomers', colour:'#14B8A6', icon:'UserPlus'},
];

export const PLATFORM_LEVELS = ['Beginner','Hustler','Extreme','Pro'];

export const ACCOUNT_STATUS = ['Active','Suspended','Banned','Pending'];
