import React, { useState } from "react";
import {
  nameValidation,
  emailValidation,
  passwordValidation,
  phoneValidation,
  confirmPasswordValidation,
} from "../../../validation";
import { userSignupApi } from "../../../api/user.api";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialValues = {
  name: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
}

const SignUp = () => {
  const navigate = useNavigate();
  const [input, setInputs] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const onHandleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
    
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await userSignupApi(input);
      if(response.status){
        localStorage.setItem('accessToken', response.data);
        navigate('/')
        setInputs(initialValues);
      }
      else{
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
      
    } catch (err) {
      setErrors({ ...errors, [err.name]: err.message });
    }
  };

  return (
    <div>
      <div className="container">
        <div className="row g-0 d-flex justify-content-center">
          <div className="col-11 col-sm-8 col-md-6 pt-5">
            <form method="POST" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label for="exampleInputName" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => onHandleChange(e)}
                  id="exampleInputName"
                  value={input.name || ""}
                  name="name"
                />
                 {errors.name && <div className="text-danger">{errors.name}</div>}
              </div>
              <div className="mb-3">
                <label for="exampleInputNumber" className="form-label">
                  Phone No.
                </label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => onHandleChange(e)}
                  id="exampleInputPhone"
                  value={input.phone || ""}
                  name="phone"
                />
                {errors.phone && <div className="text-danger">{errors.phone}</div>}
              </div>
              <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">
                  Email address
                </label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => onHandleChange(e)}
                  id="exampleInputEmail1"
                  value={input.email || ""}
                  name="email"
                  aria-describedby="emailHelp"
                />
                {errors.email && <div className="text-danger">{errors.email}</div>}
              </div>
              <div className="mb-3">
                <label for="exampleInputPassword" className="form-label">
                  Password
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={input.password || ""}
                  name="password"
                  onChange={(e) => onHandleChange(e)}
                  id="exampleInputPassword"
                />
                {errors.password && <div className="text-danger">{errors.password}</div>}
              </div>
              <div className="mb-3">
                <label for="exampleInputConfirmPassword" className="form-label">
                  Confirm Password
                </label>
                <input
                  type="text"
                  name="confirmPassword"
                  value={input.confirmPassword || ''}
                  onChange={(e) => onHandleChange(e)}
                  className="form-control"
                  id="exampleInputConfirmPassword"
                />
                {errors.confirmPassword && <div className="text-danger">{errors.confirmPassword}</div>}
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
