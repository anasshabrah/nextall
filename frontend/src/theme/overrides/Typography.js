// File: C:\Users\hanos\nextall\frontend\src\theme\overrides\Typography.js
// ----------------------------------------------------------------------

export default function Typography(theme) {
  return {
    MuiTypography: {
      styleOverrides: {
        paragraph: {
          marginBottom: theme.spacing(2)
        },
        gutterBottom: {
          marginBottom: theme.spacing(1)
        }
      }
    }
  };
}
