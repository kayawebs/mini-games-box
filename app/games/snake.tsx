import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useState, useEffect, useRef } from 'react';

const GRID_SIZE = 15;
const CELL_SIZE = 20;

interface Position {
  x: number;
  y: number;
}

export default function Snake() {
  const [snake, setSnake] = useState<Position[]>([{ x: 7, y: 7 }]);
  const [food, setFood] = useState<Position>({ x: 3, y: 3 });
  const [direction, setDirection] = useState<'UP' | 'DOWN' | 'LEFT' | 'RIGHT'>('RIGHT');
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const generateFood = (): Position => {
    return {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
  };

  const resetGame = () => {
    setSnake([{ x: 7, y: 7 }]);
    setFood(generateFood());
    setDirection('RIGHT');
    setGameOver(false);
    setScore(0);
    setIsPlaying(false);
  };

  const startGame = () => {
    setIsPlaying(true);
    setGameOver(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.scoreText}>Score: {score}</Text>
        {!isPlaying && !gameOver && (
          <TouchableOpacity style={styles.button} onPress={startGame}>
            <Text style={styles.buttonText}>Start</Text>
          </TouchableOpacity>
        )}
        {gameOver && (
          <TouchableOpacity style={styles.button} onPress={resetGame}>
            <Text style={styles.buttonText}>Reset</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.gridContainer}>
        <View style={styles.grid}>
          {Array(GRID_SIZE).fill(null).map((_, row) => (
            <View key={row} style={styles.row}>
              {Array(GRID_SIZE).fill(null).map((_, col) => {
                const isSnake = snake.some(s => s.x === col && s.y === row);
                const isFood = food.x === col && food.y === row;
                return (
                  <View
                    key={`${row}-${col}`}
                    style={[
                      styles.cell,
                      isSnake && styles.snakeCell,
                      isFood && styles.foodCell,
                    ]}
                  />
                );
              })}
            </View>
          ))}
        </View>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity
          style={styles.controlButton}
          onPress={() => setDirection('UP')}
        >
          <Text style={styles.controlText}>↑</Text>
        </TouchableOpacity>
        <View style={styles.controlRow}>
          <TouchableOpacity
            style={styles.controlButton}
            onPress={() => setDirection('LEFT')}
          >
            <Text style={styles.controlText}>←</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.controlButton}
            onPress={() => setDirection('DOWN')}
          >
            <Text style={styles.controlText}>↓</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.controlButton}
            onPress={() => setDirection('RIGHT')}
          >
            <Text style={styles.controlText}>→</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>🐍 Classic Snake Game</Text>
        <Text style={styles.comingSoon}>Full game logic coming soon...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  scoreText: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1F2937',
  },
  button: {
    backgroundColor: '#34D399',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 16,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  gridContainer: {
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  grid: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    backgroundColor: '#F0FDF4',
  },
  snakeCell: {
    backgroundColor: '#34D399',
  },
  foodCell: {
    backgroundColor: '#F87171',
  },
  controls: {
    marginTop: 32,
    alignItems: 'center',
  },
  controlRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginTop: 16,
  },
  controlButton: {
    width: 64,
    height: 64,
    backgroundColor: '#34D399',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  controlText: {
    fontSize: 32,
    color: '#fff',
  },
  infoContainer: {
    marginTop: 24,
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
  },
  infoText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
  },
  comingSoon: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '500',
  },
});
