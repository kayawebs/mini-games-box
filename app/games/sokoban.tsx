import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useState } from 'react';

const LEVEL_1 = [
  ['#', '#', '#', '#', '#', '#', '#'],
  ['#', ' ', ' ', ' ', ' ', ' ', '#'],
  ['#', ' ', 'B', ' ', 'T', ' ', '#'],
  ['#', ' ', ' ', 'P', ' ', ' ', '#'],
  ['#', ' ', ' ', ' ', ' ', ' ', '#'],
  ['#', '#', '#', '#', '#', '#', '#'],
];

export default function Sokoban() {
  const [level, setLevel] = useState(LEVEL_1);
  const [playerPos, setPlayerPos] = useState({ x: 3, y: 3 });
  const [moves, setMoves] = useState(0);

  const resetGame = () => {
    setLevel(LEVEL_1.map(row => [...row]));
    setPlayerPos({ x: 3, y: 3 });
    setMoves(0);
  };

  const move = (direction: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT') => {
    setMoves(moves + 1);
    // Game logic will be implemented
  };

  const renderCell = (cell: string, row: number, col: number) => {
    const isPlayer = playerPos.x === col && playerPos.y === row;
    let emoji = '';
    let bgColor = '#fff';

    if (cell === '#') {
      emoji = '🧱';
      bgColor = '#6b7280';
    } else if (cell === 'B') {
      emoji = '📦';
    } else if (cell === 'T') {
      emoji = '🎯';
      bgColor = '#fef3c7';
    } else if (isPlayer) {
      emoji = '🧑';
    }

    return (
      <View key={`${row}-${col}`} style={[styles.cell, { backgroundColor: bgColor }]}>
        <Text style={styles.cellEmoji}>{emoji}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.scoreText}>Moves: {moves}</Text>
        <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
          <Text style={styles.resetButtonText}>Reset</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.gridContainer}>
        {level.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((cell, colIndex) => renderCell(cell, rowIndex, colIndex))}
          </View>
        ))}
      </View>

      <View style={styles.controls}>
        <TouchableOpacity
          style={styles.controlButton}
          onPress={() => move('UP')}
        >
          <Text style={styles.controlText}>↑</Text>
        </TouchableOpacity>
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
        <Text style={styles.infoText}>📦 Sokoban Puzzle</Text>
        <Text style={styles.infoSubtext}>
          Push boxes (📦) to targets (🎯)
        </Text>
        <Text style={styles.comingSoon}>Full game mechanics coming soon...</Text>
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
    backgroundColor: '#ef4444',
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
    width: 45,
    height: 45,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cellEmoji: {
    fontSize: 28,
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
    backgroundColor: '#ef4444',
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
  infoSubtext: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  comingSoon: {
    fontSize: 12,
    color: '#ef4444',
    fontStyle: 'italic',
  },
});
