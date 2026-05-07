import {
  ActivityIndicator,
  Button,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Link, router } from "expo-router";
import {
  CameraCapturedPicture,
  CameraType,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import * as FileSystem from "expo-file-system/legacy";

import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import path from "path";
const CameraScreen = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>("back");
  const [picture, setPicture] = useState<CameraCapturedPicture | undefined>();
  const camera = useRef<CameraView>(null);

  useEffect(() => {
    if (permission && !permission?.granted && permission?.canAskAgain) {
      requestPermission();
    }
  }, [permission]);

  const handleCameraFacing = () => {
    setFacing((prev) => (prev === "back" ? "front" : "back"));
  };

  const takePicture = async () => {
    const res = await camera?.current?.takePictureAsync();
    if (res) {
      setPicture(res);
    }
  };
  if (!permission?.granted) {
    return <ActivityIndicator />;
  }

  const saveFile = async (uri: string) => {
    const filename = path.parse(uri)?.base;
    await FileSystem.copyAsync({
      from: uri,
      to: FileSystem.documentDirectory + filename,
    });
    setPicture(undefined);
    router.back();
  };

  if (picture) {
    return (
      <View style={{ flex: 1 }}>
        <Image
          source={{
            uri: picture?.uri,
          }}
          style={styles.img}
        />
        <View style={{ padding: 10 }}>
          <SafeAreaView edges={["bottom"]}>
            <Button title="Save" onPress={() => saveFile(picture?.uri)} />
          </SafeAreaView>
        </View>
        <MaterialIcons
          name="close"
          size={35}
          color={"white"}
          style={styles.imgCloseBtn}
          onPress={() => setPicture(undefined)}
        />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <CameraView ref={camera} style={styles.cameraView} facing={facing}>
        <View style={styles.footer}>
          <View />
          <Pressable style={styles.recordBtn} onPress={takePicture} />
          <MaterialIcons
            name="flip-camera-ios"
            size={24}
            color="white"
            onPress={handleCameraFacing}
          />
        </View>
      </CameraView>
      <MaterialIcons
        name="close"
        color={"white"}
        style={styles.close}
        size={30}
        onPress={() => router.back()}
      />
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: "4px",
  },
  cameraView: {
    width: "100%",
    height: "100%",
  },
  close: {
    position: "absolute",
    top: 40,
    left: 40,
  },
  footer: {
    marginTop: "auto",
    padding: 20,
    paddingBottom: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#00000099",
  },
  recordBtn: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: "white",
  },
  img: {
    width: "100%",
    flex: 1,
  },
  imgCloseBtn: {
    position: "absolute",
    top: 50,
    left: 50,
  },
});
