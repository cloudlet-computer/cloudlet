/** @jsx jsx */
import {jsx, Box, Text} from 'theme-ui';
import {Link} from 'react-router-dom';

export function Navbar() {
  return (
    <Box
      paddingX={3}
      paddingY={2}
      sx={{
        borderBottomStyle: 'solid',
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
      }}
    >
      <Text sx={{fontSize: 4}}>
        <Link to="/" sx={{textDecoration: 'none'}}>
          ☁️
        </Link>
      </Text>
    </Box>
  );
}
