import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import timeSince from "../../utils/formatDate";

import { selectCurrentUser } from "../../redux/users/user-selectors";
import { selectCurrentPost } from "../../redux/posts/post-selectors";
import {
  selectPostComments,
  selectCurrentComment,
} from "../../redux/comments/comment-selectors";

import { fetchPostAsync } from "../../redux/posts/post-actions";
import { likePostAsync, unlikePostAsync } from "../../redux/likes/like-actions";
import {
  fetchPostCommentsAsync,
  createCommentAsync,
  deleteCommentAsync,
} from "../../redux/comments/comment-actions";

import { selectUserLikes } from "../../redux/likes/like-selectors";

import Avatar from "../../components/UI/Avatar/Avatar";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";

import "./Post.scss";

const DEFAULT_POST = {
  image_url: "",
  caption: "",
  createdAt: "",
  likes_count: 0,
  comments_count: 0,
  user: {
    username: "",
    id: "",
    user_info: {
      avatar_url: "",
      summary: "",
    },
  },
};

const Post = ({
  match,
  history,
  fetchPost,
  post,
  currentUser,
  likePost,
  unlikePost,
  userLikes,
  currentComment,
  postComments,
  fetchPostComments,
  createComment,
  deleteComment,
}) => {
  if (!post) {
    post = DEFAULT_POST;
  }

  const likedByCurrentUser = userLikes.filter(
    (userLike) => userLike.post === post.id
  )[0]
    ? true
    : false;

  const [likeStatus, toggleLike] = useState(likedByCurrentUser);
  const [comment, setComment] = useState("");
  const [currentLikes, mutateLikes] = useState(post.likes_count);

  useEffect(() => {
    fetchPost(match.params.postId);
    fetchPostComments(match.params.postId);
    toggleLike(likedByCurrentUser);
    mutateLikes(post.likes_count);
  }, [
    fetchPost,
    fetchPostComments,
    match.params.postId,
    post.likes_count,
    likedByCurrentUser,
  ]);

  const likeToggler = () => {
    toggleLike((prevState) => {
      if (!prevState) {
        likePost(match.params.postId, currentUser.userId);
        mutateLikes((prevLikes) => prevLikes + 1);
      } else {
        unlikePost(match.params.postId, currentUser.userId);
        mutateLikes((prevLikes) => prevLikes - 1);
      }
      return !prevState;
    });
  };

  const commentHandler = (e) => {
    setComment(e.target.value);
  };

  const onCommentSubmit = () => {
    createComment(match.params.postId, currentUser.userId, comment);
    setComment("");
  };

  return (
    <div className="post-container">
      <div className="cta-goback">
        <Button
          onClick={() => history.goBack()}
          secondary
          text="Go Back"
        ></Button>
      </div>

      <div className="post__post-top-bar">
        <div className="post__user-info">
          <Avatar size={20} source={post.user.user_info.avatar_url} />
          <Link to={`/user/${post.user.id}`}>
            <h6>{post.user.username}</h6>
          </Link>
        </div>
        <h6 className="date">{timeSince(post.createdAt)}</h6>
      </div>

      <div
        className="post__image"
        style={{
          backgroundImage: `url(${post.image_url})`,
        }}
      ></div>

      <div className="post__post-details">
        <div className="post__post-cta">
          <img
            onClick={likeToggler}
            className={`not-liked ${likeStatus && "show-off"}`}
            alt="like"
            src="data:image/png;base64,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"
          />
          <img
            onClick={likeToggler}
            className={` liked ${!likeStatus && "show-off"}`}
            alt="like"
            src="data:image/png;base64,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"
          />
        </div>
        <div className="post__post-caption">
          <h5>{post.caption}</h5>
        </div>
        <div className="post__post-info">
          <div className="likes">
            <img
              onClick={likeToggler}
              className={`not-liked ${likeStatus && "show-off"}`}
              alt="like"
              src="data:image/png;base64,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"
            />
            <img
              onClick={likeToggler}
              className={` liked ${!likeStatus && "show-off"}`}
              alt="like"
              src="data:image/png;base64,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"
            />
            <h6>{currentLikes} Likes</h6>
          </div>
          <div className="comments">
            <img
              alt="comment"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAABlElEQVRIidXUP2tUURAF8F/CKqKSJRCSD+AqaiNJEQS1MUUaO6sVC7WwtRfxIxjBwiZJKTZWVmHbGLBRlJhGSAorLfwThaBF1uLNJS/xbd7djRYeuAx35syZue/NvfzvGKqJN9HGLM5hPPwf8QZLeIpv/RZu4D6+oluzvuBe5GRhAislgSXcQAtHY53EzYgl3ovSCXuiideRsI4LGQ1dxEbkvAqNnlgM4juMZYgnjGEtcud7kaawjS2c6EM8oRW525isIjyMDh4MIJ4wFxpzVcHVCE4foMD50HhbFdyM4EjJlyYkd9+M/WZyDO8hHxS/wh6qKvAh7OmSb8ju2163Pxv2fVWBTth2dr9/4krYl1XBSTtj2hpAfBSfFJ96phdpIQhr+rto8DhyV+3ziDYV172ruP6XMsWvKU7fxeU68jiW7YxgB7dwCsdwHGdwNfiz+BncR5kNaeAuPtv9NO9d10viHRzOLZAwgtt4phi9H/heKpA+y3Mc6Vd8P5RP8cQAnecU2MKdvy2csKz40f8Mw/WUAr8BryZxzOuWYHcAAAAASUVORK5CYII="
            />
            <h6>{post.comments_count} Comments</h6>
          </div>
        </div>
      </div>

      <div className="post__post-comments">
        <ul className="post__post-comments-list">
          {postComments[0] ? (
            postComments.map((comment) => (
              <li>
                <Link to={`/user/${comment.user.id}`}>
                  <h6 className="comment-user">{comment.user.username}</h6>
                </Link>
                <h6 className="comment-body">{comment.body}</h6>
              </li>
            ))
          ) : (
            <h5>No comments</h5>
          )}
        </ul>

        <div className="add-comment--container">
          <Input
            onChange={commentHandler}
            type="text"
            name="comment"
            value={comment}
            placeholder="Add a comment.."
          />
          <Button
            name="add-comment"
            primary
            onClick={onCommentSubmit}
            text="Submit"
          ></Button>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  fetchPost: (postId) => dispatch(fetchPostAsync(postId)),
  likePost: (postId, userId) => dispatch(likePostAsync(postId, userId)),
  unlikePost: (postId, userId) => dispatch(unlikePostAsync(postId, userId)),
  createComment: (postId, userId, body) =>
    dispatch(createCommentAsync(postId, userId, body)),
  deleteComment: (postId, commentId, userId) =>
    dispatch(deleteCommentAsync(postId, commentId, userId)),
  fetchPostComments: (postId) => dispatch(fetchPostCommentsAsync(postId)),
});

const mapStateToProps = (state) => ({
  currentUser: selectCurrentUser(state),
  post: selectCurrentPost(state),
  userLikes: selectUserLikes(state),
  postComments: selectPostComments(state),
  currentComment: selectCurrentComment(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Post));
