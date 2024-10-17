import React, { useState, useEffect } from "react";
import DateCalendarValue from "../../components/Calendar";
import PendingOrders from "../Home/PendingOrders";
import MyModal from "../../components/MyModal";
import { Buttons, ModalBody } from "../Home/HomePage";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { getSingleDay } from "../../slices/AnalyticsSlice";
import MySpinner from "../../components/MySpinner";

const Calendar = () => {
  const dispatch = useDispatch();
  const [showDetails, setShowDetails] = useState(false);
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;
  const [value, setValue] = useState(dayjs(formattedDate));
  useEffect(() => {
    dispatch(getSingleDay({ date: value }));
  }, [value]);
  const { calendarLoading, calendarOrders, access } = useSelector(
    (store) => store.analytics
  );
  if (access === null) {
    return (
      <>
        <div className="row">
          <div className="col-12 text-center fs-3 mt-3">
            <MySpinner />
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <MyModal
        show={showDetails}
        setShow={setShowDetails}
        Body={<ModalBody />}
        title={"Order Details"}
        size={"xl"}
        Buttons={<Buttons setShow={setShowDetails} />}
      />
      <div className="row bg-white rounded-top mt-2">
        <div className="col-12 fs-5 mt-2 ms-3">
          Please select day you want to view :
        </div>
        <div className="col-12 d-flex justify-content-center">
          <DateCalendarValue value={value} setValue={setValue} />
        </div>
        <hr />
      </div>
      {calendarLoading ? (
        <>
          {" "}
          <div className="row">
            <div className="col-12 mt-3 text-center">
              <MySpinner />
            </div>
          </div>
        </>
      ) : (
        <PendingOrders
          name={"Completed Orders"}
          showDetails={setShowDetails}
          orders={calendarOrders}
        />
      )}
    </>
  );
};

export default Calendar;
