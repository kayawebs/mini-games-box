import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useState } from 'react';

const FRUITS = ['🍇', '🍈', '🍉', '🍊', '🍋', '🍌', '🍍', '🥭', '🍎', '🍏', '🍑'];

interface Fruit {
  id: number;
  type: number;
  emoji: string;
  x: number;
  y: number;
}

export default function MergeFruits() {
  const [fruits, setFruits] = useState<Fruit[]>([]);
  const [score, setScore] = useState(0);
  const [nextFruit, setNextFruit] = useState(0);

  const resetGame = () => {
    setFruits([]);
    setScore(0);
    setNextFruit(Math.floor(Math.random() * 3));
  };

  const dropFruit = (x: number) => {
    const newFruit: Fruit = {
      id: Date.now(),
      type: nextFruit,
      emoji: FRUITS[nextFruit],
      x,
      y: 0,
    };
    setFruits([...fruits, newFruit]);
    setNextFruit(Math.floor(Math.random() * 3));
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

      <View style={styles.nextFruitContainer}>
        <Text style={styles.nextFruitLabel}>Next:</Text>
        <Text style={styles.nextFruitEmoji}>{FRUITS[nextFruit]}</Text>
      </View>

      <View style={styles.gameContainer}>
        <View style={styles.dropZone}>
          {fruits.map((fruit) => (
            <View
              key={fruit.id}
              style={[
                styles.fruit,
                { left: fruit.x * 50, top: fruit.y * 50 },
              ]}
            >
              <Text style={styles.fruitEmoji}>{fruit.emoji}</Text>
            </View>
          ))}
        </View>

        <View style={styles.dropButtons}>
          {[0, 1, 2, 3, 4].map((x) => (
            <TouchableOpacity
              key={x}
              style={styles.dropButton}
              onPress={() => dropFruit(x)}
            >
              <Text style={styles.dropButtonText}>↓</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>🍉 Merge Fruits</Text>
        <Text style={styles.infoSubtext}>
          Drop fruits and merge same types!
        </Text>
        <Text style={styles.comingSoon}>
          Physics & merge mechanics coming soon...
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
  resetButton: {
    backgroundColor: '#ec4899',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  resetButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  nextFruitContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  nextFruitLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginRight: 12,
  },
  nextFruitEmoji: {
    fontSize: 36,
  },
  gameContainer: {
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 8,
    width: 260,
  },
  dropZone: {
    height: 400,
    backgroundColor: '#fef3c7',
    borderRadius: 8,
    position: 'relative',
    borderWidth: 2,
    borderColor: '#ec4899',
  },
  fruit: {
    position: 'absolute',
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fruitEmoji: {
    fontSize: 32,
  },
  dropButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  dropButton: {
    width: 45,
    height: 45,
    backgroundColor: '#ec4899',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropButtonText: {
    fontSize: 24,
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
    color: '#ec4899',
    fontStyle: 'italic',
  },
});
