import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColor } from "heroui-native";

export default function TabLayout() {
	const themeColorForeground = useThemeColor("foreground");
	const themeColorBackground = useThemeColor("background");

	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				headerStyle: {
					backgroundColor: themeColorBackground,
				},
				headerTintColor: themeColorForeground,
				headerTitleStyle: {
					color: themeColorForeground,
					fontWeight: "800",
				},
				tabBarStyle: {
					backgroundColor: themeColorBackground,
					borderColor:'none'
					
				},
			}}
		>
			
			<Tabs.Screen
				name="profile"
				options={{
					title: "Profile",
					tabBarIcon: ({ color, size }: { color: string; size: number }) => (
						<Ionicons name="person-circle" size={size} color={color} />
					),
				}}
			/>

			<Tabs.Screen
				name="work"
				options={{
					title: "Work",
					tabBarIcon: ({ color, size }: { color: string; size: number }) => (
						<Ionicons name="book-outline" size={size} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="fees"
				options={{
					title: "Fees",
					tabBarIcon: ({ color, size }: { color: string; size: number }) => (
						<Ionicons name="wallet-outline" size={size} color={color} />
					),
				}}
			/>
			
		
		</Tabs>
	);
}
