import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import { colors } from "../../styles/theme";
import { productCardStyles as styles } from "../../styles/Shop/ProductCardStyles";

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  category: "dog" | "cat";
  description: string;
  weight: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
}

export default function ProductCard({
  product,
  onAddToCart,
}: ProductCardProps) {
  const [showModal, setShowModal] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Ionicons key={i} name="star" size={12} color="#FFD700" />);
    }

    if (hasHalfStar) {
      stars.push(
        <Ionicons key="half" name="star-half" size={12} color="#FFD700" />
      );
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Ionicons
          key={`empty-${i}`}
          name="star-outline"
          size={12}
          color="#DDD"
        />
      );
    }

    return stars;
  };

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    Toast.show({
      type: 'success',
      text1: '¡Producto agregado!',
      text2: `${quantity}x ${product.name} agregado al carrito`,
    });
    setShowModal(false);
    setQuantity(1);
  };

  const adjustQuantity = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  return (
    <>
      <TouchableOpacity style={styles.card} onPress={() => setShowModal(true)}>
        <Image source={{ uri: product.image }} style={styles.productImage} />

        <View style={styles.cardContent}>
          <Text style={styles.brandText}>{product.brand}</Text>
          <Text style={styles.productName} numberOfLines={2}>
            {product.name}
          </Text>
          <Text style={styles.weightText}>{product.weight}</Text>

          <View style={styles.ratingContainer}>
            <View style={styles.starsContainer}>
              {renderStars(product.rating)}
            </View>
            <Text style={styles.ratingText}>
              {product.rating} ({product.reviews})
            </Text>
          </View>

          <View style={styles.priceContainer}>
            <Text style={styles.price}>{product.price.toFixed(2)}€</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setShowModal(true)}
            >
              <Ionicons name="add" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>

      {/* Product Detail Modal */}
      <Modal
        visible={showModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowModal(false)}
            >
              <Ionicons name="close" size={24} color="#666" />
            </TouchableOpacity>

            <Image source={{ uri: product.image }} style={styles.modalImage} />

            <View style={styles.modalInfo}>
              <Text style={styles.modalBrand}>{product.brand}</Text>
              <Text style={styles.modalName}>{product.name}</Text>
              <Text style={styles.modalDescription}>{product.description}</Text>
              <Text style={styles.modalWeight}>Peso: {product.weight}</Text>

              <View style={styles.modalRating}>
                <View style={styles.starsContainer}>
                  {renderStars(product.rating)}
                </View>
                <Text style={styles.ratingText}>
                  {product.rating} ({product.reviews} reseñas)
                </Text>
              </View>

              <Text style={styles.modalPrice}>{product.price.toFixed(2)}€</Text>

              <View style={styles.quantityContainer}>
                <Text style={styles.quantityLabel}>Cantidad:</Text>
                <View style={styles.quantityControls}>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => adjustQuantity(-1)}
                  >
                    <Ionicons name="remove" size={20} color="#00000" />
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>{quantity}</Text>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => adjustQuantity(1)}
                  >
                    <Ionicons name="add" size={20} color="#00000" />
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity
                style={styles.addToCartButton}
                onPress={handleAddToCart}
              >
                <Ionicons name="cart" size={20} color="#fff" />
                <Text style={styles.addToCartText}>
                  Añadir al carrito - {(product.price * quantity).toFixed(2)}€
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}