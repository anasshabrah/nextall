// File: C:\Users\hanos\nextall\frontend\src\theme\overrides\lists.js
export default function Lists(theme) {
  return {
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: 'inherit',
          minWidth: 'auto',
          marginRight: theme.spacing(2)
        }
      }
    },
    MuiListItemAvatar: {
      styleOverrides: {
        root: {
          minWidth: 'auto',
          marginRight: theme.spacing(2)
        }
      }
    },
    MuiListItemText: {
      styleOverrides: {
        root: {
          marginTop: 0,
          marginBottom: 0
        },
        multiline: {
          marginTop: 0,
          marginBottom: 0
        }
      }
    }
  };
}
