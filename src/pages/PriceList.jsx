import { useState } from 'react';
import './PriceList.css';

const PriceList = () => {
  const [products] = useState([
    {
      articleNo: '1234567890',
      productService: 'This is a test product with fifty characters this!',
      inPrice: '900500',
      price: '1500800',
      unit: 'kilometers/hour',
      inStock: '2500600',
      description: 'This is the description with fifty characters this ...'
    }
  ]);

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
            <button className="search-button">🔍</button>
          </div>
          <div className="search-group">
            <input 
              type="text" 
              placeholder="Search Product..." 
              className="search-input"
            />
            <button className="search-button">🔍</button>
          </div>
        </div>
        
        <div className="action-buttons">
          <button className="action-btn new-product">
            ➕ New Product
          </button>
          <button className="action-btn print-list">
            🖨️ Print List
          </button>
          <button className="action-btn advanced-mode">
            ⚙️ Advanced mode
          </button>
        </div>
      </div>

      <div className="table-container">
        <table className="price-table">
          <thead>
            <tr>
              <th>Article No. ↕️</th>
              <th>Product/Service ↕️</th>
              <th>In Price</th>
              <th>Price</th>
              <th>Unit</th>
              <th>In Stock</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td>
                  <button className="edit-btn">✏️</button>
                  {product.articleNo}
                </td>
                <td>{product.productService}</td>
                <td>{product.inPrice}</td>
                <td>{product.price}</td>
                <td>{product.unit}</td>
                <td>{product.inStock}</td>
                <td>{product.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PriceList;