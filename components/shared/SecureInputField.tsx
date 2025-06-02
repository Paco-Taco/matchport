import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Platform, TextInput, TouchableOpacity, View } from 'react-native';

interface SecureInputFieldProps {
  placeholder: string;
  value: string;
  onChangeText: (value: string) => void;
}

export default function SecureInputField({
  placeholder,
  value,
  onChangeText,
}: SecureInputFieldProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const isAndroid = Platform.OS === 'android';

  return (
    <View
      className={`flex-row items-center rounded-2xl mb-6 border px-4  ${
        isFocused ? 'border-primary' : 'border-gray-200'
      }`}
    >
      <TextInput
        className={`flex-1 bg-transparent text-gray-700 font-noto-light ${
          isAndroid ? 'py-1' : 'py-4'
        }`}
        placeholder={placeholder}
        placeholderTextColor={'gray'}
        secureTextEntry={!isPasswordVisible}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        value={value}
        onChangeText={onChangeText}
      />
      <TouchableOpacity
        onPress={() => setIsPasswordVisible(!isPasswordVisible)}
      >
        <Ionicons
          name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
          size={22}
          color="gray"
        />
      </TouchableOpacity>
    </View>
  );
}
