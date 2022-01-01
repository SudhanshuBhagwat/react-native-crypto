import React from "react";
import Svg, { Circle, Path } from "react-native-svg";

const Watch = () => {
  return (
    <Svg viewBox="0 0 24 24" height="24" width="24">
      <Path
        d="M21.257 10.962c.474.62.474 1.457 0 2.076C19.764 14.987 16.182 19 12 19c-4.182 0-7.764-4.013-9.257-5.962a1.692 1.692 0 0 1 0-2.076C4.236 9.013 7.818 5 12 5c4.182 0 7.764 4.013 9.257 5.962z"
        stroke="black"
        strokeWidth="2"
      />
      <Circle
        cx="12"
        cy="12"
        r="3"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default Watch;
