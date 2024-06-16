import React, { useState, useEffect } from "react";
import { getCategories, createCategory, updateCategory } from "../api";

const CategoryForm = ({ category, onSave }) => {
  const [name, setName] = useState(category ? category.name : "");
  const [parentId, setParentId] = useState(category ? category.parentId : "");
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
    const categoryData = { name, parentId: parentId || null };
    if (category) {
      await updateCategory(category._id, categoryData);
    } else {
      await createCategory(categoryData);
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
        <label>Parent Category</label>
        <select value={parentId} onChange={(e) => setParentId(e.target.value)}>
          <option value="">None</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">{category ? "Update" : "Create"} Category</button>
    </form>
  );
};

export default CategoryForm;
