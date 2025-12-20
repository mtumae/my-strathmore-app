import { router } from "expo-router";
import { View, Text, Pressable, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

import { Button } from "heroui-native";
import { Ionicons } from "@expo/vector-icons";

type FormInput = {
  admissionNumber: number;
  password: string;
};

export default function AuthForm() {
  const [data, setData] = useState<FormInput>();
  return (
    <View className=" w-full gap-5 items-center">
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
          setData({
            admissionNumber: 188916,
            password: "mtume",
          });
          router.push("/(tabs)/work");
        }}
      >
        <Ionicons className="" name="log-in-outline" size={24} color="white" />
        <Text className="text-white text-center text-2xl">Login</Text>
      </Button>
    </View>
  );
}
