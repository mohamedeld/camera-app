import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link, router, useLocalSearchParams } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

import * as FileSystem from "expo-file-system/legacy";
const ImageScreen = () => {
  const { image } = useLocalSearchParams();

  const fullUri = (FileSystem.documentDirectory ?? "") + image;

  const onDelete = async () => {
    await FileSystem.deleteAsync(fullUri);
    router.back();
  };
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: fullUri }}
        style={{
          width: "100%",
          height: "100%",
        }}
      />
      <MaterialIcons
        name="delete"
        size={26}
        color={"crimson"}
        onPress={onDelete}
        style={styles.deleteBtn}
      />
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
    padding: 20,
  },
  deleteBtn: {
    position: "absolute",
    top: 20,
    right: 20,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 100,
  },
});
