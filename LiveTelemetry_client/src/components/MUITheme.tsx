import { createTheme } from '@mui/material/styles';

export const createCustomTheme = (isDarkMode: any) => {
  return createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      primary: {
        main: '#0e59ce', // Change to your desired primary color
      },
      secondary: {
        main: '#f50057', // Change to your desired secondary color
      },
      error: {
        main: '#f44336', // Change to your desired error color
      },
      // Add more custom color options if needed
    },
    shape: {
      borderRadius: 8,
    },
  });
};