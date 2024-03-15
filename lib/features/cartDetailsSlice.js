import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCartDetails = createAsyncThunk(
  "cart/fetchCartDetails",
  async () => {
    try {
      const response = await axios.get(
        "https://groww-intern-assignment.vercel.app/v1/api/order-details"
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log("Error fetching cart details: ", error);
    }
  }
);

const initialState = {
  cart: [],
  totalPrice: 0,
  discount: 0,
  paymentMethod: "",
  loading: false,
  error: null,
};

const cartDetailsSlice = createSlice({
  name: "cartDetails",
  initialState,
  reducers: {
    setCartDetailsCopy: (state, action) => {
      state.cartCopy = action.payload;
    },
    incrementItemQuantity: (state, action) => {
      const { productId } = action.payload;
      const item = state.cart.products.find((item) => item.id === productId);
      if (item) {
        item.quantity++;
      }
    },
    decrementItemQuantity: (state, action) => {
      const { productId } = action.payload;
      const item = state.cart.products.find((item) => item.id === productId);
      if (item && item.quantity > 0) {
        item.quantity--;
      }
      if (item.quantity < 1) {
        state.cart.products = state.cart.products.filter(
          (item) => item.id !== productId
        );
      }
    },
    setTotalPrice: (state, action) => {
      const { discount, total, delivery } = action.payload;
      state.totalPrice = ((total - discount) + delivery).toFixed(2);
    },
    setDiscount: (state, action) => {
      const { total, discount } = action.payload;
      state.discount = (total * (discount / 100)).toFixed(2);
    },
    setPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },
    resetCart: (state) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCartDetails.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchCartDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.cart = action.payload;
    });
    builder.addCase(fetchCartDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
  },
});

export default cartDetailsSlice.reducer;
export const {
  setCartDetailsCopy,
  incrementItemQuantity,
  decrementItemQuantity,
  setTotalPrice,
  setDiscount,
  setPaymentMethod,
  resetCart,
} = cartDetailsSlice.actions;
export const cartDetails = (state) => state.cartDetails.cart;
export const paymentmethod = (state) => state.cartDetails.paymentMethod;
export const totalPrice = (state) => state.cartDetails.totalPrice;
export const discount = (state) => state.cartDetails.discount;
export const isCartLoading = (state) => state.cartDetails.loading;
export const isCartError = (state) => state.cartDetails.error;
