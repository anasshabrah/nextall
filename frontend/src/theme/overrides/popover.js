// File: C:\Users\hanos\nextall\frontend\src\theme\overrides\popover.js
export default function Popover() {
  return {
    MuiPopover: {
      styleOverrides: {
        root: {
          '& .MuiBackdrop-root': {
            opacity: '0!important'
          }
        }
      }
    }
  };
}
