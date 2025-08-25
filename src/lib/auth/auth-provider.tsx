'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import {
  type User,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { auth, db } from './firebase';
import { doc, onSnapshot } from 'firebase/firestore';

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
  userRole: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    if (!auth) {
        setLoading(false);
        return;
    }
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribeAuth();
  }, []);
  
  useEffect(() => {
    let unsubscribeFirestore: (() => void) | undefined;
    if (user && db) {
      const userDocRef = doc(db, 'users', user.uid);
      unsubscribeFirestore = onSnapshot(userDocRef, (doc) => {
        if (doc.exists()) {
          setUserRole(doc.data().role);
        } else {
          setUserRole(null);
        }
      });
    } else {
      setUserRole(null);
    }
    
    return () => {
      if (unsubscribeFirestore) {
        unsubscribeFirestore();
      }
    };
  }, [user]);

  const logout = async () => {
    if (auth) {
        await signOut(auth);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout, userRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
