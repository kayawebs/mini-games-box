import { View, Text, StyleSheet, TouchableOpacity, Alert, Platform } from 'react-native';
import { useState, useEffect } from 'react';

const GRID_SIZE = 10;
const CELL_SIZE = 28;

// 定义方块形状
type Shape = number[][];

const SHAPES: Shape[] = [
  // 单格
  [[1]],

  // 2x2 正方形
  [[1, 1], [1, 1]],

  // 横向 2 格
  [[1, 1]],

  // 横向 3 格
  [[1, 1, 1]],

  // 横向 4 格
  [[1, 1, 1, 1]],

  // 横向 5 格
  [[1, 1, 1, 1, 1]],

  // 竖向 2 格
  [[1], [1]],

  // 竖向 3 格
  [[1], [1], [1]],

  // 竖向 4 格
  [[1], [1], [1], [1]],

  // 竖向 5 格
  [[1], [1], [1], [1], [1]],

  // L 形状
  [[1, 0], [1, 0], [1, 1]],
  [[1, 1, 1], [1, 0, 0]],
  [[1, 1], [0, 1], [0, 1]],
  [[0, 0, 1], [1, 1, 1]],

  // 3x3 正方形
  [[1, 1, 1], [1, 1, 1], [1, 1, 1]],

  // T 形状
  [[1, 1, 1], [0, 1, 0]],
  [[0, 1], [1, 1], [0, 1]],
];

interface Block {
  shape: Shape;
  id: number;
  color: string;
}

export default function BlockPuzzle() {
  const [grid, setGrid] = useState<number[][]>(
    Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(0))
  );
  const [score, setScore] = useState(0);
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [selectedBlock, setSelectedBlock] = useState<Block | null>(null);
  const [gameOver, setGameOver] = useState(false);

  // 生成随机方块
  const generateBlocks = (): Block[] => {
    const colors = ['#A78BFA', '#C084FC', '#E879F9'];
    return Array(3).fill(null).map((_, idx) => ({
      shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
      id: Date.now() + idx,
      color: colors[idx],
    }));
  };

  // 初始化游戏
  useEffect(() => {
    setBlocks(generateBlocks());
  }, []);

  // 检查是否可以放置方块
  const canPlaceBlock = (shape: Shape, row: number, col: number): boolean => {
    for (let i = 0; i < shape.length; i++) {
      for (let j = 0; j < shape[i].length; j++) {
        if (shape[i][j] === 1) {
          const gridRow = row + i;
          const gridCol = col + j;

          if (gridRow >= GRID_SIZE || gridCol >= GRID_SIZE || grid[gridRow][gridCol] !== 0) {
            return false;
          }
        }
      }
    }
    return true;
  };

  // 放置方块
  const placeBlock = (block: Block, row: number, col: number) => {
    if (!canPlaceBlock(block.shape, row, col)) {
      Alert.alert('Invalid Move', 'Cannot place block here!');
      setSelectedBlock(null);
      return;
    }

    const newGrid = grid.map(r => [...r]);

    // 放置方块
    for (let i = 0; i < block.shape.length; i++) {
      for (let j = 0; j < block.shape[i].length; j++) {
        if (block.shape[i][j] === 1) {
          newGrid[row + i][col + j] = 1;
        }
      }
    }

    // 计算放置方块的分数
    let blockScore = 0;
    block.shape.forEach(row => {
      row.forEach(cell => {
        if (cell === 1) blockScore++;
      });
    });

    // 检查并消除完整的行和列
    const { clearedGrid, linesCleared } = clearCompleteLines(newGrid);

    setGrid(clearedGrid);
    setScore(score + blockScore + (linesCleared * 10));

    // 移除已使用的方块
    const newBlocks = blocks.filter(b => b.id !== block.id);
    setBlocks(newBlocks);

    // 如果所有方块都用完了，生成新的方块
    if (newBlocks.length === 0) {
      const freshBlocks = generateBlocks();
      setBlocks(freshBlocks);

      // 检查是否还能放置新方块
      setTimeout(() => {
        if (!canPlaceAnyBlock(clearedGrid, freshBlocks)) {
          setGameOver(true);
          Alert.alert('Game Over!', `Final Score: ${score + blockScore + (linesCleared * 10)}`);
        }
      }, 300);
    }

    setSelectedBlock(null);
  };

  // 消除完整的行和列
  const clearCompleteLines = (currentGrid: number[][]): { clearedGrid: number[][], linesCleared: number } => {
    let linesCleared = 0;
    const newGrid = currentGrid.map(r => [...r]);

    // 检查行
    for (let i = 0; i < GRID_SIZE; i++) {
      if (newGrid[i].every(cell => cell === 1)) {
        newGrid[i] = Array(GRID_SIZE).fill(0);
        linesCleared++;
      }
    }

    // 检查列
    for (let j = 0; j < GRID_SIZE; j++) {
      let isComplete = true;
      for (let i = 0; i < GRID_SIZE; i++) {
        if (newGrid[i][j] === 0) {
          isComplete = false;
          break;
        }
      }
      if (isComplete) {
        for (let i = 0; i < GRID_SIZE; i++) {
          newGrid[i][j] = 0;
        }
        linesCleared++;
      }
    }

    return { clearedGrid: newGrid, linesCleared };
  };

  // 检查是否还能放置任何方块
  const canPlaceAnyBlock = (currentGrid: number[][], currentBlocks: Block[]): boolean => {
    for (const block of currentBlocks) {
      for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
          let canPlace = true;
          for (let bi = 0; bi < block.shape.length; bi++) {
            for (let bj = 0; bj < block.shape[bi].length; bj++) {
              if (block.shape[bi][bj] === 1) {
                const gridRow = i + bi;
                const gridCol = j + bj;
                if (gridRow >= GRID_SIZE || gridCol >= GRID_SIZE || currentGrid[gridRow][gridCol] !== 0) {
                  canPlace = false;
                  break;
                }
              }
            }
            if (!canPlace) break;
          }
          if (canPlace) return true;
        }
      }
    }
    return false;
  };

  // 处理网格点击
  const handleGridPress = (row: number, col: number) => {
    if (selectedBlock) {
      placeBlock(selectedBlock, row, col);
    }
  };

  // 重置游戏
  const resetGame = () => {
    setGrid(Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(0)));
    setScore(0);
    setBlocks(generateBlocks());
    setSelectedBlock(null);
    setGameOver(false);
  };

  // 渲染方块形状
  const renderShape = (shape: Shape, color: string, size: number = 20) => {
    return (
      <View>
        {shape.map((row, i) => (
          <View key={i} style={{ flexDirection: 'row' }}>
            {row.map((cell, j) => (
              <View
                key={j}
                style={[
                  {
                    width: size,
                    height: size,
                    margin: 1,
                  },
                  cell === 1 ? { backgroundColor: color, borderRadius: 4 } : { backgroundColor: 'transparent' }
                ]}
              />
            ))}
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* 顶部分数和重置按钮 */}
      <View style={styles.header}>
        <View>
          <Text style={styles.scoreLabel}>SCORE</Text>
          <Text style={styles.scoreText}>{score}</Text>
        </View>
        <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
          <Text style={styles.resetButtonText}>↻ New Game</Text>
        </TouchableOpacity>
      </View>

      {/* 游戏网格 */}
      <View style={styles.gridContainer}>
        <View style={styles.grid}>
          {grid.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map((cell, colIndex) => (
                <TouchableOpacity
                  key={`${rowIndex}-${colIndex}`}
                  style={[
                    styles.cell,
                    cell === 1 && styles.cellFilled,
                  ]}
                  onPress={() => handleGridPress(rowIndex, colIndex)}
                  disabled={!selectedBlock}
                />
              ))}
            </View>
          ))}
        </View>
      </View>

      {/* 提示文字 */}
      {selectedBlock && (
        <View style={styles.hintContainer}>
          <Text style={styles.hintText}>Tap on the grid to place the block</Text>
        </View>
      )}

      {/* 可用方块 */}
      <View style={styles.blocksContainer}>
        <Text style={styles.blocksTitle}>Available Blocks</Text>
        <View style={styles.blocksRow}>
          {blocks.map((block) => (
            <TouchableOpacity
              key={block.id}
              style={[
                styles.blockWrapper,
                selectedBlock?.id === block.id && styles.blockWrapperSelected,
              ]}
              onPress={() => setSelectedBlock(block)}
            >
              {renderShape(block.shape, block.color, 18)}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 游戏说明 */}
      <View style={styles.instructions}>
        <Text style={styles.instructionsText}>
          🎯 Select a block, then tap on the grid to place it
        </Text>
        <Text style={styles.instructionsText}>
          ✨ Complete rows or columns to clear them
        </Text>
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
  scoreLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
    letterSpacing: 1,
  },
  scoreText: {
    fontSize: 36,
    fontWeight: '800',
    color: '#1F2937',
  },
  resetButton: {
    backgroundColor: '#A78BFA',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 16,
  },
  resetButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  gridContainer: {
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
      },
      android: {
        elevation: 4,
      },
      web: {
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      },
    }),
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
    margin: 1,
    backgroundColor: '#F3F4F6',
    borderRadius: 4,
  },
  cellFilled: {
    backgroundColor: '#A78BFA',
  },
  hintContainer: {
    marginTop: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#FEF3C7',
    borderRadius: 12,
    alignSelf: 'center',
  },
  hintText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#92400E',
    textAlign: 'center',
  },
  blocksContainer: {
    marginTop: 24,
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
      web: {
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
      },
    }),
  },
  blocksTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#6B7280',
    marginBottom: 16,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  blocksRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    gap: 12,
  },
  blockWrapper: {
    padding: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    borderWidth: 3,
    borderColor: 'transparent',
    minWidth: 80,
    minHeight: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blockWrapperSelected: {
    borderColor: '#A78BFA',
    backgroundColor: '#F5F3FF',
  },
  instructions: {
    marginTop: 20,
    gap: 8,
  },
  instructionsText: {
    fontSize: 13,
    color: '#6B7280',
    textAlign: 'center',
    fontWeight: '500',
  },
});
