import "./PriceList.css";
import { useEffect, useState, useCallback } from "react";
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
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
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
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
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
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
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

const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m21 21-4.34-4.34" />
    <circle cx="11" cy="11" r="8" />
  </svg>
);

const PriceList = () => {
  const [products, setProducts] = useState([]);
  const [editedData, setEditedData] = useState({});
  const [editedRows, setEditedRows] = useState(new Set());
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [searchArticleNo, setSearchArticleNo] = useState("");
  const [searchProduct, setSearchProduct] = useState("");
  const [sortConfig, setSortConfig] = useState({
    articleNo: "desc",
    name: "desc",
    primaryField: "articleNo",
  });
  const [nextTempId, setNextTempId] = useState(-1); // For temporary IDs for new products

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get("/products");
      const data = response.data.products;
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const getProductWithEdits = (product) => {
    const productId = product.id || product.tempId;
    if (editedData[productId]) {
      return { ...product, ...editedData[productId] };
    }
    return product;
  };

  const sortProducts = (productsToSort, config) => {
    return [...productsToSort].sort((a, b) => {
      // Keep new products (with tempId) at the top
      if (a.tempId && !b.tempId) return -1;
      if (!a.tempId && b.tempId) return 1;
      if (a.tempId && b.tempId) {
        return a.tempId - b.tempId;
      }

      const aData = getProductWithEdits(a);
      const bData = getProductWithEdits(b);

      const getValue = (item, field) => item[field] || "";

      const primaryField = config.primaryField;
      const primaryDir = config[primaryField];
      let comparison =
        primaryDir === "desc"
          ? getValue(bData, primaryField).localeCompare(
              getValue(aData, primaryField)
            )
          : getValue(aData, primaryField).localeCompare(
              getValue(bData, primaryField)
            );

      if (comparison !== 0) return comparison;

      const secondaryField =
        primaryField === "articleNo" ? "name" : "articleNo";
      const secondaryDir = config[secondaryField];
      return secondaryDir === "desc"
        ? getValue(bData, secondaryField).localeCompare(
            getValue(aData, secondaryField)
          )
        : getValue(aData, secondaryField).localeCompare(
            getValue(bData, secondaryField)
          );
    });
  };

  const getFilteredAndSortedProducts = useCallback(() => {
    let filtered = products;

    if (searchArticleNo) {
      filtered = filtered.filter((p) => {
        const productData = getProductWithEdits(p);
        return productData.articleNo
          ?.toLowerCase()
          .includes(searchArticleNo.toLowerCase());
      });
    }
    if (searchProduct) {
      filtered = filtered.filter((p) => {
        const productData = getProductWithEdits(p);
        return productData.name
          ?.toLowerCase()
          .includes(searchProduct.toLowerCase());
      });
    }

    return sortProducts(filtered, sortConfig);
  }, [products, searchArticleNo, searchProduct, sortConfig, editedData]);

  const handleSort = (field) => {
    const newConfig = {
      ...sortConfig,
      [field]: sortConfig[field] === "desc" ? "asc" : "desc",
      primaryField: field,
    };
    setSortConfig(newConfig);
  };

  const handleInputChange = (product, field, value) => {
    const productId = product.id || product.tempId;

    setEditedData((prev) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        [field]: value,
      },
    }));

    setEditedRows((prev) => new Set([...prev, productId]));
  };

  const handleAddNewProduct = () => {
    const newProduct = {
      tempId: nextTempId,
      articleNo: "",
      name: "",
      inPrice: 0,
      price: 0,
      unit: "",
      inStock: 0,
      description: "",
    };

    setProducts((prev) => [newProduct, ...prev]);
    setEditedRows((prev) => new Set([...prev, nextTempId]));
    setNextTempId((prev) => prev - 1);
  };

  const handleSave = async (product) => {
    const productId = product.id || product.tempId;
    const editedProduct = getProductWithEdits(product);

    if (!editedProduct.articleNo.trim() || !editedProduct.name.trim()) {
      alert("Article No. and Product/Service fields cannot be empty.");
      return;
    }

    try {
      if (product.tempId) {
        const response = await axiosInstance.post("/products", editedProduct);
        setProducts((prev) =>
          prev.map((p) => (p.tempId === product.tempId ? response.data : p))
        );
      } else {
        await axiosInstance.put(`/products/${product.id}`, editedProduct);
        setProducts((prev) =>
          prev.map((p) => (p.id === product.id ? editedProduct : p))
        );
      }

      setEditedData((prev) => {
        const newData = { ...prev };
        delete newData[productId];
        return newData;
      });
      setEditedRows((prev) => {
        const newSet = new Set(prev);
        newSet.delete(productId);
        return newSet;
      });
      setDropdownOpen(null);
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const handleDelete = async (product) => {
    const productId = product.id || product.tempId;

    try {
      if (!product.tempId) {
        await axiosInstance.delete(`/products/${product.id}`);
      }

      setProducts((prev) =>
        prev.filter((p) =>
          p.tempId ? p.tempId !== product.tempId : p.id !== product.id
        )
      );

      setEditedData((prev) => {
        const newData = { ...prev };
        delete newData[productId];
        return newData;
      });
      setEditedRows((prev) => {
        const newSet = new Set(prev);
        newSet.delete(productId);
        return newSet;
      });
      setDropdownOpen(null);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const displayedProducts = getFilteredAndSortedProducts();

  const renderInput = (product, field, type = "text") => {
    const productData = getProductWithEdits(product);
    return (
      <input
        type={type}
        value={productData[field] || ""}
        onChange={(e) => handleInputChange(product, field, e.target.value)}
        className="editable-input"
      />
    );
  };

  const renderSearchInput = (placeholder, value, setValue) => (
    <div className="search-group">
      <input
        type="text"
        placeholder={placeholder}
        className="search-input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <div className="search-button" style={{ cursor: "pointer" }}>
        <SearchIcon />
      </div>
    </div>
  );

  return (
    <div className="price-list-page">
      <div className="page-header">
        <div className="search-section">
          {renderSearchInput(
            "Search Article No...",
            searchArticleNo,
            setSearchArticleNo
          )}
          {renderSearchInput(
            "Search Product...",
            searchProduct,
            setSearchProduct
          )}
        </div>

        <div className="action-buttons">
          <button
            className="action-btn new-product"
            onClick={handleAddNewProduct}
          >
            New Product ➕
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
            {displayedProducts.map((product) => {
              const productId = product.id || product.tempId;
              const isEdited = editedRows.has(productId);

              return (
                <tr key={productId} className={isEdited ? "edited-row" : ""}>
                  <td className="row-indicator">
                    {isEdited && <ArrowRightIcon />}
                  </td>
                  <td>{renderInput(product, "articleNo")}</td>
                  <td>{renderInput(product, "name")}</td>
                  <td>{renderInput(product, "inPrice", "number")}</td>
                  <td>{renderInput(product, "price", "number")}</td>
                  <td>{renderInput(product, "unit")}</td>
                  <td>{renderInput(product, "inStock", "number")}</td>
                  <td>{renderInput(product, "description")}</td>
                  <td className="actions-cell">
                    <div className="dropdown-container">
                      <button
                        className="dropdown-trigger"
                        onClick={() =>
                          setDropdownOpen(
                            dropdownOpen === productId ? null : productId
                          )
                        }
                      >
                        <ThreeDotsIcon />
                      </button>
                      {dropdownOpen === productId && (
                        <div className="dropdown-menu">
                          <button
                            className="dropdown-item save"
                            onClick={() => handleSave(product)}
                          >
                            Save
                          </button>
                          <button
                            className="dropdown-item delete"
                            onClick={() => handleDelete(product)}
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PriceList;
