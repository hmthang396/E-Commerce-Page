import React, { useState, useEffect } from "react";
import Context from "./index";

const getLocalUser = () => {
    try {
        const list = localStorage.getItem("userInfo");
        if (list === null) {
            return [];
        } else {
            return JSON.parse(list);
        }
    } catch (err) {
        return [];
    }
};

const UserProvider = (props) => {
    const [user, setUser] = useState(getLocalUser());
    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        setUser(userInfo);
    }, []);

    return (
        <Context.Provider
            value={{
                ...props,
                user,
                setUser
            }}
        >
            {props.children}
        </Context.Provider>
    );
}

export default UserProvider;