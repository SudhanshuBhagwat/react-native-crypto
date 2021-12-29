import React from "react";
import Svg, { Path } from "react-native-svg";

type Props = {
  isUp: boolean;
  style?: Object;
};

const Caret: React.FC<Props> = ({ isUp, style }) => {
  return (
    <Svg
      style={[
        style,
        {
          marginRight: 4,
        },
      ]}
      viewBox="0 0 512 512"
      height="20"
      width="20"
    >
      {isUp ? (
        <Path
          d="M414 321.94L274.22 158.82a24 24 0 0 0-36.44 0L98 321.94c-13.34 15.57-2.28 39.62 18.22 39.62h279.6c20.5 0 31.56-24.05 18.18-39.62z"
          fill="green"
        />
      ) : (
        <Path
          d="M98 190.06l139.78 163.12a24 24 0 0 0 36.44 0L414 190.06c13.34-15.57 2.28-39.62-18.22-39.62h-279.6c-20.5 0-31.56 24.05-18.18 39.62z"
          fill="red"
        />
      )}
    </Svg>
  );
};

export default Caret;
