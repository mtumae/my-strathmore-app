


import { Container } from "@/components/container";
import { Pressable, Text, View } from "react-native";
import { Card, useThemeColor } from "heroui-native";
import { useAppTheme } from "@/contexts/app-theme-context";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {

	return (
		<Container className="p-6">
			<View className="flex-1 justify-center items-center">
				<Card variant="secondary" className="p-8 items-center">
					<Card.Title className="text-3xl mb-2">Fees</Card.Title>
                    <Pressable onPress={ThemeToggle}> 
                        <Text>Press me</Text>
                    </Pressable>
				</Card>
			</View>
		</Container>
	);
}
