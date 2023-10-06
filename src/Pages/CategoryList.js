import React, { useState, useEffect } from 'react';
import { OrderList } from 'primereact/orderlist';
import { Button } from 'primereact/button';
import { useDispatch } from "react-redux";
import { addToCart, decreaseInCart } from './ProductSlice';

export default function FilterDemo({ data }) {
    const [products, setProducts] = useState([]);
    const [cartCounts, setCartCounts] = useState({});
    const [openCards, setOpenCards] = useState([]);
    const [isOpen, setIsOpen] = useState(true);
    useEffect(() => {
        setProducts(data.shoppingDb.products);
    }, [data]);

    useEffect(() => {
        setProducts(data.shoppingDb.products);
    }, [data]);
    const dispatch = useDispatch();
    useEffect(() => {
        console.log("CartCounts", cartCounts);
    }, [cartCounts]);
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
    const itemTemplate = (item) => (
        <div style={{ width: "800px" }} className="flex flex-wrap p-2 align-items-center gap-3">
            <img
                className="w-4rem shadow-2 flex-shrink-0 border-round"
                src={item.imgUrl}
                alt={item.name}
            />
            <div className="flex-1 flex flex-column gap-2 xl:mr-8">
                <span className="font-bold">{item.pName}</span>
                <div className="flex align-items-center gap-2">
                    <i className="pi pi-tag text-sm"></i>
                    <span>{item.categoryName}</span>
                </div>
            </div>
            <span className="font-bold text-900">${item.pPrice}</span>
            <div>
                {isCardOpen(item.id) ? (
                    <div>
                        <Button
                            icon={cartCounts[item.id] === 1 ? "pi pi-ban" : "pi pi-minus"}
                            className="p-button-danger p-button-sm"
                            disabled={!cartCounts[item.id]}
                            onClick={() => handleDecrease(item)}
                        />
                        <Button severity='secondary'>{cartCounts[item.id] || 0}</Button>
                        <Button
                            icon="pi pi-plus"
                            className="p-button-success p-button-sm"
                            disabled={!cartCounts[item.id]}
                            onClick={() => handleIncrease(item)}
                        />
                    </div>
                ) : (
                    <Button
                        label={`Add to Cart`}
                        disabled={cartCounts[item.id] >= 1}
                        className="p-button-info"
                        onClick={() => handleAddToCart(item)}
                    />
                )}
            </div>
        </div>
    );

    const footerTemplate = () => null;

    return (
        <div style={{ paddingTop: "70px", paddingLeft: "80px", width: "100%" }} className="card xl:flex xl:justify-content-center">
            <OrderList
                value={products}
                onChange={(e) => setProducts(e.value)}
                itemTemplate={itemTemplate}
                header="Category List"
                filter
                filterBy="categoryName"
                footerTemplate={footerTemplate}
            />
        </div>
    );
}
