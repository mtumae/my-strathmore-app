import { Container } from "@/components/container";
import { Pressable, Text, View } from "react-native";
import { Card, useThemeColor } from "heroui-native";
import { useAppTheme } from "@/contexts/app-theme-context";
import { ThemeToggle } from "@/components/theme-toggle";
import Animated, { SlideInDown, SlideInUp } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";

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
    <Container>
      <Animated.View
        entering={SlideInUp}
        className="flex-1 items-center h-4 bg-secondary shadow-sm rounded-b-4xl p-8"
      >
        <View className="my-auto flex items-center">
          <View className="flex-row items-center gap-3">
            <Ionicons name="card-outline" color={"white"} size={20} />
            <Text className="text-white mb-1 text-2xl">Balance</Text>
          </View>

          <Text className="text-4xl text-white">245,000ksh</Text>
        </View>
      </Animated.View>

      <View className="flex items-center p-10">
        <Pressable>
          <Text className="text-foreground">Top up</Text>
        </Pressable>
      </View>
      <View>
        {years.map((year) => (
          <View key={year} className="mb-6 p-8">
            <Text className="text-xl border-b border-foreground/10 mb-4 text-foreground">
              {year}
            </Text>
            <View className="gap-2">
              {paymentsByYear[year].map((payment) => (
                <View className="flex-row justify-between items-center">
                  <View>
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
      </View>
    </Container>
  );
}
