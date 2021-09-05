import React, { useState } from "react";
import Email from "@material-ui/icons/Email";
import Phone from "@material-ui/icons/Phone";
import SupervisedUserCircleSharp from "@material-ui/icons/SupervisedUserCircleSharp";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import Button from "@material-ui/core/Button";
import { toast } from "react-toastify";
import { Link, useHistory } from "react-router-dom";
import axiosinstance from "../config/axios";

function Register() {
  const history = useHistory();

  const [data, setData] = useState({
    name: "",
    email: "",
    number: "",
    password: "",
  });


  const InputEvent = (event) => {
    const { name, value } = event.target;
    setData((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };


  const registerData = async (fdata) => {
    try {
      const { data } = await axiosinstance.post('/auth/register', fdata);
      toast.success(data.message);
      history.push('/')
    } catch (error) {
      if(error.response.data.error){
        toast.error(error.response.data.error.message);
      }
    }
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!data.email || !data.password || !data.number || !data.name) {
      toast.error("All Fields reqired");
    } else {
      registerData(data);
    }
  };

  return (
    <>
      <section id="login-page">
        <div className="login-card">
          <h1>Register here</h1>
          {/* <img src={Logo} className="img-fluid logo" alt="hardcipher logo" /> */}
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label className="input-label" htmlFor="InputEmail">
                Enter name<span>*</span>
              </label>
              <div className="input-field">
                <div className="icon">
                  <SupervisedUserCircleSharp />
                </div>
                <input
                  type="text"
                  name="name"
                  value={data.name}
                  onChange={InputEvent}
                  className="form-control"
                  id="InputName"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="input-label" htmlFor="InputEmail">
                Email address<span>*</span>
              </label>
              <div className="input-field">
                <div className="icon">
                  <Email />
                </div>
                <input
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={InputEvent}
                  className="form-control"
                  id="InputEmail"
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label className="input-label" htmlFor="InputEmail">
                Enter Number<span>*</span>
              </label>
              <div className="input-field">
                <div className="icon">
                  <Phone />
                </div>
                <input
                  type="number"
                  name="number"
                  value={data.nuber}
                  onChange={InputEvent}
                  className="form-control"
                  id="InputNumber"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="input-label" htmlFor="InputPassword">
                Password<span>*</span>
              </label>
              <div className="input-field">
                <div className="icon">
                  <VpnKeyIcon />
                </div>
                <input
                  type="password"
                  name="password"
                  value={data.password}
                  onChange={InputEvent}
                  className="form-control"
                  id="InputPassword"
                  required
                />
              </div>
            </div>
            <Button type="submit" className="btn-submit">
              Submit
            </Button>
          </form>
          <Link to="/" className="page-title">Login</Link>
        </div>
      </section>
    </>
  );
}

export default Register;
