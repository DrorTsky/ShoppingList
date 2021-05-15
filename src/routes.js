import React from "react";

const ShoppingListInfo = React.lazy(() =>
  import("./views/shopping_list_related/ShoppingListInfo")
);
const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));

const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  {
    path: "/shopping_list",
    name: "ShoppingListInfo",
    component: ShoppingListInfo,
  },
];

export default routes;
