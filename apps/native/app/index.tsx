


import { router } from "expo-router";
import { View, Text, Pressable } from "react-native";


export default function Index() {
    return (
        <View className="bg-blue-400 justify-center items-center flex-1">
            <Text className="text-white">First page</Text>


            <Pressable
            className="bg-red p-3" 
            onPress={
                () => {
                    router.push('/(tabs)/work')
                }
            }>
                <Text className="text-foreground">move somewhere</Text>
            </Pressable>

        </View>
    )
}

