import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Linking,
  Platform,
  StyleSheet,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { styles as mapStyles } from '../../styles/Map/MapScreenStyles';
import { Place } from '../../types';
import AuthContext from '../../context/AuthContext';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { hasAccess } from '../../utils/subscriptionAccess';

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
  const [blocked, setBlocked] = useState(false);
  const auth = useContext(AuthContext);
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      const checkAccess = async () => {
        if (!hasAccess(auth.userPlan, 'intermediate')) {
          setBlocked(true);
          setLoading(false);
          return;
        }

        setBlocked(false);
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setLoading(false);
          return;
        }

        const currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);
        setLoading(false);
      };

      checkAccess();
    }, [auth.userPlan])
  );

  if (blocked) {
    return (
      <View style={lockedStyles.lockedOverlay}>
        <Ionicons name="lock-closed" size={64} color="#fff" />
        <Text style={lockedStyles.lockedTitle}>Acceso exclusivo</Text>
        <Text style={lockedStyles.lockedSubtitle}>
          Esta función es solo para usuarios con el plan{' '}
          <Text style={{ fontWeight: 'bold' }}>Intermedio</Text> o superior.
        </Text>

        <TouchableOpacity
          style={lockedStyles.upgradeButton}
          onPress={() => navigation.navigate('Plans' as never)}
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

  const openPhone = (phone?: string) => phone && Linking.openURL(`tel:${phone}`);
  const openMaps = (lat: number, lng: number) =>
    Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`);

  const isOpen = (place: Place): boolean => {
    if (place.type === 'dog_park') return true;
    if (!place.openingHours) return false;
    if (place.openingHours.toLowerCase().includes('24')) return true;

    const now = new Date();
    const current = now.getHours() * 60 + now.getMinutes();
    const [start, end] = place.openingHours.split('-').map(t => t.trim());
    const [sH, sM] = start.split(':').map(Number);
    const [eH, eM] = end.split(':').map(Number);
    return current >= (sH * 60 + sM) && current <= (eH * 60 + eM);
  };

  return (
    <View style={mapStyles.container}>
      <MapView
        style={mapStyles.map}
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

      <ScrollView style={mapStyles.placeList}>
        {mockPlaces.map((place) => (
          <View key={place.id} style={mapStyles.card}>
            <View style={mapStyles.cardHeader}>
              <View style={[
                mapStyles.iconCircle,
                { backgroundColor: place.type === 'veterinary' ? '#08C6B7' : '#FFD93D' }
              ]}>
                <MaterialIcons
                  name={place.type === 'veterinary' ? 'local-hospital' : 'pets'}
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
                <Text style={mapStyles.detailText}>{place.openingHours}</Text>
              </View>
            )}
            {place.rating && (
              <View style={mapStyles.detailRow}>
                <MaterialIcons name="star" size={16} color="#FFD93D" />
                <Text style={mapStyles.detailText}>{place.rating}</Text>
              </View>
            )}
            <View style={mapStyles.statusRow}>
              <View style={[
                mapStyles.statusBadge,
                { backgroundColor: isOpen(place) ? '#08C6B7' : '#FFD93D' }
              ]}>
                <Text style={mapStyles.statusText}>{isOpen(place) ? 'Abierto' : 'Cerrado'}</Text>
              </View>
            </View>
            <View style={mapStyles.actions}>
              {place.phone && (
                <TouchableOpacity onPress={() => openPhone(place.phone)} style={mapStyles.actionBtn}>
                  <MaterialIcons name="phone" size={18} color="#08C6B7" />
                  <Text style={mapStyles.actionText}>Llamar</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity onPress={() => openMaps(place.latitude, place.longitude)} style={mapStyles.actionBtn}>
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

const lockedStyles = StyleSheet.create({
  lockedOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  lockedTitle: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  lockedSubtitle: {
    color: '#ccc',
    fontSize: 16,
    marginVertical: 16,
    textAlign: 'center',
  },
  upgradeButton: {
    backgroundColor: '#FF6B6B',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginTop: 10,
  },
  upgradeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
