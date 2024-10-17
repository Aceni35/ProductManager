import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  info: null,
  products: null,
  order: [],
  orderTotal: 0,
  operator: null,
  companies: null,
  selectedOrder: null,
  selectedCompany: null,
  selectedProduct: null,
  orderPageLoading: true,
  completedOrders: [],
  uncompletedOrders: [],
  loginLoading: false,
  sendLoading: false,
  answerLoading: false,
  changeOperatorLoading: false,
};

const url = "http://localhost:5000/api";

export const Login = createAsyncThunk(
  "Login",
  async ({ email: id, password, pin }, thunkAPI) => {
    try {
      const resp = await axios.post(`${url}/login`, { id, password, pin });
      return resp.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const getOrderPage = createAsyncThunk("getOrderPage", async () => {
  const token = localStorage.getItem("ProductManager:Token");
  try {
    const resp = await axios.get(`${url}/orderPage`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return resp.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

export const sendOrder = createAsyncThunk(
  "SendOrder",
  async ({ total, to, products, orderName }, thunkAPI) => {
    const token = localStorage.getItem("ProductManager:Token");
    try {
      const resp = await axios.post(
        `${url}/order`,
        {
          total,
          to,
          products,
          orderName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(resp.data);
      return resp.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const answerOrder = createAsyncThunk(
  "answerOrder",
  async ({ orderID, answer }, thunkAPI) => {
    const token = localStorage.getItem("ProductManager:Token");
    try {
      const resp = await axios.patch(
        `${url}/order`,
        {
          orderID,
          answer,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(resp);
      return resp.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const changeOperator = createAsyncThunk(
  "changeOperator",
  async ({ pin }, thunkAPI) => {
    const token = localStorage.getItem("ProductManager:Token");
    try {
      const resp = await axios.post(
        `${url}/changeOperator`,
        {
          pin,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(resp);
      return resp.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const getInfo = createAsyncThunk("getInfo", async (_, thunkAPI) => {
  const token = localStorage.getItem("ProductManager:Token");

  try {
    const resp = await axios.get(`${url}/info`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return resp.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

const OrderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    changeCompany: (state, action) => {
      state.selectedCompany = action.payload;
    },
    changeProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    changeSelected: (state, action) => {
      state.selectedOrder = action.payload;
    },
    addOrder: (state, action) => {
      state.uncompletedOrders.push(action.payload);
    },
    clearOrder: (state, action) => {
      state.order = [];
      state.orderTotal = 0;
    },
    cancelOrder: (state, action) => {
      const sender = state.uncompletedOrders.find(
        (x) => x._id === action.payload
      ).from.name;
      state.uncompletedOrders = state.uncompletedOrders.filter(
        (x) => x._id != action.payload
      );
      toast.warning(`An order from ${sender} has been canceled`);
    },
    acceptOrder: (state, action) => {
      const oldOrder = state.uncompletedOrders.find(
        (x) => x._id === action.payload
      );
      state.uncompletedOrders = state.uncompletedOrders.filter(
        (x) => x._id != action.payload
      );
      state.completedOrders.push({ ...oldOrder, status: "accepted" });
      toast.info(`${oldOrder.to.name} has accepted your Order`);
    },
    rejectOrder: (state, action) => {
      const oldOrder = state.uncompletedOrders.find(
        (x) => x._id === action.payload
      );
      state.uncompletedOrders = state.uncompletedOrders.filter(
        (x) => x._id != action.payload
      );
      state.completedOrders.push({ ...oldOrder, status: "rejected" });
      toast.warning(`${oldOrder.to.name} has rejected your Order`);
    },
    addProduct: (state, action) => {
      const product = state.products.find((x) => x.id === action.payload.id);
      const exists = state.order.find((x) => x.id === action.payload.id);
      if (exists) {
        state.order = state.order.map((x) => {
          if (x.id === action.payload.id) {
            return {
              ...x,
              amount: Number(exists.amount) + Number(action.payload.amount),
              total: Number(exists.total) + Number(action.payload.total),
            };
          } else {
            return x;
          }
        });
        state.orderTotal += Number(action.payload.total);
      } else {
        state.order.push({
          id: product.id,
          weight: product.weight,
          name: product.name,
          price: product.price,
          total: action.payload.total,
          amount: action.payload.amount,
        });
        state.orderTotal += Number(action.payload.total);
      }
    },
    removeProduct: (state, action) => {
      state.orderTotal -= Number(
        state.order.find((x) => x.id === action.payload.id).total
      );
      state.order = state.order.filter((x) => x.id != action.payload.id);
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(Login.pending, (state, action) => {
        state.loginLoading = true;
      })
      .addCase(Login.rejected, (state, action) => {
        state.loginLoading = false;
        toast.error(action.payload);
      })
      .addCase(Login.fulfilled, (state, action) => {
        localStorage.setItem("ProductManager:Token", action.payload.token);
        state.loginLoading = false;
        window.location.reload();
      })
      .addCase(getOrderPage.pending, (state) => {
        state.orderPageLoading = true;
      })
      .addCase(getOrderPage.fulfilled, (state, action) => {
        state.operator = action.payload.operator;
        state.products = action.payload.products;
        state.companies = action.payload.companies;
        state.completedOrders = action.payload.completedOrders;
        state.uncompletedOrders = action.payload.uncompletedOrders;
        if (action.payload.companies.length != 0) {
          state.selectedCompany = action.payload.companies[0].accountID;
        }
        if (action.payload.products.length != 0) {
          state.selectedProduct = action.payload.products[0].id;
        }
        state.info = action.payload.info;
        state.orderPageLoading = false;
      })
      .addCase(getOrderPage.rejected, (state) => {
        toast.error("Something went wrong");
      })
      .addCase(sendOrder.pending, (state, action) => {
        state.sendLoading = true;
      })
      .addCase(sendOrder.fulfilled, (state, action) => {
        toast.info("Order Placed");
        state.uncompletedOrders.push(action.payload.newOrder);
        state.sendLoading = false;
        action.meta.arg.setMakeOrder(false);
        action.meta.arg.socket.emit("send-order", action.payload.newOrder);
      })
      .addCase(sendOrder.rejected, (state, action) => {
        state.sendLoading = false;
        toast.error(action.payload);
      })
      .addCase(answerOrder.pending, (state, action) => {
        state.answerLoading = true;
      })
      .addCase(answerOrder.rejected, (state, action) => {
        state.answerLoading = false;
        action.meta.arg.setShow(false);
        toast.error(action.payload);
      })
      .addCase(answerOrder.fulfilled, (state, action) => {
        if (action.payload.newOrder != "deleted") {
          const oldOrder = state.uncompletedOrders.find(
            (x) => x._id === action.meta.arg.orderID
          );
          const newOrder = {
            ...action.payload.newOrder,
            from: oldOrder.from,
            to: oldOrder.to,
          };
          state.completedOrders.push(newOrder);
          const { answer, orderID, socket, to } = action.meta.arg;
          if (answer === "accept") {
            socket.emit("accept-order", orderID, to);
            toast.info("Order accepted");
          } else if (answer === "reject") {
            socket.emit("reject-order", orderID, to);
            toast.info("Order rejected");
          }
        } else {
          toast.warning("Order canceled");
          const { to, socket, orderID } = action.meta.arg;
          socket.emit("cancel-order", to, orderID);
        }
        state.uncompletedOrders = state.uncompletedOrders.filter((x) => {
          return x._id != action.meta.arg.orderID;
        });
        action.meta.arg.setShow(false);
        state.answerLoading = false;
      })
      .addCase(changeOperator.pending, (state, action) => {
        state.changeOperatorLoading = true;
      })
      .addCase(changeOperator.rejected, (state, action) => {
        state.changeOperatorLoading = false;
        toast.error(action.payload);
      })
      .addCase(changeOperator.fulfilled, (state, action) => {
        state.changeOperatorLoading = false;
        localStorage.setItem("ProductManager:Token", action.payload.token);
        window.location.reload();
      })
      .addCase(getInfo.fulfilled, (state, action) => {
        state.info = action.payload;
      }),
});

export default OrderSlice.reducer;
export const {
  changeCompany,
  changeProduct,
  changeSelected,
  addOrder,
  cancelOrder,
  acceptOrder,
  rejectOrder,
  addProduct,
  removeProduct,
  clearOrder,
} = OrderSlice.actions;
