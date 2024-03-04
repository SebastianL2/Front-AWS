import { alpha } from '@mui/material/styles';

const withAlphas = (color) => {
  return {
    ...color,
    alpha4: alpha(color.main, 0.04),
    alpha8: alpha(color.main, 0.08),
    alpha12: alpha(color.main, 0.12),
    alpha30: alpha(color.main, 0.30),
    alpha50: alpha(color.main, 0.50)
  };
};

export const neutral = {
  50: '#FFFFFF',    /* Blanco */
  100: '#F3F4F6',   /* Azul claro */
  200: '#E5E7EB',   /* Azul */
  300: '#D2D6DB',   /* Azul medio */
  400: '#9DA4AE',   /* Azul oscuro */
  500: '#6C737F',   /* Azul aún más oscuro */
  600: '#4D5761',   /* Azul muy oscuro */
  700: '#2F3746',   /* Azul casi negro */
  800: '#212121',   /* Azul casi negro más oscuro */
  900: '#111927'    /* Azul muy oscuro casi negro */
};

export const indigo = withAlphas({
  lightest: '#F5F7FF',   /* Azul claro */
  light: '#EBEEFE',      /* Azul */
  main: '#312E81',       /* Azul oscuro */
  dark: '#F6BD03',       /* Amarillo */
  darkest: '#FFD449',    /* Amarillo claro */
  contrastText: '#FFFFFF'
});

export const success = withAlphas({
  lightest: '#F0FDF9',   /* Verde claro */
  light: '#3FC79A',      /* Verde */
  main: '#10B981',       /* Verde oscuro */
  dark: '#0B815A',       /* Verde aún más oscuro */
  darkest: '#134E48',    /* Verde muy oscuro */
  contrastText: '#FFFFFF'
});

export const info = withAlphas({
  lightest: '#ECFDFF',   /* Azul claro */
  light: '#CFF9FE',      /* Azul */
  main: '#06AED4',       /* Azul oscuro */
  dark: '#0E7090',       /* Azul aún más oscuro */
  darkest: '#164C63',    /* Azul muy oscuro */
  contrastText: '#FFFFFF'
});

export const warning = withAlphas({
  lightest: '#FFFAEB',   /* Amarillo claro */
  light: '#FEF0C7',      /* Amarillo */
  main: '#F79009',       /* Amarillo oscuro */
  dark: '#B54708',       /* Amarillo aún más oscuro */
  darkest: '#7A2E0E',    /* Amarillo muy oscuro */
  contrastText: '#FFFFFF'
});

export const error = withAlphas({
  lightest: '#FEF3F2',   /* Rojo claro */
  light: '#FEE4E2',      /* Rojo */
  main: '#F04438',       /* Rojo oscuro */
  dark: '#B42318',       /* Rojo aún más oscuro */
  darkest: '#7A271A',    /* Rojo muy oscuro */
  contrastText: '#FFFFFF'
});
