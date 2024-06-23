import React, { useState } from "react";
import { useWindowDimensions, StatusBar, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import { selectLocation, setTaskLocation } from "../../redux/slices/LocationSlice";
import { FAB } from "react-native-paper";
import { Feather } from '@expo/vector-icons';
import { getCurrentLocation } from "../../tools/LocationTools";

const MapTaskLocation = ({ navigation }) => {
  const { height: winHeight, width: winWidth } = useWindowDimensions()
  const { taskCoords, taskLocation } = useSelector(selectLocation)
  const [region, setRegion] = useState()
  const [currentLocation, setCurrentLocation] = useState({
    longitude: 0,
    latitude: 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  })
  const dispatch = useDispatch()

  function handleMapPress(e) {
    const { coordinate } = e.nativeEvent;

    dispatch(setTaskLocation({
      ...coordinate,
      latitudeDelta: region.latitudeDelta,
      longitudeDelta: region.longitudeDelta,
    }))
  }

  async function setLocation() {
    const location = await getCurrentLocation()
    setCurrentLocation({
      ...currentLocation,
      ...location
    })
  }

  React.useEffect(() => {
    setLocation()
  }, [])

  return (
    <>
      <MapView
        style={{
          height: winHeight,
          width: winWidth,
          marginTop: StatusBar.currentHeight,
          zIndex: 0
        }}
        initialRegion={taskCoords ? taskLocation : currentLocation}
        region={taskCoords ? taskLocation : currentLocation}
        showsUserLocation={true}
        onPress={handleMapPress}
        onRegionChange={region => setRegion(region)}
      >
        <Marker
          coordinate={{
            latitude: taskLocation.latitude || currentLocation.latitude,
            longitude: taskLocation.longitude || currentLocation.longitude
          }}
          title="Ubicación de tarea"
        />
      </MapView>

      <FAB
        label="Confirmar Ubicación"
        icon={({ color }) => <Feather name="check-circle" size={24} color={color} />}
        style={styles.fab}
        onPress={() => navigation.navigate('NewTask')}
      />
    </>
  )
}

export default MapTaskLocation

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    zIndex: 5,
  }
})
