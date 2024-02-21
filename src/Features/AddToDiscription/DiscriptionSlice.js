import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [], // Use lowercase for property names, conventionally
};

export const descriptionSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProductToDis: (state, action) => {
      if (Array.isArray(action.payload)) {
        state.products = action.payload;
      } else if (typeof action.payload === "object") {
        const size = action.payload.size;
        const productId = action.payload.id;
        const product = action.payload.products.find(
          (product) => product.id === productId
        )
        const productIndex = action.payload.products.findIndex(
          (item) => item.id === action.payload.id
        );
        if (product[size] > 0) {
          let newSize_L = product.Size_L;
          let newSize_M = product.Size_M;
          let newSize_XL = product.Size_XL;

          if (newSize_L === product[size]) {
            newSize_L = product.Size_L - 1;
          } else if (newSize_M === product[size]) {
            newSize_M = product.Size_M - 1;
          } else if (newSize_XL === product[size]) {
            newSize_XL = product.Size_XL - 1;
          }
          const DecProducts = {
            id: product.id,
            Discription: product.Discription,
            Name: product.Name,
            Price: product.Price,
            Size_M: newSize_M,
            Size_L: newSize_L,
            Size_XL: newSize_XL,
          };

          if (productIndex !== -1) {
            // Create a new array with the updated product
            const updatedProducts = [
              ...action.payload.products.slice(0, productIndex), // Part of the array before the updated product
              DecProducts, // The updated product
              ...action.payload.products.slice(productIndex + 1), // Part of the array after the updated product
            ];
            state.products = updatedProducts;
            console.log(DecProducts, DecProducts._id);
            fetchFun(DecProducts, DecProducts.id);

            async function fetchFun(obj, id) {
              const res = await fetch(
                `https://65d63d75f6967ba8e3bdc476.mockapi.io/productproduct/${id}`,
                {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(obj),
                }
              );
              if (!res.ok) {
                alert("there is an error while updating details");
              }
            }
          }
        }
      }
    },
    decreaseSize: (state, action) => {},
  },
});

export const { addProductToDis, decreaseSize } = descriptionSlice.actions;

export default descriptionSlice.reducer;
