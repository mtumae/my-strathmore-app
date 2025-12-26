import { router } from "expo-router";
import { View, Text, Pressable, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

import { Button } from "heroui-native";
import { Ionicons } from "@expo/vector-icons";
import { authClient } from "@/lib/auth-client";

interface FormInput {
  email: string;
  password: string;
}

export default function AuthForm() {
  async function handleGoogleLogin() {
    await authClient.signIn.social({
      provider: "google",
    });
  }

  async function handleLogin({ email, password }: FormInput) {
    try {
      await authClient.signIn.email({
        email: email,
        password: password,
      });
      router.push("/(tabs)/fees");
    } catch (error) {
      console.log("Sign in ERROR:", error);
    }
  }
  return (
    <View className="w-full gap-5 items-center">
      <View>
        <Text className="text-secondary text-center text-5xl">Welcome</Text>
        <Text className="text-foreground text-center text-2xl">
          Please login
        </Text>
        <Text className="text-foreground text-center text-xl">
          Enter your credentials
        </Text>
      </View>

      <View className="flex flex-col gap-2 mt-10 items-center">
        <View className="flex  rounded-full p-1 flex-row items-center">
          <Ionicons
            className="ml-10"
            name="person-outline"
            size={24}
            color="gray"
          />
          <TextInput
            placeholder="Admission Number"
            className="text-foreground text-2xl p-8 w-96 "
          />
        </View>
      </View>

      <View className="flex flex-col gap-2 items-center">
        <View className="flex p-1 flex-row items-center">
          <Ionicons
            className="ml-10"
            name="lock-closed-outline"
            size={24}
            color="gray"
          />
          <TextInput
            placeholder="Password"
            className="text-foreground text-2xl p-8 w-96 "
          />
        </View>
      </View>
      <Button
        className="bg-secondary shadow-md h-20 w-full rounded-full items-center"
        onPress={() => {
          handleLogin({
            email: "example@example.com",
            password: "password",
          });
        }}
      >
        <Ionicons className="" name="log-in-outline" size={24} color="white" />
        <Text className="text-white text-center text-2xl">Login</Text>
      </Button>
    </View>
  );
}
