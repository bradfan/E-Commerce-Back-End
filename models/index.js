// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Product belongsTo Category
Product.belongsTo(Category, {
  // through: Category,
  foreignKey: "category_id",
 
})

// Categories have many Products
Category.hasMany(Product, {
  // through: Product,
  foreignKey: "product_id",
  onDelete: "CASCADE",
})

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  through: ProductTag,
  foreignKey: "product_id",
  
});

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: ProductTag,
  foreignKey: "tag_id",
  onDelete: "CASCADE",
})

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
