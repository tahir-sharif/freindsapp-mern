import React from "react";
import {
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import styled from "@emotion/styled";
import "./style.scss";

// const SizedAvatar = styled(Avatar)`
//   ${({ size, theme }) => `
//   ${console.log(theme)}
//     width: ${theme.spacing(size)}px;
//     height: ${theme.spacing(size)}px;
//   `};
// `;

const ProfileHeader = ({
  backCoverImage,
  profileImage,
  profileName,
  profileSubName,
  isOwner,
}) => {
  return (
    <Box>
      <Box className="user-profile">
        <Box className="profile-portion">
          {/* BackCover Image */}
          <Box className="back-img">
            {/* {backCoverImage && <img src={backCoverImage} />} */}
            <img src="https://cdn.pixabay.com/photo/2020/06/01/22/23/eye-5248678__340.jpg" />

            {isOwner && (
              <Button
                color="secondary"
                variant="contained"
                endIcon={<CameraAltIcon />}
                className="editBackImageIcon"
              >
                Edit Back Cover
              </Button>
            )}
          </Box>

          <Grid container className="profile-image">
            {/* DP of User */}
            <Grid sx={{ position: "relative" }} item xs={12} md={5}>
              <Box sx={{ width: 169, position: "relative" }}>
                <Avatar
                  className="profile-avatar"
                  src={profileImage ? profileImage : ""}
                />
                {isOwner && (
                  <IconButton className="editProfileIcon">
                    <CameraAltIcon />
                  </IconButton>
                )}
              </Box>
            </Grid>
            {/* Name and about */}
            <Grid item xs={12} md={5} className="profile-txt">
              <Typography
                className="profile-name"
                variant="h5"
                color={"secondary.50"}
              >
                {profileName}
              </Typography>
              <Typography color={"secondary.50"}>{profileSubName}</Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileHeader;
