import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { Link, router } from "expo-router";
import { CameraView, useCameraPermissions } from "expo-camera";

import { MaterialIcons } from "@expo/vector-icons";
const CameraScreen = () => {
  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    if (permission && !permission?.granted && permission?.canAskAgain) {
      requestPermission();
    }
  }, [permission]);
  if (!permission?.granted) {
    return <ActivityIndicator />;
  }
  return (
    <View style={styles.container}>
      <CameraView style={styles.cameraView}>
        <View style={styles.footer}>
          <MaterialIcons name="flip-camera-ios" />
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
  footer: {},
});
