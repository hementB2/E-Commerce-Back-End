// Import necessary parts of the Sequelize library
const { Model, DataTypes } = require("sequelize");
// Import the database connection from config.js
const sequelize = require("../config/connection");

// Initialize ProductTag model by extending off Sequelize's Model class
class ProductTag extends Model {}

// Define fields and rules for the ProductTag model
ProductTag.init(
  {
    // Define columns for the product_tag table
    id: {
      type: DataTypes.INTEGER, // Data type: INTEGER
      allowNull: false, // Disallow NULL values
      primaryKey: true, // Primary key
      autoIncrement: true, // Auto-increment
    },
    tag_id: {
      type: DataTypes.INTEGER, // Data type: INTEGER
      references: {
        model: "tag", // Reference the 'tag' table
        key: "id", // Reference the 'id' column in the 'tag' table
      },
    },
    product_id: {
      type: DataTypes.INTEGER, // Data type: INTEGER
      references: {
        model: "product", // Reference the 'product' table
        key: "id", // Reference the 'id' column in the 'product' table
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "product_tag",
  }
);

module.exports = ProductTag;
