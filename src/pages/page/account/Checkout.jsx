import React, { useContext, useState } from 'react'
import { useEffect } from 'react';
import UserContext from '../../../helpers/user';
import CheckoutPage from './common/CheckoutPage';
import Login from './login-auth/Login';

const Checkout = () => {
    const context = useContext(UserContext);
    return (
        <>
            {context.user !== null ?
                <CheckoutPage />
                :
                <Login />
            }
        </>
    )
}

export default Checkout