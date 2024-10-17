import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Login } from "../../slices/OrdersSlice";
import { toast, ToastContainer } from "react-toastify";
import MySpinner from "../../components/MySpinner";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pin, setPin] = useState("");

  const dispatch = useDispatch();

  const { loginLoading } = useSelector((store) => store.order);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(Login({ email, password, pin }));
  };

  return (
    <>
      <ToastContainer />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <form
              onSubmit={handleSubmit}
              className="p-3 rounded mt-5"
              style={{ background: "#252422", color: "white" }}
            >
              <h2 className="text-center my-3">ProductManager Login</h2>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  CompanyID
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  placeholder="Enter name"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ maxWidth: "100%" }}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{ maxWidth: "100%" }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Pin
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="pin"
                  placeholder="Pin"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  required
                  style={{ maxWidth: "100%" }}
                />
              </div>
              <div className="col-12 text-center">
                <button
                  type="submit"
                  className="btn btn-light px-4 my-2"
                  disabled={loginLoading}
                >
                  {loginLoading ? <MySpinner /> : "Login"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
