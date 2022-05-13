import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Input,
  Grid,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from "@mui/material";
import "./settings.scss";
import { useDispatch, useSelector } from "react-redux";
import { getUserById, updateUser } from "../../store/actions/user";
import { useNavigate } from "react-router-dom";
import { clearUserUpdateState } from "../../store/reducers/users";
import { getUserByToken } from "../../store/actions/auth";

const Settings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { status, error, loading } = useSelector(
    (state) => state.user.updateUser
  );
  const [userData, setUserData] = useState(user);
  const [isChanged, setisChanged] = useState(false);

  useEffect(() => {
    setUserData(user);
  }, [user]);

  const inputHandler = (e) => {
    const { name, value, checked } = e.target;
    if (e.target.type === "checkbox") {
      setUserData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setUserData((prev) => ({ ...prev, [name]: value }));
    }
    setisChanged(true);
  };

  useEffect(() => {
    if (isChanged && status === "fulfilled") {
      setisChanged(false);
      dispatch(clearUserUpdateState());
      dispatch(getUserByToken(userData._id));
      navigate("/");
    }
  }, [status]);

  const submitHandler = () => {
    dispatch(updateUser(userData));
  };

  return (
    <Box
      sx={{
        width: 0.7,
        margin: "0 auto",
        background: "white",
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      <Typography component="h1" variant="body1">
        Settings
      </Typography>
      <Box sx={{ marginTop: "70px" }}>
        <Grid container sx={{ pl: 8, my: 5, textAlign: "left" }}>
          <Grid xs={2} item>
            Name
          </Grid>
          <Grid xs={4} item sx={{ textAlign: "left" }}>
            <Input
              name="name"
              value={userData.name}
              onChange={inputHandler}
              fullWidth
            />
          </Grid>
        </Grid>

        <Grid container sx={{ pl: 8, my: 5, textAlign: "left" }}>
          <Grid xs={2} item>
            Email
          </Grid>
          <Grid xs={4} item sx={{ textAlign: "left" }}>
            <Input
              name="email"
              value={userData.email}
              onChange={inputHandler}
              fullWidth
            />
          </Grid>
        </Grid>

        <Grid container sx={{ pl: 8, my: 5, textAlign: "left" }}>
          <Grid xs={2} item>
            Gender
          </Grid>
          <Grid xs={4} item sx={{ textAlign: "left" }}>
            <RadioGroup row name="gender" required onChange={inputHandler}>
              <FormControlLabel
                value={"male"}
                control={
                  <Radio
                    checked={userData.gender === "male"}
                    size="small"
                    required
                  />
                }
                label="Male"
              />
              <FormControlLabel
                value={"female"}
                control={
                  <Radio
                    checked={userData.gender === "female"}
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
          </Grid>
        </Grid>

        <Grid container sx={{ pl: 8, my: 5, textAlign: "left" }}>
          <Grid xs={2} item>
            Date Of Birth
          </Grid>
          <Grid xs={4} item sx={{ textAlign: "left" }}>
            <Input
              name="dob"
              value={userData.dob}
              onChange={inputHandler}
              type="date"
            />
          </Grid>
        </Grid>
      </Box>
      <Grid container sx={{ pl: 8, mt: 10, textAlign: "left" }}>
        <Grid xs={9} item></Grid>
        <Grid xs={3} item sx={{ textAlign: "left" }}>
          <Button>Cancel</Button>
          <Button
            onClick={submitHandler}
            variant="contained"
            disabled={!isChanged || loading}
          >
            {loading ? "Saving..." : "Submit"}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Settings;
