import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useState } from 'react';

const GRID_WIDTH = 10;
const GRID_HEIGHT = 20;
const CELL_SIZE = 20;

const COLORS = ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899'];

export default function Tetris() {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [lines, setLines] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [grid, setGrid] = useState<number[][]>(
    Array(GRID_HEIGHT).fill(null).map(() => Array(GRID_WIDTH).fill(0))
  );

  const resetGame = () => {
    setGrid(Array(GRID_HEIGHT).fill(null).map(() => Array(GRID_WIDTH).fill(0)));
    setScore(0);
    setLevel(1);
    setLines(0);
    setIsPlaying(false);
  };

  const startGame = () => {
    setIsPlaying(true);
  };

  const move = (direction: 'LEFT' | 'RIGHT' | 'DOWN' | 'ROTATE') => {
    // Game logic will be implemented
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.scoreText}>Score: {score}</Text>
          <Text style={styles.statsText}>Level: {level} | Lines: {lines}</Text>
        </View>
        {!isPlaying ? (
          <TouchableOpacity style={styles.button} onPress={startGame}>
            <Text style={styles.buttonText}>Start</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} onPress={resetGame}>
            <Text style={styles.buttonText}>Reset</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.gameArea}>
        <View style={styles.gridContainer}>
          {grid.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map((cell, colIndex) => (
                <View
                  key={`${rowIndex}-${colIndex}`}
                  style={[
                    styles.cell,
                    cell !== 0 && { backgroundColor: COLORS[cell - 1] },
                  ]}
                />
              ))}
            </View>
          ))}
        </View>

        <View style={styles.nextPieceContainer}>
          <Text style={styles.nextPieceLabel}>Next Piece</Text>
          <View style={styles.nextPiecePreview}>
            <Text style={styles.nextPieceText}>?</Text>
          </View>
        </View>
      </View>

      <View style={styles.controls}>
        <View style={styles.controlTopRow}>
          <TouchableOpacity
            style={styles.controlButton}
            onPress={() => move('ROTATE')}
          >
            <Text style={styles.controlText}>↻</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.controlRow}>
          <TouchableOpacity
            style={styles.controlButton}
            onPress={() => move('LEFT')}
          >
            <Text style={styles.controlText}>←</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.controlButton}
            onPress={() => move('DOWN')}
          >
            <Text style={styles.controlText}>↓</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.controlButton}
            onPress={() => move('RIGHT')}
          >
            <Text style={styles.controlText}>→</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>🎮 Classic Tetris</Text>
        <Text style={styles.comingSoon}>
          Piece spawning & line clearing coming soon...
        </Text>
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
  statsText: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  button: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  gameArea: {
    flexDirection: 'row',
    alignSelf: 'center',
    gap: 12,
  },
  gridContainer: {
    backgroundColor: '#1f2937',
    padding: 4,
    borderRadius: 8,
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    borderWidth: 0.5,
    borderColor: '#374151',
    backgroundColor: '#111827',
  },
  nextPieceContainer: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    height: 'fit-content',
  },
  nextPieceLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  nextPiecePreview: {
    width: 80,
    height: 80,
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextPieceText: {
    fontSize: 32,
    color: '#6b7280',
  },
  controls: {
    marginTop: 24,
    alignItems: 'center',
  },
  controlTopRow: {
    alignItems: 'center',
    marginBottom: 12,
  },
  controlRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  controlButton: {
    width: 60,
    height: 60,
    backgroundColor: '#3b82f6',
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
    color: '#3b82f6',
    fontStyle: 'italic',
  },
});
