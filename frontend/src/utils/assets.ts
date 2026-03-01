// Utility for handling asset paths in development vs production
export function getImagePath(imageName: string): string {
  const base = import.meta.env.BASE_URL || '/';
  return `${base}${imageName}`;
}

// Pre-defined image paths for better maintainability
export const images = {
  logos: {
    horizontal: getImagePath('Axis Logo horizontal white background.png'),
    dark: getImagePath('Axis Logo Black background.png'),
  },
  team: {
    working: getImagePath('men working photo.png'),
    logistics: getImagePath('men working in logistics.png'),
    working2: getImagePath('men working photo 2.png'),
    workingMain: getImagePath('men working.png'),
  },
  equipment: {
    greenVest: getImagePath('Green Hi Vi vest.png'),
    greenCart: getImagePath('green moving cart.png'),
    limeVest: getImagePath('lime green hi vi vest.png'),
    limeCart: getImagePath('lime green moving cart thing.png'),
  }
};