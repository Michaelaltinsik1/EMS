import React, { createContext, useState, ReactNode } from 'react';
import { PermissionType } from 'src/Types';
interface AuthContextProps {
  user: AuthUserType | null;
  handleSignInPermissions: (user: AuthUserType | null) => void;
}
interface AuthUserType {
  permission: PermissionType;
  userId: string;
}
interface AuthProviderProps {
  children: ReactNode | ReactNode[];
}
export const AuthContext = createContext<AuthContextProps>({
  user: null,
  handleSignInPermissions: (user: AuthUserType | null) => {},
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<AuthUserType | null>(null);
  const handleSignInPermissions = (userPermission: AuthUserType | null) => {
    setUser(userPermission);
  };
  return (
    <AuthContext.Provider value={{ user, handleSignInPermissions }}>
      {children}
    </AuthContext.Provider>
  );
};
