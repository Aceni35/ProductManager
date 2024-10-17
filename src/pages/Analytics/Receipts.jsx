import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MySpinner from "../../components/MySpinner";
import {
  getAnalyticsCompanies,
  getReceipts,
} from "../../slices/AnalyticsSlice";
import { toast } from "react-toastify";

const Receipts = () => {
  const [selectedCompany, setSelectedCompany] = useState("");
  const [dates, setDates] = useState({ fromDate: "", toDate: "" });
  const {
    CompaniesLoading,
    companies,
    receipt,
    totalSales,
    totalPurchases,
    balance,
    receiptLoading,
  } = useSelector((store) => store.analytics);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAnalyticsCompanies());
  }, []);
  if (CompaniesLoading) {
    return (
      <div className="row">
        <div className="col-12 text-center">
          <MySpinner />
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="row bg-white rounded py-2 mt-2">
        <div className="col-12 fs-4">
          Select a company to show receipt:
          <select
            value={selectedCompany}
            onChange={(e) => setSelectedCompany(e.target.value)}
            className="ms-2 fs-6"
          >
            <option value="">Select</option>
            {companies.map((x) => {
              return (
                <option value={x.id} key={x.id}>
                  {x.name}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="row row bg-white rounded py-2 mt-2">
        <div className="col-12 fs-4">
          {" "}
          Select date: from{" "}
          <input
            type="date"
            value={dates.fromDate}
            onChange={(e) => setDates({ ...dates, fromDate: e.target.value })}
            className="mx-3 fs-6"
          />
          to{" "}
          <input
            type="date"
            value={dates.toDate}
            onChange={(e) => setDates({ ...dates, toDate: e.target.value })}
            className="mx-3 fs-6"
          />
        </div>
      </div>
      <div className="row">
        <div className="col-12 text-end mt-2 ">
          <button
            className="btn btn-primary me-3"
            disabled={receiptLoading}
            onClick={() => {
              dispatch(
                getReceipts({
                  company: selectedCompany,
                  fromDate: dates.fromDate,
                  toDate: dates.toDate,
                })
              );
            }}
          >
            Show receipt
          </button>
        </div>
      </div>
      <div className="row mt-2 bg-light rounded">
        <div className="col-2 ">Order name: </div>
        <div className="col-2 ">Total Price: </div>
        <div className="col-2 ">Type: </div>
        <div className="col-2 ">Date: </div>
        <div className="col-2 ">Time: </div>
        <div className="col-2 ">Operator: </div>
        <hr className="mb-1" />
        {receiptLoading ? (
          <>
            <div className="col-12 text-center">
              <MySpinner />
            </div>
          </>
        ) : (
          receipt.map((x, index) => {
            return <SingleProduct data={x} key={index} />;
          })
        )}
      </div>
      <div className="row mt-2 bg-light rounded">
        <div className="col-4 fs-5">Total Sales: {totalSales}$</div>
        <div className="col-4 fs-5">Total Purchases : {totalPurchases}$</div>
        <div
          className={
            totalSales - totalPurchases < 0
              ? "col-4 fs-5 text-danger"
              : "col-4 fs-5 text-success"
          }
        >
          Balance : {balance}$
        </div>
      </div>
    </>
  );
};

const SingleProduct = ({ data }) => {
  const { name, date, time, to, from, total, operator } = data;
  const { info } = useSelector((store) => store.order);
  return (
    <>
      <div className="col-2 ">{name} </div>
      <div className="col-2 ">{total} </div>
      <div className="col-2 ">
        {info.accountID === from.accountID ? "Sale" : "Purchase"}{" "}
      </div>
      <div className="col-2 ">{date} </div>
      <div className="col-2 ">{time}</div>
      <div className="col-2 ">{operator}</div>
      <hr className="mb-1" />
    </>
  );
};

export default Receipts;
