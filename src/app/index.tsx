import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Link, useFocusEffect } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system/legacy";

type Media = {
  name: string;
  uri: string;
};

const HomeScreen = () => {
  const [images, setImages] = useState<Media[]>([]);
  const loadFiles = async () => {
    if (!FileSystem.documentDirectory) return;

    const res = await FileSystem.readDirectoryAsync(
      FileSystem.documentDirectory,
    );
    setImages(
      res?.map((file) => ({
        name: file,
        uri: FileSystem.documentDirectory + file,
      })),
    );
  };
  useFocusEffect(
    useCallback(() => {
      loadFiles();
    }, []),
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        numColumns={3}
        renderItem={({ item }) => (
          <Link href={`/${item?.name}`} asChild>
            <Pressable style={styles.imageContainer}>
              <Image
                source={{ uri: item?.uri }}
                style={styles.image}
                resizeMode="cover"
              />
            </Pressable>
          </Link>
        )}
        keyExtractor={(item, idx) => `${item?.uri}-${idx}`}
      />

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
  },

  imageContainer: {
    flex: 1,
    margin: 2,
  },

  image: {
    width: "100%",
    aspectRatio: 3 / 4,
    borderRadius: 8,
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
