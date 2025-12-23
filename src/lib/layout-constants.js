/**
 * Layout System Constants
 * Centralized layout tokens for consistent spacing and sizing across the app
 */

// Navbar
export const NAVBAR_HEIGHT = 64; // 4rem = 64px
export const NAVBAR_HEIGHT_REM = 4;

// Container Max Widths (based on Tailwind defaults)
export const CONTAINER_MAX_WIDTHS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

// Horizontal Padding by Breakpoint
export const CONTAINER_PADDING = {
  mobile: 'px-6',           // 24px
  tablet: 'md:px-12',       // 48px
  desktop: 'lg:px-16',      // 64px
  wide: 'xl:px-24',         // 96px
  ultrawide: '2xl:px-32',   // 128px
};

// Vertical Spacing Scale (based on 4px grid)
export const SPACING = {
  // Section spacing
  sectionGap: {
    mobile: 'py-12',        // 48px
    tablet: 'md:py-16',     // 64px
    desktop: 'lg:py-20',    // 80px
  },
  
  // Content spacing
  contentGap: {
    tight: 'space-y-4',     // 16px
    normal: 'space-y-6',    // 24px
    loose: 'space-y-8',     // 32px
    xl: 'space-y-10',       // 40px
  },
  
  // Margins
  marginTop: {
    sm: 'mt-4',             // 16px
    md: 'mt-6',             // 24px
    lg: 'mt-8',             // 32px
    xl: 'mt-10',            // 40px
    '2xl': 'mt-12',         // 48px
  },
};

// Hero Section Specific
export const HERO = {
  // Height calculation accounting for navbar
  minHeight: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
  minHeightFallback: '650px', // Minimum for content readability
  
  // Content max-widths for readability
  contentMaxWidth: {
    metadata: 'max-w-4xl',
    title: 'max-w-4xl',
    description: 'max-w-2xl lg:max-w-3xl',
    actions: 'max-w-4xl',
  },
  
  // Padding compensation for navbar
  paddingTop: {
    mobile: 'pt-32',        // Increased space below navbar
    tablet: 'md:pt-40',
    desktop: 'lg:pt-48',
  },
  
  // Bottom padding for carousel
  paddingBottom: {
    mobile: 'pb-24',
    tablet: 'md:pb-32',
    desktop: 'lg:pb-40',
  },
};

// Responsive Breakpoints (Tailwind defaults)
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

// Z-Index Scale
export const Z_INDEX = {
  background: 0,
  content: 10,
  carousel: 20,
  navbar: 50,
  dropdown: 60,
  modal: 100,
};

// Helper function to get container classes
export const getContainerClasses = () => {
  return `container mx-auto ${CONTAINER_PADDING.mobile} ${CONTAINER_PADDING.tablet} ${CONTAINER_PADDING.desktop} ${CONTAINER_PADDING.wide} ${CONTAINER_PADDING.ultrawide}`;
};

// Helper function to get hero height style
export const getHeroHeightStyle = () => {
  return {
    minHeight: `max(${HERO.minHeightFallback}, ${HERO.minHeight})`
  };
};
