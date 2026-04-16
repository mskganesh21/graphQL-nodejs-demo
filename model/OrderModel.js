import { Model, DataTypes } from "sequelize";
import { SequelizeConfig } from "../config/dbConnect.js";

class Order extends Model {
  static associate(models) {
    Order.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });

    Order.hasMany(models.OrderItem, {
      foreignKey: "orderId",
      as: "items",
    });
  }
}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: SequelizeConfig,
    modelName: "Order",
    tableName: "orders",
    timestamps: true,
  }
);

export default Order;