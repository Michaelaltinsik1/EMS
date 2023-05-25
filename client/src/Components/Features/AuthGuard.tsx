import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { PermissionType } from 'src/Types';
interface AuthGuardProps {
  permission: 'ADMIN' | 'EMPLOYEE' | undefined;
  children: ReactNode | ReactNode[];
}
const AuthGuard = ({ permission, children }: AuthGuardProps) => {
  const verifyPermission = () => {
    if (permission) {
      return <>{children}</>;
    } else {
      return <Navigate to="/" replace />;
    }
  };
  return verifyPermission();
};
export default AuthGuard;
