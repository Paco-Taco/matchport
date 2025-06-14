import LottieView from 'lottie-react-native';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { verticalScale } from 'react-native-size-matters';

interface SuccessScreenProps {
  href: () => void;
  message?: string;
  status: 'done' | 'validating';
}

const SuccessScreen = ({ message, href, status }: SuccessScreenProps) => {
  return (
    <SafeAreaView className="flex-1 items-center justify-between bg-background px-8">
      <View className="items-center flex-1 justify-center">
        {status === 'done' ? (
          <LottieView
            source={require('@/assets/lottie/Success.json')}
            autoPlay
            loop={false}
            style={{ width: verticalScale(205), height: verticalScale(205) }}
          />
        ) : (
          <LottieView
            source={require('@/assets/lottie/Validating.json')}
            autoPlay
            loop
            style={{ width: verticalScale(205), height: verticalScale(205) }}
          />
        )}
        <Text className="font-bold text-3xl mt-5">¡Todo listo!</Text>
        {message && (
          <Text className="font-regular text-xl text-center mt-2">
            {message}
          </Text>
        )}
      </View>
      <Pressable
        className="bg-primary rounded-xl items-center p-4 w-full"
        onPress={href}
      >
        <Text className="font-regular text-lg" style={{ color: '#fff' }}>
          Siguiente
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default SuccessScreen;
