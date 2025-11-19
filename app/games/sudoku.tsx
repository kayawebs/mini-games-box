import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useState } from 'react';

const GRID_SIZE = 9;

export default function Sudoku() {
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [grid, setGrid] = useState<number[][]>(
    Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(0))
  );

  const handleCellPress = (row: number, col: number) => {
    setSelectedCell({ row, col });
  };

  const handleNumberPress = (number: number) => {
    if (selectedCell) {
      const newGrid = [...grid];
      newGrid[selectedCell.row][selectedCell.col] = number;
      setGrid(newGrid);
    }
  };

  const resetGame = () => {
    setGrid(Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(0)));
    setSelectedCell(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Sudoku</Text>
        <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
          <Text style={styles.resetButtonText}>Reset</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.gridContainer}>
        {grid.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((cell, colIndex) => {
              const isSelected = selectedCell?.row === rowIndex && selectedCell?.col === colIndex;
              const is3x3Border = (rowIndex + 1) % 3 === 0 && rowIndex !== GRID_SIZE - 1;
              const is3x3BorderCol = (colIndex + 1) % 3 === 0 && colIndex !== GRID_SIZE - 1;

              return (
                <TouchableOpacity
                  key={`${rowIndex}-${colIndex}`}
                  style={[
                    styles.cell,
                    isSelected && styles.cellSelected,
                    is3x3Border && styles.cell3x3BorderBottom,
                    is3x3BorderCol && styles.cell3x3BorderRight,
                  ]}
                  onPress={() => handleCellPress(rowIndex, colIndex)}
                >
                  <Text style={[styles.cellText, cell !== 0 && styles.cellTextFilled]}>
                    {cell !== 0 ? cell : ''}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </View>

      <View style={styles.numberPad}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
          <TouchableOpacity
            key={number}
            style={styles.numberButton}
            onPress={() => handleNumberPress(number)}
          >
            <Text style={styles.numberText}>{number}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>🔢 Sudoku Puzzle</Text>
        <Text style={styles.comingSoon}>Puzzle generation & validation coming soon...</Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  resetButton: {
    backgroundColor: '#f59e0b',
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
    padding: 4,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#1f2937',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 35,
    height: 35,
    borderWidth: 0.5,
    borderColor: '#d1d5db',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  cellSelected: {
    backgroundColor: '#fef3c7',
  },
  cell3x3BorderBottom: {
    borderBottomWidth: 2,
    borderBottomColor: '#1f2937',
  },
  cell3x3BorderRight: {
    borderRightWidth: 2,
    borderRightColor: '#1f2937',
  },
  cellText: {
    fontSize: 18,
    color: '#6b7280',
  },
  cellTextFilled: {
    color: '#1f2937',
    fontWeight: '600',
  },
  numberPad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 24,
    gap: 8,
  },
  numberButton: {
    width: 50,
    height: 50,
    backgroundColor: '#f59e0b',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberText: {
    fontSize: 24,
    fontWeight: 'bold',
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
    color: '#f59e0b',
    fontStyle: 'italic',
  },
});
