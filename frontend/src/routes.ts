import { createBrowserRouter } from "react-router";
import { Root } from "./components/Root";
import { Home } from "./components/pages/Home";
import { About } from "./components/pages/About";
import { Packages } from "./components/pages/Packages";
import { Business } from "./components/pages/Business";
import { BusinessPackages } from "./components/pages/BusinessPackages";
import { Contact } from "./components/pages/Contact";
import { SubscriptionForm } from "./components/pages/SubscriptionForm";
import { NotFound } from "./components/pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },
      { path: "packages", Component: Packages },
      { path: "business", Component: Business },
      { path: "business-packages", Component: BusinessPackages },
      { path: "contact", Component: Contact },
      { path: "subscribe", Component: SubscriptionForm },
      { path: "*", Component: NotFound },
    ],
  },
]);
