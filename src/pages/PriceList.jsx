import "./PriceList.css";
import { useEffect, useState } from "react";
import axiosInstance from "../utils/axios.js";

const ArrowDownIcon = () => (
  <svg
    className="sort-icon arrow-down"
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path d="M12 5v14" />
    <path d="m19 12-7 7-7-7" />
  </svg>
);

const ArrowUpIcon = () => (
  <svg
    className="sort-icon arrow-up"
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path d="m5 12 7-7 7 7" />
    <path d="M12 19V5" />
  </svg>
);

const ThreeDotsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="lucide lucide-ellipsis-icon lucide-ellipsis"
  >
    <circle cx="12" cy="12" r="1" />
    <circle cx="19" cy="12" r="1" />
    <circle cx="5" cy="12" r="1" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 18l6-6-6-6" />
  </svg>
);

const PriceList = () => {
  const [products, setProducts] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]);
  const [editedProducts, setEditedProducts] = useState({});
  const [editedRows, setEditedRows] = useState(new Set());
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    articleNo: "desc",
    name: "desc",
    primaryField: "articleNo",
  });

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get("/products");
      const fetchedProducts = response.data.products;
      setProducts(fetchedProducts);
      setOriginalProducts(fetchedProducts);
      applySorting(fetchedProducts, {
        articleNo: "desc",
        name: "desc",
        primaryField: "articleNo",
      });
    } catch (error) {
      console.error("Error fetching config:", error);
    }
  };

  const applySorting = (productsToSort, config) => {
    const sortedProducts = [...productsToSort].sort((a, b) => {
      const aArticleNo = a.articleNo || "";
      const bArticleNo = b.articleNo || "";
      const aName = a.name || "";
      const bName = b.name || "";

      let primaryComparison = 0;
      let secondaryComparison = 0;

      if (config.primaryField === "articleNo") {
        if (config.articleNo === "desc") {
          primaryComparison = bArticleNo.localeCompare(aArticleNo);
        } else {
          primaryComparison = aArticleNo.localeCompare(bArticleNo);
        }

        if (primaryComparison !== 0) {
          return primaryComparison;
        }

        if (config.name === "desc") {
          secondaryComparison = bName.localeCompare(aName);
        } else {
          secondaryComparison = aName.localeCompare(bName);
        }
      } else {
        if (config.name === "desc") {
          primaryComparison = bName.localeCompare(aName);
        } else {
          primaryComparison = aName.localeCompare(bName);
        }

        if (primaryComparison !== 0) {
          return primaryComparison;
        }

        if (config.articleNo === "desc") {
          secondaryComparison = bArticleNo.localeCompare(aArticleNo);
        } else {
          secondaryComparison = aArticleNo.localeCompare(bArticleNo);
        }
      }

      return secondaryComparison;
    });

    setProducts(sortedProducts);
  };

  const handleSort = (field) => {
    const newDirection = sortConfig[field] === "desc" ? "asc" : "desc";
    const newSortConfig = {
      ...sortConfig,
      [field]: newDirection,
      primaryField: field,
    };

    setSortConfig(newSortConfig);
    applySorting(products, newSortConfig);
  };

  const handleInputChange = (productIndex, field, value) => {
    const updatedProducts = [...products];
    updatedProducts[productIndex] = {
      ...updatedProducts[productIndex],
      [field]: value,
    };
    setProducts(updatedProducts);

    setEditedProducts((prev) => ({
      ...prev,
      [productIndex]: {
        ...prev[productIndex],
        [field]: value,
      },
    }));

    setEditedRows((prev) => new Set([...prev, productIndex]));
  };

  const handleSave = async (productIndex) => {
    const productToSave = products[productIndex];
    try {
      await axiosInstance.put(`/products/${productToSave.id}`, productToSave);
      setEditedRows((prev) => {
        const newSet = new Set(prev);
        newSet.delete(productIndex);
        return newSet;
      });
      setEditedProducts((prev) => {
        const newEditedProducts = { ...prev };
        delete newEditedProducts[productIndex];
        return newEditedProducts;
      });
      setDropdownOpen(null);
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const handleDelete = async (productIndex) => {
    const productToDelete = products[productIndex];
    try {
      await axiosInstance.delete(`/products/${productToDelete.id}`);
      const updatedProducts = products.filter(
        (_, index) => index !== productIndex
      );
      setProducts(updatedProducts);
      setEditedRows((prev) => {
        const newSet = new Set(prev);
        newSet.delete(productIndex);
        return newSet;
      });
      setDropdownOpen(null);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const toggleDropdown = (productIndex) => {
    setDropdownOpen(dropdownOpen === productIndex ? null : productIndex);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="price-list-page">
      <div className="page-header">
        <div className="search-section">
          <div className="search-group">
            <input
              type="text"
              placeholder="Search Article No..."
              className="search-input"
            />
            <div className="search-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-search-icon lucide-search"
              >
                <path d="m21 21-4.34-4.34" />
                <circle cx="11" cy="11" r="8" />
              </svg>
            </div>
          </div>
          <div className="search-group">
            <input
              type="text"
              placeholder="Search Product..."
              className="search-input"
            />
            <div className="search-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-search-icon lucide-search"
              >
                <path d="m21 21-4.34-4.34" />
                <circle cx="11" cy="11" r="8" />
              </svg>
            </div>
          </div>
        </div>

        <div className="action-buttons">
          <button className="action-btn new-product">
            New Product <span>➕</span>
          </button>
          <button className="action-btn print-list">Print List 🖨️</button>
          <button className="action-btn advanced-mode">Advanced mode ⚙️</button>
        </div>
      </div>

      <div className="table-container">
        <table className="price-table">
          <thead>
            <tr>
              <th className="row-indicator-header"></th>
              <th
                onClick={() => handleSort("articleNo")}
                style={{ cursor: "pointer" }}
              >
                Article No.{" "}
                {sortConfig.articleNo === "desc" ? (
                  <ArrowDownIcon />
                ) : (
                  <ArrowUpIcon />
                )}
              </th>
              <th
                onClick={() => handleSort("name")}
                style={{ cursor: "pointer" }}
              >
                Product/Service{" "}
                {sortConfig.name === "desc" ? (
                  <ArrowDownIcon />
                ) : (
                  <ArrowUpIcon />
                )}
              </th>
              <th>In Price</th>
              <th>Price</th>
              <th>Unit</th>
              <th>In Stock</th>
              <th>Description</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr
                key={index}
                className={editedRows.has(index) ? "edited-row" : ""}
              >
                {editedRows.has(index) && (
                  <td className="row-indicator">
                    <ArrowRightIcon />
                  </td>
                )}
                {!editedRows.has(index) && <td className="row-indicator"></td>}
                <td>
                  <input
                    type="text"
                    value={product.articleNo || ""}
                    onChange={(e) =>
                      handleInputChange(index, "articleNo", e.target.value)
                    }
                    className="editable-input"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={product.name || ""}
                    onChange={(e) =>
                      handleInputChange(index, "name", e.target.value)
                    }
                    className="editable-input"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={product.inPrice || ""}
                    onChange={(e) =>
                      handleInputChange(index, "inPrice", e.target.value)
                    }
                    className="editable-input"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={product.price || ""}
                    onChange={(e) =>
                      handleInputChange(index, "price", e.target.value)
                    }
                    className="editable-input"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={product.unit || ""}
                    onChange={(e) =>
                      handleInputChange(index, "unit", e.target.value)
                    }
                    className="editable-input"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={product.inStock || ""}
                    onChange={(e) =>
                      handleInputChange(index, "inStock", e.target.value)
                    }
                    className="editable-input"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={product.description || ""}
                    onChange={(e) =>
                      handleInputChange(index, "description", e.target.value)
                    }
                    className="editable-input"
                  />
                </td>
                <td className="actions-cell">
                  <div className="dropdown-container">
                    <button
                      className="dropdown-trigger"
                      onClick={() => toggleDropdown(index)}
                    >
                      <ThreeDotsIcon />
                    </button>
                    {dropdownOpen === index && (
                      <div className="dropdown-menu">
                        <button
                          className="dropdown-item save"
                          onClick={() => handleSave(index)}
                        >
                          Save 123
                        </button>
                        <button
                          className="dropdown-item delete"
                          onClick={() => handleDelete(index)}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PriceList;
