import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import themeDefault from './theme-default';
const IThemeProvider = ({ children, ...props }: any) => {

  return (
    <ThemeProvider theme={themeDefault} {...props}>
      {children}
    </ThemeProvider>
  );
}
export default IThemeProvider;