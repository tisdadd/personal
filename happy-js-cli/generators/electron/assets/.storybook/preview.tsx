import React from 'react'
import RootContexts from '../src/ui/components/RootContexts'
import { MemoryRouter } from 'react-router-dom'

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
    <RootContexts><MemoryRouter><Story /></MemoryRouter></RootContexts>
  ),]