import React from "react";
import { Text, StyleProp, TextStyle } from "react-native";

type Props = {
  style?: StyleProp<TextStyle>;
};

const Thin: React.FC<Props> = ({ children, style }) => {
  return (
    <Text
      style={[
        {
          fontFamily: "Inter_100Thin",
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
};

const ExtraLight: React.FC<Props> = ({ children, style }) => {
  return (
    <Text
      style={[
        {
          fontFamily: "Inter_200ExtraLight",
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
};

const Light: React.FC<Props> = ({ children, style }) => {
  return (
    <Text
      style={[
        {
          fontFamily: "Inter_300Light",
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
};

const Regular: React.FC<Props> = ({ children, style }) => {
  return (
    <Text
      style={[
        {
          fontFamily: "Inter_400Regular",
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
};

const Medium: React.FC<Props> = ({ children, style }) => {
  return (
    <Text
      style={[
        {
          fontFamily: "Inter_500Medium",
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
};

const SemiBold: React.FC<Props> = ({ children, style }) => {
  return (
    <Text
      style={[
        {
          fontFamily: "Inter_600SemiBold",
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
};

const Bold: React.FC<Props> = ({ children, style }) => {
  return (
    <Text
      style={[
        {
          fontFamily: "Inter_700Bold",
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
};

const ExtraBold: React.FC<Props> = ({ children, style }) => {
  return (
    <Text
      style={[
        {
          fontFamily: "Inter_800ExtraBold",
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
};

const Black: React.FC<Props> = ({ children, style }) => {
  return (
    <Text
      style={[
        {
          fontFamily: "Inter_900Black",
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
};

export {
  Thin,
  ExtraLight,
  Light,
  Regular,
  Medium,
  SemiBold,
  Bold,
  ExtraBold,
  Black,
};
