import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

export default function LoadingPage() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#00bfff" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  }
});