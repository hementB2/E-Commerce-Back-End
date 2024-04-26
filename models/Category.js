const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection.js");

class Category extends Model {}

Category.init(
  {
    // Define the 'id' column
    id: {
      type: DataTypes.INTEGER, // Data type: INTEGER
      allowNull: false, // Disallow NULL values
      primaryKey: true, // Primary key
      autoIncrement: true, // Auto-increment
    },
    // Define the 'category_name' column
    category_name: {
      type: DataTypes.STRING, // Data type: STRING
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "category",
  }
);

module.exports = Category;

