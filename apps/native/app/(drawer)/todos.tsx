import { useState } from "react";
import {
	View,
	Text,
	TextInput,
	ScrollView,
	ActivityIndicator,
	Alert,
	Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQuery } from "convex/react";
import { api } from "@my-strathmore-app/backend/convex/_generated/api";
import type { Id } from "@my-strathmore-app/backend/convex/_generated/dataModel";
import { Container } from "@/components/container";
import { Card, Checkbox, useThemeColor, Chip } from "heroui-native";

export default function TodosScreen() {
	const [newTodoText, setNewTodoText] = useState("");
	const todos = useQuery(api.todos.getAll);
	const createTodoMutation = useMutation(api.todos.create);
	const toggleTodoMutation = useMutation(api.todos.toggle);
	const deleteTodoMutation = useMutation(api.todos.deleteTodo);

	const mutedColor = useThemeColor("muted");
	const accentColor = useThemeColor("accent");
	const dangerColor = useThemeColor("danger");
	const foregroundColor = useThemeColor("foreground");

	const handleAddTodo = async () => {
		const text = newTodoText.trim();
		if (!text) return;
		await createTodoMutation({ text });
		setNewTodoText("");
	};

	const handleToggleTodo = (id: Id<"todos">, currentCompleted: boolean) => {
		toggleTodoMutation({ id, completed: !currentCompleted });
	};

	const handleDeleteTodo = (id: Id<"todos">) => {
		Alert.alert("Delete Todo", "Are you sure you want to delete this todo?", [
			{ text: "Cancel", style: "cancel" },
			{
				text: "Delete",
				style: "destructive",
				onPress: () => deleteTodoMutation({ id }),
			},
		]);
	};

	const isLoading = !todos;
	const completedCount = todos?.filter((t) => t.completed).length || 0;
	const totalCount = todos?.length || 0;

	return (
		<Container>
			<ScrollView className="flex-1" contentContainerClassName="p-6">
				<View className="mb-6">
					<View className="flex-row items-center justify-between mb-2">
						<Text className="text-3xl font-bold text-foreground">
							Todo List
						</Text>
						{totalCount > 0 && (
							<Chip variant="secondary" color="accent" size="sm">
								<Chip.Label>
									{completedCount}/{totalCount}
								</Chip.Label>
							</Chip>
						)}
					</View>
				</View>

				<Card variant="secondary" className="mb-6 p-4">
					<View className="flex-row items-center gap-3">
						<View className="flex-1">
							<TextInput
								value={newTodoText}
								onChangeText={setNewTodoText}
								placeholder="Add a new task..."
								placeholderTextColor={mutedColor}
								onSubmitEditing={handleAddTodo}
								returnKeyType="done"
								className="text-foreground text-base py-3 px-4 border border-divider rounded-lg bg-surface"
							/>
						</View>
						<Pressable
							onPress={handleAddTodo}
							disabled={!newTodoText.trim()}
							className={`p-3 rounded-lg active:opacity-70 ${newTodoText.trim() ? "bg-accent" : "bg-surface"}`}
						>
							<Ionicons
								name="add"
								size={24}
								color={newTodoText.trim() ? foregroundColor : mutedColor}
							/>
						</Pressable>
					</View>
				</Card>

				{isLoading && (
					<View className="items-center justify-center py-12">
						<ActivityIndicator size="large" color={accentColor} />
						<Text className="text-muted mt-4">Loading todos...</Text>
					</View>
				)}

				{todos && todos.length === 0 && !isLoading && (
					<Card className="items-center justify-center py-12">
						<Ionicons
							name="checkbox-outline"
							size={64}
							color={mutedColor}
							style={{ marginBottom: 16 }}
						/>
						<Text className="text-foreground text-lg font-semibold mb-2">
							No todos yet
						</Text>
						<Text className="text-muted text-center">
							Add your first task to get started!
						</Text>
					</Card>
				)}

				{todos && todos.length > 0 && (
					<View className="gap-3">
						{todos.map((todo) => (
							<Card key={todo._id} variant="secondary" className="p-4">
								<View className="flex-row items-center gap-3">
									<Checkbox
										isSelected={todo.completed}
										onSelectedChange={() =>
											handleToggleTodo(todo._id, todo.completed)
										}
									/>
									<View className="flex-1">
										<Text
											className={`text-base ${todo.completed ? "text-muted line-through" : "text-foreground"}`}
										>
											{todo.text}
										</Text>
									</View>
									<Pressable
										onPress={() => handleDeleteTodo(todo._id)}
										className="p-2 rounded-lg active:opacity-70"
									>
										<Ionicons
											name="trash-outline"
											size={24}
											color={dangerColor}
										/>
									</Pressable>
								</View>
							</Card>
						))}
					</View>
				)}
			</ScrollView>
		</Container>
	);
}
