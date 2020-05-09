/** @jsx jsx */
import './styles.css';
import ReactDOM from 'react-dom';
import {jsx, ThemeProvider, Box, Heading, Link} from 'theme-ui';

import {THEME} from '../../theme';

export function App() {
  return (
    <Box>
      <Heading>☁️ Home</Heading>

      <Link href="/notes" sx={{display: 'block'}}>
        ✏️ Notes &rarr;
      </Link>
      <Link href="/settings" sx={{display: 'block'}}>
        ⚙️ Settings &rarr;
      </Link>
    </Box>
  );
}

ReactDOM.render(
  <ThemeProvider theme={THEME}>
    <App />
  </ThemeProvider>,
  document.getElementById('main'),
);
