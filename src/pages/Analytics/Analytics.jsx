import React, { useEffect, useState } from "react";
import BasicPie from "./PieChart";
import TickPlacementBars from "./BarChart";
import { useDispatch, useSelector } from "react-redux";
import {
  getAnalyticsCompanies,
  getAnalyticsProducts,
  getCompanyPurchases,
  getCompanyPurchasesByMonth,
  getCompanySales,
  getCompanySalesByMonth,
  getProductsSalesYear,
  getProductsSoldByMonth,
} from "../../slices/AnalyticsSlice";
import MySpinner from "../../components/MySpinner";

const Analytics = () => {
  const dispatch = useDispatch();
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [monthPurchases, setMonthPurchases] = useState("");
  const [monthSales, setMonthSales] = useState("");
  const [company, setCompany] = useState("");
  const [salesCompany, setSalesCompany] = useState("");

  const {
    productsSoldByMonth,
    CompanyPurchasesByMonth,
    CompanySalesByMonth,
    products,
    productsLoading,
    ProductSalesYears,
    CompaniesLoading,
    companies,
    companyPurchases,
    companySales,
  } = useSelector((store) => store.analytics);

  useEffect(() => {
    dispatch(getAnalyticsProducts());
    dispatch(getAnalyticsCompanies());
  }, []);

  useEffect(() => {
    if (!salesCompany) return;
    dispatch(getCompanySales({ company: salesCompany }));
  }, [salesCompany]);

  useEffect(() => {
    if (!company) return;
    dispatch(getCompanyPurchases({ company }));
  }, [company]);

  useEffect(() => {
    if (!selectedProduct) return;
    dispatch(getProductsSalesYear({ productId: selectedProduct }));
  }, [selectedProduct]);

  useEffect(() => {
    if (!selectedMonth) return;
    dispatch(getProductsSoldByMonth({ month: selectedMonth }));
  }, [selectedMonth]);

  useEffect(() => {
    if (!monthPurchases) return;
    dispatch(getCompanyPurchasesByMonth({ month: monthPurchases }));
  }, [monthPurchases]);

  useEffect(() => {
    if (!monthSales) return;
    dispatch(getCompanySalesByMonth({ month: monthSales }));
  }, [monthSales]);

  if (productsLoading || CompaniesLoading) {
    return (
      <div className="row">
        <div className="col-12 text-center mt-3">
          <MySpinner />
        </div>
      </div>
    );
  }
  return (
    <>
      <SinglePie
        name={"Most Products sold (by month)"}
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
        sales={productsSoldByMonth}
      />
      <SingleChart
        name={"Product Sold over the year"}
        options={products}
        selectedOption={selectedProduct}
        setSelectedOption={setSelectedProduct}
        sales={ProductSalesYears}
        selectText={"Select Product"}
        label={"amount"}
        value={""}
      />
      <SinglePie
        name={"Most Purchases to Companies (by month)"}
        selectedMonth={monthPurchases}
        setSelectedMonth={setMonthPurchases}
        sales={CompanyPurchasesByMonth}
      />
      <SingleChart
        name={"Company Purchases over the year"}
        selectText={"Select Company"}
        sales={companyPurchases}
        selectedOption={company}
        setSelectedOption={setCompany}
        options={companies}
        label={"amount ($)"}
        value={"$"}
      />
      <SinglePie
        selectedMonth={monthSales}
        setSelectedMonth={setMonthSales}
        name={"Most Companies sold to (by month)"}
        sales={CompanySalesByMonth}
        colors={["red", "green", "black"]}
      />
      <SingleChart
        name={"Company Sales over the year"}
        selectText={"Select Company"}
        sales={companySales}
        selectedOption={salesCompany}
        setSelectedOption={setSalesCompany}
        options={companies}
        label={"amount ($)"}
        value={"$"}
      />
    </>
  );
};

const SinglePie = ({
  name,
  colors,
  selectedMonth,
  setSelectedMonth,
  sales,
}) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return (
    <>
      <div className="row bg-white rounded mt-1 mb-2">
        <div className="col-6 fs-4 mb-2 pt-1">{name} :</div>
        <div className="col-6 text-end my-auto">
          change month{" "}
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <option value="">Select</option>
            {months.map((x, index) => (
              <option value={index + 1}>{x}</option>
            ))}
          </select>
        </div>
        <hr />
        <div className="col-12">
          <BasicPie colors={colors} sales={sales} />
        </div>
      </div>
    </>
  );
};

const SingleChart = ({
  name,
  options,
  selectedOption,
  setSelectedOption,
  sales,
  selectText,
  label,
  value,
}) => {
  return (
    <div className="row mt-2 bg-white rounded">
      <div className="col-6 fs-4 mb-2 pt-1">{name} :</div>
      <div className="col-6 text-end my-auto">
        {selectText}
        <select
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
          className="ms-2"
        >
          <option value="">select</option>
          {options.map((x) => (
            <option key={x.id} value={x.id}>
              {x.name}
            </option>
          ))}
        </select>
      </div>
      <hr />
      <div className="col-12">
        <TickPlacementBars sales={sales} label={label} value={value} />
      </div>
    </div>
  );
};

export default Analytics;
