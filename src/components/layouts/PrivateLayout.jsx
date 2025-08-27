import { Outlet } from 'react-router-dom';
import './PrivateLayout.css';

const PrivateLayout = () => {
  return (
    <div className="private-layout">
      <header className="private-header">
        <div className="user-info">
          <div className="avatar">
            <span>JA</span>
          </div>
          <div className="user-details">
            <h3>John Andre</h3>
            <p>Storfjord AS</p>
          </div>
        </div>
        <div className="language-switcher">
          <span>Norsk Bokmål</span>
          <img src="/flag-no.png" alt="NO" className="flag" />
        </div>
      </header>

      <div className="private-main">
        <aside className="sidebar">
          <h2>Menu</h2>
          <nav className="sidebar-nav">
            <a href="/dashboard/invoices" className="nav-item active">
              <span className="icon">📄</span>
              Invoices
            </a>
            <a href="/dashboard/customers" className="nav-item">
              <span className="icon">👥</span>
              Customers
            </a>
            <a href="/dashboard/business" className="nav-item">
              <span className="icon">⚙️</span>
              My Business
            </a>
            <a href="/dashboard/journal" className="nav-item">
              <span className="icon">📊</span>
              Invoice Journal
            </a>
            <a href="/dashboard/price-list" className="nav-item">
              <span className="icon">💰</span>
              Price List
            </a>
            <a href="/dashboard/multiple-invoicing" className="nav-item">
              <span className="icon">📑</span>
              Multiple Invoicing
            </a>
            <a href="/dashboard/unpaid" className="nav-item">
              <span className="icon">⚠️</span>
              Unpaid Invoices
            </a>
            <a href="/dashboard/offer" className="nav-item">
              <span className="icon">📋</span>
              Offer
            </a>
            <a href="/dashboard/inventory" className="nav-item">
              <span className="icon">📦</span>
              Inventory Control
            </a>
            <a href="/dashboard/member-invoicing" className="nav-item disabled">
              <span className="icon">👤</span>
              Member Invoicing
            </a>
            <a href="/dashboard/import-export" className="nav-item">
              <span className="icon">📤</span>
              Import/Export
            </a>
            <a href="/logout" className="nav-item">
              <span className="icon">🚪</span>
              Log out
            </a>
          </nav>
        </aside>

        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default PrivateLayout;