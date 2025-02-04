// context/UserContext.js
"use client"
import { createContext, useContext } from 'react';
import { ReactNode } from 'react';
const UserContext = createContext("Anonymous");

type ContextProps = {
    children: ReactNode,
    value: string
}

export const UserContextProvider = ({ children, value }: ContextProps) => {
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = () => useContext(UserContext);