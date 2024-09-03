import React from 'react';

import Image from 'next/image';
import {
  Box, Typography, Link, Unstable_Grid2 as Grid,
} from '@mui/material';
import styles from './DefaultNextView.module.css';
import Logo from './components/Logo';
import LinkCard from './components/LinkCard';

export default function DefaultNextView() {
  return (
    <Box className={styles.main}>
      <Box className={styles.description}>
        <Typography>
          Get started by editing&nbsp;
          <code className={styles.code}>pages/index.tsx</code>
        </Typography>
        <Box>
          <Link
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By
            {' '}
            <Logo />
          </Link>
        </Box>
      </Box>

      <Box className={styles.center}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
        <Box className={styles.thirteen}>
          <Image
            src="/thirteen.svg"
            alt="13"
            width={40}
            height={31}
            priority
          />
        </Box>
      </Box>

      <Grid container spacing={2} marginX={2}>
        <Grid xs={12} sm={6} lg={3}>
          <LinkCard
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            title="Find"
            description="Find in-depth information about Next.js features and API."
          />
        </Grid>
        <Grid xs={12} sm={6} lg={3}>
          <LinkCard
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            title="Learn"
            description="Learn about Next.js in an interactive course with quizzes!"
          />
        </Grid>
        <Grid xs={12} sm={6} lg={3}>
          <LinkCard
            href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            title="Templates"
            description="Discover and deploy boilerplate example Next.js projects."
          />
        </Grid>
        <Grid xs={12} sm={6} lg={3}>
          <LinkCard
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            title="Deploy"
            description="Instantly deploy your Next.js site to a shareable URL with Vercel."
          />
        </Grid>
      </Grid>
    </Box>
  );
}
