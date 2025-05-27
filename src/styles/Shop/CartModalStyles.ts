import { StyleSheet } from "react-native";
import { colors } from "../../styles/theme";

export const cartModalStyles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '85%',
    minHeight: '50%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  closeButton: {
    padding: 4,
  },
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyCartText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.subtitle,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyCartSubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
  cartItems: {
    flex: 1,
    padding: 20,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  itemInfo: {
    flex: 1,
    marginLeft: 12,
  },
  itemBrand: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '600',
  },
  itemName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginVertical: 2,
  },
  itemWeight: {
    fontSize: 12,
    color: colors.subtitle,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.primary,
    marginTop: 4,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
quantityButton: {
  borderWidth: 1,
  borderColor: colors.primary,
  borderRadius: 15,
  width: 30,
  height: 30,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: colors.white,
},
  quantityText: {
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 12,
    color: colors.text,
    minWidth: 20,
    textAlign: 'center',
  },
 removeButton: {
  padding: 8,
},
  summary: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: colors.subtitle,
  },
  summaryValue: {
    fontSize: 14,
    color: colors.text,
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
  },
  checkoutButton: {
    backgroundColor: colors.primary,
    margin: 20,
    padding: 16,
    borderRadius: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});