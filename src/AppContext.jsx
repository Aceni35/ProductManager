import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import {
  acceptOrder,
  addOrder,
  cancelOrder,
  rejectOrder,
} from "./slices/OrdersSlice";
import { toast } from "react-toastify";

const SocketContext = React.createContext();
export const useSocketContext = () => useContext(SocketContext);

const AppContext = ({ children }) => {
  const { info } = useSelector((store) => store.order);
  const [socket1, setSocket] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (info === null || socket1 != null) return;
    const socket = io("http://localhost:3000", {
      query: {
        id: info.accountID,
      },
    });
    socket.on("new-order", (order) => {
      dispatch(addOrder(order));
      toast.info(`New order from ${order.from.name}`);
    });
    socket.on("order-canceled", (orderID) => {
      dispatch(cancelOrder(orderID));
    });
    socket.on("order-accepted", (orderID) => {
      dispatch(acceptOrder(orderID));
    });
    socket.on("order-rejected", (orderID) => {
      dispatch(rejectOrder(orderID));
    });
    setSocket(socket);
    return () => {
      if (socket1 != null) {
        socket.disconnect();
      }
    };
  }, [info]);
  return (
    <SocketContext.Provider value={{ socket: socket1 }}>
      {children}
    </SocketContext.Provider>
  );
};

export default AppContext;
