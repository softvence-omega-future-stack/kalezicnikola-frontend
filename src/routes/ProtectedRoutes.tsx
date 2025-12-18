
// import { Navigate, Outlet } from "react-router-dom";
// import { useAppSelector } from "@/store/hook";

// export default function ProtectedRoute() {
//   const accessToken = useAppSelector(state => state.auth.accessToken);

//   if (!accessToken) {
//     return <Navigate to="/login" replace />;
//   }

//   return <Outlet />;
// }


import { Navigate } from "react-router-dom";
import { useAppSelector } from "@/store/hook";
import type { ReactNode } from "react";

type UserRole = "doctor" | "admin" ;

interface ProtectedRouteProps {
  role?: UserRole;
  children: ReactNode;
}

export default function ProtectedRoute({ role, children }: ProtectedRouteProps) {
  const { user, accessToken } = useAppSelector((state) => state.auth);

  // Not logged in
  if (!accessToken || !user) {
    return <Navigate to="/login" replace />;
  }

  // Role mismatch (if restricted)
  if (role && user.role !== role) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

