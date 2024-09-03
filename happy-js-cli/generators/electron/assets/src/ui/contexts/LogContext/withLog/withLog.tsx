import React, {
  ComponentType,
} from 'react';

import LogContext from '../LogContext';

const withLog = <P extends object>(WrappedComponent: ComponentType<P>) => {
  // must be any type in this instance
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function WithLog(props: any) {
    return (
      <LogContext.Consumer>
        { // have to have this because we are wrapping the component
          // eslint-disable-next-line react/jsx-props-no-spreading
          (value) => <WrappedComponent {...props} log={value} />
        }
      </LogContext.Consumer>
    );
  }

  const wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

  WithLog.displayName = `withLog(${wrappedComponentName})`;

  return WithLog;
};

export default withLog;
