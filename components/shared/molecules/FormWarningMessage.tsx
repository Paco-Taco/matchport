import React from 'react';
import { Text } from 'react-native';

const FormWarningMessage = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <Text className={`text-red-500 text-sm mb-4 font-regular ${className}`}>
      {children}
    </Text>
  );
};

export default FormWarningMessage;
