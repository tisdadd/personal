import DefaultReactViewNavigationName from './DefaultReactView/DefaultReactView.navigationName';
import DefaultReactViewNavigationParamsType from './DefaultReactView/DefaultReactView.navigationParamsType';

import DefaultExpoViewNavigationName from './DefaultExpoView/DefaultExpoView.navigationName';
import DefaultExpoViewNavigationParamsType from './DefaultExpoView/DefaultExpoView.navigationParamsType';

type RootStackParamList = {
  [DefaultExpoViewNavigationName]: DefaultExpoViewNavigationParamsType,
  [DefaultReactViewNavigationName]: DefaultReactViewNavigationParamsType
};

export default RootStackParamList;
