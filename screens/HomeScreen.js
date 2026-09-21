import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { listBooks } from '../components/Library';
import BookCard from '../components/Sharing';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { TouchableOpacity } from 'react-native';
import homeStyle from '../style/homescreen_style';

// Pulsing FAB
function PulsingFab({ onPress }) {
  const scale = useSharedValue(1);

  React.useEffect(() => {
    scale.value = withRepeat(
      withSequence(
        withTiming(1.1, { duration: 600 }),
        withTiming(1, { duration: 600 })
      ),
      -1,
      true
    );
  }, []);

  const style = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={[homeStyle.fab, style]}>
      <TouchableOpacity onPress={onPress}>
        <Text style={homeStyle.fabText}>＋</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

export default function HomeScreen({ navigation }) {
  const [books, setBooks] = useState([]);

  const loadBooks = async () => {
    const data = await listBooks();
    setBooks(data);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadBooks);
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={homeStyle.container}>
      <Text style={homeStyle.header}>Min læseliste af bøger</Text>

      {books.length === 0 ? (
        <View style={homeStyle.empty}>
          <Text style={homeStyle.emptyText}>Ingen bøger endnu. Tilføj din første!</Text>
        </View>
      ) : (
        <FlatList
          data={books}
          keyExtractor={(b) => b.id}
          renderItem={({ item, index }) => <BookCard item={item} index={index} />}
          numColumns={2}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      )}

      <PulsingFab onPress={() => navigation.navigate('Camera')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB', padding: 10 },
  header: { fontSize: 28, fontWeight: 'bold', marginVertical: 20, textAlign: 'center', color: '#333' },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emptyText: { fontSize: 16, color: '#666' },
});

const fabStyles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 65,
    height: 65,
    borderRadius: 32,
    backgroundColor: '#4B7BE5',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 4,
  },
  fabText: { fontSize: 30, color: '#fff', fontWeight: 'bold' },
});
