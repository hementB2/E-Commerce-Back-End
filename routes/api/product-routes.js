// Require the Express module and create a new router instance
const router = require("express").Router();
// Require the necessary models
const { Product, Category, Tag, ProductTag } = require("../../models");

// Get all products, including associated Category and Tag data
router.get("/", async (req, res) => {
  try {
    // Retrieve all products with associated Category and Tag data
    const products = await Product.findAll({
      include: [{ model: Category }, { model: Tag }],
    });
    // Respond with the retrieved products
    res.status(200).json(products);
  } catch (err) {
    // Handle errors by sending a 500 status with a custom message
    res.status(500).json({ message: "Failed to retrieve products!", error: err });
  }
});

// Get a single product by ID, including associated Category and Tag data
router.get("/:id", async (req, res) => {
  try {
    // Find the product with the matching ID, including its associated Category and Tag data
    const product = await Product.findByPk(req.params.id, {
      include: [{ model: Category }, { model: Tag }],
    });

    // If the product is not found, send a 404 status with a custom message
    // Otherwise, respond with the retrieved product
    !product
      ? res.status(404).json({ message: "Product not found!" })
      : res.status(200).json(product);
  } catch (err) {
    // Handle errors by sending a 500 status with a custom message
    res.status(500).json({ message: "Failed to retrieve product!", error: err });
  }
});

// Create a new product
router.post("/", (req, res) => {
  // Create a new product using the data in the request body
  Product.create(req.body)
    .then((product) => {
      // If tagIds are provided in the request body, create associated ProductTag entries
      if (req.body.tagIds.length) {
        const productTagIds = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIds);
      }
      // Respond with the created product
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      // Handle errors by sending a 400 status with a custom message
      res.status(400).json({ message: "Creation failed", error: err });
    });
});

// Update a product by ID
router.put("/:id", async (req, res) => {
  try {
    // Update the product with the matching ID using the data in the request body
    await Product.update(req.body, { where: { id: req.params.id } });

    // Check if req.body.tags exists and has some length
    if (req.body.tags && req.body.tags.length > 0) {
      // Retrieve product tags and their IDs
      const productTags = await ProductTag.findAll({ where: { product_id: req.params.id } });
      const productTagIds = productTags.map(({ tag_id }) => tag_id);

      // Filter new product tags and create new ones
      const newProductTags = req.body.tags
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });

      // Filter product tags to remove and delete them
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tags.includes(tag_id))
        .map(({ id }) => id);

      await Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    }

    // Respond with updated product
    const product = await Product.findByPk(req.params.id, { include: [{ model: Tag }] });
    return res.json(product);
  } catch (error) {
    // Handle errors by sending a 500 status with the error
    console.log(error);
    return res.status(500).json(error);
  }
});

// Delete a product by ID
router.delete("/:id", async (req, res) => {
  try {
    // Delete the product with the matching ID
    const deleted = await Product.destroy({ where: { id: req.params.id } });

    // If the product is not found, send a 404 status with a custom message
    // Otherwise, return the deleted data
    !deleted
      ? res.status(404).json({ message: "Product not found" })
      : res.status(200).json(deleted);
  } catch (err) {
    // Handle errors by sending a 500 status with a custom message
    res.status(500).json({ message: "Product not deleted!", error: err });
  }
});

// Export the router instance for use in other modules
module.exports = router;
