import React, { useState } from "react";
import { Avatar, Button, Card, CardActions, CardHeader } from "@mui/material";
import imageIcon from "../../../assets/images/icons/image.png";
import smileIcon from "../../../assets/images/icons/smiling-face.png";
import videoIcon from "../../../assets/images/icons/video-camera.png";
import PostDialog from "./PostDialog";
import { getFirstName } from "../../../logics/getFirstName";
import { useSelector } from "react-redux";

const UploadPost = () => {
  const { user } = useSelector((state) => state.auth);

  // For Dialog box
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const avatarStyle = { width: "18px", height: "18px" };
  const btnSx = {
    fontSize: 10,
    alignItems: "center",
  };
  return (
    <Card className="card">
      <PostDialog
        open={open}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
      />
      <CardHeader
        avatar={<Avatar src={user && user.profileImageUrl}></Avatar>}
        title={
          <Button
            color="secondary"
            onClick={handleClickOpen}
            sx={{
              ...btnSx,
              justifyContent: "flex-start",
              background: "#eeeeee",
            }}
            fullWidth
          >
            What's on your mind {user && getFirstName(user.name)} ?
          </Button>
        }
      />
      <CardActions>
        <Button
          sx={btnSx}
          startIcon={<Avatar sx={avatarStyle} src={videoIcon} />}
          color="secondary"
          fullWidth
        >
          live video
        </Button>
        <Button
          sx={btnSx}
          onClick={handleClickOpen}
          startIcon={<Avatar sx={avatarStyle} src={imageIcon} />}
          color="secondary"
          fullWidth
        >
          Photo/video
        </Button>
        <Button
          sx={btnSx}
          startIcon={<Avatar sx={avatarStyle} src={smileIcon} />}
          color="secondary"
          fullWidth
        >
          feeling/activity
        </Button>
      </CardActions>
    </Card>
  );
};

export default UploadPost;
