import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../Layout";

import { AboutPage } from "@app/pages/user/about-page";
import { CartPage } from "@app/pages/user/cart-page";
import { ConfirmationPage } from "@app/pages/user/confirmation-page";
import { HomePage } from "@app/pages/user/home-page";
import { MenuPage } from "@app/pages/user/menu-page";
import { OrdersPage } from "@app/pages/user/orders-page";
import { PaymentPage } from "@app/pages/user/payment-page";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { path: "/about", element: <AboutPage /> },
            { path: "/cart", element: <CartPage /> },
            { path: "/confirmation", element: <ConfirmationPage /> },
            { path: "/", element: <HomePage /> },
            { path: "/menu", element: <MenuPage /> },
            { path: "/orders", element: <OrdersPage /> },
            { path: "/payment", element: <PaymentPage /> },
            { path: "*", element: <h1>This is not the page you are looking for</h1> },
        ]
    }
]);