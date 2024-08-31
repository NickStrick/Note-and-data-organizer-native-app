import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import SignInScreen from '../components/SignInScreen';

const App: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <SignInScreen />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
