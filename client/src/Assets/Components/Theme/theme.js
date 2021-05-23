import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#707070',
      main: '#3F3F3F',
      dark: '#202020',
      contrastText: '#ffd6cd',
    },
    secondary: {
      light: '#fff',
      main: '#ffd6cd',
      //dark: '#ba000d',
      contrastText: '#000',
    },
  },
});

export default theme ;