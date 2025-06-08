import CustomHeader from '@/components/shared/organisms/CustomHeader';
import { Stack } from 'expo-router';

const AuthLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen
        name="signupCustomer"
        options={{ header: () => <CustomHeader /> }}
      />
      <Stack.Screen name="signupPicker" options={{ headerShown: false }} />
    </Stack>
  );
};

export default AuthLayout;
