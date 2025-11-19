import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, Animated } from 'react-native';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useRef } from 'react';

interface Game {
  id: string;
  title: string;
  description: string;
  icon: string;
  route: string;
  gradient: string[];
}

const games: Game[] = [
  {
    id: 'block-puzzle',
    title: '1010',
    description: 'Block Puzzle',
    icon: '🧩',
    route: '/games/block-puzzle',
    gradient: ['#E9D5FF', '#DDD6FE'],
  },
  {
    id: 'snake',
    title: 'Snake',
    description: 'Classic Game',
    icon: '🐍',
    route: '/games/snake',
    gradient: ['#A7F3D0', '#6EE7B7'],
  },
  {
    id: 'sudoku',
    title: 'Sudoku',
    description: 'Number Puzzle',
    icon: '🔢',
    route: '/games/sudoku',
    gradient: ['#FEF3C7', '#FDE68A'],
  },
  {
    id: 'sokoban',
    title: 'Sokoban',
    description: 'Push Box',
    icon: '📦',
    route: '/games/sokoban',
    gradient: ['#FECACA', '#FCA5A5'],
  },
  {
    id: 'merge-fruits',
    title: 'Merge',
    description: 'Fruits Game',
    icon: '🍉',
    route: '/games/merge-fruits',
    gradient: ['#FBCFE8', '#F9A8D4'],
  },
  {
    id: 'tetris',
    title: 'Tetris',
    description: 'Falling Blocks',
    icon: '🎮',
    route: '/games/tetris',
    gradient: ['#BFDBFE', '#93C5FD'],
  },
];

function GameCard({ game }: { game: Game }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Link href={game.route} asChild>
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.gameCardWrapper}
      >
        <Animated.View
          style={[
            styles.gameCard,
            {
              backgroundColor: game.gradient[0],
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <Text style={styles.gameIcon}>{game.icon}</Text>
          <Text style={styles.gameTitle}>{game.title}</Text>
          <Text style={styles.gameDescription}>{game.description}</Text>
        </Animated.View>
      </TouchableOpacity>
    </Link>
  );
}

export default function Home() {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Mini Games Box</Text>
          <Text style={styles.headerSubtitle}>Choose your favorite game</Text>
        </View>

        <View style={styles.gamesGrid}>
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  scrollContent: {
    paddingTop: Platform.OS === 'web' ? 60 : 40,
    paddingBottom: 40,
  },
  header: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  headerTitle: {
    fontSize: 36,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
  },
  gamesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 16,
    justifyContent: 'center',
  },
  gameCardWrapper: {
    width: Platform.OS === 'web' ? 'calc(33.333% - 12px)' : '31%',
    aspectRatio: 1,
    minWidth: 140,
    maxWidth: 200,
  },
  gameCard: {
    flex: 1,
    borderRadius: 24,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
      },
      android: {
        elevation: 4,
      },
      web: {
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
      },
    }),
  },
  gameIcon: {
    fontSize: 56,
    marginBottom: 12,
  },
  gameTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 4,
  },
  gameDescription: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    fontWeight: '500',
  },
});
