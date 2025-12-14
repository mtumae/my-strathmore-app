


import { Container } from "@/components/container";
import { Pressable, Text, View } from "react-native";
import { Card, useThemeColor } from "heroui-native";
import { useAppTheme } from "@/contexts/app-theme-context";
import { ThemeToggle } from "@/components/theme-toggle";



const payments = [
	{ id: 1, amount: 50000, date: '2024-01-15', method: 'Credit Card' },
	{ id: 2, amount: 75000, date: '2024-02-20', method: 'Bank Transfer' },
	{ id: 3, amount: 20000, date: '2024-03-10', method: 'Mobile Payment' },
	{ id: 4, amount: 20000, date: '2025-03-10', method: 'Mobile Payment' },
	{ id: 5, amount: 20000, date: '2025-03-10', method: 'Mobile Payment' },
	{ id: 6, amount: 20000, date: '2025-03-10', method: 'Mobile Payment' },
	
]

// Categorize payments by year
const categorizeByYear = (paymentsList: typeof payments) => {
	return paymentsList.reduce((acc, payment) => {
		const year = new Date(payment.date).getFullYear().toString();
		if (!acc[year]) {
			acc[year] = [];
		}
		acc[year].push(payment);
		return acc;
	}, {} as Record<string, typeof payments>);
};

const paymentsByYear = categorizeByYear(payments);
const years = Object.keys(paymentsByYear).sort((a, b) => parseInt(b) - parseInt(a));

export default function Home() {

	return (
		<Container className=" mt-8 flex gap-10">
			<View className="flex-1 items-center mt-10 p-8">
				<Text className="text-foreground">Balance</Text>
				<Text className="text-3xl text-foreground ">245,000</Text>

				<View className="flex-row w-full justify-between">
					<View className="items-center">
						<Text>
							Total Paid
						</Text>

						<Text>300,000</Text>
					</View>
					<View>
						<Text>
							Total Invoice
						</Text>
					</View>

				</View>
			</View>
			<View>
				{
					years.map((year) => (
						<View key={year} className="mb-6 p-8">
							<Text className="text-xl text-foreground mb-3">{year}</Text>
							<View className="gap-2">
								{
									paymentsByYear[year].map((payment) => (
										<Card key={payment.id} className="p-4 mb-2 rounded-lg ">
											<View className="flex-row justify-between items-center">
												<View>
													<Text className="text-foreground">{payment.method}</Text>
													<Text className="text-sm text-gray-500">
														{new Date(payment.date).toDateString()}
													</Text>
												</View>
												<Text className=" text-foreground">
													{payment.amount.toLocaleString()+" ksh"}
												</Text>
											</View>
										</Card>
									))
								}
							</View>
						</View>
					))
				}
			</View>
		</Container>
	);
}
