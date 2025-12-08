import { Navigate } from "react-router-dom";

import type { ReactNode } from "react";
import { useAppSelector } from "@/store/hook";

interface GuestRouteProps {
  children: ReactNode;
}

export default function GuestRoute({ children }: GuestRouteProps) {
  const accessToken = useAppSelector((state) => state.auth.accessToken);

  // If token exists, user is considered logged in → redirect
  if (accessToken) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
