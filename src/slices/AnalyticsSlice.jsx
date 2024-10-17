import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  access: null,
  calendarLoading: true,
  calendarOrders: [],
  productsSoldByMonthLoading: false,
  productsSoldByMonth: [],
  CompanyPurchasesByMonth: [],
  companyPurchasesByMonthLoading: false,
  CompanySalesByMonth: [],
  CompanySalesByMonthLoading: false,
  products: [],
  productsLoading: true,
  ProductSalesYears: [],
  ProductSalesYearsLoading: false,
  companies: [],
  CompaniesLoading: false,
  companyPurchases: [],
  companyPurchasesLoading: false,
  companySales: [],
  companySalesLoading: false,
  receipt: [],
  receiptLoading: false,
  totalSales: 0,
  balance: 0,
  totalPurchases: 0,
};

const url = "http://localhost:5000/api/analytics";

export const getSingleDay = createAsyncThunk(
  "getSingleDay",
  async ({ date }) => {
    const token = localStorage.getItem("ProductManager:Token");
    try {
      const resp = await axios.get(`${url}/singleDay?date=${date}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return resp.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const getProductsSoldByMonth = createAsyncThunk(
  "getProductsSoldByMonth",
  async ({ month }) => {
    const token = localStorage.getItem("ProductManager:Token");
    try {
      const resp = await axios.get(
        `${url}/getProductsSoldByMonth?month=${month}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return resp.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const getCompanyPurchasesByMonth = createAsyncThunk(
  "getCompanyPurchasesByMonth",
  async ({ month }) => {
    const token = localStorage.getItem("ProductManager:Token");
    try {
      const resp = await axios.get(
        `${url}/getCompanyPurchasesByMonth?month=${month}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return resp.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const getAnalyticsProducts = createAsyncThunk(
  "getAnalyticProducts",
  async () => {
    const token = localStorage.getItem("ProductManager:Token");
    try {
      const resp = await axios.get(`${url}/getAnalyticsProducts`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return resp.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const getCompanySalesByMonth = createAsyncThunk(
  "getCompanySalesByMonth",
  async ({ month }) => {
    const token = localStorage.getItem("ProductManager:Token");
    try {
      const resp = await axios.get(
        `${url}/getCompanySalesByMonth?month=${month}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(resp.data);
      return resp.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const getProductsSalesYear = createAsyncThunk(
  "getProductSalesYears",
  async ({ productId }) => {
    const token = localStorage.getItem("ProductManager:Token");
    try {
      const resp = await axios.get(
        `${url}/getProductSalesYears?productId=${productId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return resp.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const getAnalyticsCompanies = createAsyncThunk(
  "getAnalyticsCompanies",
  async () => {
    const token = localStorage.getItem("ProductManager:Token");
    try {
      const resp = await axios.get(`${url}/getAnalyticsCompanies`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return resp.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const getCompanyPurchases = createAsyncThunk(
  "getCompanyPurchases",
  async ({ company }) => {
    const token = localStorage.getItem("ProductManager:Token");
    try {
      const resp = await axios.get(
        `${url}/getCompanyPurchases?company=${company}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return resp.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const getCompanySales = createAsyncThunk(
  "getCompanySales",
  async ({ company }) => {
    const token = localStorage.getItem("ProductManager:Token");
    try {
      const resp = await axios.get(
        `${url}/getCompanySales?company=${company}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return resp.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const getReceipts = createAsyncThunk(
  "getReceipts",
  async ({ company, fromDate, toDate }, thunkAPI) => {
    const token = localStorage.getItem("ProductManager:Token");
    try {
      const resp = await axios.get(
        `${url}/getReceipts?company=${company}&fromDate=${fromDate}&toDate=${toDate}`,
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

const AnalyticsSlice = createSlice({
  name: "analytics",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getSingleDay.pending, (state) => {
        state.calendarLoading = true;
      })
      .addCase(getSingleDay.fulfilled, (state, action) => {
        state.calendarOrders = action.payload.orders;
        state.access = true;
        state.calendarLoading = false;
      })
      .addCase(getSingleDay.rejected, (state, action) => {
        toast.error(action.payload);
        state.access = false;
      })
      .addCase(getProductsSoldByMonth.pending, (state) => {
        state.productsSoldByMonthLoading = true;
      })
      .addCase(getProductsSoldByMonth.fulfilled, (state, action) => {
        state.productsSoldByMonth = action.payload.sortedSales;
        state.productsSoldByMonthLoading = false;
      })
      .addCase(getCompanyPurchasesByMonth.pending, (state, action) => {
        state.companyPurchasesByMonthLoading = true;
      })
      .addCase(getCompanyPurchasesByMonth.fulfilled, (state, action) => {
        state.CompanyPurchasesByMonth = action.payload.sortedPurchases;
        state.companyPurchasesByMonthLoading = false;
      })
      .addCase(getCompanySalesByMonth.pending, (state) => {
        state.CompanySalesByMonthLoading = true;
      })
      .addCase(getCompanySalesByMonth.fulfilled, (state, action) => {
        state.CompanySalesByMonth = action.payload.sortedPurchases;
      })
      .addCase(getAnalyticsProducts.pending, (state) => {
        state.productsLoading = true;
      })
      .addCase(getAnalyticsProducts.fulfilled, (state, action) => {
        state.products = action.payload.products;
        state.productsLoading = false;
      })
      .addCase(getProductsSalesYear.pending, (state) => {
        state.ProductSalesYearsLoading = true;
      })
      .addCase(getProductsSalesYear.fulfilled, (state, action) => {
        state.ProductSalesYears = action.payload.totalSoldByMonth;
        state.ProductSalesYearsLoading = false;
      })
      .addCase(getAnalyticsCompanies.pending, (state) => {
        state.CompaniesLoading = true;
      })
      .addCase(getAnalyticsCompanies.fulfilled, (state, action) => {
        state.companies = action.payload.companies;
        state.CompaniesLoading = false;
      })
      .addCase(getCompanyPurchases.pending, (state, action) => {
        state.companyPurchasesLoading = true;
      })
      .addCase(getCompanyPurchases.fulfilled, (state, action) => {
        state.companyPurchases = action.payload.purchases;
        state.companyPurchasesLoading = false;
      })
      .addCase(getCompanySales.pending, (state) => {
        state.companySalesLoading = true;
      })
      .addCase(getCompanySales.fulfilled, (state, action) => {
        state.companySales = action.payload.purchases;
        state.companySalesLoading = false;
      })
      .addCase(getReceipts.pending, (state, action) => {
        state.receiptLoading = true;
      })
      .addCase(getReceipts.fulfilled, (state, action) => {
        state.receipt = action.payload.orders;
        state.totalPurchases = action.payload.totalPurchases;
        state.totalSales = action.payload.totalSales;
        state.balance = action.payload.balance;
        state.receiptLoading = false;
      })
      .addCase(getReceipts.rejected, (state, action) => {
        toast.error(action.payload);
        state.receiptLoading = false;
      }),
});

export default AnalyticsSlice.reducer;
export const {} = AnalyticsSlice.actions;
