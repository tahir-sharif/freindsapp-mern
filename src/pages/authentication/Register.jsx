import React, { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  FormControlLabel,
  Input,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { register, login } from "../../store/actions/auth";
import { resetState } from "../../store/reducers/auth";
import Snackbar from "../../components/alert/SnackBar";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";

const Register = () => {
  const { regStatus, loading, regError } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [data, setdata] = useState();
  const dispatch = useDispatch();

  const submit = (e) => {
    e.preventDefault();
    let data = {};
    e.target.querySelectorAll("input").forEach((input) => {
      data[input.name] = input.value;
    });
    setdata(data);
    dispatch(register(data));
  };

  const requestCompleted = regStatus === "fulfilled";
  if (requestCompleted) {
    dispatch(resetState());
    dispatch(login({ email: data.email, password: data.password }));
    navigate("/freindsapp-mern/");
  }

  const disableFutureDate = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();
    return yyyy + "-" + mm + "-" + dd;
  };

  return (
    <Box className="form-wrapper centered full-screen-height">
      <form className="form" onSubmit={submit}>
        <Snackbar
          isOpen={regError}
          message={regError}
          severity={regError ? "error" : "success"}
        />
        <Typography mb={3} component={"h1"} variant="body">
          Register Your Self
        </Typography>
        <Typography mb={3}>It's Quick and easy !</Typography>
        <Input
          className="form-control"
          type="text"
          name="name"
          required
          placeholder="Your Display Name"
        />
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
        <Typography fontSize={10} textAlign={"left"}>
          Date Of Birth
        </Typography>
        <Input
          className="form-control"
          type="date"
          name="dob"
          required
          inputProps={{ max: disableFutureDate() }}
        />
        <Typography fontSize={10} textAlign={"left"}>
          Gender
        </Typography>
        <RadioGroup row name="gender" required>
          <FormControlLabel
            value="male"
            control={<Radio size="small" required />}
            label="Male"
          />
          <FormControlLabel
            value="female"
            control={
              <Radio
                required
                size="small"
                sx={{
                  "&.Mui-checked": {
                    color: "#ff00d0",
                  },
                }}
              />
            }
            label="Female"
          />
        </RadioGroup>

        {loading ? (
          <Box my={2}>
            <CircularProgress size={30} />
          </Box>
        ) : (
          <>
            <Button className=" form-btn" type="submit" variant="contained">
              Sign Up
            </Button>
            <Link className="link" to="/login">
              Already have an account ? Login
            </Link>
          </>
        )}
      </form>
    </Box>
  );
};

export default Register;
