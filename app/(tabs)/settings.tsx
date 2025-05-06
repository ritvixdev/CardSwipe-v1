import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Switch, Alert, Linking } from 'react-native';
import { Stack } from 'expo-router';
import { useProgressStore } from '@/hooks/use-progress';
import { useBookmarkStore } from '@/hooks/use-bookmarks';
import Colors from '@/constants/colors';
import { Info, Github, ExternalLink, Trash2 } from 'lucide-react-native';

export default function SettingsScreen() {
  const { resetProgress } = useProgressStore();
  const { clearAllBookmarks } = useBookmarkStore();
  
  const handleResetProgress = () => {
    Alert.alert(
      'Reset Progress',
      'Are you sure you want to reset all your progress? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Reset', 
          style: 'destructive',
          onPress: () => {
            resetProgress();
            Alert.alert('Progress Reset', 'Your progress has been reset successfully.');
          }
        }
      ]
    );
  };
  
  const handleClearBookmarks = () => {
    Alert.alert(
      'Clear Bookmarks',
      'Are you sure you want to clear all your bookmarks? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Clear', 
          style: 'destructive',
          onPress: () => {
            clearAllBookmarks();
            Alert.alert('Bookmarks Cleared', 'Your bookmarks have been cleared successfully.');
          }
        }
      ]
    );
  };
  
  const openGithubRepo = () => {
    Linking.openURL('https://github.com/Asabeneh/30-Days-Of-JavaScript');
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Settings' }} />
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>App Settings</Text>
        
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingTitle}>Reset All Progress</Text>
            <Text style={styles.settingDescription}>
              Clear all your learning progress and start fresh
            </Text>
          </View>
          <TouchableOpacity 
            style={[styles.actionButton, styles.dangerButton]}
            onPress={handleResetProgress}
          >
            <Trash2 size={16} color="#fff" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingTitle}>Clear All Bookmarks</Text>
            <Text style={styles.settingDescription}>
              Remove all your saved bookmarks
            </Text>
          </View>
          <TouchableOpacity 
            style={[styles.actionButton, styles.dangerButton]}
            onPress={handleClearBookmarks}
          >
            <Trash2 size={16} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        
        <TouchableOpacity style={styles.settingItem} onPress={openGithubRepo}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingTitle}>Original Content</Text>
            <Text style={styles.settingDescription}>
              View the 30 Days of JavaScript GitHub repository
            </Text>
          </View>
          <View style={styles.actionButton}>
            <Github size={16} color="#fff" />
          </View>
        </TouchableOpacity>
        
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingTitle}>App Version</Text>
            <Text style={styles.settingDescription}>1.0.0</Text>
          </View>
          <View style={[styles.actionButton, styles.infoButton]}>
            <Info size={16} color="#fff" />
          </View>
        </View>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Content based on 30 Days of JavaScript by Asabeneh
        </Text>
        <TouchableOpacity onPress={openGithubRepo}>
          <Text style={styles.footerLink}>Visit GitHub Repository</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginTop: 16,
    marginBottom: 12,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dangerButton: {
    backgroundColor: Colors.danger,
  },
  infoButton: {
    backgroundColor: Colors.info,
  },
  footer: {
    padding: 16,
    marginTop: 'auto',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 8,
  },
  footerLink: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '500',
  },
});