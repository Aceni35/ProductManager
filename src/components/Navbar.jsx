import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { getInfo } from "../slices/OrdersSlice";
import MySpinner from "./MySpinner";
import LogOutModal from "./LogOutModal";

const names = [
  { name: "Orders", link: "/" },
  { name: "Management", link: "/management" },
  { name: "Analytics", link: "/analytics" },
];

const Navbar = () => {
  const { info } = useSelector((store) => store.order);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (info != null) return;
    dispatch(getInfo());
  }, []);
  return (
    <>
      <LogOutModal show={show} setShow={setShow} />
      <nav>
        <ul className="nav1 p-0">
          <li className="px-2 d-flex w-25" onClick={() => setShow(true)}>
            <CgProfile size={30} className="me-2" />{" "}
            {info === null ? <MySpinner /> : info.name}
          </li>
          {names.map((el, index) => {
            return (
              <li
                className="nav-el text1"
                key={index}
                onClick={() => navigate(el.link)}
              >
                {el.name}
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
