import React, {
  ComponentType,
} from 'react';

import [FTName]Context from '../[FTName]Context';

const with[FTName] = <P extends object>(WrappedComponent: ComponentType<P>) => {
  function With[FTName](props: any) {
    return (
      <[FTName]Context.Consumer>
        { // have to have this because we are wrapping the component
          // eslint-disable-next-line react/jsx-props-no-spreading
          (value) => <WrappedComponent {...props} <FTName | lowercasefirstchar>={value} />
        }
      </[FTName]Context.Consumer>
    );
  }

  const wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

  With[FTName].displayName = `with[FTName](${wrappedComponentName})`;

  return With[FTName];
};

export default with[FTName];
