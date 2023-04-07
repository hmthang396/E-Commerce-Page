import React, { useState, useEffect } from "react";
import Context from "./index";
import { toast } from "react-toastify";

const getLocalCartItems = () => {
  try {
    const list = localStorage.getItem("cartList");
    if (list === null) {
      return [];
    } else {
      return JSON.parse(list);
    }
  } catch (err) {
    return [];
  }
};

const calPrice = (product) => {
  if (Object.keys(product.Discount).length) {
    let len = parseInt(product.Discount.discount.toString().trim().length);
    if (product.Discount.discount.toString().trim().substr(len - 1, 1) === "%") {
      return parseFloat(product.Colors[0] - product.Colors[0] * parseFloat(product.Discount.discount.toString().trim().replace("%", "")) / 100).toFixed(0);
    } else {
      return parseFloat(product.Colors[0] - parseFloat(product.Discount.discount)).toFixed(0);
    }
  }
  return parseFloat(product.Colors[0].price).toFixed(0);
}

const CartProvider = (props) => {
  const [cartItems, setCartItems] = useState(getLocalCartItems());
  const [cartTotal, setCartTotal] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [stock, setStock] = useState("InStock");

  useEffect(() => {
    const Total = cartItems.reduce((a, b) => a + b.total, 0);
    setCartTotal(Total);

    localStorage.setItem("cartList", JSON.stringify(cartItems));
  }, [cartItems]);

  // Add Product To Cart
  const addToCart = (item, qty) => {
    toast.success("Product Added Successfully !");
    const index = cartItems.findIndex((itm) => itm.id === item.id);
    const indexColor = cartItems.findIndex((itm) => itm.Colors[0].id === item.Colors[0].id);
    if (index !== -1 && indexColor !== -1) {
      cartItems[indexColor] = {
        ...item,
        qty: parseInt(qty) + cartItems[indexColor].qty,
        price: calPrice(item),
        total: calPrice(item) * (parseInt(qty) + cartItems[indexColor].qty),
      };
      setCartItems([...cartItems]);
    } else {
      const product = {
        ...item,
        qty: parseInt(qty),
        price: calPrice(item),
        total: calPrice(item) * parseInt(qty),
      };
      setCartItems([...cartItems, product]);
    }
  };

  const removeFromCart = (item) => {
    const index = cartItems.findIndex((itm) => itm.id === item.id && itm.Colors[0].id === item.Colors[0].id);
    toast.error("Product Removed Successfully !");
    setCartItems(cartItems.filter((e, i) => i !== index));
  };

  const minusQty = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      setStock("InStock");
    }
  };

  const plusQty = (item) => {
    if (item.stock >= quantity) {
      setQuantity(quantity + 1);
    } else {
      setStock("Out of Stock !");
    }
  };

  // Udate Product Size
  const updateSize = (item, size) => {
    const index = cartItems.findIndex((itm) => itm.id === item.id && itm.Colors[0].id === item.Colors[0].id);
    if (index !== -1) {
      cartItems[index] = {
        ...item,
        size: size,
      };
      setCartItems([...cartItems]);
      toast.info("Product Size Updated !");
    }
  };

  // Update Product Quantity
  const updateQty = (item, quantity) => {
    if (quantity >= 1) {
      const index = cartItems.findIndex((itm) => itm.id === item.id && itm.Colors[0].id === item.Colors[0].id);
      if (index !== -1) {
        cartItems[index] = {
          ...item,
          qty: quantity,
          total: calPrice(item) * parseInt(quantity),
        };
        setCartItems([...cartItems]);
        toast.info("Product Quantity Updated !");
      } else {
        const product = {
          ...item,
          qty: quantity,
          price: calPrice(item),
          total: calPrice(item) * parseInt(quantity),
        };
        setCartItems([...cartItems, product]);
        toast.success("Product Added Updated !");
      }
    } else {
      toast.error("Enter Valid Quantity !");
    }
  };



  return (
    <Context.Provider
      value={{
        ...props,
        state: cartItems,
        cartTotal,
        setQuantity,
        quantity,
        stock,
        addToCart: addToCart,
        removeFromCart: removeFromCart,
        plusQty: plusQty,
        minusQty: minusQty,
        updateQty: updateQty,
        updateSize : updateSize,
        setCartItems : setCartItems
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default CartProvider;
