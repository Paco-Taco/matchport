import FormWarningMessage from '@/components/shared/molecules/FormWarningMessage';
import { GenericLoader } from '@/components/shared/molecules/GenericLoader';
import KeyboardAwareLayout from '@/components/shared/molecules/KeyboardAwareLayout';
import LabeledTextInput from '@/components/shared/molecules/LabeledTextInput';
import PhoneInput from '@/components/shared/molecules/PhoneNumberInput';
import ImageUpload from '@/components/shared/organisms/ImageUpload';
import { useFormState } from '@/hooks/useFormState';
import { useValidations } from '@/hooks/useValidation';
import { RegisterPayload, registerUser } from '@/services/authService';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Pressable, Text, View } from 'react-native';

const signupCustomer = () => {
  const router = useRouter();

  const [credentials, handleInputChange] = useFormState<RegisterPayload>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    rfc: '',
    password: '',
    ine: null,
    profilePhoto: null,
  });

  const {
    validateName,
    validateEmail,
    validateRfc,
    validatePassword,
    getPasswordCriteriaStatus,
  } = useValidations();

  const password = credentials.password;
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const isValidName = validateName(credentials.firstName);
  const isValidLastName = validateName(credentials.lastName);
  const isValidEmail = validateEmail(credentials.email);
  const isValidRfc = validateRfc(credentials.rfc);
  const isPasswordValid = validatePassword(password);
  const passwordsMatch =
    credentials.password && confirmedPassword
      ? credentials.password === confirmedPassword
      : true;

  const criteriaList = getPasswordCriteriaStatus(password);

  const handleSubmit = async () => {
    if (isFormComplete) {
      try {
        setIsLoading(true);
        const result = await registerUser(credentials);
        console.log('Usuario creao: ', result);
      } catch (error) {
        Alert.alert('Error en el registro', String(error));
      } finally {
        setIsLoading(false);
      }
    }
  };

  const isFormComplete =
    credentials.firstName &&
    credentials.lastName &&
    credentials.phoneNumber &&
    credentials.rfc &&
    credentials.password &&
    confirmedPassword &&
    credentials.ine &&
    isValidName &&
    isValidLastName &&
    isValidRfc &&
    isValidEmail &&
    isPasswordValid &&
    passwordsMatch;

  if (isLoading) return <GenericLoader label="Cargando..." />;

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
          <ImageUpload
            variant="circle"
            onChange={(file) => handleInputChange('profilePhoto', file)}
          />
        </View>
      </View>

      {/* Nombre */}
      <LabeledTextInput
        label="Nombre(s)"
        onChangeText={(value) => handleInputChange('firstName', value)}
        value={credentials.firstName}
        placeholder="Ingresa tu(s) nombre(s)"
      />
      {credentials.firstName.length > 0 && !isValidName && (
        <FormWarningMessage>
          El nombre debe tener de 2 a 50 letras y solo puede incluir letras,
          espacios, guiones o comillas.
        </FormWarningMessage>
      )}

      {/* Apellido */}
      <LabeledTextInput
        label="Apellido(s)"
        onChangeText={(value) => handleInputChange('lastName', value)}
        value={credentials.lastName}
        placeholder="Ingresa tu(s) apellido(s)"
      />
      {credentials.lastName.length > 0 && !isValidLastName && (
        <FormWarningMessage>
          El apellido debe tener de 2 a 50 letras y solo puede incluir letras,
          espacios, guiones o comillas.
        </FormWarningMessage>
      )}

      {/* RFC */}
      <LabeledTextInput
        label="RFC"
        onChangeText={(value) => handleInputChange('rfc', value)}
        value={credentials.rfc}
        placeholder="Ingresa tu RFC"
      />
      {credentials.rfc.length > 0 && !isValidRfc && (
        <FormWarningMessage>
          Ingresa un RFC válido con el formato correcto.
        </FormWarningMessage>
      )}

      {/* Email */}
      <LabeledTextInput
        label="Correo Electrónico"
        onChangeText={(value) => handleInputChange('email', value)}
        value={credentials.email}
        placeholder="ejemplo@correo.com"
      />
      {credentials.email.length > 0 && !isValidEmail && (
        <FormWarningMessage>
          Ingresa un correo electrónico válido.
        </FormWarningMessage>
      )}

      {/* Teléfono */}
      <PhoneInput
        onChange={(value) => handleInputChange('phoneNumber', value)}
      />

      {/* Contraseña */}
      <LabeledTextInput
        secure
        label="Contraseña"
        onChangeText={(value) => handleInputChange('password', value)}
        value={password}
        placeholder="Crea una contraseña"
      />
      {password.length > 0 && (
        <View className="mb-4">
          {criteriaList.map((item, index) => (
            <Text
              key={index}
              className={`text-sm mb-1 font-regular ${
                item.isValid ? 'text-green-600' : 'text-gray-400'
              }`}
            >
              • {item.label}
            </Text>
          ))}
        </View>
      )}

      {/* Confirmar contraseña */}
      <LabeledTextInput
        secure
        label="Confirmar Contraseña"
        onChangeText={(value) => setConfirmedPassword(value)}
        value={confirmedPassword}
        placeholder="Vuelve a escribir tu contraseña"
      />
      {!passwordsMatch && (
        <FormWarningMessage>Las contraseñas no coinciden</FormWarningMessage>
      )}

      <ImageUpload
        label="INE"
        aspect={[5, 3]}
        onChange={(file) => handleInputChange('ine', file)}
      />

      {/* Botón de registro */}
      <View className="mb-12">
        <Pressable
          className={`py-5 my-8 rounded-xl ${
            !isFormComplete ? 'bg-gray-200' : 'bg-primary'
          }`}
          disabled={!isFormComplete}
          onPress={handleSubmit}
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
          <Text className="text-gray-500">
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
