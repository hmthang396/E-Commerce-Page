import React, { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export const Context = createContext({
  wishlistItems: Function,
  addToWish: Function,
  removeFromWish: Function
}
);

const getLocalWishlistItems = () => {
  try {
    const list = localStorage.getItem('wishlist');
    if (list === null) {
      return [];
    } else {
      return JSON.parse(list)
    }
  } catch (err) {
    return [];
  }
};

export const Provider = (props) => {

  const [wishlistItems, setWishlistItems] = useState(getLocalWishlistItems())

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems))
  }, [wishlistItems])


  // Add Product To Wishlist
  const addToWish = (item) => {
    const index = wishlistItems.findIndex(wish => wish.id === item.id)
    const indexColor = wishlistItems.findIndex((wish) => wish.Colors[0].id === item.Colors[0].id);
    if (index === -1) {
      toast.success("Product Added Successfully !");
      setWishlistItems([...wishlistItems, item])
    } else {
      if (indexColor === -1) {
        toast.success("Product Added Successfully !");
        setWishlistItems([...wishlistItems, item]);
      } else {
        toast.error("This Product Already Added !");
      }
    }
  }

  // Remove Product From Wishlist
  const removeFromWish = (item) => {
    const index = wishlistItems.findIndex((itm) => itm.id === item.id && itm.Colors[0].id === item.Colors[0].id);
    toast.error("Product Removed Successfully !");
    setWishlistItems(wishlistItems.filter((e, i) => i !== index));
  }

  // const {value} = props

  return (
    <Context.Provider value={{
      wishlistItems: wishlistItems,
      addToWish: addToWish,
      removeFromWish: removeFromWish
    }}>
      {props.children}
    </Context.Provider>
  );
}

export {
  Context as WishlistContext,
  Provider as WishlistContextProvider,
} from "./WishlistContext";
