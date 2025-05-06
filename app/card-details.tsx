import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { jsContent } from '@/data/javascript-content';
import CardDetails from '@/components/CardDetails';
import EmptyState from '@/components/EmptyState';
import Colors from '@/constants/colors';
import { ArrowLeft } from 'lucide-react-native';

export default function CardDetailsScreen() {
  const { cardId } = useLocalSearchParams();
  const router = useRouter();
  
  // Find the card with the matching ID
  const card = jsContent.find(c => c.id === cardId);
  
  if (!card) {
    return (
      <EmptyState
        title="Card Not Found"
        description="The card you're looking for doesn't exist or has been removed."
        actionLabel="Go Back"
        onAction={() => router.back()}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          title: card.title,
          headerBackTitle: 'Back',
        }} 
      />
      
      <CardDetails card={card} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});