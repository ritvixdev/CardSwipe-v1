import React, { useRef } from 'react';
import { StyleSheet, Text, View, Animated, PanResponder, Dimensions, TouchableOpacity, Platform } from 'react-native';
import { ContentCard } from '@/types/content';
import Colors from '@/constants/colors';
import { useBookmarkStore } from '@/hooks/use-bookmarks';
import { useProgressStore } from '@/hooks/use-progress';
import { Bookmark, X, Code, ChevronRight } from 'lucide-react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;

interface SwipeableCardProps {
  card: ContentCard;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  onExpand: () => void;
}

export default function SwipeableCard({ card, onSwipeLeft, onSwipeRight, onExpand }: SwipeableCardProps) {
  const { addBookmark, isBookmarked } = useBookmarkStore();
  const { markCardViewed } = useProgressStore();
  const position = useRef(new Animated.ValueXY()).current;
  const rotation = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: ['-10deg', '0deg', '10deg'],
    extrapolate: 'clamp'
  });

  const bookmarkOpacity = position.x.interpolate({
    inputRange: [0, SCREEN_WIDTH / 4],
    outputRange: [0, 1],
    extrapolate: 'clamp'
  });

  const rejectOpacity = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 4, 0],
    outputRange: [1, 0],
    extrapolate: 'clamp'
  });

  const cardStyle = {
    transform: [
      { translateX: position.x },
      { rotate: rotation }
    ]
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gesture) => {
        position.setValue({ x: gesture.dx, y: 0 });
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          swipeRight();
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          swipeLeft();
        } else {
          resetPosition();
        }
      }
    })
  ).current;

  const resetPosition = () => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      friction: 5,
      useNativeDriver: Platform.OS !== 'web',
    }).start();
  };

  const swipeLeft = () => {
    Animated.timing(position, {
      toValue: { x: -SCREEN_WIDTH, y: 0 },
      duration: 250,
      useNativeDriver: Platform.OS !== 'web',
    }).start(() => {
      onSwipeLeft();
      markCardViewed(card.id);
      position.setValue({ x: 0, y: 0 });
    });
  };

  const swipeRight = () => {
    Animated.timing(position, {
      toValue: { x: SCREEN_WIDTH, y: 0 },
      duration: 250,
      useNativeDriver: Platform.OS !== 'web',
    }).start(() => {
      onSwipeRight();
      addBookmark(card.id);
      markCardViewed(card.id);
      position.setValue({ x: 0, y: 0 });
    });
  };

  const handleExpand = () => {
    markCardViewed(card.id);
    onExpand();
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.card, cardStyle]}
        {...(Platform.OS !== 'web' ? panResponder.panHandlers : {})}
      >
        <View style={styles.cardContent}>
          <View style={styles.header}>
            <View style={styles.dayBadge}>
              <Text style={styles.dayText}>Day {card.day}</Text>
            </View>
            {isBookmarked(card.id) && (
              <View style={styles.bookmarkedBadge}>
                <Bookmark size={16} color={Colors.bookmark} />
                <Text style={styles.bookmarkedText}>Bookmarked</Text>
              </View>
            )}
          </View>
          
          <Text style={styles.title}>{card.title}</Text>
          <Text style={styles.summary}>{card.summary}</Text>
          
          {card.codeExample && (
            <View style={styles.codeIndicator}>
              <Code size={16} color={Colors.primary} />
              <Text style={styles.codeIndicatorText}>Includes code example</Text>
            </View>
          )}
          
          <TouchableOpacity style={styles.expandButton} onPress={handleExpand}>
            <Text style={styles.expandButtonText}>Learn More</Text>
            <ChevronRight size={16} color={Colors.primary} />
          </TouchableOpacity>
        </View>
        
        <Animated.View style={[styles.overlayContainer, styles.bookmarkOverlay, { opacity: bookmarkOpacity }]}>
          <Bookmark size={80} color={Colors.bookmark} />
          <Text style={styles.overlayText}>Bookmark</Text>
        </Animated.View>
        
        <Animated.View style={[styles.overlayContainer, styles.rejectOverlay, { opacity: rejectOpacity }]}>
          <X size={80} color={Colors.danger} />
          <Text style={[styles.overlayText, styles.rejectText]}>Skip</Text>
        </Animated.View>
      </Animated.View>
      
      {Platform.OS === 'web' && (
        <View style={styles.webControls}>
          <TouchableOpacity style={[styles.webButton, styles.rejectButton]} onPress={swipeLeft}>
            <X size={24} color="#fff" />
            <Text style={styles.webButtonText}>Skip</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.webButton, styles.bookmarkButton]} onPress={swipeRight}>
            <Bookmark size={24} color="#fff" />
            <Text style={styles.webButtonText}>Bookmark</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: SCREEN_WIDTH - 40,
    height: 400,
    backgroundColor: Colors.card,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    position: 'relative',
    overflow: 'hidden',
  },
  cardContent: {
    flex: 1,
    padding: 20,
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
  bookmarkedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 184, 108, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  bookmarkedText: {
    color: Colors.bookmark,
    marginLeft: 4,
    fontSize: 12,
    fontWeight: '500',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 12,
  },
  summary: {
    fontSize: 16,
    color: Colors.textSecondary,
    lineHeight: 24,
    marginBottom: 20,
  },
  codeIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 16,
  },
  codeIndicatorText: {
    marginLeft: 8,
    color: Colors.primary,
    fontSize: 14,
  },
  expandButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(74, 111, 165, 0.1)',
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 8,
  },
  expandButtonText: {
    color: Colors.primary,
    fontWeight: '600',
    marginRight: 4,
  },
  overlayContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  bookmarkOverlay: {
    backgroundColor: 'rgba(255, 184, 108, 0.2)',
  },
  rejectOverlay: {
    backgroundColor: 'rgba(244, 67, 54, 0.2)',
  },
  overlayText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.bookmark,
    marginTop: 10,
  },
  rejectText: {
    color: Colors.danger,
  },
  webControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: SCREEN_WIDTH - 40,
    marginTop: 20,
  },
  webButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    width: '48%',
  },
  rejectButton: {
    backgroundColor: Colors.danger,
  },
  bookmarkButton: {
    backgroundColor: Colors.bookmark,
  },
  webButtonText: {
    color: '#fff',
    fontWeight: '600',
    marginLeft: 8,
    fontSize: 16,
  },
});