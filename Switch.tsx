import React, { PropsWithChildren, useEffect, useRef } from "react";
import { StyleSheet, Animated, View, Dimensions, Easing } from "react-native";
import Svg, { Circle, Rect, Path } from "react-native-svg";
import Cloud from "./Cloud";
import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { svgPathProperties } from "svg-path-properties";

const Switch: React.FC<
  PropsWithChildren<{
    value: boolean;
    handlePadding?: number;
    borderWidth?: number;
  }>
> = ({ value, handlePadding = 2, borderWidth = 4 }) => {
  const animation = useRef(new Animated.Value(value ? 1 : 0)).current;

  const AnimatedCircle = Animated.createAnimatedComponent(Circle);
  const AnimatedPath = Animated.createAnimatedComponent(Path);
  const AnimatedSvg = Animated.createAnimatedComponent(Svg);

  const [dimensions, setDimensions] = React.useState<{
    height: number;
    width: number;
  }>({ width: 20, height: 10 });

  const handleDiameter = dimensions.height - (borderWidth + handlePadding) * 2;
  const [path, pathLength] = getBorderPath(
    dimensions.height,
    dimensions.width,
    borderWidth
  );

  useEffect(() => {
    Animated.timing(animation, {
      toValue: value ? 1 : 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [value]);

  const cloudScale = 0.48;
  const cloudSvgHeight = 1096;
  const cloudSvgWidth = 1706;
  const cloudStrokeWidth =
    (1096 / dimensions.height / cloudScale) * borderWidth;

  return (
    <View
      style={{
        flex: 1,
      }}
      onLayout={(event) => setDimensions(event.nativeEvent.layout)}
    >
      <Svg viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}>
        <AnimatedPath
          strokeWidth={borderWidth}
          stroke={!value ? "#4ab4ff" : "#000"}
          fill={animation.interpolate({
            inputRange: [0, 1],
            outputRange: ["#3d4147", "#82cbff"],
          })}
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
            outputRange: value ? [pathLength, 0] : [0, pathLength],
          })}
        />
      </Svg>
      <AnimatedSvg
        style={{
          position: "absolute",
          opacity: animation.interpolate({
            inputRange: value ? [0, 0.4, 0.5] : [0, 0.75, 1],
            outputRange: value ? [1, 1, 0] : [1, 0, 0],
          }),
        }}
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
      >
        <Circle cx="80%" cy="13%" r="3%" fill="white" />
        <Circle cx="84%" cy="73%" r="3%" fill="white" />
        <Circle cx="87%" cy="37%" r="4%" fill="white" />
        <Circle cx="44%" cy="14%" r="3%" fill="white" />
        <Circle cx="57%" cy="35%" r="2%" fill="white" />
        <Circle cx="64%" cy="59%" r="2%" fill="white" />
        <Circle cx="47%" cy="78%" r="3.5%" fill="white" />
      </AnimatedSvg>
      <Animated.View
        style={[
          {
            position: "absolute",
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
            margin: borderWidth + handlePadding,
            transform: [
              {
                translateX: animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [
                    0,
                    dimensions.width -
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
              margin: borderWidth,
            },
          ]}
        >
          <Svg
            viewBox={`0 0 ${handleDiameter - borderWidth * 2} ${
              handleDiameter - borderWidth * 2
            }`}
          >
            <AnimatedCircle
              cx="20.6%"
              cy="20.8%"
              r="12%"
              fill={value ? "transparent" : "#ffff80"}
            />
            <AnimatedCircle
              cx="70.2%"
              cy="17.3%"
              r="11%"
              stroke={value ? "transparent" : "#ffff80"}
              strokeWidth="9%"
              fill="transparent"
            />
            <AnimatedCircle
              cx="60%"
              cy="77%"
              r="12%"
              fill={value ? "transparent" : "#ffff80"}
            />
          </Svg>
        </Animated.View>
      </Animated.View>
      <Animated.View
        style={{
          position: "absolute",
          bottom: borderWidth + handlePadding + borderWidth,
          right: handleDiameter * 0.53 + handlePadding + borderWidth,
          height: dimensions.height * cloudScale,
          width:
            dimensions.height * cloudScale * (cloudSvgWidth / cloudSvgHeight),
          opacity: value
            ? 1
            : animation.interpolate({
                inputRange: [0, 0.8, 1],
                outputRange: [0, 0, 1],
              }),
          transform: [
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
        <Svg
          style={{
            transform: [{ scaleX: -1 }],
          }}
          viewBox={`${-cloudStrokeWidth / 2} ${-cloudStrokeWidth / 2} ${
            cloudSvgWidth + cloudStrokeWidth
          } ${cloudSvgHeight + cloudStrokeWidth}`}
        >
          <Path
            fill="white"
            stroke="#ffd6fe"
            strokeWidth={cloudStrokeWidth}
            d={getPathOfCloud()}
          />
        </Svg>
      </Animated.View>
    </View>
  );
};

const getBorderPath = (
  height: number,
  width: number,
  borderWidth: number
): [string, number] => {
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

  const properties = new svgPathProperties(path);
  const length = properties.getTotalLength();
  return [path, length];
};

const getPathOfCloud = () =>
  "M 948.539062 2 C 884.070312 9.460938 825.195312 31.453125 773.378906 67.832031 C 741.675781 89.957031 709.972656 120.742188 688.527344 150.195312 C 685.464844 154.457031 682.664062 158.191406 682.53125 158.457031 C 682.265625 158.722656 677.203125 157.390625 671.34375 155.390625 C 655.757812 150.328125 636.710938 145.664062 620.0625 143.128906 C 600.078125 140.066406 561.183594 140.066406 541.46875 143.128906 C 460.082031 155.65625 391.351562 199.503906 345.929688 267.601562 C 314.625 314.648438 297.710938 375.417969 300.105469 431.390625 L 300.90625 448.980469 L 296.644531 449.648438 C 294.246094 450.046875 287.054688 450.980469 280.390625 451.78125 C 225.378906 458.445312 165.703125 484.03125 120.414062 520.414062 C 62.605469 566.925781 22.113281 633.160156 6.925781 706.324219 C 1.863281 730.710938 0.664062 742.570312 0.800781 772.289062 C 0.800781 804.675781 2.664062 821.332031 9.191406 848.386719 C 38.628906 968.195312 133.867188 1061.484375 253.617188 1087.472656 C 289.316406 1095.199219 253.351562 1094.800781 831.1875 1094.800781 C 1338.160156 1094.800781 1365.464844 1094.667969 1380.648438 1092.402344 C 1467.097656 1079.476562 1540.09375 1042.691406 1598.4375 982.589844 C 1617.351562 963.265625 1627.34375 951.003906 1641.59375 929.8125 C 1672.632812 883.703125 1692.34375 832.792969 1701.269531 774.957031 C 1703.667969 759.496094 1704.199219 750.566406 1704.199219 722.316406 C 1704.199219 684.734375 1702.070312 666.34375 1694.34375 634.757812 C 1670.367188 536.40625 1608.695312 453.113281 1521.445312 401.269531 C 1477.089844 374.882812 1426.207031 357.824219 1374.390625 351.828125 C 1358.804688 349.964844 1358.671875 349.964844 1358.671875 339.96875 C 1358.671875 327.308594 1350.8125 286.261719 1344.417969 265.871094 C 1334.429688 233.488281 1317.113281 196.039062 1300.328125 170.582031 C 1240.121094 79.027344 1148.476562 20.125 1040.984375 4 C 1016.339844 0.265625 971.71875 -0.667969 948.539062 2 Z M 948.539062 2 ";

const styles = StyleSheet.create({});

export default Switch;
