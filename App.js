import React, { useState, useEffect } from "react";
import { View, StyleSheet, AsyncStorageStatic } from "react-native";

import Focus from "./src/features/focus/focus";
import { FocusHistory } from "./src/features/focus/focusHistory";
import { Timer } from "./src/features/Timer/timer";
import { colors } from "./src/utils/colors";
import { spacing } from       "./src/utils/sizes";

export default function App() {
  const [focusSubject, setFocusSubject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);

  const STATUS = {
    CANCELED: 0,
    COMPLETED: 1,
  };
  const addFocusHistorySubjectWithStatus = (subject, status) => {
    setFocusHistory([...focusHistory, { subject, status }]);
  };

  const onClear = () => {
    setFocusHistory([]);
  };

  const saveFocusHistory = async () => {
    try {
      await AsyncStorageStatic.setItem(
        "focusHistory",
        JSON.stringify(focusHistory)
      );
    } catch (e) {
      console.log(e);
    }
  };

  const loadFocusHistor = async () => {
    try {
      const history = await AsyncStorageStatic.getItem("focusHistory");
      if (history && JSON.parse(history).length) {
        setFocusHistory(JSON.parse(history));
      }
    } catch (e) {
      console.lo(e);
    }
  };

  useEffect(() => {
    saveFocusHistory();
  }, [focusHistory]);

  useEffect(() => {
    loadFocusHistor();
  }, []);

  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Timer
          focusSubject={focusSubject}
          onTimerEnd={() => {
            addFocusHistorySubjectWithStatus(focusSubject, STATUS.COMPLETED);
            setFocusSubject(null);
          }}
          clearSubject={() => {
            addFocusHistorySubjectWithStatus(focusSubject, STATUS.CANCELED);
            setFocusSubject(null);
          }}
        />
      ) : (
        <>
          <Focus addSubject={setFocusSubject} />
          <FocusHistory focusHistory={focusHistory} onClear={onClear} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.purple,
    paddingTop: spacing.lg,
  },
});
