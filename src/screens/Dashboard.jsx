import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import MapLocation from '../components/Map';
import { TouchableOpacity } from 'react-native-gesture-handler';
import NavButtons from '../components/NavButtons';

const Dashboard = () => {
  return (
    <View style={styles.container}>
      <MapLocation />
      <NavButtons />
    </View>
  );
}

export default Dashboard

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: '2%',
    // backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
