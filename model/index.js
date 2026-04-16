import User from "./UserModel.js";
import Product from "./ProductModel.js";
import Order from "./OrderModel.js";
import OrderItem from "./OrderItemsModel.js";

const models = {
  User,
  Product,
  Order,
  OrderItem,
};

Object.values(models).forEach((model) => {
  if (typeof model.associate === "function") {
    model.associate(models);
  }
});

export default models;
