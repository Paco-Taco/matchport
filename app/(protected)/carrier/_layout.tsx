import { useAuth } from '@/context/AuthContext';
import { Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';

export default function ProtectedLayout() {
  const { session } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!session) {
      router.replace('/(auth)/login');
    }
  }, [session]);

  return (
    <Stack>
      <Stack.Screen name="index" />
    </Stack>
  );
}
