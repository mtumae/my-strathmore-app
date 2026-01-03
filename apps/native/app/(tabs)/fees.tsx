import { Container } from "@/components/container";
import { Pressable, Text, View } from "react-native";
import { Card, useThemeColor, Button } from "heroui-native";
import { useAppTheme } from "@/contexts/app-theme-context";
import { ThemeToggle } from "@/components/theme-toggle";
import Animated, { SlideInDown, SlideInUp } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "react-native";
import { use } from "react";
import { authClient } from "@/lib/auth-client";
import { useQuery } from "convex/react";
import { api } from "@my-strathmore-app/backend/convex/_generated/api";

const payments = [
  { id: 1, amount: 50000, date: "2024-01-15", method: "Credit Card" },
  { id: 2, amount: 75000, date: "2024-02-20", method: "Bank Transfer" },
  { id: 3, amount: 20000, date: "2024-03-10", method: "Mobile Payment" },
  { id: 4, amount: 20000, date: "2025-03-10", method: "Mobile Payment" },
  { id: 5, amount: 20000, date: "2025-03-10", method: "Mobile Payment" },
  { id: 6, amount: 20000, date: "2025-03-10", method: "Mobile Payment" },
];

// Categorize payments by year
const categorizeByYear = (paymentsList: typeof payments) => {
  return paymentsList.reduce(
    (acc, payment) => {
      const year = new Date(payment.date).getFullYear().toString();
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(payment);
      return acc;
    },
    {} as Record<string, typeof payments>,
  );
};

const paymentsByYear = categorizeByYear(payments);
const years = Object.keys(paymentsByYear).sort(
  (a, b) => parseInt(b) - parseInt(a),
);

export default function Home() {
  const themeColorForeground = useThemeColor("foreground");
  const themeColorBackground = useThemeColor("background");
  return (
    <Container className="flex">
      <Animated.View
        entering={SlideInUp}
        className="flex-1 items-center h-auto bg-secondary rounded-b-4xl p-8"
      >
        <View className="mt-4 flex items-center gap-4">
          <Ionicons name="card-outline" color={"white"} size={20} />
          <Text className="text-white mb-1 text-2xl">Account Balance</Text>
          <View className="items-center mb-4">
            <Text className="text-4xl text-white">245,000ksh</Text>
            <Text className="text-sm text-muted-foreground p-2">
              Due <Text className={"text-red-700"}>150,000ksh</Text>
            </Text>
          </View>
        </View>

        <View className="flex-row w-full gap-4 items-center">
          <Button
            style={{
              backgroundColor: themeColorBackground,
            }}
            onPress={() => {
              console.log("Paying fees");
            }}
            className="rounded-full flex-row  items-center p-2 w-40"
          >
            <Ionicons name="cash-outline" color={"#3a5dae"} size={20} />
            <Text className="text-secondary">Pay</Text>
          </Button>

          <Button
            style={{
              backgroundColor: themeColorBackground,
            }}
            onPress={() => {
              console.log("Paying fees");
            }}
            className="rounded-full text-secondary p-2 w-40"
          >
            <Ionicons
              name="arrow-down-circle-outline"
              color={"#3a5dae"}
              size={20}
            />
            <Text className="text-secondary">Receipt</Text>
          </Button>
        </View>
      </Animated.View>

      <Container>
        {years.map((year) => (
          <View key={year} className="mb-6 p-8">
            <Text className="text-xl mb-4 text-foreground">{year}</Text>
            <View className="gap-2">
              {paymentsByYear[year].map((payment) => (
                <View
                  key={payment.id}
                  className={`${useColorScheme() === "dark" ? "bg-[#242121]" : "bg-[#e0e0e0]"}  flex-row justify-between p-5 text-left rounded-full `}
                >
                  <View className="flex-row items-center gap-4">
                    <Ionicons
                      name="add-circle-outline"
                      color={"#3a5dae"}
                      size={20}
                    />

                    <Text className="text-sm text-gray-500">
                      {new Date(payment.date).toDateString().slice(0, 10)}
                    </Text>
                  </View>

                  <Text className=" text-foreground">
                    {payment.amount.toLocaleString()}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </Container>
    </Container>
  );
}
