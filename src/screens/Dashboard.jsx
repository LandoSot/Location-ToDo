import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import MapLocation from '../components/Map';
import NavButtons from '../components/NavButtons';
import { GetTasks_Thunk } from '../redux/thunks/Tasks';

const Dashboard = () => {
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(GetTasks_Thunk({}))
  }, [])

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
