import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Box } from "@mui/system";
import ProfileHeader from "../../components/profile/ProfileHeader";
import Posts from "../../components/posts/Posts";
import UploadPost from "../../components/posts/uploadPost/UploadPost";
import { useDispatch } from "react-redux";
import MiniLoader from "../../components/loaders/MiniLoader";
import { getPostsById } from "../../store/actions/post";
import { getUserById } from "../../store/actions/user";
import { Typography } from "@mui/material";

const UsersProfile = () => {
  const { _id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserById(_id));
  }, [_id]);

  const { postsData, loading } = useSelector(
    (state) => state.posts.getPostsById
  );

  // Logged in user
  const { user } = useSelector((state) => state.auth);
  // profile user
  const data = useSelector((state) => state.user.getUserById);
  // Getting user
  const getUser = data.user;
  const getUserStatus = data.status;
  const getUserLoading = data.loading;
  const getUserError = data.error;

  useEffect(() => {
    if (getUserStatus === "fulfilled") {
      dispatch(getPostsById(_id));
    }
  }, [getUserStatus]);

  const isOwner = user._id === _id;

  return (
    <>
      {getUserLoading ? (
        <Box className="pageCentered">
          <MiniLoader />
        </Box>
      ) : getUserError ? (
        <Box className="pageCentered">
          <Typography className="bigError">{getUserError}</Typography>
        </Box>
      ) : (
        <>
          <ProfileHeader
            backCoverImage={getUser.backCoverImage}
            profileName={getUser.name}
            profileImage={getUser.profileImageUrl}
            profileSubName={"friend"}
            isOwner={isOwner}
          />
          <Box className="half-width">
            {isOwner && <UploadPost />}
            {loading ? (
              <MiniLoader />
            ) : (
              <>
                <Posts postsData={postsData} user={getUser} />
              </>
            )}
          </Box>
        </>
      )}
    </>
  );
};

export default UsersProfile;
