import { Container } from "@/components/container";
import { Text, View } from "react-native";
import { Card } from "heroui-native";

export default function Home() {
	return (
		<Container className="p-10">
			<View className="flex-1 items-center">
				<Card variant="secondary" className="">
					<Card.Title className="text-3xl mb-2">Profile</Card.Title>


				
				</Card>
			</View>
		</Container>
	);
}
