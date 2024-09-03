import React from 'react'
// import '@storybook/addon-console'
import RootContexts from '../src/components/RootContexts'

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  options: {
    storySort: {
      method: 'alphabetical',
      order: [],
      locales: ''
    }
  }
}

export const decorators = [
  (Story) => (
    <RootContexts><Story /></RootContexts>
  ),
]