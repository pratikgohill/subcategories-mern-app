import React, { useState, useEffect } from "react";
import { getCategories, deleteCategory } from "../api";
import CategoryForm from "./CategoryForm";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const { data } = await getCategories();
    setCategories(data);
  };

  const handleDelete = async (id) => {
    await deleteCategory(id);
    fetchCategories();
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setIsFormVisible(true);
  };

  const handleFormSave = () => {
    fetchCategories();
    setIsFormVisible(false);
    setSelectedCategory(null);
  };

  return (
    <div>
      <h1>Categories</h1>
      <button onClick={() => setIsFormVisible(!isFormVisible)}>
        {isFormVisible ? "Cancel" : "Add Category"}
      </button>
      {isFormVisible && (
        <CategoryForm category={selectedCategory} onSave={handleFormSave} />
      )}
      <ul>
        {categories.map((category) => (
          <li key={category._id}>
            {category.name}
            <button onClick={() => handleEdit(category)}>Edit</button>
            <button onClick={() => handleDelete(category._id)}>Delete</button>
            {category.subcategories && (
              <ul>
                {category.subcategories.map((sub) => (
                  <li key={sub._id}>{sub.name}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
