import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  // useEffect,
} from "react";

// Define the shape of the context
interface ScrollVisibilityContextType {
  isShowVisible: boolean;
  setShowVisibility: (isVisible: boolean) => void;
}

// Create the context
const ScrollVisibilityContext = createContext<ScrollVisibilityContextType>({
  isShowVisible: false,
  setShowVisibility: () => {},
});

// Provider component
export const ScrollVisibilityProvider: React.FC<{
  children: React.ReactNode;
}> = ({children}) => {
  const [isShowVisible, setIsShowVisible] = useState(false);

  const setShowVisibility = useCallback((isVisible: boolean) => {
    setIsShowVisible(isVisible);
  }, []);

  return (
    <ScrollVisibilityContext.Provider
      value={{isShowVisible, setShowVisibility}}
    >
      {children}
    </ScrollVisibilityContext.Provider>
  );
};

// Custom hook to use scroll visibility
export const useScrollVisibility = () => {
  return useContext(ScrollVisibilityContext);
};
