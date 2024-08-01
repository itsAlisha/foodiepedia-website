import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext(null);
const CART_KEY = "cart";
const EMPTY_CART = {
  items: [],
  totalPrice: 0,
  totalCount: 0,
};

function getCartFromLocalStorage() {
  if (typeof window !== "undefined") {
    const storedCart = localStorage.getItem(CART_KEY);
    return storedCart ? JSON.parse(storedCart) : EMPTY_CART;
  }
  return EMPTY_CART;
}

const sum = (items) => {
  return items.reduce((prevValue, curValue) => prevValue + curValue, 0);
};

export default function CartProvider({ children }) {
  const initCart = getCartFromLocalStorage();
  const [cartItems, setCartItems] = useState(initCart.items || []);
  const [totalPrice, setTotalPrice] = useState(initCart.totalPrice || 0);
  const [totalCount, setTotalCount] = useState(initCart.totalCount || 0);

  useEffect(() => {
    const totalPrice = sum(cartItems.map((item) => item.price));
    const totalCount = sum(cartItems.map((item) => item.quantity));
    setTotalPrice(totalPrice);
    setTotalCount(totalCount);

    if (typeof window !== "undefined") {
      localStorage.setItem(
        CART_KEY,
        JSON.stringify({
          items: cartItems,
          totalPrice,
          totalCount,
        })
      );
    }
  }, [cartItems]);

  const removeFromCart = (foodId) => {
    const filteredCardItems = cartItems.filter(
      (item) => item.food.id !== foodId
    );
    setCartItems(filteredCardItems);
  };

  const changeQuantity = (cartItem, newQuantity) => {
    const { food } = cartItem;
    const changedCartItem = {
      ...cartItem,
      quantity: newQuantity,
      price: food.price * newQuantity,
    };
    setCartItems(
      cartItems.map((item) =>
        item.food.id === food.id ? changedCartItem : item
      )
    );
  };

  const addToCart = (food) => {
    const cartItem = cartItems.find((item) => item.food.id === food.id);
    if (cartItem) {
      changeQuantity(cartItem, cartItem.quantity + 1);
    } else {
      setCartItems([...cartItems, { food, quantity: 1, price: food.price }]);
    }
  };
  const clearCart = () => {
    localStorage.removeItem(CART_KEY);
    const { items, totalPrice, totalCount } = EMPTY_CART;
    setCartItems(items);
    setTotalPrice(totalPrice);
    setTotalCount(totalCount);
  };
  return (
    <CartContext.Provider
      value={{
        cart: { items: cartItems, totalPrice, totalCount },
        removeFromCart,
        changeQuantity,
        addToCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
