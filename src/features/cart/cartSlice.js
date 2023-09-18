import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "https://course-api.com/react-useReducer-cart-project";

const initialState = {
  cartItems: [],
  amount: 0,
  total: 0,
  isLoading: true,
};

export const getCartItems = createAsyncThunk(
  "cart/getCartItems",
  async (_, thunkAPI) => {
    try {
      // console.log(thunkAPI.getState());
      const { data } = await axios.get(url);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => {
        return item.id !== itemId;
      });
    },
    increase: (state, action) => {
      const itemId = action.payload;
      const cartItem = state.cartItems.find((item) => {
        return item.id === itemId;
      });
      cartItem.amount++;
    },
    decrease: (state, action) => {
      const itemId = action.payload;
      const cartItem = state.cartItems.find((item) => {
        return item.id === itemId;
      });
      cartItem.amount--;
    },
    calculateTotalAndAmount: (state) => {
      let total = 0,
        amount = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });
      state.amount = amount;
      state.total = total.toFixed(2);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.cartItems = action.payload;
        state.isLoading = false;
      })
      .addCase(getCartItems.rejected, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
      });
  },
});

export const {
  clearCart,
  removeItem,
  increase,
  decrease,
  calculateTotalAndAmount,
} = cartSlice.actions;

export default cartSlice.reducer;
