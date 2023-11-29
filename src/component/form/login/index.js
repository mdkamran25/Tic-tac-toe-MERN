import React, { useEffect, useState } from "react";
import { userLoginApi } from "../../../api/user.api";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [input, setInputs] = useState({});
  const navigate = useNavigate();
  const onHandleChange = (e) => {
    const { name, value } = e.target;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const onLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await userLoginApi(input);
      if (response.status) {
        localStorage.setItem("accessToken", response.data);
        navigate("/");
        setInputs({});
      } else {
        toast.error(response.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
        toast.error(error.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      console.log(error.message);
    }
  };

  return (
    <div className="container">
      <div className="row g-0 d-flex justify-content-center">
        <div className="col-6 pt-5">
          <form onSubmit={onLogin}>
            <div className="mb-3">
              <label for="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={input.email || ""}
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                onChange={(e) => onHandleChange(e)}
              />
            </div>
            <div className="mb-3">
              <label for="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="text"
                name="password"
                value={input.password || ""}
                className="form-control"
                id="exampleInputPassword1"
                onChange={(e) => onHandleChange(e)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
