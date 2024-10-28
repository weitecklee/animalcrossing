import { createTheme, responsiveFontSizes } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    title: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    title?: React.CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    title: true;
  }
}

const theme0 = createTheme({
  palette: {
    primary: {
      main: '#418869',
    },
    secondary: {
      main: '#79d6c2',
    },
    success: {
      main: '#F5F7E1',
    },
  },
  typography: {
    fontFamily: 'Montserrat',
    title: {
      fontFamily: 'Coustard', // Zilla Slab, Sanchez
    },
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          fontFamily: 'Coustard',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        label: {
          fontFamily: 'Coustard',
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1400,
    },
  },
});

export const theme = responsiveFontSizes(theme0, {
  breakpoints: ['md'],
  factor: 2,
});

export const fadeTimeout = {
  appear: theme.transitions.duration.standard,
  enter: theme.transitions.duration.standard,
  exit: theme.transitions.duration.standard,
};
