// Import necessary parts of the Sequelize library
const { Model, DataTypes } = require("sequelize");
// Import the database connection from config.js
const sequelize = require("../config/connection");

// Initialize Product model by extending off Sequelize's Model class
class Product extends Model {}

// Define fields and rules for the Product model
Product.init(
  {
    // Define columns for the product table
    id: {
      type: DataTypes.INTEGER, // Data type: INTEGER
      allowNull: false, // Disallow NULL values
      primaryKey: true, // Primary key
      autoIncrement: true, // Auto-increment
    },
    product_name: {
      type: DataTypes.STRING, // Data type: STRING
      allowNull: false, // Disallow NULL values
    },
    price: {
      type: DataTypes.DECIMAL, // Data type: DECIMAL
      allowNull: false, // Disallow NULL values
      validate: {
        isDecimal: true, // Validate that the value is a decimal number
      },
    },
    stock: {
      type: DataTypes.INTEGER, // Data type: INTEGER
      allowNull: false, // Disallow NULL values
      defaultValue: 10, // Default value is 10
      validate: {
        isNumeric: true, // Validate that the value is numeric
      },
    },
    category_id: {
      type: DataTypes.INTEGER, // Data type: INTEGER
      references: {
        model: "category", // Reference the 'category' table
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "product",
  }
);

module.exports = Product;
