import KeyboardAwareLayout from '@/components/shared/molecules/KeyboardAwareLayout';
import LabeledTextInput from '@/components/shared/molecules/LabeledTextInput';
import PhoneInput from '@/components/shared/molecules/PhoneNumberInput';
import ImageUpload from '@/components/shared/organisms/ImageUpload';
import { useFormState } from '@/hooks/useFormState';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

const signupCustomer = () => {
  const router = useRouter();

  const [credentials, handleInputChange] = useFormState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    rfc: '',
    password: '',
    ine: null,
    profilePhoto: null,
  });

  const [confirmedPassword, setConfirmedPassword] = useState('');

  // useEffect(() => {
  //   console.log(credentials);
  //   console.log(confirmedPassword);
  // }, [credentials, confirmedPassword]);

  const isFormComplete =
    credentials.firstName &&
    credentials.lastName &&
    credentials.phoneNumber &&
    credentials.rfc &&
    credentials.password &&
    confirmedPassword &&
    credentials.ine;

  return (
    <KeyboardAwareLayout>
      <View className="mt-5 gap-2">
        <Text className="font-bold text-3xl">Registro</Text>
        <Text className="font-medium text-md text-gray-400">
          Crea una cuenta para continuar
        </Text>
      </View>

      <View className="my-8">
        <Text className="font-regular text-gray-700">
          Foto de perfil (Opcional)
        </Text>
        <View className="items-center">
          <ImageUpload variant="circle" />
        </View>
      </View>

      <LabeledTextInput
        label="Nombre(s)"
        onChangeText={(value) => handleInputChange('firstName', value)}
        value={credentials.firstName}
        placeholder="Ingresa tu(s) nombre(s)"
      />

      <LabeledTextInput
        label="Apellido(s)"
        onChangeText={(value) => handleInputChange('lastName', value)}
        value={credentials.lastName}
        placeholder="Ingresa tu(s) apellido(s)"
      />

      <LabeledTextInput
        label="RFC"
        onChangeText={(value) => handleInputChange('rfc', value)}
        value={credentials.rfc}
        placeholder="Ingresa tu RFC"
      />

      <LabeledTextInput
        label="Correo Electrónico"
        onChangeText={(value) => handleInputChange('email', value)}
        value={credentials.email}
        placeholder="ejemplo@correo.com"
      />

      <PhoneInput
        onChange={(value) => handleInputChange('phoneNumber', value)}
      />

      <LabeledTextInput
        secure
        label="Contraseña"
        onChangeText={(value) => handleInputChange('password', value)}
        value={credentials.password}
        placeholder="Crea una contraseña"
      />

      <LabeledTextInput
        secure
        label="Confirmar Contraseña"
        onChangeText={(value) => setConfirmedPassword(value)}
        value={confirmedPassword}
        placeholder="Vuelve a escribir tu contraseña"
      />

      <ImageUpload label="INE" aspect={[5, 3]} />

      <View className="mb-12">
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
            } font-medium`}
          >
            Registrarte
          </Text>
        </Pressable>

        <View className="items-center">
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
      </View>
    </KeyboardAwareLayout>
  );
};

export default signupCustomer;
