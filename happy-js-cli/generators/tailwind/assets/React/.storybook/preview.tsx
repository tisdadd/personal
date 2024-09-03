import React from 'react'
import RootContexts from '../src/components/RootContexts'
import '../src/index.css';


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