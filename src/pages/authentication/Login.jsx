import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Input,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/actions/auth";
import Snackbar from "../../components/alert/SnackBar";
import "./style.scss";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoggedIn, loading, loginError, loginStatus } = useSelector(
    (state) => state.auth
  );
  const [statusValid, setstatusValid] = useState(false);

  const pending = loginStatus === "pending";
  if (pending) {
    !statusValid && setstatusValid(true);
  }
  const loginCompleted = loginStatus === "fulfilled" && statusValid;

  const submit = (e) => {
    e.preventDefault();
    let data = {};
    e.target.querySelectorAll("input").forEach((input) => {
      data[input.name] = input.value;
    });
    dispatch(login(data));
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

  return (
    <Box className="form-wrapper centered full-screen-height">
      <form className="form" onSubmit={submit}>
        <Snackbar
          isOpen={(statusValid && !!loginError) || loginCompleted}
          message={
            loginError || (loginCompleted && "Successfully Logged  in !")
          }
          severity={loginError ? "error" : "success"}
        />
        <Typography mb={3} component={"h1"} variant="body">
          Login
        </Typography>
        <Input
          className="form-control"
          type="email"
          name="email"
          required
          placeholder="Enter Email"
        />
        <Input
          className="form-control"
          type="password"
          name="password"
          required
          placeholder="Enter Password"
        />
        {loading ? (
          <Box my={2}>
            <CircularProgress size={30} />
          </Box>
        ) : (
          <>
            <Button className="form-btn" type="submit" variant="contained">
              Login
            </Button>

            <Link className="link" to="/register">
              Don't have an account ?
            </Link>
          </>
        )}
      </form>
    </Box>
  );
};

export default Login;
