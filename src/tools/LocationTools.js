import * as Location from "expo-location"

export async function getCurrentLocation() {
  const { status } = await Location.requestForegroundPermissionsAsync();

  if (status != "granted") {
    console.log("Permisos de Ubicación", "Permisos de ubicación no otorgados, imposible visualizar ubicación en mapa");
    return;
  }

  const location = await Location.getCurrentPositionAsync();
  const coords = {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude
  }

  return coords
}