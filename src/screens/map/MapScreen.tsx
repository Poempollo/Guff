// MapScreen.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Linking,
  Platform,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';
import { styles } from '../../styles/Map/MapScreenStyles';
import { Place } from '../../types';

const mockPlaces: Place[] = [
  {
    id: '1',
    name: 'Clínica Veterinaria Alhambra',
    latitude: 37.1773,
    longitude: -3.5986,
    type: 'veterinary',
    address: 'Calle Recogidas 45',
    phone: '+34 958 123 456',
    openingHours: '9:00 - 20:00',
    rating: 4.6,
  },
  {
    id: '2',
    name: 'Hospital Veterinario Granada Sur',
    latitude: 37.1500,
    longitude: -3.6100,
    type: 'veterinary',
    address: 'Av. Andaluces 23',
    phone: '+34 958 987 654',
    openingHours: '8:30 - 21:00',
    rating: 4.8,
  },
  {
    id: '3',
    name: 'Parque Canino Federico García Lorca',
    latitude: 37.1650,
    longitude: -3.6050,
    type: 'dog_park',
    address: 'Parque García Lorca',
  },
  {
    id: '4',
    name: 'Veterinaria Albaicín',
    latitude: 37.1820,
    longitude: -3.5920,
    type: 'veterinary',
    address: 'Cuesta del Chapiz 12',
    phone: '+34 958 555 777',
    openingHours: '10:00 - 19:00',
    rating: 4.4,
  },
  {
    id: '5',
    name: 'Área Canina Parque de las Ciencias',
    latitude: 37.1400,
    longitude: -3.6200,
    type: 'dog_park',
    address: 'Av. de la Ciencia s/n',
  },
  {
    id: '6',
    name: 'Clínica Veterinaria Genil',
    latitude: 37.1600,
    longitude: -3.5800,
    type: 'veterinary',
    address: 'Paseo del Genil 89',
    phone: '+34 958 444 888',
    openingHours: '24 horas',
    rating: 4.5,
  },
];

export default function MapScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setLoading(false);
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      setLoading(false);
    })();
  }, []);

  const openPhone = (phone?: string) => {
    if (phone) {
      Linking.openURL(`tel:${phone}`);
    }
  };

  const openMaps = (latitude: number, longitude: number) => {
    Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`);
  };

  const isOpen = (place: Place): boolean => {
    if (place.type === 'dog_park') return true;
    if (!place.openingHours) return false;
    if (place.openingHours.toLowerCase().includes('24')) return true;

    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    const [start, end] = place.openingHours.split('-').map(t => t.trim());
    const [startH, startM] = start.split(':').map(Number);
    const [endH, endM] = end.split(':').map(Number);
    const startMinutes = startH * 60 + startM;
    const endMinutes = endH * 60 + endM;

    return currentMinutes >= startMinutes && currentMinutes <= endMinutes;
  };

  if (loading || !location) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#08C6B7" />
        <Text style={styles.loadingText}>Obteniendo tu ubicación...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
        region={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        showsUserLocation
        showsMyLocationButton
      >
        {mockPlaces.map((place) => (
          <Marker
            key={place.id}
            coordinate={{ latitude: place.latitude, longitude: place.longitude }}
            title={place.name}
            pinColor={place.type === 'veterinary' ? '#08C6B7' : '#FFD93D'}
          />
        ))}
      </MapView>

      <ScrollView style={styles.placeList}>
        {mockPlaces.map((place) => (
          <View key={place.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={[
                styles.iconCircle,
                { backgroundColor: place.type === 'veterinary' ? '#08C6B7' : '#FFD93D' }
              ]}>
                <MaterialIcons
                  name={place.type === 'veterinary' ? 'local-hospital' : 'pets'}
                  size={18}
                  color="white"
                />
              </View>
              <Text style={styles.placeName}>{place.name}</Text>
            </View>

            <Text style={styles.address}>{place.address}</Text>

            {place.type === 'veterinary' && place.openingHours && (
              <View style={styles.detailRow}>
                <MaterialIcons name="schedule" size={16} color="#333" />
                <Text style={styles.detailText}>{place.openingHours}</Text>
              </View>
            )}

            {place.type === 'veterinary' && place.rating && (
              <View style={styles.detailRow}>
                <MaterialIcons name="star" size={16} color="#FFD93D" />
                <Text style={styles.detailText}>{place.rating}</Text>
              </View>
            )}

            <View style={styles.statusRow}>
              <View style={[
                styles.statusBadge,
                { backgroundColor: isOpen(place) ? '#08C6B7' : '#FFD93D' }
              ]}>
                <Text style={styles.statusText}>{isOpen(place) ? 'Abierto' : 'Cerrado'}</Text>
              </View>
            </View>

            <View style={styles.actions}>
              {place.phone && (
                <TouchableOpacity onPress={() => openPhone(place.phone)} style={styles.actionBtn}>
                  <MaterialIcons name="phone" size={18} color="#08C6B7" />
                  <Text style={styles.actionText}>Llamar</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity onPress={() => openMaps(place.latitude, place.longitude)} style={styles.actionBtn}>
                <MaterialIcons name="directions" size={18} color="#FFD93D" />
                <Text style={styles.actionText}>Cómo llegar</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
