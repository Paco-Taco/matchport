import TextInputCustom from '@/components/shared/atoms/TextInputCustom';
import KeyboardAwareLayout from '@/components/shared/molecules/KeyboardAwareLayout';
import ImageUpload from '@/components/shared/organisms/ImageUpload';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

const signupCustomer = () => {
  const router = useRouter();

  const isFormComplete = false;

  return (
    <KeyboardAwareLayout>
      <View className="mt-5 gap-2">
        <Text className="font-bold text-3xl">Registro</Text>
        <Text className="font-medium text-md text-gray-400">
          Crea una cuenta para continuar
        </Text>
      </View>

      <View className="my-8">
        <Text className="font-regular text-gray-700">Foto de perfil</Text>
        <View className="items-center">
          <ImageUpload variant="circle" />
        </View>
      </View>

      <View className="my-1">
        <Text className="font-regular mb-3 text-gray-700">Nombre</Text>
        <TextInputCustom
          value="Paco"
          onChangeText={(value) => console.log(value)}
        />
      </View>

      <View className="my-1">
        <Text className="font-regular mb-3">Nombre</Text>
        <TextInputCustom
          value="Paco"
          onChangeText={(value) => console.log(value)}
        />
      </View>

      <Pressable
        className={`py-5 my-8 rounded-xl ${
          !isFormComplete ? 'bg-gray-200' : 'bg-primary'
        }`}
        // onPress={handleLogin}
        disabled={!isFormComplete}
      >
        <Text
          className={`text-xl text-center ${
            !isFormComplete ? 'text-gray-400' : 'text-white'
          } font-noto-regular`}
        >
          Iniciar Sesión
        </Text>
      </Pressable>

      <View className="items-center my-4">
        <Text className={`text-gray-500`}>
          ¿Ya tienes cuenta?{' '}
          <Text
            className="text-secondary"
            onPress={() => router.push('/(auth)/login')}
          >
            Ingresar
          </Text>
        </Text>
      </View>
    </KeyboardAwareLayout>
  );
};

export default signupCustomer;
