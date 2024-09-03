import React, { PropsWithChildren } from 'react';
import {
  Link, Typography, Card, CardContent,
} from '@mui/material';
import { ArrowForward } from '@mui/icons-material';

type LinkCardPropTypes = PropsWithChildren<{ href: string,
  title: string,
  description: string }>;

function LinkCard({ href, title, description }: LinkCardPropTypes) {
  return (
    <Link
      component={Card}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <CardContent>
        <Typography variant="h2">
          {title}
          <ArrowForward fontSize="large" />
        </Typography>
        <Typography>
          {description}
        </Typography>
      </CardContent>
    </Link>
  );
}

export default LinkCard;
