import SecureInputField from '@/components/shared/atoms/SecureInputField';
import TextInputCustom from '@/components/shared/atoms/TextInputCustom';
import KeyboardAwareLayout from '@/components/shared/molecules/KeyboardAwareLayout';
import { useAuth } from '@/context/AuthContext';
import { LoginRequest } from '@/infraestructure/interfaces/login.interface';
import { IsAndroid, IsIPAD } from '@/themes/app.constant';
import { Redirect, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native';
import { verticalScale } from 'react-native-size-matters';
//  @ts-ignore
import logo from '../../assets/images/sign-in/logo.png';

const Login = () => {
  const { session, user } = useAuth();
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  if (session) {
    switch (user.rol) {
      case 'cliente':
        return <Redirect href={'/(protected)/client'} />;
      case 'carrier':
        return <Redirect href={'/(protected)/carrier'} />;
    }
  }

  const handleLogin = async () => {
    if (!credentials.email.trim() || !credentials.password.trim()) {
      Alert.alert('Error', 'Por favor, ingrese usuario y contraseña.');
      return;
    }
    try {
      console.log(credentials);
    } catch (error) {
      Alert.alert('Error', error as string);
    }
  };

  const handleInputChange = (field: keyof LoginRequest, value: string) => {
    setCredentials((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const isFormComplete = credentials.email && credentials.password;

  return (
    // <KeyboardAvoidingView
    //   behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    //   style={{ flex: 1 }}
    //   className="bg-background"
    //   keyboardVerticalOffset={80}
    // >
    //   <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
    <KeyboardAwareLayout safeArea>
      <View className="flex-row justify-center mt-6 mb-4">
        <Image
          source={logo}
          style={{
            height: IsIPAD
              ? verticalScale(345)
              : IsAndroid
              ? verticalScale(260)
              : verticalScale(150),
            width: '70%',
            resizeMode: 'contain',
          }}
        />
      </View>

      <View className="py-4 pr-2 gap-3 mb-8">
        <Text className="text-4xl font-bold">Accede con tu cuenta</Text>
        <Text className="text-gray-400 font-regular text-sm">
          Ingresa tu email y tu contraseña para continuar
        </Text>
      </View>

      <View className="form justify-between pb-2">
        <View className="space-y-2">
          <Text className={'text-gray-700 ml-2 mb-1'}>Email</Text>
          <TextInputCustom
            placeholder="Ingrese su correo"
            value={credentials.email}
            onChangeText={(value) => handleInputChange('email', value)}
          />

          <View className="flex">
            <Text className={`text-gray-700 ml-2 mb-1`}>Contraseña</Text>
            <SecureInputField
              placeholder="Ingrese su contraseña"
              value={credentials.password}
              onChangeText={(value) => handleInputChange('password', value)}
            />
            <View className="items-end">
              <Text className={`text-secondary font-regular ml-2`}>
                ¿Olvidaste tu contraseña?
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          className={`py-5 my-8 rounded-xl ${
            !isFormComplete ? 'bg-gray-200' : 'bg-primary'
          }`}
          // onPress={handleLogin}
          disabled={!isFormComplete}
        >
          <Text
            className={`text-xl text-center ${
              !isFormComplete ? 'text-gray-400' : 'text-white'
            } font-medium`}
          >
            Iniciar Sesión
          </Text>
        </TouchableOpacity>

        <View className="items-center my-4">
          <Text className={`text-gray-500 font-regular`}>
            ¿No tienes cuenta?{' '}
            <Text
              className="text-secondary"
              onPress={() => router.push('/(auth)/signupPicker')}
            >
              Regístrate
            </Text>
          </Text>
        </View>
      </View>
    </KeyboardAwareLayout>
    //   </ScrollView>
    // </KeyboardAvoidingView>
  );
};

export default Login;
