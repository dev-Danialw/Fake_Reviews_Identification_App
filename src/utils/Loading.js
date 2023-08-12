import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import LottieView from "lottie-react-native";
import { Animated, Dimensions } from "react-native";

const screenHeight = Dimensions.get("window").height;

const Loading = ({ isActive }) => {
  const top = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const animation = useRef();

  useEffect(() => {
    if (isActive) {
      Animated.timing(top, {
        toValue: 0,
        duration: 0,
        useNativeDriver: false,
      }).start();

      Animated.timing(opacity, {
        toValue: 1,
        useNativeDriver: false,
      }).start();

      animation.current.play();
    } else {
      Animated.timing(top, {
        toValue: screenHeight,
        duration: 0,
        useNativeDriver: false,
      }).start();

      Animated.timing(opacity, {
        toValue: 0,
        useNativeDriver: false,
      }).start();

      animation.current.loop = false;
    }
  }, [isActive]);

  return (
    <AnimatedContainer style={{ top: top, opacity: opacity }}>
      <LottieView
        source={require("../../assets/animations/lottie-loading.json")}
        autoPlay={false}
        loop={true}
        ref={animation}
      />

      {/* <LottieView
        source={require("../../assets/animations/lottie-loading-dots.json")}
        autoPlay={false}
        loop={true}
        ref={animation}
      /> */}
    </AnimatedContainer>
  );
};

export default Loading;

const Container = styled.View`
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.9);
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);
