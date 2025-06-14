import SuccessScreen from '@/components/shared/organisms/SuccessScreen';
import { useRouter } from 'expo-router';
import React from 'react';

const RegisterSuccess = () => {
  const router = useRouter();
  return (
    <SuccessScreen
      href={() => router.replace('/(auth)/login')}
      message="Tu cuenta se encuentra a la espera de ser verificada"
      status="validating"
    />
  );
};

export default RegisterSuccess;
