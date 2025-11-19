import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';

const GRID_SIZE = 10;

export default function BlockPuzzle() {
  const router = useRouter();
  const [score, setScore] = useState(0);
  const [grid, setGrid] = useState<boolean[][]>(
    Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(false))
  );

  const resetGame = () => {
    setGrid(Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(false)));
    setScore(0);
  };

  const handleCellPress = (row: number, col: number) => {
    const newGrid = [...grid];
    newGrid[row][col] = !newGrid[row][col];
    setGrid(newGrid);
    setScore(score + 10);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.scoreText}>Score: {score}</Text>
        <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
          <Text style={styles.resetButtonText}>Reset</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.gridContainer}>
        {grid.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((cell, colIndex) => (
              <TouchableOpacity
                key={`${rowIndex}-${colIndex}`}
                style={[
                  styles.cell,
                  cell && styles.cellFilled,
                ]}
                onPress={() => handleCellPress(rowIndex, colIndex)}
              />
            ))}
          </View>
        ))}
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>🧩 1010 Block Puzzle</Text>
        <Text style={styles.infoSubtext}>
          Tap cells to fill them. Complete rows or columns to score!
        </Text>
        <Text style={styles.comingSoon}>Full gameplay coming soon...</Text>
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
  resetButton: {
    backgroundColor: '#8b5cf6',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  resetButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  gridContainer: {
    alignSelf: 'center',
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 12,
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderColor: '#d1d5db',
    margin: 1,
    backgroundColor: '#fff',
  },
  cellFilled: {
    backgroundColor: '#8b5cf6',
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
  infoSubtext: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  comingSoon: {
    marginTop: 12,
    fontSize: 12,
    color: '#8b5cf6',
    fontStyle: 'italic',
  },
});
