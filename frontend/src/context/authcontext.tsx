import React, {createContext, useState, useContext, useEffect} from "react";
import axios from "axios";

// Define types for user and authentication state
interface User {
  id?: string;
  name?: string;
  email?: string;
  role?: "user" | "admin" | "superadmin";
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  subscribeUser: (userData: {
    name: string;
    email: string;
    password?: string;
    role?: "user" | "admin";
    newsletter?: boolean;
  }) => Promise<void>;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

// Create the context
const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  login: async () => {},
  logout: () => {},
  subscribeUser: async () => {},
  isAuthenticated: false,
  isAdmin: false,
});

// Provider component
export const AuthProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Computed values
  const isAuthenticated = !!user;
  const isAdmin = user?.role === "admin" || user?.role === "superadmin";

  // Validate token
  // const validateToken = async (currentToken: string) => {
  //   try {
  //     await axios.post(
  //       "/api/validate-token",
  //       {},
  //       {
  //         headers: {Authorization: `Bearer ${currentToken}`},
  //       }
  //     );
  //   } catch (err) {
  //     console.error("error:")
  //     logout();
  //   }
  // };

  // Load user from local storage on initial load
  useEffect(() => {
    const validateToken = async (currentToken: string) => {
    try {
      await axios.post(
        "/api/validate-token",
        {},
        {
          headers: {Authorization: `Bearer ${currentToken}`},
        }
      );
    } catch (err) {
      console.error("error:");
      logout();
    }
  };


    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setToken(storedToken);

        // Optional: Validate token with backend
        validateToken(storedToken);
      } catch (err) {
        console.error("error:");
        // Clear invalid local storage
        logout();
      }
    }
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post("/api/login", {email, password});

      const {token, user: userData} = response.data;

      setUser({
        id: userData._id,
        name: userData.name,
        email: userData.email,
        role: userData.role,
      });
      setToken(token);

      // Store in local storage
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", token);
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  // Subscribe user function
  const subscribeUser = async (userData: {
    name: string;
    email: string;
    password?: string;
    role?: "user" | "admin";
    newsletter?: boolean;
  }) => {
    try {
      const response = await axios.post("/api/subscribe", {
        ...userData,
        newsletter: userData.newsletter || false,
      });

      // Optional: Auto-login for admin
      if (userData.role === "admin" && userData.password) {
        await login(userData.email, userData.password);
      }

      return response.data;
    } catch (error) {
      console.error("Subscription failed", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        subscribeUser,
        isAuthenticated,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);
