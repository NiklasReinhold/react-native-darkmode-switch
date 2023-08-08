import * as React from "react";
import Svg, { Path } from "react-native-svg";

const Cloud = ({ strokeWidth }) => (
  <Svg viewBox="-80 0 1440 822" height="100%" width="100%">
    <Path
      fill="white"
      strokeWidth={strokeWidth * 50}
      stroke="#ffd6fe"
      d="M712.1 1.5c-48.4 5.6-92.6 22.1-131.5 49.4-23.8 16.6-47.6 39.7-63.7 61.8-2.3 3.2-4.4 6-4.5 6.2-.2.2-4-.8-8.4-2.3-11.7-3.8-26-7.3-38.5-9.2-15-2.3-44.2-2.3-59 0-61.1 9.4-112.7 42.3-146.8 93.4-23.5 35.3-36.2 80.9-34.4 122.9l.6 13.2-3.2.5c-1.8.3-7.2 1-12.2 1.6-41.3 5-86.1 24.2-120.1 51.5C47 425.4 16.6 475.1 5.2 530 1.4 548.3.5 557.2.6 579.5c0 24.3 1.4 36.8 6.3 57.1C29 726.5 100.5 796.5 190.4 816c26.8 5.8-.2 5.5 433.6 5.5 380.6 0 401.1-.1 412.5-1.8 64.9-9.7 119.7-37.3 163.5-82.4 14.2-14.5 21.7-23.7 32.4-39.6 23.3-34.6 38.1-72.8 44.8-116.2 1.8-11.6 2.2-18.3 2.2-39.5 0-28.2-1.6-42-7.4-65.7-18-73.8-64.3-136.3-129.8-175.2-33.3-19.8-71.5-32.6-110.4-37.1-11.7-1.4-11.8-1.4-11.8-8.9 0-9.5-5.9-40.3-10.7-55.6-7.5-24.3-20.5-52.4-33.1-71.5C931 59.3 862.2 15.1 781.5 3c-18.5-2.8-52-3.5-69.4-1.5z"
    />
  </Svg>
);
export default Cloud;
