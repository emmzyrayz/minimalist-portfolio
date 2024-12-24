// @/context/authcontext.tsx
import React, {createContext, useState, useContext, useEffect} from "react";
import axios, {AxiosError} from "axios";

// Add interface for API error response
interface ApiErrorResponse {
  error: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  role: "visitor" | "user" | "admin";
  newsletter?: boolean;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  subscribeUser: (userData: {
    name: string;
    email: string;
    password?: string;
    role?: "visitor" | "user" | "admin";
    newsletter?: boolean;
  }) => Promise<void>;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  login: async () => {},
  logout: () => {},
  subscribeUser: async () => {},
  isLoading: false,
  isAuthenticated: false,
  isAdmin: false,
});

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true); 

  const isAuthenticated = !!user;
  const isAdmin = user?.role === "admin";

  const isAxiosError = (error: unknown): error is AxiosError => {
    return error instanceof AxiosError;
  };


  // Load user from local storage and validate token
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    const validateToken = async (currentToken: string) => {
      try {
        const response = await axios.post(
          "/api/auth/validate-token",
          {},
          {
            headers: {Authorization: `Bearer ${currentToken}`},
          }
        );

        if (!response.data.valid) {
          logout();
        }
      } catch (error) {
        console.error("Token validation failed:", error);
        logout();
      } finally {
        setIsLoading(false); // Set loading to false after validation
      }
    };


    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        if (storedToken) {
          setToken(storedToken);
          validateToken(storedToken);
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error parsing stored user:", error);
        logout();
      }
    } else {
      setIsLoading(false);
    }
  }, []);

  
  const login = async (email: string, password: string) => {
    setIsLoading(true); // Set loading to true during login
    try {
      const response = await axios.post("/api/auth/login", {email, password});
      const {token: newToken, user: userData} = response.data;

      setUser(userData);
      setToken(newToken);

      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", newToken);
    } catch (error: unknown) {
     if (isAxiosError(error)) {
       console.error("Login failed:", error);
       throw new Error(
         (error.response?.data as ApiErrorResponse)?.error ||
           "Login failed. Please try again."
       );
     } else {
       console.error("Unexpected error:", error);
       throw new Error("Login failed. Please try again.");
     }
    } finally {
      setIsLoading(false); // Set loading to false after login attempt
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const subscribeUser = async (userData: {
    name: string;
    email: string;
    password?: string;
    role?: "visitor" | "user" | "admin";
    newsletter?: boolean;
  }) => {
    try {
      const response = await axios.post("/api/auth/subscribe", userData);

      if (response.data.success) {
        // Create a user object for visitor/user
        const newUser = {
          _id: response.data.userId,
          name: userData.name,
          email: userData.email,
          role: userData.role || "visitor",
          newsletter: userData.newsletter,
        };

        // Set user in state and localStorage
        setUser(newUser);
        localStorage.setItem("user", JSON.stringify(newUser));

        // If admin role and password provided, perform login
        if (userData.role === "admin" && userData.password) {
          await login(userData.email, userData.password);
        }
      }

      return response.data;
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        console.error("Subscription failed:", error);
        throw new Error(
          (error.response?.data as ApiErrorResponse)?.error ||
            "Subscription failed. Please try again."
        );
      }
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
        isLoading,
        subscribeUser,
        isAuthenticated,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);