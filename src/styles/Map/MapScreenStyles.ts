import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
const { height } = Dimensions.get('window');

 export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  map: { width: '100%', height: height * 0.45 },
  loadingContainer: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
  },
  loadingText: {
    marginTop: 10, fontSize: 16, color: '#333',
  },
  placeList: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  cardHeader: {
    flexDirection: 'row', alignItems: 'center', marginBottom: 8,
  },
  iconCircle: {
    width: 28, height: 28, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginRight: 12,
  },
  placeName: {
    fontSize: 18, fontWeight: 'bold', color: '#333',
  },
  address: {
    fontSize: 14, color: '#333', marginBottom: 8,
  },
  detailRow: {
    flexDirection: 'row', alignItems: 'center', marginBottom: 4,
  },
  detailText: {
    marginLeft: 6, fontSize: 14, color: '#333',
  },
  statusRow: {
    marginTop: 8,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  statusText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  actions: {
    flexDirection: 'row', marginTop: 12, gap: 16,
  },
  actionBtn: {
    flexDirection: 'row', alignItems: 'center',
  },
  actionText: {
    marginLeft: 6, fontSize: 14, fontWeight: '600', color: '#333',
  },
});