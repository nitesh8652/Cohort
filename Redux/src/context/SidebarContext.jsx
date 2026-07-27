import React, { createContext, useContext, useState } from 'react'

const SidebarContext = createContext(null)

export const SidebarProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false)

    const openSidebar = () => setIsOpen(true)
    const closeSidebar = () => setIsOpen(false)
    const toggleSidebar = () => setIsOpen((v) => !v)

    return (
        <SidebarContext.Provider value={{ isOpen, openSidebar, closeSidebar, toggleSidebar }}>
            {children}
        </SidebarContext.Provider>
    )
}

export const useSidebar = () => useContext(SidebarContext)
