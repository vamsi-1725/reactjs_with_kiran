import React from 'react';
import { useSelector } from 'react-redux';
import { Panel } from 'primereact/panel';

const Cart = () => {
    const productsInCart = useSelector((state) => state.PRODUCTS);

    return (
        <div style={{ paddingLeft: "65px", paddingTop: "72px" }} className="card">
            <Panel header="Cart">
                <p style={{ backgroundColor: "skyblue" }} className="m-0">
                    <center>
                        {productsInCart.map((product) => (
                            product.quantity > 0 && (
                                <div key={product.id}>
                                    <p>Name: {product.pName}</p>
                                    <p>Price: {product.pPrice}</p>
                                    <p>Quantity: {product.quantity}</p>
                                    <img src={product.imgUrl} alt={product.pName} style={{ height: "100px" }} />
                                    <hr />
                                </div>
                            )
                        ))}
                    </center>
                </p>
            </Panel>
        </div>
    );
};

export default Cart;
