import React from 'react';
import { Text, View } from 'react-native';
import SecureInputField from '../atoms/SecureInputField';
import TextInputCustom, {
  TextInputCustomProps,
} from '../atoms/TextInputCustom';

interface LabeledTextInputProps extends TextInputCustomProps {
  label: string;
  secure?: boolean;
}

const LabeledTextInput = ({
  label,
  value,
  onChangeText,
  className,
  numeric,
  placeholder,
  secure,
}: LabeledTextInputProps) => {
  return (
    <View className="my-1">
      <Text className="font-regular mb-3 text-gray-700">{label}</Text>
      {secure ? (
        <SecureInputField
          value={value}
          onChangeText={onChangeText}
          className={className}
          placeholder={placeholder}
        />
      ) : (
        <TextInputCustom
          value={value}
          onChangeText={onChangeText}
          className={className}
          numeric={numeric}
          placeholder={placeholder}
        />
      )}
    </View>
  );
};

export default LabeledTextInput;
