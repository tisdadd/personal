import React from 'react';
import {
  Container, Link, Box, Text,
} from '@chakra-ui/react';

function App() {
  return (
    <Container>
      <Box className="App-header">
        <Text fontSize="5xl">Surprise</Text>
        <Text fontSize="4xl">This Page</Text>
        <Text fontSize="3xl">Plays With</Text>
        <Text fontSize="2xl">Chakra</Text>
        <Text fontSize="xl">Fonts</Text>
        <Link href="https://chakra-ui.com/getting-started">Get Started With Chakra</Link>
      </Box>
    </Container>
  );
}

export default App;
