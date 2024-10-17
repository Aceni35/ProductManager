import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  products: [],
  originalProducts: [],
  productsLoading: true,
  access: null,
  addProductLoading: false,
  editLoading: false,
  deleteLoading: false,
  sort: "none",
  operatorAccess: null,
  operators: [],
  operatorLoading: false,
  addOperatorLoading: false,
  deleteOperatorLoading: false,
  username: null,
  updateOperatorLoading: false,
  passwordLoading: false,
  nameLoading: false,
  accountLoading: true,
  accountInfo: {},
  addCompanyLoading: false,
  removeCompanyLoading: false,
};

const url = "http://localhost:5000/api/manage";

export const getProducts = createAsyncThunk(
  "getProducts",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("ProductManager:Token");
      const resp = await axios.get(`${url}/getProducts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(resp.data);
      return resp.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const addProduct = createAsyncThunk(
  "addProduct",
  async (body, thunkAPI) => {
    const token = localStorage.getItem("ProductManager:Token");
    console.log(body);

    try {
      const resp = await axios.post(
        `${url}/addProduct`,
        { ...body },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return resp.data;
    } catch (error) {
      console.log(error);

      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const editProduct = createAsyncThunk(
  "editProduct",
  async ({ details: info }) => {
    const token = localStorage.getItem("ProductManager:Token");
    try {
      const resp = await axios.patch(
        `${url}/editProduct`,
        { ...info },
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
      throw error;
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "deleteProduct",
  async ({ id }) => {
    const token = localStorage.getItem("ProductManager:Token");
    try {
      const resp = await axios.delete(`${url}/deleteProduct`, {
        data: {
          id,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(resp);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const getOperators = createAsyncThunk("getOperators", async () => {
  const token = localStorage.getItem("ProductManager:Token");
  try {
    const resp = await axios.get(`${url}/operators`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(resp.data);
    return resp.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

export const addOperator = createAsyncThunk(
  "addOperator",
  async ({ details: data }, thunkAPI) => {
    const token = localStorage.getItem("ProductManager:Token");
    try {
      const resp = await axios.post(
        `${url}/operators`,
        { ...data },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return resp.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const editOperator = createAsyncThunk(
  "editOperator",
  async ({ details: data }, thunkAPI) => {
    const token = localStorage.getItem("ProductManager:Token");
    console.log(data);

    try {
      const resp = await axios.patch(
        `${url}/operators`,
        { ...data },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return resp.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const deleteOperator = createAsyncThunk(
  "deleteOperator",
  async ({ deleteSelected: data }) => {
    const token = localStorage.getItem("ProductManager:Token");
    const resp = await axios.delete(`${url}/operators`, {
      data: {
        pin: data.pin,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(resp.data);
    try {
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const getAccount = createAsyncThunk("getAccount", async (req, res) => {
  const token = localStorage.getItem("ProductManager:Token");
  try {
    const resp = await axios.get(`${url}/account`, {
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

export const addCompany = createAsyncThunk(
  "addCompany",
  async ({ id }, thunkAPI) => {
    const token = localStorage.getItem("ProductManager:Token");
    try {
      const resp = await axios.patch(
        `${url}/companies`,
        { id },
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

export const RemoveCompany = createAsyncThunk(
  "removeCompany",
  async ({ accountID }) => {
    const token = localStorage.getItem("ProductManager:Token");
    try {
      const resp = await axios.delete(`${url}/companies`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          accountID,
        },
      });
      console.log(resp);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const updatePassword = createAsyncThunk(
  "updatePassword",
  async ({ data }, thunkAPI) => {
    const token = localStorage.getItem("ProductManager:Token");
    try {
      const resp = await axios.patch(
        `${url}/password`,
        {
          ...data,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(resp.data);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

const ManagementSlice = createSlice({
  initialState,
  name: "management",
  reducers: {
    changeSort: (state, action) => {
      state.sort = action.payload;
      if (action.payload === "none") {
        state.products = state.originalProducts;
      } else if (action.payload === "from-lowest") {
        state.products = state.products.sort((a, b) => a.price - b.price);
      } else {
        state.products = state.products.sort((a, b) => b.price - a.price);
      }
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getProducts.pending, (state) => {
        state.productsLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.products = action.payload.products;
        state.originalProducts = action.payload.products;
        state.access = true;
        state.productsLoading = false;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.productsLoading = false;
        if (action.payload === "Access Denied") {
          toast.error("Access Denied");
          state.access = false;
        } else {
          toast.error("Something went wrong");
          state.access = true;
        }
      })
      .addCase(addProduct.pending, (state, action) => {
        state.addProductLoading = true;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.addProductLoading = false;
        state.products.push(action.payload.product);
        toast.info("Product added");
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.addProductLoading = false;
        toast.error(action.payload);
      })
      .addCase(editProduct.pending, (state, action) => {
        state.editLoading = true;
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        const newProducts = state.products.map((x) => {
          if (x.id === action.payload.newProduct.id) {
            return action.payload.newProduct;
          } else {
            return x;
          }
        });
        state.products = newProducts;
        action.meta.arg.setShow(false);
        state.editLoading = false;
        toast.info("Product updated");
      })
      .addCase(editProduct.rejected, (state, action) => {
        action.meta.arg.setShow(false);
        toast.error("Something went wrong");
        state.editLoading = false;
      })
      .addCase(deleteProduct.pending, (state, action) => {
        state.deleteLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.deleteLoading = false;
        action.meta.arg.setShow(false);
        state.products = state.products.filter(
          (x) => x.id != action.meta.arg.id
        );
        toast.info("Product deleted");
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.productsLoading = false;
        action.meta.arg.setShow(false);
        toast.error("Something went wrong");
      })
      .addCase(getOperators.pending, (state) => {
        state.operatorLoading = true;
      })
      .addCase(getOperators.fulfilled, (state, action) => {
        state.operators = action.payload.operators;
        state.operatorLoading = false;
        state.username = action.payload.user;
      })
      .addCase(addOperator.pending, (state) => {
        state.addOperatorLoading = true;
      })
      .addCase(addOperator.fulfilled, (state, action) => {
        state.operators.push(action.payload.newOperator);
        action.meta.arg.setShow(false);
        state.addOperatorLoading = false;
        toast.info("Operator added");
      })
      .addCase(addOperator.rejected, (state, action) => {
        state.addOperatorLoading = false;
        toast.error(action.payload);
      })
      .addCase(deleteOperator.pending, (state, action) => {
        state.deleteOperatorLoading = true;
      })
      .addCase(deleteOperator.fulfilled, (state, action) => {
        action.meta.arg.setShow(false);
        toast.info("User deleted");
        state.deleteOperatorLoading = false;

        state.operators = state.operators.filter((x) => {
          return x.pin != action.meta.arg.deleteSelected.pin;
        });
      })
      .addCase(editOperator.pending, (state, action) => {
        state.updateOperatorLoading = true;
      })
      .addCase(editOperator.fulfilled, (state, action) => {
        action.meta.arg.setShow(false);
        state.updateOperatorLoading = false;
        state.operators = action.payload.newOperators;
        toast.info("Operator updated");
      })
      .addCase(editOperator.rejected, (state, action) => {
        state.updateOperatorLoading = false;
        toast.error(`${action.payload}`);
      })
      .addCase(getAccount.pending, (state) => {
        state.accountLoading = true;
      })
      .addCase(getAccount.fulfilled, (state, action) => {
        state.accountInfo = action.payload;
        state.accountLoading = false;
      })
      .addCase(addCompany.pending, (state) => {
        state.addCompanyLoading = true;
      })
      .addCase(addCompany.fulfilled, (state, action) => {
        state.addCompanyLoading = false;
        action.meta.arg.setShow(false);
        state.accountInfo.companies.push(action.payload.company);
        toast.info("Company added");
      })
      .addCase(addCompany.rejected, (state, action) => {
        state.addCompanyLoading = false;
        toast.error(action.payload);
      })
      .addCase(RemoveCompany.pending, (state, action) => {
        state.removeCompanyLoading = true;
      })
      .addCase(RemoveCompany.fulfilled, (state, action) => {
        action.meta.arg.setShow(false);
        state.removeCompanyLoading = false;
        state.accountInfo.companies = state.accountInfo.companies.filter(
          (x) => x.accountID != action.meta.arg.accountID
        );
        toast.info("Company Removed");
      })
      .addCase(updatePassword.pending, (state, action) => {
        state.passwordLoading = true;
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.passwordLoading = false;
        action.meta.arg.setShow(false);
        toast.info("Password updated");
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.passwordLoading = false;
        toast.error(action.payload);
      }),
});

export default ManagementSlice.reducer;
export const { changeSort } = ManagementSlice.actions;
