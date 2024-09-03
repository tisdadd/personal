import React from 'react';
import {
  Container, Link, Text, Code, Box,
} from '@chakra-ui/react';
import './[FTName]View.css';
import Logo from './components/Logo';

function App() {
  return (
    <Container centerContent>
      <Box className="App-header">
        <Logo />
        <Text>
          Edit
          {' '}
          <Code>src/views/[FTName]View/[FTName]View.tsx</Code>
          {' '}
          and save to reload.
        </Text>
        <Link
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
          variant="body2"
        >
          Learn React
        </Link>
      </Box>
    </Container>
  );
}

export default App;
