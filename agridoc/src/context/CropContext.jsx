import { createContext, useState } from "react";

export const CropContext = createContext();

export function CropProvider({ children }) {
  const [cropData, setCropData] = useState(null);

  return (
    <CropContext.Provider value={{ cropData, setCropData }}>
      {children}
    </CropContext.Provider>
  );
}
