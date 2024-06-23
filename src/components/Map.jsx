import React, { useState } from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useSelector } from "react-redux";
import { selectLocation } from "../redux/slices/LocationSlice";
import { getCurrentLocation } from "../tools/LocationTools";

const MapLocation = ({ origin = 'dashboard' }) => {
  const { taskLocation, taskCoords } = useSelector(selectLocation)
  const { height: winHeight, width: winWidth } = useWindowDimensions()
  const [currentLocation, setCurrentLocation] = useState({
    longitude: 0,
    latitude: 0,
    latitudeDelta: 0.005,
    longitudeDelta: 0.01
    // latitudeDelta: 0.0922,
    // longitudeDelta: 0.0421
  })

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
    <View style={{ ...styles.container }}>
      <View
        style={{
          ...styles.mapContainer,
          height: origin == "dashboard" ? winHeight * 0.55 : 200,
          width: winWidth * 0.9,
        }}
      >
        {
          <MapView
            style={{
              height: origin == "dashboard" ? winHeight * 0.55 : 200,
              width: winWidth * 0.94
            }}
            initialRegion={(taskCoords && origin == "newTask") ? taskLocation : currentLocation}
            region={(taskCoords && origin == "newTask") ? taskLocation : currentLocation}
            showsUserLocation={true}
            scrollEnabled={false}
            zoomEnabled={false}
          >
            <Marker
              coordinate={{
                latitude: taskLocation.latitude || currentLocation.latitude,
                longitude: taskLocation.longitude || currentLocation.longitude
              }}
              title={taskCoords ? "Ubicación de la tarea" : "Usted está aquí"}
            />
          </MapView>
        }
      </View>
    </View>
  )
}

export default MapLocation

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: '4%'
  },
  mapContainer: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 20,
    overflow: "hidden"
  }
})
