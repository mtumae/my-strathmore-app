import { router } from "expo-router";
import { View, Text, Pressable } from "react-native";


export default function AuthForm() {
    return (
        <View className="justify-center items-center flex-1">
            <Text className="text-white">Auth Form Component</Text>


            <Pressable
            className="bg-red p-3" 
            onPress={
                () => {
                    router.push('/(tabs)/work')
                }
            }>
                <Text className="text-foreground">Login</Text>
            </Pressable>

        </View>
    )
}

