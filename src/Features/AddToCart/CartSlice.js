import { createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react";

const initialState = {
  cart: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      if (Array.isArray(action.payload)) {
        state.cart = [...action.payload];
        state.totalPrice = state.cart.reduce((total, item) => {
          const itemAmount =
            (item.Size_M + item.Size_L + item.Size_XL) * item.Price;
          // Add the item amount to the total
          return total + itemAmount;
        }, 0);
        //  console.log(state.cart)
      } else {
        async function postData(data) {
          try {
            await fetch(
              "https://65d63d75f6967ba8e3bdc476.mockapi.io/cartcart",
              {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
          } catch (error) {
            alert("please take some time ");
          }
        }
        async function putData(data, id) {
          try {
            await fetch(
              `https://65d63d75f6967ba8e3bdc476.mockapi.io/cartcart/${id}`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
              }
            );
          } catch (error) {
            alert(`please take some time  ${error}`);
          }
        }

        const index = state.cart.findIndex((item) => {
          return item.Name === action.payload.item.Name;
        });
        console.log(index);
        const product = action.payload.item;

        const ExistingItem = state.cart.find(
          (item) => item.Name === action.payload.item.Name
        );

        if (ExistingItem) {
          console.log("old");
          if (action.payload.size === "Size_M") {
            state.cart[index].Size_M += 1;
          } else if (action.payload.size === "Size_L") {
            state.cart[index].Size_L += 1;
          } else if (action.payload.size === "Size_XL") {
            state.cart[index].Size_XL += 1;
          }
          putData(state.cart[index], action.payload.id);
          state.totalQuantity++;
          state.totalPrice += Number(product.Price);
        } else {
          console.log("new");
          const CartProducts = {
            Discription: product.Discription,
            Name: product.Name,
            Price: product.Price,
            Size_M: 0,
            Size_L: 0,
            Size_XL: 0,
          };
          if (action.payload.size === "Size_M") {
            CartProducts.Size_M += 1;
          } else if (action.payload.size === "Size_L") {
            CartProducts.Size_L += 1;
          } else if (action.payload.size === "Size_XL") {
            CartProducts.Size_XL += 1;
          }
          state.totalQuantity++;
          state.totalPrice += Number(product.Price);
          state.cart.push(CartProducts);
          postData(CartProducts);
        }
      }
    },
  },
});
export const { addToCart } = CartSlice.actions;
export default CartSlice.reducer;
