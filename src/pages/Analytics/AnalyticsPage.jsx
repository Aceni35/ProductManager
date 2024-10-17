import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import ReturnComponent from "./ReturnComponent";
import { useSelector } from "react-redux";

const options = ["Calendar", "Analytics", "Receipts"];

const AnalyticsPage = () => {
  const [selected, setSelected] = useState("Calendar");
  const { access } = useSelector((store) => store.analytics);
  if (access === false) {
    return (
      <>
        <Navbar />
        <div className="row">
          <div className="col-12 text-center fs-3 mt-3">
            You do not have access to this page ...
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container-sm">
        <div
          className="row fs-4 rounded"
          style={{ background: "#FFFFFF", overflow: "hidden" }}
        >
          {options.map((el, index) => {
            let styles = {};
            if (el === selected) {
              styles = { color: "white", background: "#444444" };
            }
            return (
              <div
                key={index}
                className="col-4 text-center p-2"
                style={{ ...styles, cursor: "pointer", transition: "all 0.4s" }}
                onClick={() => {
                  setSelected(el);
                }}
              >
                {el}{" "}
              </div>
            );
          })}
        </div>
        <ReturnComponent selected={selected} />
      </div>
    </>
  );
};

export default AnalyticsPage;
