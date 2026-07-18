import { createContext } from "react";
import { useState } from "react";

export const store = createContext()

const ContextProvider = ({ children }) => {

    const [productsData, setProductsData] = useState([])

    return (
        <store.Provider
            value={{
                productsData,
                setProductsData,
            }}>
            {children}
        </store.Provider>
    )
}

export default ContextProvider;