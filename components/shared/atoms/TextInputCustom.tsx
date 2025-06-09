import { useState } from 'react';
import { TextInput } from 'react-native';
// import { globalStyles, IsIOS } from '@/themes/app.constant';

export interface TextInputCustomProps {
  placeholder?: string;
  value: string | undefined;
  className?: string;
  onChangeText: (value: string) => void;
  numeric?: boolean;
}

export default function TextInputCustom({
  placeholder,
  value,
  className,
  onChangeText,
  numeric,
}: TextInputCustomProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleNumericChange = (text: string) => {
    const numericText = text.replace(/[^0-9]/g, '');
    onChangeText(numericText);
  };

  return (
    <TextInput
      className={`p-4 bg-transparent border ${
        isFocused ? 'border-primary' : ' border-gray-200'
      } rounded-2xl mb-6 font-regular ${className}`}
      placeholder={placeholder}
      placeholderTextColor={'gray'}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onChangeText={numeric ? handleNumericChange : onChangeText}
      value={value}
      keyboardType={numeric ? 'numeric' : undefined}
    />
  );
}
