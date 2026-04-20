import DataLoader from "dataloader";
import Product from "../model/ProductModel.js";

const productLoader = new DataLoader(async (ids) => {
  const products = await Product.findAll({
    where: {
      id: ids,
    },
  });

  console.log("Products loaded:", ids);

  // Create a map of product IDs to product objects
  const productMap = {};
  products.forEach((product) => {
    productMap[product.id] = product;
  });

  // Return the products in the same order as the input IDs
  return ids.map((id) => productMap[id]);
});

export default productLoader;
