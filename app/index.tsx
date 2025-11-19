import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

interface Game {
  id: string;
  title: string;
  description: string;
  icon: string;
  route: string;
  color: string;
}

const games: Game[] = [
  {
    id: 'block-puzzle',
    title: '1010 Block Puzzle',
    description: 'Easy but addictive puzzle game',
    icon: '🧩',
    route: '/games/block-puzzle',
    color: '#8b5cf6',
  },
  {
    id: 'snake',
    title: 'Snake',
    description: 'Classic arcade fun',
    icon: '🐍',
    route: '/games/snake',
    color: '#10b981',
  },
  {
    id: 'sudoku',
    title: 'Sudoku',
    description: 'Improve your focus',
    icon: '🔢',
    route: '/games/sudoku',
    color: '#f59e0b',
  },
  {
    id: 'sokoban',
    title: 'Sokoban',
    description: 'Push-box logic challenge',
    icon: '📦',
    route: '/games/sokoban',
    color: '#ef4444',
  },
  {
    id: 'merge-fruits',
    title: 'Merge Fruits',
    description: 'Satisfying merges',
    icon: '🍉',
    route: '/games/merge-fruits',
    color: '#ec4899',
  },
  {
    id: 'tetris',
    title: 'Tetris',
    description: 'Classic falling blocks',
    icon: '🎮',
    route: '/games/tetris',
    color: '#3b82f6',
  },
];

export default function Home() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Choose Your Game</Text>
        <Text style={styles.headerSubtitle}>6 Classic Games to Play</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.gamesContainer}
        showsVerticalScrollIndicator={false}
      >
        {games.map((game) => (
          <Link key={game.id} href={game.route} asChild>
            <TouchableOpacity
              style={[styles.gameCard, { borderLeftColor: game.color }]}
              activeOpacity={0.7}
            >
              <View style={styles.gameContent}>
                <Text style={styles.gameIcon}>{game.icon}</Text>
                <View style={styles.gameInfo}>
                  <Text style={styles.gameTitle}>{game.title}</Text>
                  <Text style={styles.gameDescription}>{game.description}</Text>
                </View>
              </View>
            </TouchableOpacity>
          </Link>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Tap any game to start playing!</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  header: {
    backgroundColor: '#6366f1',
    paddingVertical: 24,
    paddingHorizontal: 20,
    ...Platform.select({
      web: {
        paddingTop: 40,
      },
    }),
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#e0e7ff',
  },
  gamesContainer: {
    padding: 16,
    paddingBottom: 80,
  },
  gameCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    borderLeftWidth: 6,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
      web: {
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      },
    }),
  },
  gameContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  gameIcon: {
    fontSize: 48,
    marginRight: 16,
  },
  gameInfo: {
    flex: 1,
  },
  gameTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  gameDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  footerText: {
    textAlign: 'center',
    color: '#6b7280',
    fontSize: 14,
  },
});
