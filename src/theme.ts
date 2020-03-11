import { createMuiTheme, Theme } from '@material-ui/core/styles';

const BaseTheme: Theme = createMuiTheme();

const createTheme: CallableFunction = (baseTheme: Theme) => {
  return createMuiTheme(baseTheme, {
    palette: {
      primary: {
        main: '#7b1fa2',
        light: '#ff5722'
      }
    },
    zIndex: {
      appBar: baseTheme.zIndex.drawer + 1
    }
  });
};

export default createTheme(BaseTheme);

export const appBackground = '#e2c6ff';
