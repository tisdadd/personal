import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    background: {
      default: '#000000',
    },
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          backgroundColor: '#efefef',
        },
      },
    },
  },
});
export default theme;
