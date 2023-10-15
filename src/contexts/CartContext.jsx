import { createContext, useContext } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {

    return (
        <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
    )
};

export const useCart = () => {
    return useContext(CartContext);
};

export default CartProvider;