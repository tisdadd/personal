import React, { PropsWithChildren } from 'react';
import {
  Link, Text, Card, CardBody,
} from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';

type LinkCardPropTypes = PropsWithChildren<{ href: string,
  title: string,
  description: string }>;

function LinkCard({ href, title, description }: LinkCardPropTypes) {
  return (
    <Link
      as={Card}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <CardBody>
        <Text fontSize="3xl">
          {title}
          <ArrowForwardIcon boxSize={10} />
        </Text>
        <Text>
          {description}
        </Text>
      </CardBody>
    </Link>
  );
}

export default LinkCard;
