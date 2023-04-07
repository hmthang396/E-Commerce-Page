import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import { CompareContextProvider } from './helpers/compare/CompareContext';
import CartContextProvider from './helpers/cart/CartContext';
import { WishlistContextProvider } from './helpers/wishlist/WishlistContext';
import UserContextProvider from './helpers/user/UserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter basename={"/"}>
    <PerfectScrollbar>
      <CompareContextProvider>
        <CartContextProvider>
          <WishlistContextProvider>
            <UserContextProvider>
              <App />
            </UserContextProvider>
          </WishlistContextProvider>
        </CartContextProvider>
      </CompareContextProvider>
    </PerfectScrollbar>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
