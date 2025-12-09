import { AdminNavbar } from "@app/base";
import { Outlet } from "react-router-dom";

export function AdminLayout() {
  return (
    <>
      <AdminNavbar />
      <Outlet />
    </>
  );
}
