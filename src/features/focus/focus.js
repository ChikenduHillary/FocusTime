import React, {useState} from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { RoundedButton } from '../../components/RoundedButton';
import { fontSizes, spacing } from '../../utils/sizes';
import { colors } from '../../utils/colors';

export default function Focus({ addSubject }) {
  const [subject, setSubject] = useState(null);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          What would you like to focus on?
        </Text>
        <View style={styles.inputContainer}>
          <TextInput style={{flex: 1, marginRight: spacing.lg}} 
            onSubmitEditing={({ nativeEvent }) => {
              setSubject(nativeEvent.text)
            }}
          />
          <RoundedButton size={50} title='+' onPress={()=>{
            addSubject(subject)
          }}/>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: spacing.xxl,
  },
  titleContainer: {
    flex: 0.5,
    padding: spacing.md,
  },
  title: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: fontSizes.lg,
  },
  inputContainer: {
    paddingTop: spacing.md,
    flexDirection: 'row',
    alignItems: 'center'
  }
});
