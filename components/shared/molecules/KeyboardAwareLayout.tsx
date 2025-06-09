import React, { ReactNode } from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {
  children: ReactNode;
  className?: string;
  safeArea?: boolean;
}

const KeyboardAwareLayout = ({ children, className, safeArea }: Props) => {
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      extraScrollHeight={20}
      enableOnAndroid
      keyboardShouldPersistTaps="handled"
      enableResetScrollToCoords={false}
      className={className ? className : 'bg-background'}
    >
      {safeArea ? (
        <SafeAreaView className="flex flex-1 px-7 py-4">
          {children}
        </SafeAreaView>
      ) : (
        <View className="flex flex-1 px-7 py-4">{children}</View>
      )}
    </KeyboardAwareScrollView>
  );
};

export default KeyboardAwareLayout;
