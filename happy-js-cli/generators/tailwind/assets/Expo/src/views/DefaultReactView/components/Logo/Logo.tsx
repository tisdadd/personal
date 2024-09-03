import React from 'react';
import { View } from 'react-native';
import Animated, {
  withTiming,
  withRepeat,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

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
      <Svg className="w-24 h-24 pointer-events-none" />
    </AnimatedView>
  );
}

export default Logo;
