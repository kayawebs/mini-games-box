import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
          headerShadowVisible: false,
          headerTintColor: '#1F2937',
          headerTitleStyle: {
            fontWeight: '700',
            fontSize: 18,
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="games/block-puzzle"
          options={{
            title: '1010 Block Puzzle',
            headerStyle: {
              backgroundColor: '#E9D5FF',
            },
          }}
        />
        <Stack.Screen
          name="games/snake"
          options={{
            title: 'Snake',
            headerStyle: {
              backgroundColor: '#A7F3D0',
            },
          }}
        />
        <Stack.Screen
          name="games/sudoku"
          options={{
            title: 'Sudoku',
            headerStyle: {
              backgroundColor: '#FEF3C7',
            },
          }}
        />
        <Stack.Screen
          name="games/sokoban"
          options={{
            title: 'Sokoban',
            headerStyle: {
              backgroundColor: '#FECACA',
            },
          }}
        />
        <Stack.Screen
          name="games/merge-fruits"
          options={{
            title: 'Merge Fruits',
            headerStyle: {
              backgroundColor: '#FBCFE8',
            },
          }}
        />
        <Stack.Screen
          name="games/tetris"
          options={{
            title: 'Tetris',
            headerStyle: {
              backgroundColor: '#BFDBFE',
            },
          }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}
