import { createContext, useContext } from "react";
import { useState } from "react";

export const store = createContext()

const ContextProvider = ({ children }) => {

    const [products, setProducts] = useState([])

    return (
        <store.Provider
            value={{ products, setProducts }}
        >

            {children}
        </store.Provider>
    )


}

export default ContextProvider

