import React from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { theme } from '../theme';
import { Typography } from '../components/atoms/Typography';

export const StaticContentScreen = ({ navigation, route }) => {
  const { title, content, type } = route.params;

  const renderContent = () => {
    if (type === 'faq') {
      return (
        <View>
          {content.map((item, index) => (
            <View key={index} style={styles.faqItem}>
              <Typography variant="h3" style={styles.faqQuestion}>{item.question}</Typography>
              <Typography variant="body" style={styles.faqAnswer}>{item.answer}</Typography>
            </View>
          ))}
        </View>
      );
    }

    if (type === 'license') {
        return (
            <View>
                {content.map((item, index) => (
                    <View key={index} style={styles.licenseItem}>
                        <Typography variant="h3" style={styles.licenseName}>{item.name}</Typography>
                        <Typography variant="caption" style={styles.licenseText}>{item.text}</Typography>
                    </View>
                ))}
            </View>
        )
    }

    // Default text content
    return (
      <Typography variant="body" style={styles.textContent}>
        {content}
      </Typography>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={theme.colors.text.primary} />
        </TouchableOpacity>
        <Typography variant="h2" style={styles.headerTitle}>{title}</Typography>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.contentContainer} contentContainerStyle={styles.scrollContent}>
        {renderContent()}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  headerTitle: {
    color: theme.colors.text.primary,
    flex: 1,
    textAlign: 'center',
  },
  contentContainer: {
    flex: 1,
  },
  scrollContent: {
    padding: theme.spacing.m,
  },
  textContent: {
    color: theme.colors.text.secondary,
    textAlign: 'justify',
  },
  faqItem: {
    marginBottom: theme.spacing.l,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    paddingBottom: theme.spacing.m,
  },
  faqQuestion: {
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.s,
    fontSize: 16,
  },
  faqAnswer: {
    color: theme.colors.text.secondary,
  },
  licenseItem: {
      marginBottom: theme.spacing.l,
  },
  licenseName: {
      color: theme.colors.text.primary,
      marginBottom: theme.spacing.xs,
      fontSize: 16
  },
  licenseText: {
      color: theme.colors.text.secondary,
      fontFamily: 'monospace'
  }
});
