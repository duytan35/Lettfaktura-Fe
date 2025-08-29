import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import "./PrivateLayout.css";

const HamburgerIcon = () => (
  <svg
    className="hamburger-icon"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M3 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const CloseIcon = () => (
  <svg
    className="close-icon"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const PrivateLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="private-layout">
      <header className="private-header">
        <div className="header-left">
          <button className="hamburger-button" onClick={toggleSidebar}>
            {isSidebarOpen ? <CloseIcon /> : <HamburgerIcon />}
          </button>
          <div className="user-info">
            <div className="avatar">
              <img
                src="/user-profile.jpg"
                alt="User Avatar"
                className="avatar-image"
              />
              <div className="green-dot" />
            </div>
            <div className="user-details">
              <h3>John Andre</h3>
              <p>Storfjord AS</p>
            </div>
          </div>
        </div>
        <div className="language-switcher">
          <span>Norsk Bokmål</span>
          <img src="/norway-flag.png" alt="flag" className="flag" />
        </div>
      </header>

      <div className="private-main">
        {isMobile && isSidebarOpen && <div className="sidebar-overlay" onClick={closeSidebar} />}
        <aside className={`sidebar ${isMobile && isSidebarOpen ? 'sidebar-open' : ''}`}>
          <h2>Menu</h2>
          <nav className="sidebar-nav">
            <a href="/dashboard/invoices" className="nav-item" onClick={closeSidebar}>
              <span className="icon">📄</span>
              Invoices
            </a>
            <a href="/dashboard/customers" className="nav-item" onClick={closeSidebar}>
              <span className="icon">👥</span>
              Customers
            </a>
            <a href="/dashboard/business" className="nav-item" onClick={closeSidebar}>
              <span className="icon">⚙️</span>
              My Business
            </a>
            <a href="/dashboard/journal" className="nav-item" onClick={closeSidebar}>
              <span className="icon">📊</span>
              Invoice Journal
            </a>
            <a href="/dashboard/price-list" className="nav-item" onClick={closeSidebar}>
              <div className="active-tab" />
              <span className="icon">💰</span>
              Price List
            </a>
            <a href="/dashboard/multiple-invoicing" className="nav-item" onClick={closeSidebar}>
              <span className="icon">📑</span>
              Multiple Invoicing
            </a>
            <a href="/dashboard/unpaid" className="nav-item" onClick={closeSidebar}>
              <span className="icon">⚠️</span>
              Unpaid Invoices
            </a>
            <a href="/dashboard/offer" className="nav-item" onClick={closeSidebar}>
              <span className="icon">📋</span>
              Offer
            </a>
            <a href="/dashboard/inventory" className="nav-item" onClick={closeSidebar}>
              <span className="icon">📦</span>
              Inventory Control
            </a>
            <a href="/dashboard/member-invoicing" className="nav-item disabled">
              <span className="icon">👤</span>
              Member Invoicing
            </a>
            <a href="/dashboard/import-export" className="nav-item" onClick={closeSidebar}>
              <span className="icon">📤</span>
              Import/Export
            </a>
            <a href="/dashboard/logout" className="nav-item" onClick={closeSidebar}>
              <span className="icon">🚪</span>
              Log out
            </a>
          </nav>
        </aside>

        <main className="private-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default PrivateLayout;
