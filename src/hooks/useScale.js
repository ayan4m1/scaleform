import { createContext, useContext } from 'react';

export const ScaleContext = createContext();

export const useScale = () => useContext(ScaleContext);
