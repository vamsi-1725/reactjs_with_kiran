import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleMouseEnter = () => {
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        setIsOpen(false);
    };

    return (
        <div>
            <div
                className={isOpen ? 'sidebar-nav sidebar-nav-open' : 'sidebar-nav sidebar-nav-close'}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <img style={{ paddingRight: "60px" }} className='v-logo' src='assets/v-logo.png' alt='v-logo' />
                <hr style={{ marginTop: "-13px" }} />
                <Link className='sidebar-nav-link' to="/products">
                    <span className={isOpen ? 'shaking-icon' : ' '}><i style={{ fontWeight: "bold" }} className='pi pi-cart-plus' /></span>
                    <span style={{ paddingLeft: "18px" }} >Products</span>
                </Link>
                <Link className='sidebar-nav-link'>
                    <span className={isOpen ? 'shaking-icon' : ' '}><i style={{ fontWeight: "bold" }} className='pi pi-th-large' /></span>
                    <span style={{ paddingLeft: "18px" }}>Dashboard</span>
                </Link>
                <Link className='sidebar-nav-link'>
                    <span className={isOpen ? '  shaking-icon' : ' '}><i style={{ fontWeight: "bold" }} className='pi pi-sliders-h' /></span>
                    <span style={{ paddingLeft: "18px" }}>Order list</span>
                </Link>
                <Link className='sidebar-nav-link'>
                    <span className={isOpen ? '  shaking-icon' : ' '}><i style={{ fontWeight: "bold" }} className='pi pi-server' /></span>
                    <span style={{ paddingLeft: "18px" }}>Order Details</span>
                </Link>
                <Link className='sidebar-nav-link'>
                    <span className={isOpen ? '  shaking-icon' : ' '}><i style={{ fontWeight: "bold" }} className='pi pi-sitemap' /></span>
                    <span style={{ paddingLeft: "18px" }}>ShipmentTracking</span>
                </Link>
                <Link className='sidebar-nav-link'>
                    <span className={isOpen ? '  shaking-icon' : ' '}><i style={{ fontWeight: "bold" }} className='pi pi-file-import' /></span>
                    <span style={{ paddingLeft: "18px" }} >Inventory List</span>
                </Link>
                <Link to="/categoryList" className='sidebar-nav-link'>
                    <span className={isOpen ? '  shaking-icon' : ' '}><i style={{ fontWeight: "bold" }} className='pi pi-list' /></span>
                    <span style={{ paddingLeft: "18px" }}>Category List</span>
                </Link>
            </div>
        </div>
    );
};

export default Sidebar;
