import { Navigate } from "react-router-dom";
import { isTokenExpired } from "@/utils/auth";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (isTokenExpired(token)) {
    localStorage.removeItem("token");

    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}
