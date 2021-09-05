import React, { useState, useEffect } from "react";
import Logo from "../assets/logo.png";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
import { login } from "../store/action/auth.action";
import { Link, useHistory } from "react-router-dom";

function Login(props) {
  const dispatch = useDispatch();
  const history = useHistory();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const { loginerror, token } = useSelector(state => state.auth)

  useEffect(() => {
    if (loginerror.loginerror !== "") {
      toast.error(loginerror.message);
    }
    if (token) {
      // window.location.href = "/dashboard";
      history.push('/dashboard');
    }
    // eslint-disable-next-line
  }, [loginerror, token]);

  const InputEvent = (event) => {
    const { name, value } = event.target;

    setData((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!data.email || !data.password) {
      toast.error("Email and password must be provided");
    } else {
      dispatch(login(data));
    }
  };

  return (
    <>
      <section id="login-page">
        <div className="login-card">
        <h1>Login here</h1>
          {/* <img src={Logo} className="img-fluid logo" alt="hardcipher logo" /> */}
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label className="input-label" htmlFor="InputEmail">
                Email address<span>*</span>
              </label>
              <div className="input-field">
                <div className="icon">
                  <PermIdentityIcon />
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
          <Link to="/register" className="page-title">Registration</Link>
        </div>
      </section>
    </>
  );
}

export default Login;
