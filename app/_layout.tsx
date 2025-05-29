import { ThemeProvider } from '@/context/theme.context';
import { Stack } from 'expo-router';
import './global.css';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack />
    </ThemeProvider>
  );
}
