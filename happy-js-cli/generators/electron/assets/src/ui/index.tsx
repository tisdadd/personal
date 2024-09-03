import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';

function render() {
  const container = document.getElementById('root') as HTMLElement;
  /** From the updated docs
   * https://reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html#updates-to-client-rendering-apis
   * Prefer framework docs over a specific linting rule.
   */
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const root = createRoot(container!);
  root.render(<React.StrictMode><App /></React.StrictMode>);
}

render();
