const loki = require("lokijs");
const db = new loki("sandbox.db");

const users = db.addCollection("users");
const products = db.addCollection("products");
const roles = db.addCollection("roles");
const roleAccesses = db.addCollection("role_accesses");

// populate initial seeds
const seeds = require("./seed");
roles.insert(seeds.roles);
roleAccesses.insert(seeds.roleAccesses);

module.exports = {
  users,
  products,
  roles,
  roleAccesses,
};
