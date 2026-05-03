import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text>HomeScreens</Text>
      <Link href={"/image-1"}>Image 1</Link>
      <Link href={"/image-2"}>Image 2</Link>
      <Link href={"/image-3"}>Image 3</Link>
      <Link href={"/camera"} asChild>
        <Pressable style={styles.cameraContainer}>
          <MaterialIcons name="photo-camera" size={30} color={"white"} />
        </Pressable>
      </Link>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: "4px",
  },
  cameraContainer: {
    backgroundColor: "royalblue",
    padding: 15,
    borderRadius: 50,
    position: "absolute",
    bottom: 10,
    right: 10,
  },
});
