export const theme = {
  colors: {
    green:       '#00b050',
    greenHover:  '#009140',
    greenDark:   '#007a35',
    greenMid:    '#00c45a',
    greenBg:     '#e8f9ef',
    greenBorder: 'rgba(0,176,80,0.22)',
    dark:        '#1a1c1e',
    dark2:       '#222527',
    dark3:       '#2a2d30',
    darkCard:    '#1f2123',
    white:       '#ffffff',
    offWhite:    '#f5f5f3',
    border:      '#e5e5e3',
    text:        '#141414',
    textMuted:   '#6b7280',
    textFaint:   '#a0a0a0',

    // aliases for compatibility
    primary:     '#00b050',
    primaryDark: '#007a35',
  },

  fonts: {
    display: "'Syne', sans-serif",
    body:    "'DM Sans', sans-serif",
    primary: "'DM Sans', sans-serif",
  },

  fontSizes: {
    xs:   '0.75rem',
    sm:   '0.875rem',
    base: '1rem',
    lg:   '1.125rem',
    xl:   '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
  },

  fontWeights: {
    normal:   400,
    medium:   500,
    semibold: 600,
    bold:     700,
    extrabold: 800,
  },

  spacing: {
    xs:   '0.25rem',
    sm:   '0.5rem',
    md:   '1rem',
    lg:   '1.5rem',
    xl:   '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
    '4xl': '5.5rem',
  },

  breakpoints: {
    sm:  '640px',
    md:  '768px',
    lg:  '1024px',
    xl:  '1280px',
    '2xl': '1536px',
  },

  shadows: {
    sm:  '0 1px 2px 0 rgba(0,0,0,0.05)',
    md:  '0 4px 6px -1px rgba(0,0,0,0.1)',
    lg:  '0 10px 15px -3px rgba(0,0,0,0.1)',
    xl:  '0 20px 25px -5px rgba(0,0,0,0.1)',
  },

  borderRadius: {
    sm:   '0.25rem',
    md:   '0.5rem',
    lg:   '0.75rem',
    xl:   '1rem',
    '2xl': '1.25rem',
    full: '9999px',
  },
};

export type Theme = typeof theme;
