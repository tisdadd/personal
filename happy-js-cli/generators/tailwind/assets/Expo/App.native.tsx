import Constants from "expo-constants";
import App from './src/MainApp';

// for storybook to work well
// eslint-disable-next-line import/no-mutable-exports
let AppEntryPoint = App;

if (Constants.expoConfig?.extra?.storybookEnabled === "true") {
  // for storybook to work well
  // eslint-disable-next-line global-require
  AppEntryPoint = require("./.ondevice").default;
}


export default AppEntryPoint;
