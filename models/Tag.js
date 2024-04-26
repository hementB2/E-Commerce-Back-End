// Import necessary parts of the Sequelize library
const { Model, DataTypes } = require("sequelize");
// Import the database connection from config.js
const sequelize = require("../config/connection.js");

// Initialize Tag model by extending off Sequelize's Model class
class Tag extends Model {}

// Define fields and rules for the Tag model
Tag.init(
  {
    // Define columns for the tag table
    id: {
      type: DataTypes.INTEGER, // Data type: INTEGER
      allowNull: false, // Disallow NULL values
      primaryKey: true, // Primary key
      autoIncrement: true, // Auto-increment
    },
    tag_name: {
      type: DataTypes.STRING, // Data type: STRING
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "tag",
  }
);

module.exports = Tag;
