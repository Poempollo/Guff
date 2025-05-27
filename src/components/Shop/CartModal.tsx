import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from "../../styles/theme";
import { cartModalStyles as styles } from "../../styles/Shop/CartModalStyles";

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

interface CartModalProps {
  visible: boolean;
  cart: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onCheckout: () => void;
  totalPrice: number;
}

export default function CartModal({ 
  visible, 
  cart, 
  onClose, 
  onUpdateQuantity, 
  onCheckout, 
  totalPrice 
}: CartModalProps) {
  const adjustQuantity = (productId: string, currentQuantity: number, change: number) => {
    const newQuantity = currentQuantity + change;
    onUpdateQuantity(productId, newQuantity);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Mi Carrito</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>

          {cart.length === 0 ? (
            // Empty Cart
            <View style={styles.emptyCart}>
              <Ionicons name="cart-outline" size={64} color="#ccc" />
              <Text style={styles.emptyCartText}>Tu carrito está vacío</Text>
              <Text style={styles.emptyCartSubtext}>¡Agrega algunos productos para tus mascotas!</Text>
            </View>
          ) : (
            <>
              {/* Cart Items */}
              <ScrollView style={styles.cartItems} showsVerticalScrollIndicator={false}>
                {cart.map(item => (
                  <View key={item.id} style={styles.cartItem}>
                    <Image source={{ uri: item.image }} style={styles.itemImage} />
                    
                    <View style={styles.itemInfo}>
                      <Text style={styles.itemBrand}>{item.brand}</Text>
                      <Text style={styles.itemName} numberOfLines={2}>{item.name}</Text>
                      <Text style={styles.itemWeight}>{item.weight}</Text>
                      <Text style={styles.itemPrice}>{item.price.toFixed(2)}€</Text>
                    </View>

                    <View style={styles.quantityContainer}>
                      <TouchableOpacity 
                        style={styles.quantityButton}
                        onPress={() => adjustQuantity(item.id, item.quantity, -1)}
                      >
                        <Ionicons name="remove" size={16} color="#00000" />
                      </TouchableOpacity>
                      
                      <Text style={styles.quantityText}>{item.quantity}</Text>
                      
                      <TouchableOpacity 
                        style={styles.quantityButton}
                        onPress={() => adjustQuantity(item.id, item.quantity, 1)}
                      >
                        <Ionicons name="add" size={16} color="#00000" />
                      </TouchableOpacity>
                    </View>

                    <TouchableOpacity 
                      style={styles.removeButton}
                      onPress={() => onUpdateQuantity(item.id, 0)}
                    >
                      <Ionicons name="trash-outline" size={18} color="#00000" />
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>

              {/* Summary */}
              <View style={styles.summary}>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Artículos:</Text>
                  <Text style={styles.summaryValue}>{getTotalItems()}</Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Envío:</Text>
                  <Text style={styles.summaryValue}>Gratis</Text>
                </View>
                <View style={[styles.summaryRow, styles.totalRow]}>
                  <Text style={styles.totalLabel}>Total:</Text>
                  <Text style={styles.totalValue}>{totalPrice.toFixed(2)}€</Text>
                </View>
              </View>

              {/* Checkout Button */}
              <TouchableOpacity style={styles.checkoutButton} onPress={onCheckout}>
                <Ionicons name="card" size={20} color="#fff" />
                <Text style={styles.checkoutButtonText}>
                  Proceder al Pago - {totalPrice.toFixed(2)}€
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
}