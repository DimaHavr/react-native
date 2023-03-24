import { useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet } from "react-native";

export default function MapScreen({ route }) {
  const { latitude, longitude } = route.params.location;

  return (
    <MapView
      style={styles.container}
      initialRegion={{
        latitude,
        longitude,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      }}
    >
      <Marker coordinate={{ latitude, longitude }} />
    </MapView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
