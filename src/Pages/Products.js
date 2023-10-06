import React, { useState, useEffect } from 'react';
import { Tag } from 'primereact/tag';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { useDispatch } from "react-redux";
import { addToCart, decreaseInCart } from './ProductSlice';
import { Panel } from 'primereact/panel';


const Products = ({ data }) => {
    const [products, setProducts] = useState([]);
    const [cartCounts, setCartCounts] = useState({});
    const [openCards, setOpenCards] = useState([]);
    const [isOpen, setIsOpen] = useState(true);
    useEffect(() => {
        setProducts(data.shoppingDb.products);
    }, [data]);
    const dispatch = useDispatch();
    useEffect(() => {
        console.log("CartCounts", cartCounts);
    }, [cartCounts]);

    const getSeverity = (inventoryStatus) => {
        switch (inventoryStatus) {
            case 'INSTOCK':
                return 'success';
            case 'LOWSTOCK':
                return 'warning';
            case 'OUTOFSTOCK':
                return 'danger';
            default:
                return null;
        }
    };

    const handleAddToCart = (product) => {
        const { id, pName, pPrice, imgUrl } = product;
        setCartCounts((prevCounts) => ({
            ...prevCounts,
            [id]: (prevCounts[id] || 0) + 1,
        }));
        setOpenCards((prevOpenCards) => [...prevOpenCards, id]);

        dispatch(addToCart({ id, pName, pPrice, imgUrl }));
    };

    const handleIncrease = (productId) => {
        const { id, pName, pPrice, imgUrl } = productId
        setCartCounts((prevCounts) => ({
            ...prevCounts,
            [id]: (prevCounts[id] || 0) + 1,
        }));
        setOpenCards((prevOpenCards) => [...prevOpenCards, id]);

        dispatch(addToCart({ id, pName, pPrice, imgUrl }));
    };

    // const handleDecrease = (productId) => {
    //     const { id, pName, pPrice, imgUrl } = productId
    //     const updatedCounts = setCartCounts((prevCounts) => ({
    //         ...prevCounts,
    //         [id]: Math.max((prevCounts[id] || 0) - 1, 0),
    //     }));
    //     setOpenCards((prevOpenCards) => [...prevOpenCards, id]);


    //     if (updatedCounts[id] === 0) {
    //         setOpenCards((prevOpenCards) => prevOpenCards.filter((cardId) => cardId !== productId));
    //     }
    //     dispatch(addToCart({ id, pName, pPrice, imgUrl }));

    //     // const { id } = productId
    //     // const updatedCounts = {
    //     //     ...cartCounts,
    //     //     [id]: Math.max((cartCounts[id] || 0) - 1, 0),
    //     // };
    //     // setCartCounts(updatedCounts);

    //     // if (updatedCounts[productId] === 0) {
    //     //     setOpenCards((prevOpenCards) => prevOpenCards.filter((cardId) => cardId !== productId));
    //     // }
    // };


    // const handleDecrease = (productId) => {
    //     const { id } = productId;

    //     setCartCounts((prevCounts) => ({
    //         ...prevCounts,
    //         [id]: Math.max((prevCounts[id] || 0) - 1, 0),
    //     }));

    //     if (cartCounts[id] === 1) {
    //         setOpenCards((prevOpenCards) => prevOpenCards.filter((cardId) => cardId !== id));
    //     }

    //     dispatch(addToCart({ id }));
    // };


    const handleDecrease = (productId) => {
        const { id, pPrice } = productId;
        setCartCounts((prevCounts) => ({
            ...prevCounts,
            [id]: Math.max((prevCounts[id] || 0) - 1, 0),
        }));

        if (cartCounts[id] === 1) {
            setOpenCards((prevOpenCards) => prevOpenCards.filter((cardId) => cardId !== id));
        }

        dispatch(decreaseInCart({ id, pPrice }));
    };

    const isCardOpen = (productId) => openCards.includes(productId);

    return (
        <div style={{ paddingLeft: "65px", paddingTop: "72px", paddingBottom: "50px" }} className="card">
            <Panel header="Products">
                <div style={{ paddingLeft: "100px", paddingTop: "30px", backgroundColor: "skyblue" }} className='grid'>
                    {products.map((item, index) => (
                        <div className='col-2' key={index}>
                            <Card style={{ cursor: "pointer" }} title={item.categoryName} subTitle={item.pName}>
                                <img style={{ height: "200px", width: "130px", marginTop: "-10px" }} alt="Product" src={item.imgUrl} className="product-image" />
                                <div style={{ paddingTop: "10px" }} className={isOpen ? 'card-hover' : null} onMouseEnter={() => { setIsOpen(true) }} onMouseLeave={() => { setIsOpen(false) }}>
                                    <div className="product-price">${item.pPrice}</div>
                                    <Tag value={item.inventoryStatus} severity={getSeverity(item.inventoryStatus)} />
                                    <div>
                                        {isCardOpen(item.id) ? (
                                            <div>
                                                <Button
                                                    icon={cartCounts[item.id] === 1 ? "pi pi-ban" : "pi pi-minus"}
                                                    className="p-button-danger p-button-sm"
                                                    disabled={!cartCounts[item.id] || item.inventoryStatus === 'OUTOFSTOCK'}
                                                    onClick={() => handleDecrease(item)}
                                                />
                                                <Button severity='secondary'>{cartCounts[item.id] || 0}</Button>
                                                <Button
                                                    icon="pi pi-plus"
                                                    className="p-button-success p-button-sm"
                                                    disabled={!cartCounts[item.id] || item.inventoryStatus === 'OUTOFSTOCK'}
                                                    onClick={() => handleIncrease(item)}
                                                />
                                            </div>
                                        ) : (
                                            <Button
                                                label={`Add to Cart`}
                                                disabled={cartCounts[item.id] >= 1 || item.inventoryStatus === 'OUTOFSTOCK'}
                                                className="p-button-info"
                                                onClick={() => handleAddToCart(item)}
                                            />
                                        )}
                                    </div>
                                </div>
                            </Card>
                        </div>
                    ))}
                </div>
            </Panel>
        </div>
    );
};

export default Products;
