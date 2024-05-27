import React from "react";
import CIcon from "@coreui/icons-react";

const _nav = [
  {
    _tag: "CSidebarNavItem",
    name: "Dashboard",
    to: "/dashboard",
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Core Modules"],
  },

  // Menus
  {
    _tag: "CSidebarNavItem",
    name: "Menus",
    to: "/menus",
    icon: "cil-fastfood",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Order Status",
    to: "/status",
    icon: "cil-tags",
  },

  // Kitchens
  {
    _tag: "CSidebarNavDropdown",
    name: "Kitchens",
    icon: "cil-dinner",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Categories",
        to: "/kitchen-categories",
        icon: "cil-restaurant",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Kitchens",
        to: "/kitchens",
        icon: "cil-restaurant",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Deposits",
        to: "/deposits",
        icon: "cil-cash",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Orders",
        to: "/orders",
        icon: "cil-truck",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Reviews",
        to: "/reviews",
        icon: "cil-comment-square",
      },
    ],
  },

  // Menus
  {
    _tag: "CSidebarNavItem",
    name: "Users",
    to: "/users",
    icon: "cil-user-plus",
  },

  // Core Settings
  {
    _tag: "CSidebarNavTitle",
    _children: ["Core Settings"],
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Settings",
    route: "/settings",
    icon: "cil-cog",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Administrators",
        to: "/administrators",
        icon: "cil-user-plus",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Roles",
        to: "/roles",
        icon: "cil-plus",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Modules",
        to: "/modules",
        icon: "cil-playlist-add",
      },
    ],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Profile",
    icon: "cil-user",
    to: "/profile",
    route: "/profile",
  },
  {
    _tag: "CSidebarNavDivider",
    className: "m-2",
  },
];

export default _nav;
