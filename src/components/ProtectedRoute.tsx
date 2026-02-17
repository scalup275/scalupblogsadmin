import { Navigate } from "react-router-dom";
import { useAuth } from "@/lib/auth-context";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { admin, loading } = useAuth();

  // while restoring session
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  // not logged in → go login
  if (!admin) return <Navigate to="/login" replace />;

  return <>{children}</>;
}
