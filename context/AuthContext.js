// MODIFICAR TODO PARA QUE FUNCIONE

import {
  ASYNC_STORAGE_STRINGS,
  SECURE_STORE_STRINGS,
} from '@/configs/constants';
import { COLORS } from '@/constants/Colors';
import { LoginService } from '@/services/login.service';
import {
  deleteFromStorage,
  deleteSecurely,
  fetchFromStorage,
  fetchSecurely,
  saveSecurely,
  saveToStorage,
} from '@/utils/storage';
import { router } from 'expo-router';
import { createContext, useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(false);
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const loadUserSession = async () => {
      try {
        const storedUser = await fetchFromStorage(
          ASYNC_STORAGE_STRINGS.userData
        );
        const storedAccessToken = await fetchSecurely(
          SECURE_STORE_STRINGS.accessToken
        );
        if (storedUser && storedAccessToken) {
          setUser(storedUser);
          setAccessToken(storedAccessToken);
          setSession(true);
        } else {
          // console.error('User or token is null');
        }
      } catch (error) {
        // console.error('Error loading sesion', error);
        setUser(null);
        setAccessToken(null);
      } finally {
        setLoading(false);
      }
    };

    loadUserSession();
  }, []);

  const signIn = async (body) => {
    try {
      setLoading(true);
      const data = await LoginService.login(body);
      setUser(data.user);
      await saveToStorage(ASYNC_STORAGE_STRINGS.userData, data.user);
      await saveSecurely(
        SECURE_STORE_STRINGS.accessToken,
        data.tokens.accessToken
      );
      await saveSecurely(
        SECURE_STORE_STRINGS.refreshToken,
        data.tokens.refreshToken
      );
      setSession(true);
    } catch (error) {
      // console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await LoginService.logOut();
      await deleteFromStorage(ASYNC_STORAGE_STRINGS.userData);
      await deleteSecurely(SECURE_STORE_STRINGS.accessToken);
      await deleteSecurely(SECURE_STORE_STRINGS.refreshToken);
      setSession(false);
      setUser(null);
      router.replace('/(auth)/login');
    } catch (error) {
      // console.error('Error al cerrar sesión: ', error);
      throw 'Error al cerrar sesión';
    }
  };

  contextData = { session, user, setUser, signIn, signOut };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? (
        <SafeAreaView className="flex-1 align-middle justify-center bg-white">
          <View className="items-center space-y-4">
            <ActivityIndicator size="large" color={COLORS.PRIMARY} />
            <Text className="text-lg text-gray-800 font-noto-regular mt-3">
              Cargando...
            </Text>
          </View>
        </SafeAreaView>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return authContext;
};

export { AuthContext, AuthProvider, useAuth };
