import { useState, useEffect } from "react"
import { Authentication } from "@services/auth";

/**
 * @param auth The Authentication service
 * @returns The current authentication state. Undefined means the state is not yet fetched.
 */
export default function useAuth(auth: Authentication) {
  const [isAuthenticated, setIsAuthenticated] = useState<undefined | boolean>();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChange(user => {
      setIsAuthenticated(user != null);
    });

    return(() => unsubscribe());
  }, []);

  return isAuthenticated;
}