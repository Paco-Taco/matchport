import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

const SignUpPicker = () => {
  const router = useRouter();
  return (
    <View className="flex-1 items-center justify-center">
      <Pressable onPress={() => router.push('/(auth)/signupCustomer')}>
        <Text>Cliente</Text>
      </Pressable>
    </View>
  );
};

export default SignUpPicker;
