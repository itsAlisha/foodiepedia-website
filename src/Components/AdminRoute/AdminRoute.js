import React, { Children } from "react";
import { useAuth } from "../../Hooks/useAuth";
import NotFound from "../NotFound/NotFound";
import AuthRoute from "../AuthRoutes/AuthRoute";

function AdminRoute({ children }) {
  const { user } = useAuth();
  return user.isAdmin ? (
    children
  ) : (
    <NotFound
      linkRoute="/dashboard"
      linkText="Go to dashboard"
      message="You don't have access to this page"
    />
  );
}

const AdminRouteExport = ({ children }) => (
  <AuthRoute>
    <AdminRoute>{children}</AdminRoute>
  </AuthRoute>
);
export default AdminRouteExport;
