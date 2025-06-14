import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

export const GenericLoader = ({ label }: { label?: string }) => {
  return (
    <View className="flex-1 justify-center items-center bg-background">
      <ActivityIndicator size="large" color="#6b7280" />
      <Text className="mt-2 text-gray-500">{label || 'Cargando...'}</Text>
    </View>
  );
};
