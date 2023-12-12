/* eslint-disable no-unused-vars */
import { ChatBubbleOutlineOutlined, ShareOutlined } from "@mui/icons-material";
import SendIcon from "@mui/icons-material/Send";
import {
  Box,
  Button,
  Divider,
  IconButton,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import DialogMessage from "components/DialogMessage";

import FriendAdmin from "components/FriendAdmin";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import UserImage from "components/UserImage";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";
import { useNavigate, useParams } from "react-router-dom";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const AdminViewPostContent = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 900px");

  const { postId } = useParams("");
  const [postData, setPostData] = useState({});

  const [isComments, setIsComments] = useState(false);
  const [reviewUsers, setReviewUsers] = useState({});
  const [averageRating, setAverageRating] = useState(null);
  const [commentUsers, setCommentUsers] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const loggedInUserPicturePath = useSelector(
    (state) => state.user.picturePath
  );

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [viewComment, setViewComment] = useState(false);

  const [openMissingBothDialog, setOpenMissingBothDialog] = useState(false);
  const [openMissingRateDialog, setOpenMissingRateDialog] = useState(false);
  const [openMissingCommentDialog, setOpenMissingCommentDialog] =
    useState(false);

  const [visibleComments, setVisibleComments] = useState(5); // Initial number of comments to display
  const [allCommentsLoaded, setAllCommentsLoaded] = useState(false);

  const [visibleReviews, setVisibleReviews] = useState(5); // Initial number of reviews to display
  const [allReviewsLoaded, setAllReviewsLoaded] = useState(false);

  const [fetchStatus, setFetchStatus] = useState(null);

  const [open, setOpen] = useState(false);

  const openLightbox = () => {
    setOpen(true);
  };

  const closeLightbox = () => {
    setOpen(false);
  };

  const slides = [
    {
      src: `http://localhost:3001/assets/${postData.postPicturePath}`,
      alt: "user",
      width: 3840,
      height: 2560,
    },
    // Add more slides if you have multiple images
  ];

  const loadMoreReviews = () => {
    const remainingReviews = reviewUsers.length - visibleReviews;
    const loadCount = remainingReviews > 5 ? 5 : remainingReviews;
    setVisibleReviews(visibleReviews + loadCount);

    // Check if all reviews have been loaded
    if (visibleReviews + loadCount === reviewUsers.length) {
      setAllReviewsLoaded(true);
    }
  };

  const hideMoreReviews = () => {
    setVisibleReviews(5);
    setAllReviewsLoaded(false); // Reset the state for all reviews loaded
  };

  const loadMoreComments = () => {
    const remainingComments = commentUsers.length - visibleComments;
    const loadCount = remainingComments > 5 ? 5 : remainingComments;
    setVisibleComments(visibleComments + loadCount);

    // Check if all comments have been loaded
    if (visibleComments + loadCount === commentUsers.length) {
      setAllCommentsLoaded(true);
    }
  };

  // Function to hide additional comments and show the initial set of comments
  const hideMoreComments = () => {
    setVisibleComments(5);
    setAllCommentsLoaded(false); // Reset the state for all comments loaded
  };

  const getPost = async () => {
    const response = await fetch(`http://localhost:3001/posts/${postId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();
    return data;
  };

  const getUser = async (userId) => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();
    return data;
  };

  const fetchPostAndUser = async () => {
    try {
      const post = await getPost(); // Assuming getPost() retrieves post data
      const user = await getUser(post.userId); // Assuming getUser() retrieves user data based on post's userId

      // Create a new array by merging user and post information
      const mergedList = {
        name: `${user.firstName} ${user.lastName}`,
        userId: user._id,
        postId: post._id,
        userPicturePath: user.picturePath,
        postPicturePath: post.picturePath,
        location: user.location,
        description: post.description,
        tags: post.tags,
        comments: post.comments,
      };

      const commentsData = mergedList.comments.map(async (comment) => {
        const userResponse = await fetch(
          `http://localhost:3001/users/${comment.userId}`, // Assuming this is your user endpoint
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const userData = await userResponse.json();

        return {
          userId: comment.userId,
          comment: comment.commentText,
          picturePath: userData.picturePath,
          name: userData.firstName + " " + userData.lastName, // Include user data in the review object
        };
      });

      // Wait for all user data fetches to complete
      const commentsWithData = await Promise.all(commentsData);

      setCommentUsers(commentsWithData);
      setPostData(mergedList);
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  };

  const getReviewForPost = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/posts/${postId}/reviews`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await response.json();
      if (response.status === 404) {
        setFetchStatus("Post Not Found");
        return; // Stop execution if the post is not found
      }
      const reviewsData = data.map(async (review) => {
        const userResponse = await fetch(
          `http://localhost:3001/users/${review.userId}`, // Assuming this is your user endpoint
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const userData = await userResponse.json();

        return {
          userId: review.userId,
          rating: review.rating,
          comment: review.comment,
          postId: review.postId,
          picturePath: userData.picturePath,
          name: userData.firstName + " " + userData.lastName, // Include user data in the review object
        };
      });

      // Wait for all user data fetches to complete
      const reviewsWithData = await Promise.all(reviewsData);

      setReviewUsers(reviewsWithData);
    } catch (error) {
      console.error("Error reading reviews:", error);
    }
  };

  const addReview = async (comment, rate) => {
    try {
      const response = await fetch(`http://localhost:3001/posts/addReview`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: loggedInUserId,
          comment: comment,
          rating: rate,
          postId: postId,
        }),
      });

      if (response.ok) {
        const updatedPost = await response.json();
        dispatch(setPost({ post: updatedPost }));
        getReviewForPost(postId);
        setAllReviewsLoaded(false);
      } else {
        console.error("Error adding review:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  const addComment = async (commentText) => {
    try {
      const response = await fetch(
        `http://localhost:3001/posts/addComment/${postId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: loggedInUserId,
            commentText: commentText,
          }),
        }
      );

      if (response.ok) {
        const updatedPost = await response.json();
        dispatch(setPost({ post: updatedPost }));
        // Refresh comments after adding a new comment
        fetchPostAndUser();
        setAllCommentsLoaded(false);
      } else {
        console.error("Error adding comment:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleToggleReviews = () => {
    if (viewComment) {
      setViewComment(!viewComment);
    }
    setIsComments(!isComments);
    if (!isComments) {
      getReviewForPost(postId);
    }
  };

  const handleToggleComments = () => {
    if (isComments) {
      setIsComments(!isComments);
    }
    setViewComment(!viewComment);
  };

  const renderStars = (rating) => {
    const maxRating = 5;
    const fullStars = Math.floor(rating);

    const starIcons = [];

    for (let i = 0; i < fullStars; i++) {
      starIcons.push(<StarIcon key={`star-${i}`} fontSize="1rem" />);
    }

    const remainingStars = maxRating - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      starIcons.push(
        <StarBorderIcon key={`border-star-${i}`} fontSize="1rem" />
      );
    }

    return starIcons;
  };

  const handleStarClick = (value) => {
    setRating(value);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const renderRateStars = () => {
    const maxRating = 5;
    const starIcons = [];

    for (let i = 1; i <= maxRating; i++) {
      starIcons.push(
        i <= rating ? (
          <StarIcon key={`star-${i}`} onClick={() => handleStarClick(i)} />
        ) : (
          <StarBorderIcon
            key={`star-${i}`}
            onClick={() => handleStarClick(i)}
          />
        )
      );
    }

    return starIcons;
  };

  const handleEnterKeyPress = (e) => {
    if (e.key === "Enter") {
      reviewValidation();
    }
  };

  const reviewValidation = () => {
    if (rating === 0 && comment === "") {
      setOpenMissingBothDialog(true); // Open dialog if both rating and comment are empty
    } else if (rating === 0) {
      setOpenMissingRateDialog(true); // Open dialog if rating is not selected
    } else if (comment.length === 0) {
      setOpenMissingCommentDialog(true); // Open dialog if comment is empty
    } else {
      addReview(comment, rating);
      setRating(0);
      setComment("");
    }
  };

  const handleCloseDialog = () => {
    setOpenMissingBothDialog(false);
    setOpenMissingRateDialog(false);
    setOpenMissingCommentDialog(false);
  };

  const handleCloseDialogRestart = () => {
    setOpenMissingBothDialog(false);
    setOpenMissingRateDialog(false);
    setOpenMissingCommentDialog(false);
    window.location.reload();
  };

  const calculateAverageRating = () => {
    if (reviewUsers.length === 0) {
      return 0;
    }

    let totalRatings = 0;
    if (reviewUsers.length > 0) {
      reviewUsers.forEach((review) => {
        totalRatings += review.rating;
      });
    }

    const average = (totalRatings / reviewUsers.length).toFixed(1); // Round to one decimal point
    const parsedAverage = parseFloat(average);

    // Check if parsedAverage is NaN, if so, set averageRating to 0
    if (isNaN(parsedAverage)) {
      setAverageRating(0);
    } else {
      setAverageRating(parsedAverage);
    }
  };

  useEffect(() => {
    fetchPostAndUser();
    getReviewForPost();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    calculateAverageRating();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reviewUsers]);

  return (
    <>
      {fetchStatus ? (
        <Box
          display="flex"
          flexDirection="column"
          gap="0.5rem"
          padding="1rem"
          ml={isNonMobileScreens ? "320px" : "60px"}
          mt="70px"
        >
          <Typography fontWeight="bold" fontSize="4rem" color="primary">
            404
          </Typography>
          <Typography fontWeight="bold" fontSize="clamp(1rem, 1.5rem, 2rem)">
            Post Not Found
          </Typography>
        </Box>
      ) : (
        <Box
          display="flex"
          flexDirection="column"
          gap="0.5rem"
          padding="1rem"
          ml={isNonMobileScreens ? "320px" : "60px"}
          mt="70px"
        >
          <WidgetWrapper m="2rem 0">
            {postData && (
              <FriendAdmin
                friendId={postData.userId}
                name={postData.name}
                subtitle={postData.location}
                userPicturePath={postData.userPicturePath}
                postId={postData.postId}
                status="post"
              />
            )}
            <Typography color={main} sx={{ mt: "1rem" }}>
              {postData.description}
            </Typography>
            {postData.tags && (
              <Box display="flex" flexDirection="row" gap="0.5rem" mt="0.5rem">
                {postData.tags.map((tag, i) => (
                  <Typography color={primary} key={i}>
                    #{tag}
                  </Typography>
                ))}
              </Box>
            )}
            {postData.postPicturePath && (
              <Box
                width="100%"
                height="400px"
                borderRadius="0.75rem"
                marginTop="0.75rem"
              >
                <img
                  width="100%"
                  height="auto"
                  alt="post"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    cursor: "pointer",
                  }}
                  src={`http://localhost:3001/assets/${postData.postPicturePath}`}
                  onClick={openLightbox}
                />
              </Box>
            )}
          </WidgetWrapper>
          <WidgetWrapper>
            <FlexBetween mt="0.25rem">
              <FlexBetween gap="1rem">
                <FlexBetween gap="0.3rem">
                  <IconButton onClick={handleToggleReviews}>
                    <StarIcon color="primary" />
                  </IconButton>
                  {averageRating && <Typography>{averageRating}</Typography>}
                </FlexBetween>
                <FlexBetween gap="0.3rem">
                  <IconButton onClick={handleToggleComments}>
                    <ChatBubbleOutlineOutlined />
                  </IconButton>
                  <Typography>{commentUsers.length}</Typography>
                </FlexBetween>
              </FlexBetween>

              <IconButton>
                <ShareOutlined />
              </IconButton>
            </FlexBetween>
            {isComments && reviewUsers.length >= 0 && (
              <Box mt="0.5rem">
                {reviewUsers.slice(0, visibleReviews).map((review, i) => (
                  <Box key={`${review}-${i}`}>
                    <Divider />
                    <FlexBetween paddingTop="1rem">
                      <FlexBetween>
                        {review.userId ? (
                          review.picturePath ? (
                            <UserImage image={review.picturePath} size="35px" />
                          ) : (
                            <UserImage image="" size="35px" />
                          )
                        ) : (
                          <HourglassEmptyIcon />
                        )}
                        <Box>
                          <FlexBetween width="100%" height="100%">
                            <Box display="flex" flexDirection="row">
                              <Typography
                                sx={{
                                  color: "grey",
                                  m: "0.5rem 0",
                                  pl: "1rem",
                                }}
                              >
                                Review by
                              </Typography>
                              <Typography
                                sx={{
                                  color: primary,
                                  m: "0.5rem 0",
                                  pl: "1rem",
                                  "&:hover": {
                                    color: palette.secondary.light,
                                    cursor: "pointer",
                                  },
                                }}
                                onClick={() => {
                                  navigate(`/profile/${review.userId}`);
                                  navigate(0);
                                }}
                              >
                                {review.userId && review.name}
                              </Typography>
                            </Box>
                            <Box marginLeft="2rem">
                              {renderStars(review.rating).map((star, index) => (
                                <span key={index}>{star}</span>
                              ))}
                            </Box>
                          </FlexBetween>
                          <Box>
                            <Typography sx={{ color: main, pl: "1rem" }}>
                              {review.comment}
                            </Typography>
                          </Box>
                        </Box>
                      </FlexBetween>
                    </FlexBetween>
                    <Divider />
                  </Box>
                ))}
                <Box display="flex" justifyContent="center">
                  {!allReviewsLoaded && reviewUsers.length > 5 && (
                    <Button onClick={loadMoreReviews} sx={{ mt: "1rem" }}>
                      View More
                    </Button>
                  )}
                  {visibleReviews > 5 && (
                    <Button onClick={hideMoreReviews} sx={{ mt: "1rem" }}>
                      Hide
                    </Button>
                  )}
                </Box>
                <FlexBetween gap="1rem" paddingTop="1rem">
                  <FlexBetween width="100%" gap="1rem">
                    <UserImage image={loggedInUserPicturePath} size="35px" />
                    <TextField
                      fullWidth
                      id="standard-basic"
                      variant="standard"
                      placeholder="Comment"
                      value={comment}
                      onChange={handleCommentChange}
                      onKeyUp={handleEnterKeyPress}
                    />
                  </FlexBetween>
                  <Box width="9rem">{renderRateStars()}</Box>
                  <SendIcon
                    sx={{
                      color: primary,
                      "&:hover": {
                        color: palette.primary.light,
                        cursor: "pointer",
                      },
                    }}
                    onClick={() => {
                      reviewValidation();
                    }}
                  />
                </FlexBetween>
              </Box>
            )}
            {viewComment && commentUsers.length >= 0 && (
              <Box mt="0.5rem">
                {commentUsers.slice(0, visibleComments).map((comment, i) => (
                  <Box key={`${comment}-${i}`}>
                    <Divider />
                    <FlexBetween paddingTop="1rem">
                      <FlexBetween>
                        {comment.userId ? (
                          comment.picturePath ? (
                            <UserImage
                              image={comment.picturePath}
                              size="35px"
                            />
                          ) : (
                            <UserImage image="" size="35px" />
                          )
                        ) : (
                          <HourglassEmptyIcon />
                        )}
                        <Box>
                          <FlexBetween width="100%" height="100%">
                            <Box display="flex" flexDirection="row">
                              <Typography
                                sx={{
                                  color: primary,
                                  m: "0.5rem 0",
                                  pl: "1rem",
                                  "&:hover": {
                                    color: palette.secondary.light,
                                    cursor: "pointer",
                                  },
                                }}
                                onClick={() => {
                                  navigate(`/profile/${comment.userId}`);
                                  navigate(0);
                                }}
                              >
                                {comment.userId && comment.name}
                              </Typography>
                            </Box>
                          </FlexBetween>
                          <Box>
                            <Typography sx={{ color: main, pl: "1rem" }}>
                              {comment.comment}
                            </Typography>
                          </Box>
                        </Box>
                      </FlexBetween>
                    </FlexBetween>
                    <Divider />
                  </Box>
                ))}
                <Box display="flex" justifyContent="center">
                  {!allCommentsLoaded && commentUsers.length > 5 && (
                    <Button onClick={loadMoreComments} sx={{ mt: "1rem" }}>
                      View More
                    </Button>
                  )}
                  {visibleComments > 5 && (
                    <Button onClick={hideMoreComments} sx={{ mt: "1rem" }}>
                      Hide
                    </Button>
                  )}
                </Box>
                <FlexBetween gap="1rem" paddingTop="1rem">
                  <FlexBetween width="100%" gap="1rem">
                    <UserImage image={loggedInUserPicturePath} size="35px" />
                    <TextField
                      fullWidth
                      id="standard-basic"
                      variant="standard"
                      placeholder="Comment"
                      value={comment}
                      onChange={handleCommentChange}
                      onKeyUp={(e) => {
                        if (e.key === "Enter") {
                          addComment(comment);
                          setComment("");
                        }
                      }}
                    />
                  </FlexBetween>
                  <SendIcon
                    sx={{
                      color: primary,
                      "&:hover": {
                        color: palette.primary.light,
                        cursor: "pointer",
                      },
                    }}
                    onClick={() => {
                      addComment(comment); // Call the addComment function to add the comment
                      setComment("");
                    }}
                  />
                </FlexBetween>
              </Box>
            )}
          </WidgetWrapper>
          <DialogMessage
            open={openMissingBothDialog}
            handleClose={handleCloseDialogRestart}
            title="Rate and Comment"
            content="Please add a rate and comment"
          />
          <DialogMessage
            open={openMissingRateDialog}
            handleClose={handleCloseDialog}
            title="Rate"
            content="Please add a rate"
          />
          <DialogMessage
            open={openMissingCommentDialog}
            handleClose={handleCloseDialog}
            title="Comment"
            content="Please add a comment"
          />
          <Lightbox
            open={open}
            close={closeLightbox}
            carousel={{ finite: slides.length <= 1 }}
            render={{
              buttonPrev: slides.length <= 1 ? () => null : undefined,
              buttonNext: slides.length <= 1 ? () => null : undefined,
            }}
            slides={slides}
          />
        </Box>
      )}
    </>
  );
};

export default AdminViewPostContent;
