import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

interface CustomHeaderProps {
  title?: string;
  customRouterFunction?: () => void;
}
const CustomHeader = ({ title, customRouterFunction }: CustomHeaderProps) => {
  const router = useRouter();

  return (
    <View className="py-4 h-32 justify-end bg-background">
      <View className="flex-row items-center">
        <Pressable
          className="absolute left-6 z-10"
          onPress={() => {
            if (customRouterFunction) {
              customRouterFunction();
            } else {
              router.back();
            }
          }}
        >
          <Ionicons name="arrow-back" size={24} />
        </Pressable>
        <View className="flex-1 items-center">
          <Text className="font-bold text-lg">{title}</Text>
        </View>
      </View>
    </View>
  );
};

export default CustomHeader;
