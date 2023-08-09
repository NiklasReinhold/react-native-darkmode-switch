import React, { PropsWithChildren, useEffect, useRef } from "react";
import { StyleSheet, Animated, View, Dimensions, Easing } from "react-native";
import Svg, { Circle, Rect, Path } from "react-native-svg";
import Cloud from "./Cloud";
import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const Switch: React.FC<
  PropsWithChildren<{
    value: boolean;
  }>
> = ({ value }) => {
  const animation = useRef(new Animated.Value(value ? 1 : 0)).current;

  const [height, setHeight] = React.useState(10);
  const [width, setWidth] = React.useState(20);

  const onLayout = (event) => {
    const layout = event.nativeEvent.layout;
    setHeight(layout.height);
    setWidth(layout.width);
  };

  const AnimatedCircle = Animated.createAnimatedComponent(Circle);
  const AnimatedPath = Animated.createAnimatedComponent(Path);

  const borderWidth = 4,
    handlePadding = 2,
    handleDiameter = height - (borderWidth + handlePadding) * 2;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: value ? 1 : 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
    // TODO: give user haptic feeback when switching
  }, [value]);

  const halfBorderWidth = borderWidth / 2;
  const radius = height / 2;
  const pathRadius = (height - borderWidth) / 2;

  const path = `M${halfBorderWidth},${pathRadius}
  A ${pathRadius} ${pathRadius} 0 0 1 ${radius} ${halfBorderWidth}
  h${width - height}
  A ${pathRadius} ${pathRadius} 0 0 1 ${width - halfBorderWidth} ${pathRadius}
  A ${pathRadius} ${pathRadius} 0 0 1 ${width - radius} ${radius + pathRadius}
  h-${width - height}
  A ${pathRadius} ${pathRadius} 0 0 1 ${halfBorderWidth} ${pathRadius}`;

  const getPathLength = () => {
    const pathElement = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    pathElement.setAttribute("d", path);

    return pathElement.getTotalLength();
  };
  const pathLength = getPathLength();

  return (
    <View style={{ flex: 1, backgroundColor: "red" }} onLayout={onLayout}>
      <Animated.View
        style={[
          {
            width: width,
            height: height,
            borderRadius: height / 2,
            borderWidth: borderWidth,
            borderColor: "transparent",
          },
          {
            backgroundColor: animation.interpolate({
              inputRange: [0, 1],
              outputRange: ["#3d4147", "#82cbff"],
            }),
            borderColor: "transparent",
          },
        ]}
      ></Animated.View>
      <Animated.View
        style={{
          position: "absolute",
          height: height - borderWidth,
          width: width - borderWidth,
          padding: borderWidth,
          opacity: !value
            ? animation.interpolate({
                inputRange: [0, 0.75, 1],
                outputRange: [1, 0, 0],
              })
            : animation.interpolate({
                inputRange: [0, 0.55, 0.6],
                outputRange: [1, 1, 0],
              }),
        }}
      >
        <Svg height="100%" width="100%" viewBox="0 0 100 100">
          <Circle cx="130" cy="10" r="6" fill="white" />
          <Circle cx="140" cy="80" r="6" fill="white" />
          <Circle cx="145" cy="40" r="7" fill="white" />
          <Circle cx="96" cy="65" r="4" fill="white" />
          <Circle cx="80" cy="35" r="4" fill="white" />
          <Circle cx="40" cy="14" r="6" fill="white" />
          <Circle cx="45" cy="87" r="7" fill="white" />
        </Svg>
      </Animated.View>
      <View
        style={{
          position: "absolute",
          width: width,
          height: height,
          padding: handlePadding + borderWidth,
        }}
      >
        <Animated.View
          style={[
            {
              height: handleDiameter,
              width: animation.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [
                  handleDiameter,
                  handleDiameter * 1.5,
                  handleDiameter * 1,
                ],
              }),
              borderRadius: handleDiameter / 2,
              padding: borderWidth,
              transform: [
                {
                  translateX: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [
                      0,
                      width -
                        handleDiameter -
                        borderWidth * 2 -
                        handlePadding * 2,
                    ],
                  }),
                },
              ],
              backgroundColor: value ? "#ff9f0f" : "#ffff80",
            },
          ]}
        >
          <Animated.View
            style={[
              {
                height: handleDiameter - borderWidth * 2,
                width: handleDiameter - borderWidth * 2,
                borderRadius: (handleDiameter - borderWidth * 2) / 2,
                alignSelf: value ? "flex-end" : "flex-start",
                backgroundColor: value ? "#ffbb54" : "#ffffde",
              },
            ]}
          >
            <Svg height="100%" width="100%" viewBox="0 0 100 100">
              <AnimatedCircle
                cx="19"
                cy="19"
                r="12"
                fill={value ? "transparent" : "#ffff80"}
              />
              <AnimatedCircle
                cx="60"
                cy="77"
                r="12"
                fill={value ? "transparent" : "#ffff80"}
              />
              <AnimatedCircle
                cx="73"
                cy="17"
                r="11"
                stroke={value ? "transparent" : "#ffff80"}
                strokeWidth="9"
                fill="transparent"
              />
            </Svg>
          </Animated.View>
        </Animated.View>
        <Animated.View
          style={{
            position: "absolute",
            height: height * 0.66,
            width: height * 0.7,
            bottom: height * 0,
            right: height * 0.55,
            opacity: value
              ? 1
              : animation.interpolate({
                  inputRange: [0, 0.8, 1],
                  outputRange: [0, 0, 1],
                }),
            transform: [
              {
                scaleX: -1,
              },
              {
                scale: value
                  ? animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 1],
                      easing: Easing.elastic(1.4),
                    })
                  : animation.interpolate({
                      inputRange: [0, 0.8, 1],
                      outputRange: [0, 0, 1],
                    }),
              },
            ],
          }}
        >
          <Cloud strokeWidth={borderWidth} />
        </Animated.View>
      </View>
      <Animated.View
        style={{
          height: height,
          width: width,
          position: "absolute",
        }}
      >
        <Svg
          style={{ position: "absolute" }}
          height={height}
          width={width}
          viewBox={`0 0 ${width} ${height}`}
        >
          <Path
            strokeWidth={borderWidth}
            stroke={!value ? "#4ab4ff" : "#000"}
            fill="transparent"
            d={path}
          />
          <AnimatedPath
            strokeWidth={borderWidth}
            stroke={value ? "#4ab4ff" : "#000"}
            fill="transparent"
            d={path}
            strokeDasharray={[pathLength]}
            strokeDashoffset={animation.interpolate({
              inputRange: [0, 1],
              outputRange: [value ? pathLength : 0, value ? 0 : pathLength],
            })}
          />
        </Svg>
      </Animated.View>
    </View>
  );
};
/*
M${height / 2} 0 h${width - height} a ${height / 2} ${
              height / 2
            } 0 0 1 0 ${height} h-${width} a ${height} ${height} 0 0 1 0 -${
              height * 2
            }
*/

const styles = StyleSheet.create({});

export default Switch;
