import React from 'react';
import { View } from 'react-native';
import Animated, {
  withTiming,
  withRepeat,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import styles from './Logo.styles';

import Svg from './LogoSvg';

const AnimatedView = Animated.createAnimatedComponent(View);

function Logo() {
  const rotation = useSharedValue(0);
  rotation.value = withRepeat(withTiming(360, { duration: 2000 }), -1);

  const animatedLogoStyle = useAnimatedStyle(() => {
    const toReturn = {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
    return toReturn;
  });
  return (
    <AnimatedView style={animatedLogoStyle}>
      <Svg style={styles.appLogo} />
    </AnimatedView>
  );
}

export default Logo;
