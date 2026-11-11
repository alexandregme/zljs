"use client";
import { useAuth } from "../../hooks/use-auth";
import { AccessPending } from "../access-pending";
import { Login } from "../login";
import type { LoginVendor } from "../login";
import type { AuthorizedProps } from "./authorized.interface";

export const Authorized = <V extends LoginVendor>({
  children,
  roles,
  login,
  accessPending,
}: AuthorizedProps<V>) => {
  const { status, user, role } = useAuth();

  if (status === "loading") return null;
  if (!user) return <Login {...login} />;

  const hasRole = !roles || (role !== null && roles.includes(role));

  if (!user.hasAccess || !hasRole) return <AccessPending {...accessPending} />;

  return <>{children}</>;
};
