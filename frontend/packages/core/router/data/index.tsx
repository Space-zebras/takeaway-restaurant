import { createBrowserRouter } from "react-router-dom";

import { AboutPage } from "@pages/user/about-page";
import { CartPage } from "@pages/user/cart-page";
import { ConfirmationPage } from "@pages/user/confirmation-page";
import { HomePage } from "@pages/user/home-page";
import { MenuPage } from "@pages/user/menu-page";
import { OrdersPage } from "@pages/user/orders-page";
import { PaymentPage } from "@pages/user/payment-page";

const router = createBrowserRouter([
    { path: "/about", element: <AboutPage /> },
    { path: "/cart", element: <CartPage /> },
    { path: "/confirmation", element: <ConfirmationPage /> },
    { path: "/", element: <HomePage /> },
    { path: "/menu", element: <MenuPage /> },
    { path: "/orders", element: <OrdersPage /> },
    { path: "/payment", element: <PaymentPage /> },
    { path: "*", element: <h1>This is not the page you are looking for</h1> },
]);

export { router };