/** @jsx jsx */
import {jsx, Box, Heading} from 'theme-ui';
import {Link} from 'react-router-dom';

export function Home() {
  return (
    <Box>
      <Heading>☁️ Home</Heading>

      <Link to="/notes" sx={{display: 'block'}}>
        ✏️ Notes &rarr;
      </Link>
      <Link to="/settings" sx={{display: 'block'}}>
        ⚙️ Settings &rarr;
      </Link>
    </Box>
  );
}
