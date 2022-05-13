import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Box,
  Button,
  Dialog,
  DialogTitle,
  IconButton,
  CardMedia,
  CircularProgress,
  Typography,
  Chip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ImageIcon from "../../../assets/images/icons/image.png";
import { getPostsById, uploadPost } from "../../../store/actions/post";
import { resetUpload } from "../../../store/reducers/posts";
import CustomizedSnackbars from "../../alert/SnackBar";
import { useNavigate, useParams } from "react-router-dom";
import { uploadBytesResumable, ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../../firebase";
import "../style.scss";
// Progess Component
function CircularProgressWithLabel(props) {
  return (
    <Box
      sx={{
        position: "relative",
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress size={65} variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          fontSize={20}
          variant="caption"
          component="div"
          color="text.secondary"
        >
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}
// Title Component
const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;
  return (
    <DialogTitle sx={{ m: 0, p: 2, textAlign: "center" }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

// Main Dialog
const PostDialog = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useParams();
  const { user } = useSelector((state) => state.auth);

  const { status, loading, error } = useSelector(
    (state) => state.posts.uploadPost
  );

  useEffect(() => {
    if (status === "fulfilled") {
      handleClose();
      dispatch(resetUpload());
      if (user._id === _id) {
        dispatch(getPostsById(_id));
      } else {
        navigate(`/user/${user._id}`);
      }
    }
  }, [status]);

  const [inputData, setInputData] = useState({
    title: "",
    postImage: null,
  });
  const [previewImage, setpreviewImage] = useState(null); //to preview an image
  const [uploading, setuploading] = useState(loading);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setuploading(loading);
  }, [loading]);

  // hidden upload button to click
  const uploadRef = useRef(null);

  // adding image to state
  const addImageToState = (e) => {
    const file = e.target.files[0];
    const importedImage = URL.createObjectURL(file);
    setInputData((prev) => ({ ...prev, postImage: file }));
    setpreviewImage(importedImage);
  };

  // removing image from state
  const removeImage = () => {
    setInputData((prev) => ({ ...prev, postImage: null }));
    setpreviewImage(null);
  };

  //  importing image from device
  const importImage = () => {
    uploadRef.current.click();
  };

  // text handler
  const inputHanlder = (e) => {
    setInputData((prev) => ({ ...prev, title: e.target.value }));
  };

  // Submit
  const handleSubmit = () => {
    if (inputData.postImage || inputData.title) {
      const formData = {
        postImage: "",
        title: inputData.title,
      };

      // uploading to mongoDB
      const uploadToDatabase = (data) => {
        dispatch(uploadPost(data));
        setuploading(true);
        setProgress(100);
      };

      // if image then also upload to storage
      if (inputData.postImage) {
        const fileName = Date.now() + inputData.postImage.name;
        const storageRef = ref(storage, `/images/${fileName}`);
        const uploadTask = uploadBytesResumable(
          storageRef,
          inputData.postImage
        );
        setuploading(true);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const uploaded = Math.floor(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress(uploaded);
          },
          (e) => {
            console.log(e);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              formData.postImage = url;
              uploadToDatabase(formData);
            });
          }
        );
      } else {
        uploadToDatabase(formData);
      }
    } else {
      alert("you must fill one of these fields !");
    }
  };

  // Conditional close
  const doClose = () => {
    !uploading && handleClose();
  };

  return (
    <Dialog
      onClose={doClose}
      aria-labelledby="customized-dialog-title"
      sx={{ overflow: "scroll" }}
      classes={{ paper: "dialogPaper" }}
      fullWidth
      open={open}
    >
      <CustomizedSnackbars severity="error" message={error} isOpen={!!error} />

      <BootstrapDialogTitle id="customized-dialog-title" onClose={doClose}>
        Create Post
      </BootstrapDialogTitle>

      <Card>
        <CardHeader
          avatar={<Avatar src={user && user.profileImageUrl} />}
          title={user && user.name}
          subheader={<Chip label="Friends app" size="small" />}
        />

        {uploading ? (
          <Box
            sx={{
              display: "inline-block",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              margin: "50px 0",
            }}
          >
            <CircularProgressWithLabel size={100} value={progress} />
            <Typography sx={{ marginTop: "30px" }} fontSize={26}>
              Uploading Post...
            </Typography>
          </Box>
        ) : (
          <Box sx={{ overflow: "auto" }}>
            <CardContent>
              <textarea
                value={inputData.title}
                onChange={inputHanlder}
                className={`textarea ${previewImage && "textareaCompressed"}`}
                autoFocus
                placeholder={`What's on your mind ${user && user.name} ?`}
              />
            </CardContent>
            {previewImage ? (
              <CardContent className="card-media">
                <IconButton
                  onClick={removeImage}
                  variant="contained"
                  className="close-icon"
                >
                  x
                </IconButton>
                <CardMedia
                  component="img"
                  height="auto"
                  image={previewImage}
                  alt="image"
                />
              </CardContent>
            ) : (
              <CardActions>
                <Box
                  sx={{
                    width: "100%",
                    border: "2px solid #e1e1e1",
                    borderRadius: "8px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Button onClick={importImage}>Add to your post</Button>
                  <Box>
                    <Button onClick={importImage}>
                      <Avatar src={ImageIcon} />
                    </Button>
                  </Box>
                </Box>
              </CardActions>
            )}
          </Box>
        )}

        <CardActions>
          <Button
            disabled={uploading}
            fullWidth={true}
            variant="contained"
            onClick={handleSubmit}
          >
            {uploading ? "Posting..." : "Post"}
          </Button>
        </CardActions>
      </Card>
      {/* Input file upload */}
      <input
        accept="image/*"
        onClick={(e) => (e.target.value = null)}
        ref={uploadRef}
        onChange={addImageToState}
        type="file"
        hidden
      />
    </Dialog>
  );
};
export default PostDialog;
