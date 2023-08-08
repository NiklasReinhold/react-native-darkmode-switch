import React, { PropsWithChildren, useEffect, useRef } from "react";
import { StyleSheet, Animated, View, Dimensions, Easing } from "react-native";
import Svg, { Circle, Rect, Path } from "react-native-svg";
import Cloud from "./Cloud";

const Switch: React.FC<
  PropsWithChildren<{
    value: boolean;
    height: number;
    width: number;
  }>
> = ({ value, height, width }) => {
  const animation = useRef(new Animated.Value(value ? 1 : 0)).current;

  const AnimatedCircle = Animated.createAnimatedComponent(Circle);

  const borderWidth = 4,
    handlePadding = 2,
    handleDiameter = height - (borderWidth + handlePadding) * 2,
    radius = height / 2,
    halfBorderWidth = borderWidth / 2;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: value ? 1 : 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
    // TODO: give user haptic feeback when switching
  }, [value]);

  return (
    <View>
      <Animated.View
        style={[
          {
            height: height,
            width: width,
            borderWidth: borderWidth,
            borderRadius: height / 2,
            padding: handlePadding,
          },
          {
            backgroundColor: animation.interpolate({
              inputRange: [0, 1],
              outputRange: ["#3d4147", "#82cbff"],
            }),
            borderColor: "red", //value ? "#4ab4ff" : "#000",
          },
        ]}
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
            height: height * 0.46,
            width: height * 0.7,
            bottom: height * 0.1,
            right: height * 0.6,
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
      </Animated.View>
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
          viewBox={`0 0 85 40`}
        >
          <Path
            strokeWidth={2}
            stroke="#eeeeee"
            fill="transparent"
            d={`M1,19
            A 19 19 0 0 1 20 1
            h45
            A 19 19 0 0 1 84 19
            A 19 19 0 0 1 65 39
            h-45
            A 19 19 0 0 1 1 19`}
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
