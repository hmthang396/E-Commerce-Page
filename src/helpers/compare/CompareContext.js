import React, { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

export const Context = createContext({
  compareItems: Function,
  addToCompare: Function,
  removeFromComapre: Function,
});

const getLocalCompareItems = () => {
  try {
    const list = localStorage.getItem("compare");
    if (list === null) {
      return [];
    } else {
      return JSON.parse(list);
    }
  } catch (err) {
    return [];
  }
};

export const Provider = (props) => {
  const [compareItems, setcompareItems] = useState(getLocalCompareItems());

  useEffect(() => {
    localStorage.setItem("compare", JSON.stringify(compareItems));
  }, [compareItems]);

  // Add Product To Wishlist
  const addToCompare = (item) => {
    const index = compareItems.findIndex((compare) => compare.id === item.id);
    const indexColor = compareItems.findIndex((compare) => compare.Colors[0].id === item.Colors[0].id);
    if (index === -1) {
      toast.success("Product Added Successfully !");
      setcompareItems([...compareItems, item]);
    } else {
      if (indexColor === -1) {
        toast.success("Product Added Successfully !");
        setcompareItems([...compareItems, item]);
      } else {
        toast.error("This Product Already Added !");
      }
    }
  };

  // Remove Product From compare
  const removeFromComapre = (item) => {
    const index = compareItems.findIndex((itm) => itm.id === item.id && itm.Colors[0].id === item.Colors[0].id);
    toast.error("Product Removed Successfully !");
    setcompareItems(compareItems.filter((e, i) => i !== index));
  };

  return (
    <Context.Provider
      value={{
        compareItems: compareItems,
        addToCompare: addToCompare,
        removeFromComapre: removeFromComapre,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export {
  Context as CompareContext,
  Provider as CompareContextProvider,
} from "./CompareContext";
