import { useQuery } from "convex/react";
import { api } from "../../../packages/backend/convex/_generated/api";
import { router } from "expo-router";
import AuthForm from "@/components/authForm";
import { View, Text, Pressable, StyleSheet, Image } from "react-native";
//import { Image } from "expo-image";
import { useColorScheme } from "react-native";
import React, { useCallback, useMemo, useRef } from "react";
import { useThemeColor } from "heroui-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { BorderlessButton } from "react-native-gesture-handler";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export default function Index() {
  const themeColorForeground = useThemeColor("foreground");
  const themeColorBackground = useThemeColor("background");

  //const data = useQuery(api.healthCheck.get);
  //
  const bottomSheetRef = useRef<BottomSheet>(null);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  return (
    <SafeAreaProvider style={{ backgroundColor: themeColorBackground }}>
      <Image
        source={require("../assets/images/campus.jpg")}
        style={styles.image}
      />
      <BottomSheet
        style={{
          backgroundColor: "#0000",
          borderRadius: 30,
        }}
        ref={bottomSheetRef}
        snapPoints={["20%", "35%", "50%", "100%"]}
        onChange={handleSheetChanges}
        backgroundStyle={{
          backgroundColor: "#0000",
        }}
      >
        <BottomSheetView
          className="h-full"
          style={{
            borderRadius: 40,
            backgroundColor: themeColorBackground,
            flex: 1,
            padding: 40,
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          <Image
            source={require("../assets/images/logos.png")}
            style={styles.logo}
          />
          <AuthForm />
        </BottomSheetView>
      </BottomSheet>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 80,
    height: 100,
    objectFit: "fill",
  },
  image: {
    flex: 1,
    width: "100%",
    backgroundColor: "#0553",
  },
  contentContainer: {
    flex: 1,
    padding: 36,
    alignItems: "center",
  },
});
