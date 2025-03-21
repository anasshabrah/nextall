// File: C:\Users\hanos\nextall\frontend\src\theme\overrides\loadingButton.js
export default function LoadingButton() {
  return {
    MuiLoadingButton: {
      styleOverrides: {
        root: {
          '&.MuiButton-text': {
            '& .MuiLoadingButton-startIconPendingStart': {
              marginLeft: 0
            },
            '& .MuiLoadingButton-endIconPendingEnd': {
              marginRight: 0
            }
          }
        }
      }
    }
  };
}
