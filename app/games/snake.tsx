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
    backgroundColor: '#f3f4f6',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  scoreText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  button: {
    backgroundColor: '#10b981',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  gridContainer: {
    alignSelf: 'center',
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 12,
  },
  grid: {
    borderWidth: 2,
    borderColor: '#10b981',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    borderWidth: 0.5,
    borderColor: '#e5e7eb',
    backgroundColor: '#fff',
  },
  snakeCell: {
    backgroundColor: '#10b981',
  },
  foodCell: {
    backgroundColor: '#ef4444',
  },
  controls: {
    marginTop: 24,
    alignItems: 'center',
  },
  controlRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginTop: 12,
  },
  controlButton: {
    width: 60,
    height: 60,
    backgroundColor: '#10b981',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlText: {
    fontSize: 32,
    color: '#fff',
  },
  infoContainer: {
    marginTop: 24,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  infoText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  comingSoon: {
    fontSize: 12,
    color: '#10b981',
    fontStyle: 'italic',
  },
});
