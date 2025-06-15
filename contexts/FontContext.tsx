import React, { createContext, useContext, useState, ReactNode } from "react";
import { Platform } from "react-native";

interface FontContextType {
  currentFont: string;
  toggleFont: () => void;
  isThemeChanged: boolean;
}

const FontContext = createContext<FontContextType | undefined>(undefined);

interface FontProviderProps {
  children: ReactNode;
}

export function FontProvider({ children }: FontProviderProps) {
  const [isThemeChanged, setIsThemeChanged] = useState(false);

  // Define ugly fonts for each platform
  const getUglyFont = () => {
    if (Platform.OS === "ios") {
      // Try iOS system fonts that are notoriously bad for UI
      return "Papyrus"; // Papyrus is available on iOS
    } else {
      // For Android, use generic font families that look bad
      return "cursive"; // Generic cursive font family
    }
  };

  const currentFont = isThemeChanged ? getUglyFont() : "Times New Roman";

  const toggleFont = () => {
    setIsThemeChanged(!isThemeChanged);
  };

  return (
    <FontContext.Provider value={{ currentFont, toggleFont, isThemeChanged }}>
      {children}
    </FontContext.Provider>
  );
}

export function useFont() {
  const context = useContext(FontContext);
  if (context === undefined) {
    throw new Error("useFont must be used within a FontProvider");
  }
  return context;
}
