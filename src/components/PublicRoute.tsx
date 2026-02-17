import { Navigate } from "react-router-dom";
import { useAuth } from "@/lib/auth-context";

export default function PublicRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { admin, loading } = useAuth();

  if (loading) return null;

  // already logged in → go dashboard
  if (admin) return <Navigate to="/" replace />;

  return <>{children}</>;
}
