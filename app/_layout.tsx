import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#6366f1',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: 'Mini Games Box',
          }}
        />
        <Stack.Screen
          name="games/block-puzzle"
          options={{
            title: '1010 Block Puzzle',
          }}
        />
        <Stack.Screen
          name="games/snake"
          options={{
            title: 'Snake',
          }}
        />
        <Stack.Screen
          name="games/sudoku"
          options={{
            title: 'Sudoku',
          }}
        />
        <Stack.Screen
          name="games/sokoban"
          options={{
            title: 'Sokoban',
          }}
        />
        <Stack.Screen
          name="games/merge-fruits"
          options={{
            title: 'Merge Fruits',
          }}
        />
        <Stack.Screen
          name="games/tetris"
          options={{
            title: 'Tetris',
          }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}
