import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@/context/theme.context';
import { Slot } from 'expo-router';
import './global.css';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Slot />
      </AuthProvider>
    </ThemeProvider>
  );
}
