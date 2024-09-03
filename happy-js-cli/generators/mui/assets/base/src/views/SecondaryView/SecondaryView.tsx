import React from 'react';
import {
  Container, Link, Paper, Typography,
} from '@mui/material';

function App() {
  return (
    <Container>
      <Paper className="App-header">
        <Typography variant="h1">Surprise</Typography>
        <Typography variant="h2">This Page</Typography>
        <Typography variant="h3">Plays With</Typography>
        <Typography variant="h4">Material UI</Typography>
        <Typography variant="h5">Headers</Typography>
        <Link href="https://mui.com/material-ui/getting-started/overview/">Get Started With MUI</Link>
      </Paper>
    </Container>
  );
}

export default App;
