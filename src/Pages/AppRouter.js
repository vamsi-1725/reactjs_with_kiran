import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import "../App.css"
import Header from '../Shopping-Components/Header'
import Sidebar from '../Shopping-Components/Sidebar'
import Footer from '../Shopping-Components/Footer'
import "../CSS/Product.css";
import Products from '../Pages/Products';
import ShoppingDb from "../db/ShoppignDb.json"
import Cart from '../Pages/Cart';
import Home from '../Pages/Home';
import FilterDemo from '../Pages/CategoryList';

const AppRouter = () => {
    const containerStyle = {
        backgroundImage: `url('assets/shopping-background.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
    };

    return (
        <BrowserRouter>
            <div style={containerStyle}>
                <Header />
                <Sidebar />
                <Routes>
                    <Route path='' element={<Home />} />
                    <Route path='/products' element={<Products data={ShoppingDb} />} />
                    <Route path='/cart' element={<Cart />} />
                    <Route path='categoryList' element={<FilterDemo data={ShoppingDb} />} />
                </Routes>
                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default AppRouter;
