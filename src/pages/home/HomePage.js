import React, { useEffect } from "react";
import { Box } from "@mui/material";
import UploadPost from "../../components/posts/uploadPost/UploadPost";
import Posts from "../../components/posts/Posts";
import { useDispatch, useSelector } from "react-redux";
import { getAllposts } from "../../store/actions/post";
const HomePage = () => {
  const dispatch = useDispatch();

  const { postsData, loading } = useSelector((state) => state.posts.getposts);

  useEffect(() => {
    dispatch(getAllposts());
  }, [dispatch]);

  return (
    <Box className="half-width">
      <UploadPost />
      <Posts postsData={postsData} loading={loading} />
    </Box>
  );
};

export default HomePage;
