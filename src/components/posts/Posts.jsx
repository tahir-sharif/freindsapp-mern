import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";
import PostCard from "./PostCard";

const Posts = ({ postsData, loading }) => {
  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <Box className="half-width">
          {postsData.length ? (
            <>
              {postsData.map((postData, i) => {
                return <PostCard postData={postData} key={i} />;
              })}
            </>
          ) : (
            <>No Posts To See here !</>
          )}
        </Box>
      )}
    </>
  );
};

export default Posts;
