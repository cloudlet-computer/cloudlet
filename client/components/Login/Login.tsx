/** @jsx jsx */
import {jsx} from '@emotion/core';
import {useState} from 'react';
import {useMutation, gql} from '@apollo/client';

import background from 'url:./assets/background.png';

import {Button, Heading, Input} from '../../ui-kit';
import {useAuth} from '../../context';

export function Login() {
  const {login} = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [signInMutation] = useMutation(gql`
    mutation SignInMutation($username: String!, $password: String!) {
      signIn(username: $username, password: $password) {
        token
      }
    }
  `);

  async function handleSubmit() {
    const {data} = await signInMutation({variables: {username, password}});

    if (data.signIn != null) {
      login(data.signIn.token);
    }
  }

  return (
    <div
      css={{
        backgroundImage: `url(${background})`,
        backgroundPosition: 'center center',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundSize: '60%',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div css={{margin: 'auto', maxWidth: 400, width: '100%'}}>
        <div
          css={{
            background: 'white',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            padding: 32,
            borderRadius: 4,
          }}
        >
          <Heading>Log in</Heading>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              handleSubmit();
            }}
          >
            <Input
              label="Username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />

            <Input
              label="Password"
              value={password}
              type="password"
              onChange={(event) => setPassword(event.target.value)}
            />

            <Button fullWidth type="submit">
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
