import { useQuery } from "convex/react";
import { api } from "../../../packages/backend/convex/_generated/api";

import { View, Text, Pressable, StyleSheet, Image } from "react-native";
//import { Image } from "expo-image";
import { useColorScheme } from "react-native";
import React, { useCallback, useMemo, useRef } from "react";
import { useThemeColor } from "heroui-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import SiginInComponenet from "@/components/auth/sign-in";
import SignUpComponent from "@/components/auth/sign-up";
import { useState } from "react";
import { Redirect } from "expo-router";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export default function Index() {
  const themeColorForeground = useThemeColor("foreground");
  const themeColorBackground = useThemeColor("background");
  const [authForm, setAuthForm] = useState("sign-in");
  //const data = useQuery(api.healthCheck.get);
  //
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { isSignedIn } = useAuth();

  function handleAuthForm() {
    if (authForm === "sign-in") {
      return <SiginInComponenet />;
    } else {
      return <SignUpComponent />;
    }
  }

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  return (
    <SafeAreaProvider style={{ backgroundColor: themeColorBackground }}>
      <Image
        source={require("../assets/images/campus2.jpg")}
        style={styles.image}
      />
      <BottomSheet
        style={{
          backgroundColor: "#0000",
          borderRadius: 30,
        }}
        ref={bottomSheetRef}
        snapPoints={["20%", "35%", "50%", "60%", "70%", "100%"]}
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
          <View>
            <Text className="text-foreground text-4xl">Welcome</Text>
            <Text className="text-secondary text-2xl">to myStrathmore App</Text>
          </View>

          {isSignedIn ? (
            <Redirect href="/(tabs)/profile" />
          ) : (
            <SiginInComponenet />
          )}
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
