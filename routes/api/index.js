// Import the Express module and create a new router instance
const router = require('express').Router();
// Import the route modules for categories, products, and tags
const categoryRoutes = require('./category-routes');
const productRoutes = require('./product-routes');
const tagRoutes = require('./tag-routes');

// Use the route modules for their respective endpoints
router.use('/categories', categoryRoutes); // Use category routes for endpoints starting with /categories
router.use('/products', productRoutes); // Use product routes for endpoints starting with /products
router.use('/tags', tagRoutes); // Use tag routes for endpoints starting with /tags

// Export the router instance for use in other modules
module.exports = router;
