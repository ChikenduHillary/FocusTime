import { View, StyleSheet, FlatList, Text, SafeAreaView } from 'react-native';

import { RoundedButton } from '../../components/RoundedButton';
import { spacing } from '../../utils/sizes';

export const FocusHistory = ({ focusHistory, onClear }) => {
  const clearHistory = () => {
    onClear();
  };

  const HistoryItem = ({ item, index }) => (
    <Text style={styles.historyItem(item.status)}>
      {JSON.stringify(item.subject)}
    </Text>
  );

  return (
    <>
      <SafeAreaView style={{ flex: 1, alignItems: 'center' }}>
        {focusHistory.length > 0 && (
          <>
            <Text style={styles.title}>Things we've focused on</Text>
            <FlatList
              style={{ flex: 1 }}
              contentContainerStyle={{ flex: 1, alignItems: 'center' }}
              data={focusHistory}
              renderItem={HistoryItem}
            />
            <View style={styles.clearHistory}>
              <RoundedButton
                title="clear"
                size={75}
                onPress={() => clearHistory()}
              />
            </View>
          </>
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  historyItem: (status) => ({
    color: status == 0 ? 'red' : 'green',
    fontSize: spacing.md,
  }),

  title: {
    color: 'white',
    fontSize: spacing.lg,
  },
  clearHistory: {
    alignItems: 'center',
    padding: spacing.md
  }
});
