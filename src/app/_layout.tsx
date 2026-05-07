import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Slot } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const RootLayout = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Slot />
    </SafeAreaView>
  );
};

export default RootLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
