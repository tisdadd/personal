import React from 'react';
import './[FTName]View.css';
import {
  Container, Paper, Typography, Link,
} from '@mui/material';
import Logo from './components/Logo';

function App() {
  return (
    <Container>
      <Paper className="App-header">
        <Logo />
        <Typography variant="body1">
          Edit
          {' '}
          <code>src/views/[FTName]View/[FTName]View.tsx</code>
          {' '}
          and save to reload.
        </Typography>
        <Link
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
          variant="body2"
        >
          Learn React
        </Link>
      </Paper>
    </Container>
  );
}

export default App;
