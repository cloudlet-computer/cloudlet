import {Theme} from 'theme-ui';

export const THEME: Theme = {
  colors: {
    text: '#000',
    background: '#fff',
    primary: '#3686ff',
    muted: '#efefef',
    modes: {
      dark: {
        text: '#eee',
        background: '#222',
      },
    },
  },
  fonts: {
    body: '"Muli", sans-serif',
    heading: '"Muli", sans-serif',
    monospace: 'Menlo, monospace',
  },
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125,
  },
  buttons: {
    primary: {
      background: 'primary',
    },
    muted: {
      backgroundColor: 'muted',
      color: 'muted',
    },
    // primary: {
    //   color: 'background',
    //   bg: 'primary',
    // },
    // secondary: {
    //   color: 'background',
    //   bg: 'secondary',
    // },
  },
  styles: {
    root: {
      fontFamily: 'body',
      fontWeight: 'body',
    },
  },
};
