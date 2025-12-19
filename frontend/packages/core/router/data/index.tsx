import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../Layout";
import { AdminLayout } from "../AdminLayout";

// Kundsidor
import { AboutPage } from "@app/pages/user/about-page";
import { CartPage } from "@app/pages/user/cart-page";
import { ConfirmationPage } from "@app/pages/user/confirmation-page";
import { HomePage } from "@app/pages/user/home-page";
import { MenuPage } from "@app/pages/user/menu-page";
import { OrdersPage } from "@app/pages/user/orders-page";
import { PaymentPage } from "@app/pages/user/payment-page";

// Adminsidor
import { AdminDetailsPage } from "@app/pages/admin/details-page/ui";
import { AdminHomePage } from "@app/pages/admin/home-page/ui";
import { AdminMenuPage } from "@app/pages/admin/menu-page/ui";
import { AdminOrdersPage } from "@app/pages/admin/orders-page/ui";
import { AdminStockPage } from "@app/pages/admin/stock-page/ui";
import { AdminOrderDetailsPage } from "@app/pages/admin/orderdetails-page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "about", element: <AboutPage /> },
      { path: "cart", element: <CartPage /> },
      { path: "/order/:id", element: <ConfirmationPage /> },
      { path: "menu", element: <MenuPage /> },
      { path: "orders", element: <OrdersPage /> },
      { path: "payment", element: <PaymentPage /> },
    ],
  },

  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminHomePage /> },
      { path: "details-page", element: <AdminDetailsPage /> },
      { path: "menu-page", element: <AdminMenuPage /> },
      { path: "orders-page", element: <AdminOrdersPage /> },
      { path: "stock-page", element: <AdminStockPage /> },
      { path: "/admin/order/:id", element: <AdminOrderDetailsPage /> },
    ],
  },

  { path: "*", element: <h1>This is not the page you are looking for</h1> },
]);
