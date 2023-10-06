import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from 'primereact/badge';
import { useSelector } from 'react-redux';

const Header = () => {
    const productsInCart = useSelector((state) => state.PRODUCTS);
    const productsInCartLength = productsInCart.length;

    return (
        <div className='Header'>
            <div></div>
            <span style={{ marginTop: "-30px", marginBottom: "-50px", }}>
                <img src='assets/shopping-basket.jpg' height="160px" style={{ paddingTop: "10px" }} width="300px" alt='shopping-basket' />
            </span>
            <Link to="/cart" style={{
                fontWeight: "bolder", paddingRight: "40px", paddingTop: "40px",
                textShadow: "1px 1px black", color: "white",
            }}>
                <i style={{ fontSize: "23px", paddingLeft: "430px", cursor: 'pointer', }} data-pr-tooltip="No notifications"
                    data-pr-position="right"
                    data-pr-at="right+5 top"
                    data-pr-my="left center-2"
                    className='pi pi-shopping-cart p-overlay-badge'>
                    {
                        productsInCartLength === 0 ? null : <Badge value={productsInCartLength}></Badge>
                    }

                </i>
            </Link>
        </div >
    );
};

export default Header;
