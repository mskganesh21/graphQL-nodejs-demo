import { Model, DataTypes } from "sequelize";
import { SequelizeConfig } from "../config/dbConnect.js";

class Product extends Model {
  static associate(models) {
    Product.hasMany(models.OrderItem, {
      foreignKey: "productId",
      as: "orderItems",
    });
  }
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    category: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize: SequelizeConfig,
    modelName: "Product",
    tableName: "products",
    timestamps: true,
  }
);

export default Product;