import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: "PRODUCTS",
    initialState: [],
    reducers: {
        addToCart: (state, action) => {
            const productToAdd = action.payload;
            const existingProduct = state.find(product => product.id === productToAdd.id);

            console.log("priceData", productToAdd.pPrice)
            if (existingProduct) {
                existingProduct.quantity += 1;
                existingProduct.pPrice = productToAdd.pPrice * existingProduct.quantity;
            } else {
                state.push({ ...productToAdd, quantity: 1 });
            }

        },


        decreaseInCart: (state, action) => {
            const productToDecrease = action.payload;
            console.log("productToDecrease", productToDecrease)
            const existingProduct = state.find(product => product.id === productToDecrease.id);

            if (existingProduct && existingProduct.quantity > 0) {
                existingProduct.quantity -= 1;
                existingProduct.pPrice = existingProduct.pPrice - productToDecrease.pPrice;
            }
        }
    }
});

export const { addToCart, decreaseInCart } = productSlice.actions;
export default productSlice.reducer;
