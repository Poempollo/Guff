import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Modal, 
  TouchableOpacity, 
  ScrollView, 
  TextInput,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { toast } from 'sonner-native';
import { colors } from "../../styles/theme";
import { checkoutModalStyles as styles } from "../../styles/Shop/CheckoutModalStyles";

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

interface CheckoutModalProps {
  visible: boolean;
  cart: CartItem[];
  totalPrice: number;
  onClose: () => void;
  onPaymentComplete: () => void;
}

type PaymentMethod = 'card' | 'paypal' | 'apple' | 'google';

export default function CheckoutModal({ 
  visible, 
  cart, 
  totalPrice, 
  onClose, 
  onPaymentComplete 
}: CheckoutModalProps) {
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const paymentMethods = [
    { id: 'card' as PaymentMethod, name: 'Tarjeta de Crédito', icon: 'card' },
    { id: 'paypal' as PaymentMethod, name: 'PayPal', icon: 'logo-paypal' },
    { id: 'apple' as PaymentMethod, name: 'Apple Pay', icon: 'logo-apple' },
    { id: 'google' as PaymentMethod, name: 'Google Pay', icon: 'logo-google' },
  ];

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const handlePayment = async () => {
    // Validación básica
    if (!formData.email || !formData.fullName || !formData.address) {
      toast.error('Por favor, completa todos los campos requeridos');
      return;
    }

    if (selectedPayment === 'card' && (!formData.cardNumber || !formData.expiryDate || !formData.cvv)) {
      toast.error('Por favor, completa los datos de la tarjeta');
      return;
    }

    setIsProcessing(true);

    // Simular procesamiento de pago
    setTimeout(() => {
      setIsProcessing(false);
     Alert.alert(
  '¡Pago Exitoso!',
  `Tu pedido ha sido confirmado por €${totalPrice.toFixed(2)}`,
  [
    {
      text: 'OK',
      onPress: () => {
        onPaymentComplete();
      },
    },
  ]
);
      onPaymentComplete();
    }, 3000);
  };

  const formatCardNumber = (value: string) => {
    // Remover espacios y caracteres no numéricos
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    // Agregar espacios cada 4 dígitos
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    return v;
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
          {/* Cabecera */}
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color="#666" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Checkout</Text>
            <View style={styles.placeholder} />
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>

            {/* Lista de Productos */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Resumen del Pedido</Text>
              <View style={styles.orderSummary}>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Artículos ({getTotalItems()})</Text>
                  <Text style={styles.summaryValue}>{totalPrice.toFixed(2)}€</Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Envío</Text>
                  <Text style={[styles.summaryValue, styles.freeText]}>Gratis</Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.summaryRow}>
                  <Text style={styles.totalLabel}>Total</Text>
                  <Text style={styles.totalValue}>{totalPrice.toFixed(2)}€</Text>
                </View>
              </View>
            </View>

            {/* Información de Contacto */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Información de Contacto</Text>
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={formData.email}
                onChangeText={(text) => setFormData({...formData, email: text})}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Dirección de envío */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Dirección de Envío</Text>
              <TextInput
                style={styles.input}
                placeholder="Nombre completo"
                value={formData.fullName}
                onChangeText={(text) => setFormData({...formData, fullName: text})}
              />
              <TextInput
                style={styles.input}
                placeholder="Dirección"
                value={formData.address}
                onChangeText={(text) => setFormData({...formData, address: text})}
              />
              <View style={styles.row}>
                <TextInput
                  style={[styles.input, styles.halfWidth]}
                  placeholder="Ciudad"
                  value={formData.city}
                  onChangeText={(text) => setFormData({...formData, city: text})}
                />
                <TextInput
                  style={[styles.input, styles.halfWidth]}
                  placeholder="Código Postal"
                  value={formData.zipCode}
                  onChangeText={(text) => setFormData({...formData, zipCode: text})}
                  keyboardType="numeric"
                />
              </View>
            </View>

            {/* Métodos de Pago */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Método de Pago</Text>
              {paymentMethods.map(method => (
                <TouchableOpacity
                  key={method.id}
                  style={[
                    styles.paymentMethod,
                    selectedPayment === method.id && styles.paymentMethodSelected
                  ]}
                  onPress={() => setSelectedPayment(method.id)}
                >
                  <View style={styles.paymentMethodContent}>
                    <Ionicons 
                      name={method.icon as any} 
                      size={24} 
                      color={selectedPayment === method.id ? '#FF6B6B' : '#666'} 
                    />
                    <Text style={[
                      styles.paymentMethodText,
                      selectedPayment === method.id && styles.paymentMethodTextSelected
                    ]}>
                      {method.name}
                    </Text>
                  </View>
                  <View style={[
                    styles.radioButton,
                    selectedPayment === method.id && styles.radioButtonSelected
                  ]}>
                    {selectedPayment === method.id && (
                      <View style={styles.radioButtonInner} />
                    )}
                  </View>
                </TouchableOpacity>
              ))}

              
              {selectedPayment === 'card' && (
                <View style={styles.cardDetails}>
                  <TextInput
                    style={styles.input}
                    placeholder="Número de tarjeta"
                    value={formData.cardNumber}
                    onChangeText={(text) => setFormData({...formData, cardNumber: formatCardNumber(text)})}
                    keyboardType="numeric"
                    maxLength={19}
                  />
                  <View style={styles.row}>
                    <TextInput
                      style={[styles.input, styles.halfWidth]}
                      placeholder="MM/YY"
                      value={formData.expiryDate}
                      onChangeText={(text) => setFormData({...formData, expiryDate: formatExpiryDate(text)})}
                      keyboardType="numeric"
                      maxLength={5}
                    />
                    <TextInput
                      style={[styles.input, styles.halfWidth]}
                      placeholder="CVV"
                      value={formData.cvv}
                      onChangeText={(text) => setFormData({...formData, cvv: text})}
                      keyboardType="numeric"
                      maxLength={4}
                      secureTextEntry
                    />
                  </View>
                </View>
              )}
            </View>
          </ScrollView>

          {/* Botón de Pago */}
          <View style={styles.footer}>
            <TouchableOpacity 
              style={[styles.payButton, isProcessing && styles.payButtonDisabled]}
              onPress={handlePayment}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <Text style={styles.payButtonText}>Procesando...</Text>
              ) : (
                <>
                  <Ionicons name="lock-closed" size={20} color="#fff" />
                  <Text style={styles.payButtonText}>
                    Pagar {totalPrice.toFixed(2)}€
                  </Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}