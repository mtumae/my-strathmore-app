import "@/global.css";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { Stack } from "expo-router";
import { HeroUINativeProvider } from "heroui-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { AppThemeProvider } from "@/contexts/app-theme-context";
import { ClerkProvider, useUser } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

const convexUrl = process.env.EXPO_PUBLIC_CONVEX_URL || "";
const convex = new ConvexReactClient(convexUrl, {
  // // Optionally pause queries until the user is authenticated
  // expectAuth: getUser(),
  unsavedChangesWarning: false,
});

function StackLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
    </Stack>
  );
}

export default function Layout() {
  return (
    <ClerkProvider tokenCache={tokenCache}>
      <ConvexProvider client={convex}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <KeyboardProvider>
            <AppThemeProvider>
              <HeroUINativeProvider>
                <StackLayout />
              </HeroUINativeProvider>
            </AppThemeProvider>
          </KeyboardProvider>
        </GestureHandlerRootView>
      </ConvexProvider>
    </ClerkProvider>
  );
}
