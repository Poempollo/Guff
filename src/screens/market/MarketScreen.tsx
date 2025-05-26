import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ProductCard from '../../components/Shop/ProductCard';
import CartModal from '../../components/Shop/CartModal';
import CheckoutModal from '../../components/Shop/CkeckoutModal';
import {colors} from '../../styles/theme';

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  category: 'dog' | 'cat';
  description: string;
  weight: string;
}

interface CartItem extends Product {
  quantity: number;
}

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Royal Canin Joint & Ageing Adult',
    brand: 'Royal Canin',
    price: 11.79,
    rating: 4.8,
    reviews: 324,
    image: 'https://media.zooplus.com/bilder/2/800/584899_pla_royal_canin_joint_ageing_adult_supplements_240g_hs_02_2.jpg',
    category: 'dog',
    description: 'Alimento completo y balanceado para perros adultos',
    weight: '240g'
  },
  {
    id: '2',
    name: 'Nature Variety No Grain Sterilized Adult',
    brand: 'Nature Variety',
    price: 52.99,
    rating: 4.5,
    reviews: 198,
    image: 'https://media.zooplus.com/bilder/6/800/174200_pla_nature_s_variety_selected_sterilised_chicken_7kg_1000x1000_hs_03_6.jpg',
    category: 'cat',
    description: 'Alimento húmedo para gatos adultos con pollo',
    weight: '10kg'
  },
  {
    id: '3',
    name: 'Hill\'s Prescription Diet Multicare Urinary Care',
    brand: 'Hill\'s',
    price: 71.99,
    rating: 4.9,
    reviews: 156,
    image: 'https://media.zooplus.com/bilder/6/800/57817_pla_hills_prescriptiondiet_cd_multicare_urinarycare_hundefutter_huhn_hs_01_6.jpg',
    category: 'dog',
    description: 'Alimento terapéutico para perros con problemas digestivos',
    weight: '12kg'
  },
  {
    id: '4',
    name: 'Purina Pro Plan para Gatos',
    brand: 'Purina',
    price: 48.44,
    rating: 4.6,
    reviews: 267,
    image: 'https://media.zooplus.com/bilder/2/800/98497_pla_purina_proplan_sterilised_reichlachs_3kg_hs_01_2.jpg',
    category: 'cat',
    description: 'Nutrición avanzada para gatos de todas las edades',
    weight: '10kg'
  },
  {
    id: '5',
    name: 'Pedigree Adulto Completo',
    brand: 'Pedigree',
    price: 40.99,
    rating: 4.3,
    reviews: 445,
    image: 'https://media.zooplus.com/bilder/0/800/561403_pla_pedigree_adult_mit_fisch_gemuese_12kg_hs_01_0.jpg',
    category: 'dog',
    description: 'Alimento completo con vitaminas y minerales',
    weight: '20kg'
  },
  {
    id: '6',
    name: 'Ultima Cat Sterilised Adult pollo',
    brand: 'Ultima',
    price: 43.99,
    rating: 4.4,
    reviews: 189,
    image: 'https://media.zooplus.com/bilder/4/800/i_2_4.jpg',
    category: 'cat',
    description: 'Comida húmeda en sobres con diferentes sabores',
    weight: '12 sobres'
  },
  {
  id: '7',
  name: 'Eukanuba Adult Medium Pollo',
  brand: 'Eukanuba',
  price: 35.99,
  rating: 4.6,
  reviews: 189,
  image: 'https://www.tiendanimal.es/dw/image/v2/BDLQ_PRD/on/demandware.static/-/Sites-kiwoko-master-catalog/default/dw5c15259e/images/pienso_perros_eukanuba_adult_medium_pollo_EUK81375151_M.jpg?sw=780&sh=780&sm=fit&q=85',
  category: 'dog',
  description: 'Nutrición especializada para el desarrollo de cachorros.',
  weight: '15kg'
},
{
  id: '8',
  name: 'Acana Adult Dog',
  brand: 'Acana',
  price: 62.90,
  rating: 4.7,
  reviews: 223,
  image: 'https://www.amascotados.com/11242-large_default/acana-adult-dog-11kg.jpg',
  category: 'dog',
  description: 'elaborado con pollo criado en libertad, platija capturada en su entorno natural y huevos frescos de corral.',
  weight: '11.4kg'
},
{
  id: '9',
  name: 'Advance Medium Light pollo',
  brand: 'Advance',
  price: 54.99,
  rating: 4.3,
  reviews: 445,
  image: 'https://media.zooplus.com/bilder/8/800/82390_pla_affinity_advance_medium_light_huhn_hs_01_8.jpg',
  category: 'dog',
  description: 'Alimento completo con vitaminas y minerales esenciales.',
  weight: '20kg'
},
{
  id: '10',
  name: 'Royal Canin Gato Esterilizado',
  brand: 'Royal Canin',
  price: 42.20,
  rating: 4.8,
  reviews: 322,
  image: 'https://petsy.online/cdn/shop/products/1_b3925579-5cd5-4980-8e14-c8ae96d40f3c.png?v=1715781411&width=832',
  category: 'cat',
  description: 'Especialmente formulado para gatos esterilizados.',
  weight: '10kg'
},
{
  id: '11',
  name: 'Brekkies con buey, verduras y cereales para gatos',
  brand: 'Brekkies',
  price: 9.49,
  rating: 4.2,
  reviews: 150,
  image: 'https://media.zooplus.com/bilder/6/800/392298_pla_brekkies_rind_hs_01_6.jpg',
  category: 'cat',
  description: 'Pienso para gatos adultos, con delicioso buey y verduras saludables y enriquecido con taurina esencial.',
  weight: '3.5kg'
},

];

export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'dog' | 'cat'>('all');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  const filteredProducts = selectedCategory === 'all' 
    ? mockProducts 
    : mockProducts.filter(product => product.category === selectedCategory);

  const addToCart = (product: Product, quantity: number) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart(prevCart => prevCart.filter(item => item.id !== productId));
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleCheckout = () => {
    setShowCart(false);
    setShowCheckout(true);
  };

  const handlePaymentComplete = () => {
    setShowCheckout(false);
    setCart([]);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}></Text>
          <TouchableOpacity 
            style={styles.cartButton}
            onPress={() => setShowCart(true)}
          >
            <Ionicons name="cart" size={24} color="#fff" />
            {getTotalItems() > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{getTotalItems()}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Category Filter */}
      <View style={styles.categoryContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={[styles.categoryButton, selectedCategory === 'all' && styles.categoryButtonActive]}
            onPress={() => setSelectedCategory('all')}
          >
            <Text style={[styles.categoryText, selectedCategory === 'all' && styles.categoryTextActive]}>
              Todos
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.categoryButton, selectedCategory === 'dog' && styles.categoryButtonActive]}
            onPress={() => setSelectedCategory('dog')}
          >
            <Text style={[styles.categoryText, selectedCategory === 'dog' && styles.categoryTextActive]}>
              Perros
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.categoryButton, selectedCategory === 'cat' && styles.categoryButtonActive]}
            onPress={() => setSelectedCategory('cat')}
          >
            <Text style={[styles.categoryText, selectedCategory === 'cat' && styles.categoryTextActive]}>
              Gatos
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Products Grid */}
      <ScrollView style={styles.productsContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.productsGrid}>
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
            />
          ))}
        </View>
      </ScrollView>

      {/* Cart Modal */}
      <CartModal
        visible={showCart}
        cart={cart}
        onClose={() => setShowCart(false)}
        onUpdateQuantity={updateCartQuantity}
        onCheckout={handleCheckout}
        totalPrice={getTotalPrice()}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        visible={showCheckout}
        cart={cart}
        totalPrice={getTotalPrice()}
        onClose={() => setShowCheckout(false)}
        onPaymentComplete={handlePaymentComplete}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: colors.primary,
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  cartButton: {
    position: 'relative',
    padding: 8,
  },
  cartBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#FFD93D',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: '#333',
    fontSize: 12,
    fontWeight: 'bold',
  },
  categoryContainer: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  categoryButtonActive: {
    backgroundColor: '#08C6B7',
  },
  categoryText: {
    color: '#333',
    fontWeight: '500',
  },
  categoryTextActive: {
    color: '#fff',
  },
  productsContainer: {
    flex: 1,
    padding: 20,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});