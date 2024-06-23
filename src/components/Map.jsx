import React, { useState } from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import { selectLocation } from "../redux/slices/LocationSlice";
import { getCurrentLocation, setBackgroundTracking, setForegroundTracking } from "../tools/LocationTools";
import * as Location from "expo-location";
import { UpdateTasks_Thunk } from "../redux/thunks/Tasks";

const MapLocation = ({ origin = 'dashboard' }) => {
  let subscription
  const dispatch = useDispatch()
  const { taskLocation, taskCoords, pendingTasks } = useSelector(selectLocation)
  const { height: winHeight, width: winWidth } = useWindowDimensions()
  const [currentLocation, setCurrentLocation] = useState({
    longitude: 0,
    latitude: 0,
    latitudeDelta: 0.005,
    longitudeDelta: 0.01
  })

  const locParams = {
    accuracy: Location.Accuracy.High,
    timeInterval: 1000,
    distanceInterval: 1
  }

  async function setLocation() {
    try {
      const coords = await getCurrentLocation()
      setCurrentLocation({ ...currentLocation, ...coords })

      subscription = await Location.watchPositionAsync(locParams,
        async (location) => {
          const { updateTasks, newPendingTasks } = await setForegroundTracking(location)

          if (updateTasks)
            dispatch(UpdateTasks_Thunk({ newPendingTasks }))

          setCurrentLocation({ ...currentLocation, ...coords })
        })

      await setBackgroundTracking()
    } catch (error) {
      console.log('Error setLocation:', error.message)
    }
  }

  React.useEffect(() => {
    setLocation()

    return () => {
      if (subscription) {
        console.log('removed')
        subscription.remove()
      }
    }
  }, [])

  // React.useEffect(() => {
  //   console.log("currentLocation:", currentLocation)
  // }, [currentLocation])

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
