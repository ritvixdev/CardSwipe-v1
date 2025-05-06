import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { jsContent } from '@/data/javascript-content';
import { useBookmarkStore } from '@/hooks/use-bookmarks';
import EmptyState from '@/components/EmptyState';
import Colors from '@/constants/colors';
import { Bookmark, ChevronRight, Code } from 'lucide-react-native';

export default function BookmarksScreen() {
  const router = useRouter();
  const { bookmarkedCards, clearAllBookmarks } = useBookmarkStore();
  
  // Get the bookmarked card objects
  const bookmarkedContent = jsContent.filter(card => 
    bookmarkedCards.includes(card.id)
  );
  
  const handleCardPress = (cardId: string) => {
    router.push({
      pathname: '/card-details',
      params: { cardId }
    });
  };
  
  const renderCard = ({ item }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => handleCardPress(item.id)}
    >
      <View style={styles.cardHeader}>
        <View style={styles.dayBadge}>
          <Text style={styles.dayText}>Day {item.day}</Text>
        </View>
        <Bookmark size={16} color={Colors.bookmark} />
      </View>
      
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.summary} numberOfLines={2}>{item.summary}</Text>
      
      {item.codeExample && (
        <View style={styles.codeIndicator}>
          <Code size={14} color={Colors.primary} />
          <Text style={styles.codeIndicatorText}>Includes code example</Text>
        </View>
      )}
      
      <View style={styles.cardFooter}>
        <Text style={styles.viewDetailsText}>View Details</Text>
        <ChevronRight size={16} color={Colors.primary} />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Bookmarks',
          headerRight: bookmarkedContent.length > 0 ? () => (
            <TouchableOpacity 
              style={styles.clearButton} 
              onPress={clearAllBookmarks}
            >
              <Text style={styles.clearButtonText}>Clear All</Text>
            </TouchableOpacity>
          ) : undefined
        }} 
      />
      
      {bookmarkedContent.length > 0 ? (
        <FlatList
          data={bookmarkedContent}
          renderItem={renderCard}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <EmptyState
          title="No Bookmarks Yet"
          description="Swipe right on cards you want to save for later, and they'll appear here."
          icon={<Bookmark size={48} color={Colors.primary} />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  listContent: {
    padding: 16,
  },
  card: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  dayBadge: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  dayText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
  },
  summary: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginBottom: 12,
  },
  codeIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  codeIndicatorText: {
    marginLeft: 6,
    color: Colors.primary,
    fontSize: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  viewDetailsText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '500',
    marginRight: 4,
  },
  clearButton: {
    marginRight: 16,
  },
  clearButtonText: {
    color: Colors.danger,
    fontSize: 14,
    fontWeight: '500',
  },
});