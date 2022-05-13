import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
  Divider,
  Button,
  Box,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IoIosShareAlt } from "react-icons/io";
import { FaBirthdayCake } from "react-icons/fa";
import { AiFillLike, AiOutlineLike, AiOutlineMessage } from "react-icons/ai";
import { convertDate, getFormattedDate } from "../../logics/convertDate";
import { apiUrl } from "../../api/api";

const Post = ({ postData }) => {
  console.log(postData);

  const { postImage, title, liked, createdAt, postedBy, _id, type, dob } =
    postData;

  const navigate = useNavigate();

  const [like, setlike] = useState(liked);

  const likeHandler = () => {
    setlike(!like);
  };

  const btnSx = {
    fontSize: 12,
    alignItems: "center",
  };

  return (
    <Card className="card" id={_id}>
      <CardHeader
        avatar={<Avatar src={postedBy.profileImage} aria-label="recipe" />}
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        titleTypographyProps={{
          onClick: () => {
            navigate(`user/${postedBy._id}`);
          },
          sx: {
            cursor: "pointer",
            display: "inline-block",
            "&:hover": {
              textDecoration: "underline",
            },
          },
        }}
        title={postedBy.name}
        subheader={
          type === "dob" ? dob.dob : convertDate(new Date(createdAt).getTime())
        }
      />
      <CardContent>
        {type === "dob" ? (
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "40px",
              }}
            >
              <FaBirthdayCake color="#00b6ff" fontSize={45} />
            </Box>
            <Typography
              fontSize={!postImage && 18}
              variant="body2"
              color="text.secondary"
            >
              Born On {getFormattedDate(dob.dob)}
            </Typography>
          </>
        ) : (
          <Typography
            fontSize={!postImage && 18}
            variant="body2"
            color="text.secondary"
          >
            {title}
          </Typography>
        )}
      </CardContent>
      {postImage && (
        <CardMedia
          sx={{ cursor: "pointer" }}
          component="img"
          height="500px"
          image={postImage}
          alt="Posted Picture"
        />
      )}
      <Divider sx={{ mx: 1, mt: 1 }} />
      <CardActions>
        {like ? (
          <Button
            sx={btnSx}
            onClick={likeHandler}
            fullWidth
            color="primary"
            startIcon={<AiFillLike size={16} />}
          >
            Liked
          </Button>
        ) : (
          <Button
            sx={btnSx}
            onClick={likeHandler}
            fullWidth
            color="secondary"
            startIcon={<AiOutlineLike />}
          >
            Like
          </Button>
        )}
        <Button
          sx={btnSx}
          fullWidth
          color="secondary"
          startIcon={<AiOutlineMessage />}
        >
          Commment
        </Button>
        <Button
          sx={btnSx}
          fullWidth
          color="secondary"
          startIcon={<IoIosShareAlt />}
        >
          Share
        </Button>
      </CardActions>
    </Card>
  );
};
export default Post;
