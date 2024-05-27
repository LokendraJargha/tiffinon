import React from "react";

const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const Administrators = React.lazy(() => import("./views/administrators"));
const Roles = React.lazy(() => import("./views/roles"));
const Modules = React.lazy(() => import("./views/modules"));
const Profile = React.lazy(() => import("./views/profile"));

// menus
const Menus = React.lazy(() => import("./views/menus"));
// status
const Status = React.lazy(() => import("./views/order-status"));

// kitchens
const Kitchens = React.lazy(() => import("./views/kitchens"));
const Deposits = React.lazy(() => import("./views/kitchens/deposits"));
const Reviews = React.lazy(() => import("./views/kitchens/reviews"));
const Orders = React.lazy(() => import("./views/kitchens/orders"));
const KitchenCategories = React.lazy(() =>
  import("./views/kitchens/categories")
);

// users
const Users = React.lazy(() => import("./views/users"));

const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },

  {
    path: "/administrators",
    exact: true,
    name: "Administrators",
    component: Administrators,
  },
  { path: "/profile", exact: true, name: "Profile", component: Profile },

  { path: "/roles", exact: true, name: "Roles", component: Roles },

  { path: "/modules", exact: true, name: "Modules", component: Modules },

  { path: "/menus", exact: true, name: "Menus", component: Menus },

  { path: "/status", exact: true, name: "Status", component: Status },

  // Kitchen
  { path: "/kitchens", exact: true, name: "Kitchens", component: Kitchens },
  {
    path: "/kitchen-categories",
    exact: true,
    name: "Kitchen Categories",
    component: KitchenCategories,
  },
  { path: "/deposits", exact: true, name: "Deposits", component: Deposits },
  { path: "/orders", exact: true, name: "Orders", component: Orders },
  { path: "/reviews", exact: true, name: "Reviews", component: Reviews },

  { path: "/users", exact: true, name: "Users", component: Users },
];

export default routes;
