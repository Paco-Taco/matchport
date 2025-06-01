import { useAuth } from '@/context/AuthContext';
import { Redirect } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

const Login = () => {
  const { session, user } = useAuth();

  if (session) {
    switch (user.rol) {
      case 'cliente':
        return <Redirect href={'/(protected)/client'} />;
      case 'carrier':
        return <Redirect href={'/(protected)/carrier'} />;
    }
  }

  return (
    <View>
      <Text>Logisdkskdn</Text>
    </View>
  );
};

export default Login;
