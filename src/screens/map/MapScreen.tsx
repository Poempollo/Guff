import React, { useState, useContext } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Linking,
  Platform,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { styles as mapStyles } from "../../styles/Map/MapScreenStyles";
import { lockedStyles } from "../../styles/Map/LockedStyles";
import { Place } from "../../types";
import AuthContext from "../../context/AuthContext";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { hasAccess } from "../../utils/subscriptionAccess";
import { GOOGLE_API_KEY } from "../../../config";

export default function MapScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const [blocked, setBlocked] = useState(false);
  const auth = useContext(AuthContext);
  const navigation = useNavigation();

  const fetchPlaceDetails = async (placeId: string): Promise<string | undefined> => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=formatted_phone_number&key=${GOOGLE_API_KEY}`
      );
      const data = await response.json();
      return data.result?.formatted_phone_number;
    } catch (error) {
      console.warn("Error obteniendo detalles del lugar:", error);
      return undefined;
    }
  };

  const fetchNearbyPlaces = async (lat: number, lon: number): Promise<Place[]> => {
    const keywords = ['clinica veterinaria', 'parque para perros'];
    let allPlaces: Place[] = [];

    for (const keyword of keywords) {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lon}&radius=800&keyword=${encodeURIComponent(keyword)}&key=${GOOGLE_API_KEY}`
        );
        const data = await response.json();

        if (data.status !== "OK") {
          console.warn(`Google Places response (${keyword}):`, data.status);
          continue;
        }

        const placesWithDetails: Place[] = await Promise.all(
          data.results.map(async (item: any) => {
            const phone = await fetchPlaceDetails(item.place_id);
            return {
              id: item.place_id,
              name: item.name,
              latitude: item.geometry.location.lat,
              longitude: item.geometry.location.lng,
              type: keyword.includes("parque") ? "dog_park" : "veterinary",
              address: item.vicinity,
              phone: phone,
              openingHours: item.opening_hours?.open_now
                ? "Abierto ahora"
                : "Cerrado ahora",
              rating: item.rating,
            };
          })
        );

        allPlaces = allPlaces.concat(placesWithDetails);
      } catch (error) {
        console.error(`Error al obtener lugares (${keyword}):`, error);
      }
    }

    return allPlaces;
  };

  useFocusEffect(
    React.useCallback(() => {
      const checkAccess = async () => {
        if (!hasAccess(auth.userPlan, "intermediate")) {
          setBlocked(true);
          setLoading(false);
          return;
        }

        setBlocked(false);
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setLoading(false);
          return;
        }

        const currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);

        const placesNearby = await fetchNearbyPlaces(
          currentLocation.coords.latitude,
          currentLocation.coords.longitude
        );

        setPlaces(placesNearby);
        setLoading(false);
      };

      checkAccess();
    }, [auth.userPlan])
  );

  const openPhone = (phone?: string) =>
    phone && Linking.openURL(`tel:${phone}`);
  const openMaps = (lat: number, lng: number) =>
    Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`);

  if (blocked) {
    return (
      <View style={lockedStyles.lockedOverlay}>
        <Ionicons name="lock-closed" size={64} color="#fff" />
        <Text style={lockedStyles.lockedTitle}>Acceso exclusivo</Text>
        <Text style={lockedStyles.lockedSubtitle}>
          Esta función es solo para usuarios con el plan{" "}
          <Text style={{ fontWeight: "bold" }}>Intermedio</Text> o superior.
        </Text>
        <TouchableOpacity
          style={lockedStyles.upgradeButton}
          onPress={() => navigation.navigate("Plans" as never)}
        >
          <Text style={lockedStyles.upgradeText}>Mejorar mi plan</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (loading || !location) {
    return (
      <View style={mapStyles.loadingContainer}>
        <ActivityIndicator size="large" color="#08C6B7" />
        <Text style={mapStyles.loadingText}>Obteniendo tu ubicación...</Text>
      </View>
    );
  }

  return (
    <View style={mapStyles.container}>
      <MapView
        style={mapStyles.map}
        provider={Platform.OS === "android" ? PROVIDER_GOOGLE : undefined}
        region={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        showsUserLocation
        showsMyLocationButton
      >
        {places.map((place) => (
          <Marker
            key={place.id}
            coordinate={{
              latitude: place.latitude,
              longitude: place.longitude,
            }}
            title={place.name}
            pinColor={place.type === "dog_park" ? "#4CAF50" : "#08C6B7"}
          />
        ))}
      </MapView>

      {places.length === 0 && !loading && (
        <Text style={{ textAlign: "center", padding: 16 }}>
          No se encontraron lugares cercanos.
        </Text>
      )}

      <ScrollView style={mapStyles.placeList}>
        {places.map((place) => (
          <View key={place.id} style={mapStyles.card}>
            <View style={mapStyles.cardHeader}>
              <View
                style={[
                  mapStyles.iconCircle,
                  { backgroundColor: place.type === "dog_park" ? "#4CAF50" : "#08C6B7" },
                ]}
              >
                <MaterialIcons
                  name={place.type === "dog_park" ? "park" : "local-hospital"}
                  size={18}
                  color="white"
                />
              </View>
              <Text style={mapStyles.placeName}>{place.name}</Text>
            </View>
            <Text style={mapStyles.address}>{place.address}</Text>

            {place.openingHours && (
              <View style={mapStyles.detailRow}>
                <MaterialIcons name="schedule" size={16} color="#333" />
                <Text
                  style={[
                    mapStyles.detailText,
                    {
                      color:
                        place.openingHours === "Abierto ahora"
                          ? "green"
                          : "red",
                    },
                  ]}
                >
                  {place.openingHours}
                </Text>
              </View>
            )}

            {place.rating && (
              <View style={mapStyles.detailRow}>
                <MaterialIcons name="star" size={16} color="#FFD93D" />
                <Text style={mapStyles.detailText}>{place.rating}</Text>
              </View>
            )}

            <View style={mapStyles.actions}>
              {place.phone && (
                <TouchableOpacity
                  onPress={() => openPhone(place.phone)}
                  style={mapStyles.actionBtn}
                >
                  <MaterialIcons name="phone" size={18} color="#08C6B7" />
                  <Text style={mapStyles.actionText}>Llamar</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                onPress={() => openMaps(place.latitude, place.longitude)}
                style={mapStyles.actionBtn}
              >
                <MaterialIcons name="directions" size={18} color="#FFD93D" />
                <Text style={mapStyles.actionText}>Cómo llegar</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
