exports.roles = [
  { id: 1, role: "admin" },
  { id: 2, role: "seller" },
  { id: 3, role: "supporter" },
  { id: 4, role: "customer" },
];

exports.roleAccesses = [
  {
    id: 1,
    method: "get",
    path: "/products",
    roles: ["admin", "seller", "supporter", "customer"],
  },
  {
    id: 2,
    method: "post",
    path: "/products",
    roles: ["admin", "seller"],
  },
  {
    id: 3,
    method: "put",
    path: "/products",
    roles: ["admin", "seller"],
  },
  {
    id: 4,
    method: "patch",
    path: "/products",
    roles: ["admin", "seller"],
  },
  {
    id: 5,
    method: "delete",
    path: "/products",
    roles: ["admin", "supporter"],
  },
];
