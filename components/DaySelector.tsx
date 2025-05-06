import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import Colors from '@/constants/colors';

interface DaySelectorProps {
  currentDay: number;
  totalDays: number;
  onSelectDay: (day: number) => void;
}

export default function DaySelector({ currentDay, totalDays, onSelectDay }: DaySelectorProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Day</Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {Array.from({ length: totalDays }, (_, i) => i + 1).map((day) => (
          <TouchableOpacity
            key={day}
            style={[
              styles.dayButton,
              currentDay === day ? styles.activeDayButton : null
            ]}
            onPress={() => onSelectDay(day)}
          >
            <Text
              style={[
                styles.dayText,
                currentDay === day ? styles.activeDayText : null
              ]}
            >
              {day}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  dayButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  activeDayButton: {
    backgroundColor: Colors.primary,
  },
  dayText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.textSecondary,
  },
  activeDayText: {
    color: '#fff',
  },
});