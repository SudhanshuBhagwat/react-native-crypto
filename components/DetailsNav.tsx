import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";

type Props = {
  name: string;
};

const DetailsNav: React.FC<Props> = ({ name }) => {
  const navigation = useNavigation();
  const [isBookmarked, setIsBookmarked] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Svg viewBox="0 0 24 24" height="30" width="30">
          <Path
            fill="black"
            d="M13.293 6.293L7.586 12l5.707 5.707l1.414-1.414L10.414 12l4.293-4.293z"
          />
        </Svg>
      </TouchableOpacity>
      <Text style={styles.name}>{name}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setIsBookmarked((isActive) => !isActive)}
      >
        <Svg viewBox="0 0 24 24" height="26" width="26">
          <Path
            fill="black"
            d={
              isBookmarked
                ? "M19 10.132v-6c0-1.103-.897-2-2-2H7c-1.103 0-2 .897-2 2V22l7-4.666L19 22V10.132z"
                : "M18 2H6c-1.103 0-2 .897-2 2v18l8-4.572L20 22V4c0-1.103-.897-2-2-2zm0 16.553l-6-3.428l-6 3.428V4h12v14.553z"
            }
          />
        </Svg>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontSize: 26,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#e2e2e2",
    padding: 6,
    borderRadius: 6,
  },
});

export default DetailsNav;