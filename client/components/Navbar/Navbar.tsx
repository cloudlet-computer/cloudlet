/** @jsx jsx */
import {jsx, Box, Text} from 'theme-ui';
import {Link} from 'react-router-dom';
import {useQuery, gql} from '@apollo/client';

export function Navbar() {
  const asdf = useQuery(gql`
    query NavbarQuery {
      me {
        id
        username
      }
    }
  `);

  console.log({asdf});

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
