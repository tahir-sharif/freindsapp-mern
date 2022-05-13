import React from "react";
import Navbar from "../Navbar";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/system";
import AppLoader from "../components/loaders/AppLoader";
import { useSelector } from "react-redux";

const MainLayout = () => {
  const loading = useSelector((state) => state.auth.getUserLoading);

  return (
    <>
      {loading ? (
        <>
          <AppLoader />
        </>
      ) : (
        <>
          <Navbar />

          <Box
            sx={{
              width: "98%",
              margin: "0 auto",
              marginTop: "80px",
            }}
          >
            <Outlet />
          </Box>
        </>
      )}
    </>
  );
};

export default MainLayout;
