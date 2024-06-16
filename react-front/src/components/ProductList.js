import React, { useState, useEffect } from "react";
import { getProducts, deleteProduct } from "../api";
import ProductForm from "./ProductForm";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data } = await getProducts();
    setProducts(data);
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);
    fetchProducts();
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsFormVisible(true);
  };

  const handleFormSave = () => {
    fetchProducts();
    setIsFormVisible(false);
    setSelectedProduct(null);
  };

  return (
    <div>
      <h1>Products</h1>
      <button onClick={() => setIsFormVisible(!isFormVisible)}>
        {isFormVisible ? "Cancel" : "Add Product"}
      </button>
      {isFormVisible && (
        <ProductForm product={selectedProduct} onSave={handleFormSave} />
      )}
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            {product.name} - ${product.price}
            <button onClick={() => handleEdit(product)}>Edit</button>
            <button onClick={() => handleDelete(product._id)}>Delete</button>
            <ul>
              {product.categories.map((category) => (
                <li key={category._id}>{category.name}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
