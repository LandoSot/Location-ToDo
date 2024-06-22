import React from "react";
import { Dimensions, StyleSheet, View, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import { selectLocation, setCurrentLocation } from "../redux/slices/Location";
import * as Location from "expo-location"


const MapLocation = () => {
  const { currentLocation, isLoading } = useSelector(selectLocation)
  const dispatch = useDispatch()

  async function getCurrentLocation() {
    const { status } = await Location.requestForegroundPermissionsAsync();
    console.log('status:', status)

    if (status != "granted") {
      console.log("Permisos de Ubicación", "Permisos de ubicación no otorgados, imposible visualizar ubicación en mapa");
      return;
    }

    const location = await Location.getCurrentPositionAsync();
    dispatch(setCurrentLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude
    }))
  }

  React.useEffect(() => {
    getCurrentLocation()
  }, [])

  if (isLoading) {
    return (
      <Text>Is Loading</Text>
    )
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
        showsUserLocation={true}
      >
        <Marker
          coordinate={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude
          }}
          title="You are here"
        />
      </MapView>
    </View>
  )
}

export default MapLocation

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center'
  },
  map: {
    height: Dimensions.get('window').height * 0.8,
    width: Dimensions.get('window').width * 0.96,
    borderRadius: 50
  }
})
