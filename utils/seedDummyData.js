import { faker } from "@faker-js/faker";
import { SequelizeConfig } from "../config/dbConnect.js";

import User from "../model/UserModel.js";
import Product from "../model/ProductModel.js";
import Order from "../model/OrderModel.js";
import OrderItem from "../model/OrderItemsModel.js";

// If associations are not initialized elsewhere, do it here
const models = { User, Product, Order, OrderItem };

Object.values(models).forEach((model) => {
  if (model.associate) model.associate(models);
});

const randomFromArray = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randomInt = (min, max) => faker.number.int({ min, max });

async function seed() {
  try {
    await SequelizeConfig.authenticate();
    console.log("DB connected");

    const [db] = await SequelizeConfig.query(
      "SELECT current_database(), current_schema()",
    );
    console.log("Sequelize DB & schema:", db);

    // Optional: clear old data
    // await OrderItem.destroy({ where: {}, force: true });
    // await Order.destroy({ where: {}, force: true });
    // await Product.destroy({ where: {}, force: true });
    // await User.destroy({ where: {}, force: true });

    // Reset auto increment if needed only for MySQL/Postgres manually, otherwise skip

    // 1. Users
    const usersData = Array.from({ length: 200 }, () => ({
      email: faker.internet.email().toLowerCase(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    const users = await User.bulkCreate(usersData, { returning: true });

    // 2. Products
    const categories = [
      "Electronics",
      "Books",
      "Clothing",
      "Home",
      "Sports",
      "Beauty",
      "Toys",
      "Groceries",
    ];

    const productsData = Array.from({ length: 150 }, () => ({
      name: faker.commerce.productName(),
      price: Number(faker.commerce.price({ min: 100, max: 5000, dec: 2 })),
      category: randomFromArray(categories),
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    const products = await Product.bulkCreate(productsData, {
      returning: true,
    });

    // 3. Orders
    const statuses = [
      "pending",
      "confirmed",
      "shipped",
      "delivered",
      "cancelled",
    ];

    const ordersData = Array.from({ length: 500 }, () => ({
      userId: randomFromArray(users).id,
      status: randomFromArray(statuses),
      createdAt: faker.date.recent({ days: 120 }),
      updatedAt: new Date(),
    }));

    const orders = await Order.bulkCreate(ordersData, { returning: true });

    // 4. Order Items
    const orderItemsData = [];

    for (const order of orders) {
      const itemsCount = randomInt(1, 5);
      const usedProductIds = new Set();

      for (let i = 0; i < itemsCount; i++) {
        let product = randomFromArray(products);

        while (usedProductIds.has(product.id)) {
          product = randomFromArray(products);
        }

        usedProductIds.add(product.id);

        orderItemsData.push({
          orderId: order.id,
          productId: product.id,
          quantity: randomInt(1, 10),
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    }

    await OrderItem.bulkCreate(orderItemsData);

    console.log("Dummy data inserted successfully");
    console.log(`Users: ${users.length}`);
    console.log(`Products: ${products.length}`);
    console.log(`Orders: ${orders.length}`);
    console.log(`OrderItems: ${orderItemsData.length}`);

    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
}

seed();
