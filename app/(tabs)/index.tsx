import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { jsContent } from '@/data/javascript-content';
import { useProgressStore } from '@/hooks/use-progress';
import { useBookmarkStore } from '@/hooks/use-bookmarks';
import SwipeableCard from '@/components/SwipeableCard';
import DaySelector from '@/components/DaySelector';
import EmptyState from '@/components/EmptyState';
import Colors from '@/constants/colors';
import { RefreshCw } from 'lucide-react-native';

export default function LearnScreen() {
  const router = useRouter();
  const { currentDay, setCurrentDay, viewedCards } = useProgressStore();
  const { addBookmark } = useBookmarkStore();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  
  // Filter cards for the current day
  const dayCards = jsContent.filter(card => card.day === currentDay);
  
  // Filter out cards that have been viewed in the current session
  const [sessionViewedCards, setSessionViewedCards] = useState<string[]>([]);
  const availableCards = dayCards.filter(card => !sessionViewedCards.includes(card.id));
  
  const currentCard = availableCards[currentCardIndex];
  
  // Reset session viewed cards when day changes
  useEffect(() => {
    setSessionViewedCards([]);
    setCurrentCardIndex(0);
  }, [currentDay]);
  
  const handleSwipeLeft = () => {
    if (currentCardIndex < availableCards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      // Mark card as viewed in the current session
      setSessionViewedCards([...sessionViewedCards, currentCard.id]);
    }
  };
  
  const handleSwipeRight = () => {
    // Add to bookmarks
    addBookmark(currentCard.id);
    
    if (currentCardIndex < availableCards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      // Mark card as viewed in the current session
      setSessionViewedCards([...sessionViewedCards, currentCard.id]);
    }
  };
  
  const handleCardExpand = () => {
    router.push({
      pathname: '/card-details',
      params: { cardId: currentCard.id }
    });
  };
  
  const handleResetDay = () => {
    setSessionViewedCards([]);
    setCurrentCardIndex(0);
  };
  
  const handleSelectDay = (day: number) => {
    setCurrentDay(day);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'JavaScript in 30 Days',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} 
      />
      
      <DaySelector 
        currentDay={currentDay} 
        totalDays={10} // We have content for 10 days
        onSelectDay={handleSelectDay}
      />
      
      <View style={styles.cardContainer}>
        {currentCard ? (
          <SwipeableCard
            card={currentCard}
            onSwipeLeft={handleSwipeLeft}
            onSwipeRight={handleSwipeRight}
            onExpand={handleCardExpand}
          />
        ) : (
          <EmptyState
            title="No More Cards"
            description={`You've gone through all the cards for Day ${currentDay}. You can reset the day or move to the next day.`}
            actionLabel="Reset Day"
            onAction={handleResetDay}
          />
        )}
      </View>
      
      {currentCard && (
        <View style={styles.navigationContainer}>
          <Text style={styles.navigationText}>
            Card {currentCardIndex + 1} of {availableCards.length}
          </Text>
          
          <TouchableOpacity style={styles.resetButton} onPress={handleResetDay}>
            <RefreshCw size={16} color={Colors.primary} />
            <Text style={styles.resetButtonText}>Reset</Text>
          </TouchableOpacity>
        </View>
      )}
      
      <View style={styles.instructionsContainer}>
        <Text style={styles.instructionsText}>
          Swipe right to bookmark, swipe left to skip, or tap "Learn More" to see details.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  navigationText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(74, 111, 165, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  resetButtonText: {
    color: Colors.primary,
    marginLeft: 6,
    fontWeight: '500',
  },
  instructionsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  instructionsText: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});