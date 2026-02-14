import { createBrowserRouter } from "react-router";
import { Root } from "./components/Root";
import { Home } from "./components/pages/Home";
import { About } from "./components/pages/About";
import { Packages } from "./components/pages/Packages";
import { Business } from "./components/pages/Business";
import { Contact } from "./components/pages/Contact";
import { Coverage } from "./components/pages/Coverage";
import { Partners } from "./components/pages/Partners";
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
      { path: "contact", Component: Contact },
      { path: "coverage", Component: Coverage },
      { path: "partners", Component: Partners },
      { path: "*", Component: NotFound },
    ],
  },
]);
