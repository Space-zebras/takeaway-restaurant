import { Navbar } from "@app/base";
import { Outlet } from "react-router-dom";
import { Footer } from "@app/base";

export function Layout() {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    );
}