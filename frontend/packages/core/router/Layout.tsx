import { Navbar } from "@app/base";
import { Outlet } from "react-router-dom";

export function Layout() {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    );
}