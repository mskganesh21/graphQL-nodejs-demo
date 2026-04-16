import { Model, DataTypes } from "sequelize";
import { SequelizeConfig } from "../config/dbConnect.js";

class OrderItem extends Model {
  static associate(models) {
    OrderItem.belongsTo(models.Order, {
      foreignKey: "orderId",
      as: "order",
    });

    OrderItem.belongsTo(models.Product, {
      foreignKey: "productId",
      as: "product",
    });
  }
}

OrderItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "orders",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "products",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
      },
    },
  },
  {
    sequelize: SequelizeConfig,
    modelName: "OrderItem",
    tableName: "order_items",
    timestamps: true,
  },
);

export default OrderItem;
