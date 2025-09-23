import React, { createContext, useContext, useState,useEffect } from 'react';
const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [cartItems, setCartItems] = useState([])
  

  
  useEffect(() => {
    const storedUser = localStorage.getItem('authUser');
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;
    const userId = parsedUser?.id;

    if (userId) {
      (async () => {
        try {
          const response = await getCartByUserId(userId);
          console.log("cart by id",response)
          setCartItems(response);
        } catch (error) {
          console.error('Error fetching cart:', error);
        }
      })();
    } else {
      const storedCart = localStorage.getItem("cart");
      setCartItems(storedCart ? JSON.parse(storedCart) : []);
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = async (item) => {
    const storedUser = localStorage.getItem('authUser');
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;
    const userId = parsedUser?.id || parsedUser?._id;
  
    console.log("userId :", userId);
  
    setCartItems((prev) => {
      // Find item with matching ID (either id or _id)
      const existingItem = prev.find(
        i =>
          (i.id === item.id || i._id === item._id) &&
          i.size === item.size &&
          i.cutType === item.cutType
      );
      
      
      if (existingItem) {
        return prev.map(i => {
          const match =
            (i.id === item.id || i._id === item._id) &&
            i.color === item.color &&
            i.size === item.size;
      
          return match ? { ...i, quantity: i.quantity + item.quantity } : i;
        });
      }
      
      return [...prev, { ...item, quantity: item.quantity || 1 }];
      
  
      return [...prev, { ...item, quantity: item.quantity || 1 }];
    });
  
    setDrawerOpen(true);
  
    // Sync with backend if user is logged in
    if (userId) {
      try {
        await addToCartAPI({
          userId,
          productId: item.id || item._id,
          quantity: item.quantity || 1,
          price: item.price
        });
      } catch (error) {
        console.error('Add to cart (API) failed:', error);
      }
    } else {
      console.warn("Guest user - item only added to local cart.");
    }
  };
  
  
  

  const removeFromCart = async (item) => {
    console.log("Item to remove:", item);
  
    const storedUser = localStorage.getItem("authUser");
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;
    const userId = parsedUser?.id || parsedUser?._id;
  
    setCartItems((prev) => {
      console.log("Current cart items:", prev);
  
      // Determine the item ID to remove — use productId._id if available, else fallback to _id or id
      const itemIdToRemove = item.productId?._id || item._id || item.id;
      console.log("Removing item ID:", itemIdToRemove);
  
      const newCart = prev.filter(
        (i) => {
          // Get current cart item's ID to compare similarly
          const currentItemId = i.productId?._id || i._id || i.id;
          return currentItemId !== itemIdToRemove;
        }
      );
  
      console.log("New cart after removal:", newCart);
      return [...newCart]; // clone to force React re-render
    });
  
    if (userId) {
      try {
        await deleteCartItem({
          userId,
          productId: item.productId?._id || item._id || item.id,
        });
        console.log("Removed from backend:", item.productId?._id || item._id || item.id);
      } catch (error) {
        console.error("Failed to remove cart item from backend:", error);
      }
    }
  };
  
  
  
  const updateCartItemQuantity = async (id, change) => {
    setCartItems((prev) =>
      prev.map((item) => {
        const itemId = item._id || item.id || item.productId?._id;
        if (itemId === id) {
          return { ...item, quantity: Math.max(1, (item.quantity || 1) + change) };
        }
        return item;
      })
    );
  
    // Optional: sync updated quantity with backend
    const storedUser = localStorage.getItem("authUser");
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;
    const userId = parsedUser?.id;
  
    if (userId) {
      try {
        await addToCartAPI({
          userId,
          productId: id,
          quantity: change, // sending the delta to backend
        });
      } catch (error) {
        console.error("Failed to update cart item quantity:", error);
      }
    }
  };
  
  
  
  
  
  
  

  const toggleDrawer = (state) => {
    setDrawerOpen(state);
  };
  const clearCart = () => setCartItems([]);

  const recommendedItems = [
    {
      id: 'ydm4109a',
      title: 'YDM4109 A',
      image: '/images/feature-alarm.png',
      oldPrice: 49000,
      price: 57699,
      brand: 'Yale',
      color: 'Black',
    },
    {
      id: 'ydm4107a',
      title: 'YDM4109 B',
      image: '/images/feature-battery.png',
      oldPrice: 49000,
      price: 57699,
      brand: 'Yale',
      color: 'Black',
    },
    {
      id: 'ydm4108a',
      title: 'YDM4109 C',
      image: '/images/feature-fingerprint.png',
      oldPrice: 49000,
      price: 57699,
      brand: 'Yale',
      color: 'Black',
    },
  ];

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        drawerOpen,
        clearCart,
        toggleDrawer,
        recommendedItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
