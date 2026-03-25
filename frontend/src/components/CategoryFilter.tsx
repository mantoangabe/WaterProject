import { useEffect, useState } from 'react';
import './CategoryFilter.css';

function CategoryFilter({
  onCheckboxChange,
  selectedCategories,
}: {
  onCheckboxChange: (categories: string[]) => void;
  selectedCategories: string[];
}) {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          'https://localhost:5000/api/Water/GetProjectTypes',
        );
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  function handleCheckboxChange({ target }: { target: HTMLInputElement }) {
    const updatedCategories = selectedCategories.includes(target.value)
      ? selectedCategories.filter((c) => c !== target.value)
      : [...selectedCategories, target.value];
    onCheckboxChange(updatedCategories);
  }

  return (
    <div className="category-filter">
      <h2>Project Types</h2>
      <div className="category-list">
        {categories.map((category) => (
          <div key={category} className="category-item">
            <input
              type="checkbox"
              id={category}
              value={category}
              className="category-checkbox"
              onChange={handleCheckboxChange}
              checked={selectedCategories.includes(category)}
            />
            <label htmlFor={category}>{category}</label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryFilter;
