import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { ContentCard } from '@/types/content';
import Colors from '@/constants/colors';
import { useBookmarkStore } from '@/hooks/use-bookmarks';
import { useProgressStore } from '@/hooks/use-progress';
import { Bookmark, Code, CheckCircle, BookmarkX } from 'lucide-react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

interface CardDetailsProps {
  card: ContentCard;
}

export default function CardDetails({ card }: CardDetailsProps) {
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarkStore();
  const { markCardCompleted, isCardCompleted } = useProgressStore();
  const [completed, setCompleted] = useState(isCardCompleted(card.id));
  const [bookmarked, setBookmarked] = useState(isBookmarked(card.id));

  const handleToggleBookmark = () => {
    if (bookmarked) {
      removeBookmark(card.id);
    } else {
      addBookmark(card.id);
    }
    setBookmarked(!bookmarked);
  };

  const handleMarkCompleted = () => {
    markCardCompleted(card.id);
    setCompleted(true);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <View style={styles.dayBadge}>
          <Text style={styles.dayText}>Day {card.day}</Text>
        </View>
        
        <TouchableOpacity 
          style={[styles.bookmarkButton, bookmarked ? styles.bookmarkButtonActive : {}]} 
          onPress={handleToggleBookmark}
        >
          {bookmarked ? (
            <>
              <BookmarkX size={18} color="#fff" />
              <Text style={styles.bookmarkButtonTextActive}>Remove Bookmark</Text>
            </>
          ) : (
            <>
              <Bookmark size={18} color={Colors.bookmark} />
              <Text style={styles.bookmarkButtonText}>Bookmark</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
      
      <Text style={styles.title}>{card.title}</Text>
      
      <View style={styles.tagsContainer}>
        {card.tags.map((tag, index) => (
          <View key={index} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>
      
      <Text style={styles.content}>{card.content}</Text>
      
      {card.codeExample && (
        <View style={styles.codeContainer}>
          <View style={styles.codeHeader}>
            <Code size={16} color={Colors.primary} />
            <Text style={styles.codeHeaderText}>Code Example</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Text style={styles.codeText}>{card.codeExample}</Text>
          </ScrollView>
        </View>
      )}
      
      {!completed && (
        <TouchableOpacity style={styles.completeButton} onPress={handleMarkCompleted}>
          <CheckCircle size={20} color="#fff" />
          <Text style={styles.completeButtonText}>Mark as Completed</Text>
        </TouchableOpacity>
      )}
      
      {completed && (
        <View style={styles.completedBadge}>
          <CheckCircle size={20} color={Colors.success} />
          <Text style={styles.completedText}>Completed</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  dayBadge: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  dayText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  bookmarkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.bookmark,
  },
  bookmarkButtonActive: {
    backgroundColor: Colors.bookmark,
    borderColor: Colors.bookmark,
  },
  bookmarkButtonText: {
    color: Colors.bookmark,
    marginLeft: 6,
    fontWeight: '500',
    fontSize: 14,
  },
  bookmarkButtonTextActive: {
    color: '#fff',
    marginLeft: 6,
    fontWeight: '500',
    fontSize: 14,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  tag: {
    backgroundColor: 'rgba(74, 111, 165, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    color: Colors.primary,
    fontSize: 12,
    fontWeight: '500',
  },
  content: {
    fontSize: 16,
    color: Colors.text,
    lineHeight: 24,
    marginBottom: 24,
  },
  codeContainer: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  codeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  codeHeaderText: {
    color: Colors.primary,
    fontWeight: '600',
    marginLeft: 8,
  },
  codeText: {
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  completeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.success,
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 8,
  },
  completeButtonText: {
    color: '#fff',
    fontWeight: '600',
    marginLeft: 8,
    fontSize: 16,
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 8,
  },
  completedText: {
    color: Colors.success,
    fontWeight: '600',
    marginLeft: 8,
    fontSize: 16,
  },
});