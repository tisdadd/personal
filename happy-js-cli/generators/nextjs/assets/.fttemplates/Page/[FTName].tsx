import React from 'react';

import Head from 'next/head';

import <ViewName> from '../src/views/<ViewName>';

export default function <FTName | pascalcase>(props: JSX.IntrinsicAttributes) {
  return (
    <>
      <Head>
        <title><PageTitle></title>
        <meta name="description" content="<Description>" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {
        // disabled for storybook args binding pattern
        // eslint-disable-next-line react/jsx-props-no-spreading 
        <<ViewName> {...props} />
      }
    </>
  );
}
