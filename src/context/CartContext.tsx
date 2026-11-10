import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  CartItem,
  Product,
  PosterSize,
  calculatePrice,
  FREE_SHIPPING_THRESHOLD,
  STANDARD_SHIPPING_COST,
} from '@/data/products';

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  addItem: (
    product: Product,
    size: PosterSize,
    isFramed: boolean,
    frameColor?: string,
    quantity?: number
  ) => void;
  removeItem: (productId: string, size: PosterSize, isFramed: boolean) => void;
  updateQuantity: (
    productId: string,
    size: PosterSize,
    isFramed: boolean,
    quantity: number
  ) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  shippingFee: number;
  finalPrice: number;
  freeShippingRemaining: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'wallora_cart_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [items]);

  const addItem = useCallback(
    (
      product: Product,
      size: PosterSize,
      isFramed: boolean,
      frameColor: string = 'Matte Black',
      quantity: number = 1
    ) => {
      const unitPrice = calculatePrice(size, isFramed);

      setItems(prev => {
        const existingIdx = prev.findIndex(
          i =>
            i.product.id === product.id &&
            i.selectedSize === size &&
            i.isFramed === isFramed &&
            (!isFramed || i.selectedFrameColor === frameColor)
        );

        if (existingIdx > -1) {
          const updated = [...prev];
          const newQty = updated[existingIdx].quantity + quantity;
          updated[existingIdx] = {
            ...updated[existingIdx],
            quantity: newQty,
            totalPrice: unitPrice * newQty,
          };
          return updated;
        }

        const newItem: CartItem = {
          product,
          quantity,
          selectedSize: size,
          isFramed,
          selectedFrameColor: isFramed ? frameColor : undefined,
          unitPrice,
          totalPrice: unitPrice * quantity,
        };
        return [...prev, newItem];
      });

      setIsOpen(true);
    },
    []
  );

  const removeItem = useCallback((productId: string, size: PosterSize, isFramed: boolean) => {
    setItems(prev =>
      prev.filter(
        i => !(i.product.id === productId && i.selectedSize === size && i.isFramed === isFramed)
      )
    );
  }, []);

  const updateQuantity = useCallback(
    (productId: string, size: PosterSize, isFramed: boolean, quantity: number) => {
      if (quantity <= 0) {
        removeItem(productId, size, isFramed);
        return;
      }

      setItems(prev =>
        prev.map(i => {
          if (i.product.id === productId && i.selectedSize === size && i.isFramed === isFramed) {
            return {
              ...i,
              quantity,
              totalPrice: i.unitPrice * quantity,
            };
          }
          return i;
        })
      );
    },
    [removeItem]
  );

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
  const shippingFee = subtotal === 0 ? 0 : subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_COST;
  const finalPrice = subtotal + shippingFee;
  const freeShippingRemaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        setIsOpen,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        shippingFee,
        finalPrice,
        freeShippingRemaining,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
