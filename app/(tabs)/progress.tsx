import React, { useMemo } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';
import { jsContent } from '@/data/javascript-content';
import { useProgressStore } from '@/hooks/use-progress';
import ProgressBar from '@/components/ProgressBar';
import Colors from '@/constants/colors';
import { Award, BarChart, CheckCircle } from 'lucide-react-native';

export default function ProgressScreen() {
  const { completedCards, viewedCards, resetProgress } = useProgressStore();
  
  // Calculate progress statistics
  const stats = useMemo(() => {
    const totalCards = jsContent.length;
    const totalDays = Math.max(...jsContent.map(card => card.day));
    
    // Group cards by day
    const cardsByDay = jsContent.reduce((acc, card) => {
      if (!acc[card.day]) {
        acc[card.day] = [];
      }
      acc[card.day].push(card);
      return acc;
    }, {});
    
    // Calculate completion percentage for each day
    const dayProgress = Object.entries(cardsByDay).map(([day, cards]) => {
      const dayCards = cards as typeof jsContent;
      const completedCount = dayCards.filter(card => 
        completedCards.includes(card.id)
      ).length;
      
      return {
        day: parseInt(day),
        total: dayCards.length,
        completed: completedCount,
        percentage: dayCards.length > 0 ? completedCount / dayCards.length : 0
      };
    });
    
    return {
      totalCards,
      totalDays,
      completedCount: completedCards.length,
      viewedCount: viewedCards.length,
      overallProgress: totalCards > 0 ? completedCards.length / totalCards : 0,
      dayProgress
    };
  }, [completedCards, viewedCards]);

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Your Progress',
          headerRight: () => (
            <TouchableOpacity 
              style={styles.resetButton} 
              onPress={resetProgress}
            >
              <Text style={styles.resetButtonText}>Reset</Text>
            </TouchableOpacity>
          )
        }} 
      />
      
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.overviewCard}>
          <View style={styles.overviewHeader}>
            <BarChart size={24} color={Colors.primary} />
            <Text style={styles.overviewTitle}>Overall Progress</Text>
          </View>
          
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{stats.completedCount}</Text>
              <Text style={styles.statLabel}>Completed</Text>
            </View>
            
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{stats.viewedCount}</Text>
              <Text style={styles.statLabel}>Viewed</Text>
            </View>
            
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{stats.totalCards}</Text>
              <Text style={styles.statLabel}>Total Cards</Text>
            </View>
          </View>
          
          <ProgressBar 
            progress={stats.overallProgress} 
            label="Overall Completion"
          />
          
          {stats.overallProgress === 1 && (
            <View style={styles.completionBadge}>
              <Award size={20} color={Colors.primary} />
              <Text style={styles.completionText}>
                Congratulations! You've completed all lessons!
              </Text>
            </View>
          )}
        </View>
        
        <Text style={styles.sectionTitle}>Progress by Day</Text>
        
        {stats.dayProgress.map((day) => (
          <View key={day.day} style={styles.dayCard}>
            <View style={styles.dayHeader}>
              <Text style={styles.dayTitle}>Day {day.day}</Text>
              <View style={styles.dayStats}>
                <CheckCircle size={16} color={Colors.success} />
                <Text style={styles.dayStatsText}>
                  {day.completed}/{day.total} completed
                </Text>
              </View>
            </View>
            
            <ProgressBar progress={day.percentage} />
            
            {day.percentage === 1 && (
              <View style={styles.dayCompleteBadge}>
                <Text style={styles.dayCompleteText}>Day Completed!</Text>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: 16,
  },
  overviewCard: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  overviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  overviewTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginLeft: 8,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  completionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(74, 111, 165, 0.1)',
    borderRadius: 8,
    padding: 12,
    marginTop: 16,
  },
  completionText: {
    color: Colors.primary,
    fontWeight: '600',
    marginLeft: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 16,
  },
  dayCard: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  dayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  dayTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  dayStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dayStatsText: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginLeft: 6,
  },
  dayCompleteBadge: {
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  dayCompleteText: {
    color: Colors.success,
    fontWeight: '500',
    fontSize: 12,
  },
  resetButton: {
    marginRight: 16,
  },
  resetButtonText: {
    color: Colors.danger,
    fontSize: 14,
    fontWeight: '500',
  },
});