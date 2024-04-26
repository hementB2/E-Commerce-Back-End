// Importing models
const Product = require('./Product'); // Importing Product model
const Category = require('./Category'); // Importing Category model
const Tag = require('./Tag'); // Importing Tag model
const ProductTag = require('./ProductTag'); // Importing ProductTag model

// Defining relationships between models

// A Product belongs to a Category
Product.belongsTo(Category, {
  foreignKey: 'category_id', // Define foreign key in the Product model
});

// A Product belongs to many Tags through the ProductTag model
Product.belongsToMany(Tag, {
  through: ProductTag, // Use ProductTag as an intermediate model
  foreignKey: 'product_id', // Define foreign key in the Product model
});

// A Tag belongs to many Products through the ProductTag model
Tag.belongsToMany(Product, {
  through: ProductTag, // Use ProductTag as an intermediate model
  foreignKey: 'tag_id', // Define foreign key in the Tag model
});

// A Category has many Products
Category.hasMany(Product, {
  foreignKey: 'category_id', // Define foreign key in the Product model
});

// Exporting models
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
