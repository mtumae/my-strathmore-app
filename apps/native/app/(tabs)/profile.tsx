import {
  Text,
  View,
  Pressable,
  StyleSheet,
  Platform,
  ScrollView,
  Image,
} from "react-native";
import { Button } from "heroui-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Card } from "heroui-native";
import { router } from "expo-router";
import { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColor } from "heroui-native";
import { Container } from "@/components/container";
import { useColorScheme } from "react-native";
import { ThemeToggle } from "@/components/theme-toggle";
import * as Haptics from "expo-haptics";
import { api } from "@my-strathmore-app/backend/convex/_generated/api";

import Animated, {
  FadeInLeft,
  FadeInRight,
  FadeOut,
  SlideInDown,
  SlideInUp,
  SlideOutUp,
  ZoomIn,
} from "react-native-reanimated";
import { withUniwind } from "uniwind";
import { useAppTheme } from "@/contexts/app-theme-context";
import { useUser } from "@clerk/clerk-expo";
import { SignOutButton } from "@/components/signOutButton";
import { useQuery } from "convex/react";
import { eventNames } from "node:process";
import { SafeAreaProvider } from "react-native-safe-area-context";

const time = new Date().toLocaleTimeString();

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const events = [
  {
    id: 1,
    title: "Operating Systems CAT 1",
    date: "2023-01-01",
    location: "Location 1",
  },
  { id: 2, title: "Event 2", date: "2023-02-01", location: "Location 2" },
  { id: 3, title: "Event 3", date: "2023-03-01", location: "Location 3" },
];
export default function Home() {
  const themeColorForeground = useThemeColor("foreground");
  const themeColorBackground = useThemeColor("background");
  const { toggleTheme, isLight } = useAppTheme();
  const color = useColorScheme();

  const { isLoaded, isSignedIn, user } = useUser();

  const eventData = useQuery(api.events.getRecent);
  const announcementData = useQuery(api.announcements.getRecent);

  return (
    <SafeAreaProvider style={{ backgroundColor: themeColorBackground }}>
      <ScrollView>
        <View className="justify-center p-5 mt-10">
          <Animated.Text
            entering={SlideInUp}
            className="text-4xl text-foreground text-left"
          >
            {parseInt(time.slice(0, 2)) > 12 && parseInt(time.slice(0, 2)) < 18
              ? "Good Afternoon,"
              : parseInt(time.slice(0, 2)) > 16
                ? "Good Evening,"
                : "Good Morning,"}
          </Animated.Text>

          <Animated.Text
            entering={SlideInUp}
            className="text-secondary text-left text-3xl"
          >
            {user?.firstName} {user?.lastName}
          </Animated.Text>
        </View>

        <View className="gap-3 p-4 mb-10">
          <Animated.View
            entering={FadeInRight}
            className={`${color === "dark" ? "bg-[#242121]" : "bg-[#e0e0e0]"} p-10 rounded-3xl h-auto`}
          >
            <View className="flex-row gap-4 mb-8">
              <Ionicons name="pencil-outline" size={24} color={"#3a5dae"} />
              <Text className="text-secondary text-xl ">Announcements</Text>
            </View>

            <Text className="text-foreground text-sm flex-wrap mb-4">
              {announcementData?.content.slice(0, 300)}...
            </Text>
            <View className="flex-row self-end gap-3 items-center">
              <Text className="text-secondary">Read more</Text>
              <Ionicons
                name="arrow-forward-outline"
                size={20}
                color={"#3a5dae"}
              />
            </View>
          </Animated.View>

          <Animated.View
            entering={FadeInLeft}
            className={`${color === "dark" ? "bg-[#242121]" : "bg-[#e0e0e0]"} w-auto rounded-3xl  p-10 h-48`}
          >
            <View className="flex-row gap-4 mb-8">
              <Ionicons
                name="calendar-clear-outline"
                size={24}
                color={"#3a5dae"}
              />
              <Text className="text-secondary text-xl">Upcoming Events</Text>
            </View>

            {eventData ? (
              <>
                <Text className="text-foreground text-4xl">
                  {new Date(eventData.date).toDateString().slice(0, 10)}
                </Text>
                <Text className="text-foreground">{eventData.title}</Text>
              </>
            ) : (
              <>
                <Text className="text-foreground text-4xl">No Events</Text>
                <Text className="text-foreground">No upcoming events</Text>
              </>
            )}
          </Animated.View>
        </View>

        <View className="p-5 gap-2">
          <View className="flex-row items-center border-b border-foreground/10 pb-3 gap-3">
            <Ionicons
              name="settings-outline"
              color={themeColorForeground}
              size={24}
            />
            <Text className="text-2xl text-left text-foreground">Settings</Text>
          </View>

          <Pressable
            onPress={() => {
              if (Platform.OS === "ios") {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              }
              toggleTheme();
            }}
            style={{
              backgroundColor: themeColorBackground,
            }}
            className="border border-foreground/20  px-4 flex-row items-center-safe gap-3 rounded-full h-10"
          >
            {useColorScheme() === "dark" ? (
              <Ionicons
                name="moon-outline"
                size={20}
                color={themeColorForeground}
              />
            ) : (
              <Ionicons
                name="sunny-outline"
                size={20}
                color={themeColorForeground}
              />
            )}
            <Text className="text-foreground text-md">Change theme</Text>
          </Pressable>

          <Pressable className="border border-foreground/20 px-4 flex-row items-center-safe gap-3 rounded-full h-10">
            <Ionicons
              name="lock-open-outline"
              size={20}
              color={themeColorForeground}
            />
            <Text className="text-foreground">Change Password</Text>
          </Pressable>

          <SignOutButton />
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
}
