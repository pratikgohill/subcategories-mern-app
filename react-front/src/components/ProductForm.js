import React, { useState, useEffect } from "react";
import { getCategories, createProduct, updateProduct } from "../api";

const ProductForm = ({ product, onSave }) => {
  const [name, setName] = useState(product ? product.name : "");
  const [price, setPrice] = useState(product ? product.price : "");
  const [categoryIds, setCategoryIds] = useState(
    product ? product.categories.map((cat) => cat._id) : []
  );
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await getCategories();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = { name, price, categoryIds };
    if (product) {
      await updateProduct(product._id, productData);
    } else {
      await createProduct(productData);
    }
    onSave();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Price</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Categories</label>
        <select
          multiple
          value={categoryIds}
          onChange={(e) =>
            setCategoryIds(
              [...e.target.selectedOptions].map((option) => option.value)
            )
          }
        >
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">{product ? "Update" : "Create"} Product</button>
    </form>
  );
};

export default ProductForm;
