import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link, useLocalSearchParams } from "expo-router";

const ImageScreen = () => {
  const { image } = useLocalSearchParams();
  return (
    <View style={styles.container}>
      <Text>ImageScreen {image}</Text>
      <Link href={"/"}>Home</Link>
    </View>
  );
};

export default ImageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: "4px",
  },
});
